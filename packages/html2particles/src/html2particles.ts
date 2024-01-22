import html2canvas from 'html2canvas'

interface IOptions {
  type: 'default' | 'circle'
}

interface IDisplayObj {
  elem: HTMLElement
  actualWidth: number
  actualHeight: number
  particleType: 'Particle'
  particleArr: any[]
  animationDuration: number
  canvas?: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D
  scrnCanvas?: HTMLCanvasElement
  scrnCtx?: CanvasRenderingContext2D
}

export default function main(
  root: HTMLElement,
  option: IOptions = {
    type: 'default',
  },
) {
  const disParticleTypes: any[] = []

  /********************/
  /* Helper functions */
  /********************/

  const disObj: IDisplayObj = {
    elem: root,
    actualWidth: root.offsetWidth,
    actualHeight: root.offsetHeight,
    particleType: 'Particle',
    particleArr: [],
    animationDuration: 100,
  }
  init()
  /**
   * 初始化
   */
  async function init() {
    // 1. 获取 DOM 截图
    // 2. 创建动画方式
    await getScreenshot()

    const { type } = option
    switch (type) {
      case 'default':
        createSimultaneousParticles()
        break

      default:
        break
    }
  }

  /** 获取截图 */
  function getScreenshot() {
    return new Promise((resolve) => {
      html2canvas(root, { scale: 1, useCORS: true }).then((canvas) => {
        // 获取 DOM 的 canvas图像
        if (typeof disObj.scrnCanvas === 'undefined') {
          disObj.scrnCanvas = canvas
          disObj.scrnCtx = canvas.getContext('2d')!
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
          disObj.ctx = disObj.canvas.getContext('2d')!
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
  function createParticle(disObj: IDisplayObj, worldX: any, worldY: any, rgbArr: any, arrayIndex: string | number) {
    let myType = disParticleTypes[0]
    // Make sure the particle type is in Disintegrate's particle type list
    disParticleTypes.forEach((type) => {
      if (type.name === disObj.particleType)
        myType = type
    })

    // Actually create the particle
    // eslint-disable-next-line new-cap
    const particle = new myType()
    particle.rgbArray = rgbArr
    particle.startX = worldX
    particle.startY = worldY
    particle.arrayIndex = arrayIndex
    particle.index = disObj.particleArr[arrayIndex].myParticles.length
    disObj.animationDuration = particle.animationDuration
    disObj.particleArr[arrayIndex].myParticles.push(particle)
  }

  /** 添加粒子效果 */
  function addParticleType(func: any) {
    disParticleTypes.push(func)
  }

  /** 粒子效果动画 */
  function animateParticles(disObj: IDisplayObj) {
    if (typeof disObj.ctx !== 'undefined')
      disObj.ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

    for (let i = 0; (disObj.particleArr.length > 0 && i < disObj.particleArr.length); i++) {
      const percent = (Date.now() - disObj.particleArr[i].startTime) / disObj.animationDuration

      for (let j = 0; j < disObj.particleArr[i].myParticles.length; j++)
        disObj.particleArr[i].myParticles[j].draw(disObj.ctx, percent)

      if (i === disObj.particleArr.length - 1 && percent > 1) {
        // Garbage collect
        disObj.particleArr = []
      }
    }
  }

  /*****************************/
  /* Specific particle effects */
  /*****************************/
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

  /*****************************/
  /*            Go             */
  /*****************************/

  function createSimultaneousParticles() {
    disObj.particleArr.push({
      startTime: Date.now(),
      myParticles: [],
    })
    const screenshotData = getAllImageData()

    // 处理粒子像素
    if (screenshotData) {
      const particleSize = 5

      for (let y = 0; y < disObj.actualHeight; y += particleSize) {
        for (let x = 0; x < disObj.actualWidth; x += particleSize) {
          const index = (y * disObj.actualWidth + x) * 4
          const colorData = screenshotData.slice(index, index + 4)
          createParticle(disObj, x + Math.random() * 10 - 5, y + Math.random() * 10 - 5, colorData, 0)
        }
      }
    }
  }

  // Animate all existing particles of the given Disintegrate element
  // using their built in draw function

  function startAnimation() {
    animateParticles(disObj)
    window.requestAnimationFrame(startAnimation)
  }

  startAnimation()

  return {
    startAnimation,
  }
}
