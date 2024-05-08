import html2canvas from 'html2canvas'
import { ExplodingParticle, SinWaveParticle } from './effect'
import type { Html2particleReturn, IDisplayObj, IOptions } from './types'

export default html2particle as typeof html2particle

export function html2particle(
  el: HTMLElement,
  option: IOptions = {
    type: 'SinWaveParticle',
    particleGap: 5,
  },
): Html2particleReturn {
  // 是否进行动画。两个作用，一是导出出去，二是结束最后一个 requestAnimationFrame
  let isAnimating = false
  // 截图数据，初始的时候存一下，省的后面再获取了
  let screenshotData: Uint8ClampedArray | null = null
  // 粒子动画效果
  const disParticleTypes: { name: IOptions['type'], func: any }[] = []
  // requestAnimationFrame
  let myReq: any

  // 展示的对象
  const disObj: IDisplayObj = {
    el,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    particleType: option.type,
    particleGap: option.particleGap ?? 5,
    particleObj: {
      startTime: Date.now(),
      myParticles: [],
    },
    animationDuration: 1000,
  }

  /*****************************/
  /*       粒子动画效果          */
  /*****************************/
  function addParticleType(func: any) {
    disParticleTypes.push(func)
  }
  addParticleType({
    name: 'SinWaveParticle',
    func: SinWaveParticle,
  })
  addParticleType({
    name: 'ExplodingParticle',
    func: ExplodingParticle,
  })

  const { customParticle } = option
  if (customParticle) {
    addParticleType({
      name: 'CustomParticle',
      func: customParticle,
    })
  }

  /********************/
  /*      主函数       */
  /********************/

  init()

  async function init() {
    updateDisObjProperty()

    await getScreenshot()

    screenshotData = getAllImageData()
  }

  /** 获取截图 */
  function getScreenshot() {
    return new Promise((resolve) => {
      html2canvas(disObj.el, { scale: 1, useCORS: true, backgroundColor: null }).then((canvas) => {
        // 获取 DOM 的 canvas图像
        if (typeof disObj.scrnCanvas === 'undefined') {
          disObj.scrnCanvas = canvas
          disObj.scrnCtx = canvas.getContext('2d', { willReadFrequently: true })!
        }

        resolve('gengrate DOM canvas')
      })
    })
  }

  /** 获取截图数据 */
  function getAllImageData() {
    if (disObj.scrnCtx)
      return disObj.scrnCtx.getImageData(0, 0, disObj.width, disObj.height).data
    else
      return null
  }

  /** 更新元素的尺寸 */
  function updateDisObjProperty() {
    const resizeDisBound = getCoords(disObj.el)
    disObj.width = resizeDisBound.width
    disObj.height = resizeDisBound.height
    disObj.top = resizeDisBound.top
    disObj.left = resizeDisBound.left
  }

  /** 获取元素的尺寸 */
  function getCoords(el: HTMLElement) {
    const box = el.getBoundingClientRect()

    return {
      width: box.width,
      height: box.height,
      top: box.top,
      left: box.left,
    }
  }

  /** 创建粒子效果 */
  function createParticle(disObj: IDisplayObj, worldX: number, worldY: number, rgbaArr: Uint8ClampedArray) {
    const particleEffect = disParticleTypes.find(type => type.name === disObj.particleType)

    // 创建粒子
    if (!particleEffect) {
      console.error('没有找到该粒子动画类型')
      return
    }
    const MyType = particleEffect.func

    const particle = new MyType({
      rgbaArray: rgbaArr,
      startX: worldX,
      startY: worldY,
      index: disObj.particleObj.myParticles.length,
      disWidth: disObj.width,
      disHeight: disObj.height,
      disTop: disObj.top,
      disLeft: disObj.left,
      disParticleGap: disObj.particleGap,
    })

    // 粒子运动 duration 时间
    disObj.animationDuration = particle.animationDuration
    disObj.particleObj.myParticles.push(particle)
  }

  /** 粒子效果动画 */
  function animateparticle(disObj: IDisplayObj) {
    if (isAnimating) {
      if (typeof disObj.ctx !== 'undefined')
        disObj.ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

      const percent = (Date.now() - disObj.particleObj.startTime) / disObj.animationDuration
      for (let j = 0; j < disObj.particleObj.myParticles.length; j++)
        disObj.particleObj.myParticles[j].draw(disObj.ctx, percent)

      // 动画结束 这里的 1 是动画的时间。因为预设的两个动画都是 1000ms
      // 判断的依据就是如果时间差超过动画的时间，那么就结束
      if (percent > 1) {
        if (typeof disObj.ctx !== 'undefined')
          disObj.ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)
        cancelAnimation()
      }
    }
  }

  /** 给所有的像素点创建粒子类 */
  function createSimultaneousparticle() {
    disObj.particleObj = {
      startTime: Date.now(),
      myParticles: [],
    }

    // 处理粒子像素
    if (screenshotData) {
      for (let y = 0; y < disObj.height; y += disObj.particleGap) {
        for (let x = 0; x < disObj.width; x += disObj.particleGap) {
          const index = (y * disObj.width + x) * 4
          const colorData = screenshotData.slice(index, index + disObj.particleGap)

          const startX = x + Math.random() * 10 - disObj.particleGap
          const startY = y + Math.random() * 10 - disObj.particleGap
          createParticle(disObj, disObj.left + startX, disObj.top + startY, colorData)
        }
      }
    }
  }

  /*****************************/
  /*            Go             */
  /*****************************/

  function startAnimation() {
    // 1. 停止之前还有动画在进行中
    cancelAnimation()

    // 2. 更新展示的元素位置
    updateDisObjProperty()

    // 3. 创建画布
    createCanvas()

    setTimeout(() => {
      // 4. 创建动画
      createAnimation()

      // 5. 开始动画
      updateAnimation()
    })
  }

  function createCanvas() {
    if (typeof disObj.canvas === 'undefined') {
      disObj.canvas = document.createElement('canvas')

      disObj.canvas.style.position = 'fixed'

      disObj.canvas.width = document.documentElement.scrollWidth
      disObj.canvas.height = document.documentElement.scrollHeight
      disObj.canvas.style.top = `${0}px`
      disObj.canvas.style.left = `${0}px`
      disObj.canvas.style.right = `${0}px`
      disObj.canvas.style.bottom = `${0}px`

      disObj.canvas.style.userSelect = 'none'
      disObj.canvas.style.pointerEvents = 'none'
      disObj.canvas.style.zIndex = '1001'
      disObj.ctx = disObj.canvas.getContext('2d', { willReadFrequently: true })!
      document.body.appendChild(disObj.canvas)
    }
  }

  function createAnimation() {
    isAnimating = true
    createSimultaneousparticle()
  }

  function updateAnimation() {
    animateparticle(disObj)
    if (isAnimating)
      myReq = window.requestAnimationFrame(updateAnimation)
  }

  function cancelAnimation() {
    disObj.particleObj = {
      startTime: Date.now(),
      myParticles: [],
    }

    cancelAnimationFrame(myReq)
    isAnimating = false

    if (disObj.canvas) {
      document.body.removeChild(disObj.canvas)
      disObj.canvas = undefined
    }
  }

  return {
    isAnimating,
    startAnimation,
  }
}
