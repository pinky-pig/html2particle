import type { IParticleInstance } from '../index'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cloud from './poof-cloud.raw?raw'

const EaseIn = (power: number) => (t: number) => t ** power
const EaseOut = (power: number) => (t: number) => 1 - Math.abs((t - 1) ** power)
const EaseInOut = (power: any) => (t: number) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5

function genNormalizedVal() {
  return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
}
export class PoofParticle implements IParticleInstance {
  name: string
  animationDuration: number
  speed: { x: number; y: number; ax: number; ay: number }
  radius: number
  startX: number
  startY: number
  rgbaArray: any
  disWidth: number
  disHeight: number
  disLeft: number
  disTop: number
  index: number
  disParticleGap: number
  center: {
    x: number // [-20, 20]
    y: number
  }

  count: number
  image: HTMLImageElement
  opacityFactor: number
  opacityFunc: (t: any) => number

  constructor(
    { rgbaArray, startX, startY, index, disWidth, disHeight, disTop, disLeft, disParticleGap }: IParticleInstance,
  ) {
    this.name = 'PoofParticle'
    this.animationDuration = 1000
    this.radius = 100

    this.rgbaArray = rgbaArray
    this.startX = startX
    this.startY = startY
    this.index = index
    this.disWidth = disWidth
    this.disHeight = disHeight
    this.disTop = disTop
    this.disLeft = disLeft
    this.disParticleGap = disParticleGap

    this.speed = {
      x: Math.random() * 30 - 15, // [-20, 20]
      y: Math.random() * 30 - 15,
      ax: 0,
      ay: 0.98,
    }

    this.center = {
      x: this.disLeft + this.disWidth / 2 + genNormalizedVal(), // [-20, 20]
      y: this.disTop + this.disHeight / 2 + genNormalizedVal(),
    }
    this.count = 0

    this.image = new Image()
    this.image.src = cloud // 替换为你的图片路径

    this.opacityFactor = Math.round(((genNormalizedVal() + 1) / 2) * 3 + 1)
    this.opacityFunc = (t: any) => 1 - EaseOut(this.opacityFactor)(t)
  }

  draw(ctx: CanvasRenderingContext2D, percent: number): void {
    if (this.count === 0) {
      this.startX = this.center.x
      this.startY = this.center.y
    }
    else if (this.radius > 0) {
      if (this.rgbaArray[3] !== 0)
        this.drawImage(ctx, this.startX, this.startY, this.image!, this.radius)

      const f = Math.round(((genNormalizedVal() + 1) / 2) * 3 + 1)
      const easingFactor = EaseOut(1)(percent)

      this.startX += this.speed.x * easingFactor / 10
      this.startY += this.speed.y * easingFactor / 10
      this.radius = this.radius - this.radius * easingFactor / 20

      const currOpacity = this.opacityFunc(percent)
      ctx.globalAlpha = currOpacity
    }

    this.count++
  }

  drawImage(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, image: HTMLImageElement, size: number) {
    const aspectRatio = image.width / image.height
    let drawWidth, drawHeight

    if (aspectRatio > 1) {
      drawWidth = size
      drawHeight = size / aspectRatio
    }
    else {
      drawWidth = size * aspectRatio
      drawHeight = size
    }

    const drawX = centerX - drawWidth / 2
    const drawY = centerY - drawHeight / 2

    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  }
}
