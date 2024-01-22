import html2canvas from 'html2canvas'
import { ExplodingParticle, Particle } from './effect'
interface IOptions {
  type: 'Particle' | 'ExplodingParticle'
  animationFunctions?: 'ease-in' | 'ease-out' | 'ease-in-out'
  particleSize?: number
}

interface Html2ParticlesReturn {
  isAnimating: boolean
  startAnimation: () => void
}

interface IDisplayObj {
  el: HTMLElement
  actualWidth: number
  actualHeight: number
  particleType: 'Particle' | 'ExplodingParticle'
  particleSize: number
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
  root: HTMLElement,
  option: IOptions = {
    type: 'Particle',
    particleSize: 5,
  },
): Html2ParticlesReturn {
  // 是否进行动画。两个作用，一是导出出去，二是结束最后一个requestAnimationFrame
  let isAnimating = false
  // 截图数据，初始的时候存一下，省的后面再获取了
  let screenshotData: Uint8ClampedArray | null = null
  // 粒子动画效果
  const disParticleTypes: any[] = []

  // 展示的对象
  const disObj: IDisplayObj = {
    el: root,
    actualWidth: root.offsetWidth,
    actualHeight: root.offsetHeight,
    particleType: option.type,
    particleSize: option.particleSize ?? 5,
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
      html2canvas(root, { scale: 1, useCORS: true }).then((canvas) => {
        // 获取 DOM 的 canvas图像
        if (typeof disObj.scrnCanvas === 'undefined') {
          disObj.scrnCanvas = canvas
          disObj.scrnCtx = canvas.getContext('2d', { willReadFrequently: true })!
        }

        // 创建 canvas 容器
        if (typeof disObj.canvas === 'undefined') {
          disObj.canvas = document.createElement('canvas')
          disObj.canvas.width = document.documentElement.scrollWidth
          disObj.canvas.height = document.documentElement.scrollHeight
          disObj.canvas.style.position = 'absolute'
          disObj.canvas.style.top = `${0}`
          disObj.canvas.style.left = `${0}`
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
      return disObj.scrnCtx.getImageData(0, 0, disObj.actualWidth, disObj.actualHeight).data
    else
      return null
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
    // 粒子运动 duration 时间
    disObj.animationDuration = particle.animationDuration
    disObj.particleObj.myParticles.push(particle)
  }

  /** 粒子效果动画 */
  function animateParticles(disObj: IDisplayObj) {
    if (isAnimating) {
      if (typeof disObj.ctx !== 'undefined')
        disObj.ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

      const percent = (Date.now() - disObj.particleObj.startTime) / disObj.animationDuration

      for (let j = 0; j < disObj.particleObj.myParticles.length; j++)
        disObj.particleObj.myParticles[j].draw(disObj.ctx, percent)

      // 动画结束
      if (percent > 1) {
        // Garbage collect
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
  addParticleType(Particle)
  addParticleType(ExplodingParticle)

  /*****************************/
  /*            Go             */
  /*****************************/

  function createSimultaneousParticles() {
    disObj.particleObj = {
      startTime: Date.now(),
      myParticles: [],
    }

    // 处理粒子像素
    if (screenshotData) {
      for (let y = 0; y < disObj.actualHeight; y += disObj.particleSize) {
        for (let x = 0; x < disObj.actualWidth; x += disObj.particleSize) {
          const index = (y * disObj.actualWidth + x) * 4
          const colorData = screenshotData.slice(index, index + disObj.particleSize)

          const startX = x + Math.random() * 10 - disObj.particleSize
          const startY = y + Math.random() * 10 - disObj.particleSize

          createParticle(disObj, startX, startY, colorData)
        }
      }
    }
  }

  let myReq: any

  function startAnimation() {
    createAnimation()
    updateAnimation()
  }

  function createAnimation() {
    createSimultaneousParticles()
    isAnimating = true
  }

  function updateAnimation() {
    animateParticles(disObj)
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
