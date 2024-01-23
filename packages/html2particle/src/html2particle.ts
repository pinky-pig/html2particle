import html2canvas from 'html2canvas'
import { ExplodingParticle, SinWaveParticle } from './effect'
interface IOptions {
  type: 'SinWaveParticle' | 'ExplodingParticle'
  particlesize?: number
}

interface Html2particleReturn {
  isAnimating: boolean
  startAnimation: () => void
}

interface IDisplayObj {
  el: HTMLElement
  width: number
  height: number
  top: number
  left: number
  particleType: 'SinWaveParticle' | 'ExplodingParticle'
  particlesize: number
  particleObj: {
    startTime: number
    myParticles: any[]
  }
  animationDuration: number
  canvas?: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D
  scrnCanvas?: HTMLCanvasElement
  scrnCtx?: CanvasRenderingContext2D
}

export default function main(
  el: HTMLElement,
  option: IOptions = {
    type: 'SinWaveParticle',
    particlesize: 5,
  },
): Html2particleReturn {
  // 是否进行动画。两个作用，一是导出出去，二是结束最后一个 requestAnimationFrame
  let isAnimating = false
  // 截图数据，初始的时候存一下，省的后面再获取了
  let screenshotData: Uint8ClampedArray | null = null
  // 粒子动画效果
  const disParticleTypes: any[] = []
  // requestAnimationFrame
  let myReq: any
  // 展示的对象
  const bound = getCoords(el)

  const disObj: IDisplayObj = {
    el,
    width: bound.width,
    height: bound.height,
    top: bound.top,
    left: bound.left,
    particleType: option.type,
    particlesize: option.particlesize ?? 5,
    particleObj: {
      startTime: Date.now(),
      myParticles: [],
    },
    animationDuration: 1000,
  }

  /********************/
  /*      主函数       */
  /********************/

  init()

  async function init() {
    await getScreenshot()
    screenshotData = getAllImageData()
  }

  /** 获取截图 */
  function getScreenshot() {
    return new Promise((resolve) => {
      html2canvas(disObj.el, { scale: 1, useCORS: true }).then((canvas) => {
        // 获取 DOM 的 canvas图像
        if (typeof disObj.scrnCanvas === 'undefined') {
          disObj.scrnCanvas = canvas
          disObj.scrnCtx = canvas.getContext('2d', { willReadFrequently: true })!
        }

        // 创建 canvas 容器
        if (typeof disObj.canvas === 'undefined') {
          disObj.canvas = document.createElement('canvas')

          disObj.canvas.style.position = 'absolute'

          disObj.canvas.width = document.documentElement.scrollWidth
          disObj.canvas.height = document.documentElement.scrollHeight
          disObj.canvas.style.top = `${0}px`
          disObj.canvas.style.left = `${0}px`

          disObj.canvas.style.userSelect = 'none'
          disObj.canvas.style.pointerEvents = 'none'
          disObj.canvas.style.zIndex = '1001'
          disObj.ctx = disObj.canvas.getContext('2d', { willReadFrequently: true })!
          document.body.appendChild(disObj.canvas)
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
  function createParticle(disObj: IDisplayObj, worldX: number, worldY: number, rgbArr: any) {
    const MyType = disParticleTypes.find(type => type.name === disObj.particleType)

    // 创建粒子
    const particle = new MyType()
    particle.rgbArray = rgbArr
    particle.startX = worldX
    particle.startY = worldY
    particle.index = disObj.particleObj.myParticles.length
    particle.disWidth = disObj.width
    particle.disHeight = disObj.height

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
        disObj.particleObj = {
          startTime: Date.now(),
          myParticles: [],
        }
        cancelAnimation()
      }
    }
  }

  /*****************************/
  /*       粒子动画效果          */
  /*****************************/
  function addParticleType(func: any) {
    disParticleTypes.push(func)
  }
  addParticleType(SinWaveParticle)
  addParticleType(ExplodingParticle)

  /*****************************/
  /*            Go             */
  /*****************************/

  function createSimultaneousparticle() {
    disObj.particleObj = {
      startTime: Date.now(),
      myParticles: [],
    }

    // 处理粒子像素
    if (screenshotData) {
      for (let y = 0; y < disObj.height; y += disObj.particlesize) {
        for (let x = 0; x < disObj.width; x += disObj.particlesize) {
          const index = (y * disObj.width + x) * 4
          const colorData = screenshotData.slice(index, index + disObj.particlesize)

          const startX = x + Math.random() * 10 - disObj.particlesize
          const startY = y + Math.random() * 10 - disObj.particlesize
          createParticle(disObj, disObj.left + startX, disObj.top + startY, colorData)
        }
      }
    }
  }

  function startAnimation() {
    createAnimation()
    updateAnimation()
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
    cancelAnimationFrame(myReq)
    isAnimating = false
  }

  return {
    isAnimating,
    startAnimation,
  }
}
