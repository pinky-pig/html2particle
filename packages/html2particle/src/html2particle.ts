import html2canvas from 'html2canvas'
import { ExplodingParticle, Particle } from './effect'
interface IOptions {
  type: 'Particle' | 'ExplodingParticle'
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
  particleType: 'Particle' | 'ExplodingParticle'
  particlesize: number
  particleObj: {
    startTime: number
    myParticle: any[]
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
    type: 'Particle',
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
      myParticle: [],
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

          disObj.canvas.width = disObj.width
          disObj.canvas.height = disObj.height
          disObj.canvas.style.top = `${disObj.top}px`
          disObj.canvas.style.left = `${disObj.left}px`

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
    particle.index = disObj.particleObj.myParticle.length
    // 粒子运动 duration 时间
    disObj.animationDuration = particle.animationDuration
    disObj.particleObj.myParticle.push(particle)
  }

  /** 粒子效果动画 */
  function animateparticle(disObj: IDisplayObj) {
    if (isAnimating) {
      if (typeof disObj.ctx !== 'undefined')
        disObj.ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

      const percent = (Date.now() - disObj.particleObj.startTime) / disObj.animationDuration

      for (let j = 0; j < disObj.particleObj.myParticle.length; j++)
        disObj.particleObj.myParticle[j].draw(disObj.ctx, percent)

      // 动画结束
      if (percent > 1) {
        // Garbage collect
        disObj.particleObj = {
          startTime: Date.now(),
          myParticle: [],
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
  addParticleType(Particle)
  addParticleType(ExplodingParticle)

  /*****************************/
  /*            Go             */
  /*****************************/

  function createSimultaneousparticle() {
    disObj.particleObj = {
      startTime: Date.now(),
      myParticle: [],
    }

    // 处理粒子像素
    if (screenshotData) {
      for (let y = 0; y < disObj.height; y += disObj.particlesize) {
        for (let x = 0; x < disObj.width; x += disObj.particlesize) {
          const index = (y * disObj.width + x) * 4
          const colorData = screenshotData.slice(index, index + disObj.particlesize)

          const startX = x + Math.random() * 10 - disObj.particlesize
          const startY = y + Math.random() * 10 - disObj.particlesize

          createParticle(disObj, startX, startY, colorData)
        }
      }
    }
  }

  function startAnimation() {
    createAnimation()
    updateAnimation()
  }

  function createAnimation() {
    createSimultaneousparticle()
    isAnimating = true
  }

  function updateAnimation() {
    animateparticle(disObj)
    if (isAnimating)
      myReq = window.requestAnimationFrame(updateAnimation)
  }

  function cancelAnimation() {
    isAnimating = false
    cancelAnimationFrame(myReq)
  }

  return {
    isAnimating,
    startAnimation,
  }
}
