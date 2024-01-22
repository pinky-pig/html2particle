import html2canvas from 'html2canvas'

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

  function genNormalizedVal() {
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
  }

  const EaseIn = (power: number) => (t: number) => t ** power
  const EaseOut = (power: number) => (t: number) => 1 - Math.abs((t - 1) ** power)
  const EaseInOut = (power: any) => (t: number) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5
  const Particle = function (this: any) {
    this.name = 'Particle'
    this.animationDuration = 1000 // in ms

    this.widthScaler = Math.round(50 * genNormalizedVal()) // Normalized val between -50 and 50
    this.numWaves = (genNormalizedVal() + 1 / 2) * 2 + 1
    this.xPosFunc = (t: number) => Math.sin(this.numWaves * Math.PI * t)

    this.heightScaler = Math.round(65 * (genNormalizedVal() + 1) / 2) + 10 // Normalized val between 10 and 75
    this.yPosFunc = (t: any) => t

    this.startSize = 10
    this.sizeFunc = (t: number) => 1 - t

    this.opacityFactor = Math.round(((genNormalizedVal() + 1) / 2) * 3 + 1)
    this.opacityFunc = (t: any) => 1 - EaseInOut(this.opacityFactor)(t)

    this.draw = (ctx: { fillStyle: string; fillRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void }, percent: number) => {
      percent = percent >= 1 ? 1 : percent

      const currX = this.startX + this.xPosFunc(percent) * this.widthScaler
      const currY = this.startY - this.yPosFunc(percent) * this.heightScaler
      const currSize = this.startSize * this.sizeFunc(percent)
      const currOpacity = this.opacityFunc(percent)

      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]},${currOpacity})`
      ctx.fillRect(currX - currSize / 2, currY - currSize / 2, currSize, currSize)
    }
  }

  addParticleType(Particle)

  const ExplodingParticle = function (this: any) {
    this.name = 'ExplodingParticle'
    this.animationDuration = 1000 // in ms

    this.speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10,
    }
    this.radius = 5 + Math.random() * 5
    this.life = 30 + Math.random() * 10
    this.remainingLife = this.life
    this.draw = (ctx: { beginPath: () => void; arc: (arg0: any, arg1: any, arg2: any, arg3: number, arg4: number) => void; fillStyle: string; fill: () => void }) => {
      if (this.remainingLife > 0
      && this.radius > 0) {
        ctx.beginPath()
        ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]}, 1)`
        ctx.fill()
        this.remainingLife--
        this.radius -= 0.25
        this.startX += this.speed.x
        this.startY += this.speed.y
      }
    }
  }
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
