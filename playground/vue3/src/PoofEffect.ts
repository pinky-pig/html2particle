import type { IParticleInstance } from '../../../packages/html2particle/src/index'

import cloud from './poof.raw?raw'

const EaseIn = (power: number) => (t: number) => t ** power
const EaseOut = (power: number) => (t: number) => 1 - Math.abs((t - 1) ** power)
const EaseInOut = (power: any) => (t: number) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5

function genNormalizedVal() {
  return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
}
export class PoofEffect implements IParticleInstance {
  name: string
  animationDuration: number
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

  image: HTMLImageElement

  constructor(
    { rgbaArray, startX, startY, index, disWidth, disHeight, disTop, disLeft, disParticleGap }: IParticleInstance,
  ) {
    this.name = 'PoofParticle'
    this.animationDuration = 500
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

    this.image = new Image()
    this.image.src = cloud // 替换为你的图片路径
  }

  draw(ctx: CanvasRenderingContext2D, percent: number): void {
    // 清除画布
    ctx.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight)

    // 雪碧图的尺寸
    const spriteCount = 5
    const spriteX = 0
    let spriteY = 0
    const spriteWidth = this.image.width
    const spriteHeight = this.image.height / spriteCount

    // 要绘制的位置
    const drawX = this.disLeft + this.disWidth / 2 - spriteWidth / 2
    const drawY = this.disTop + this.disHeight / 2 - spriteHeight / 2
    const drawWidth = spriteWidth
    const drawHeight = spriteHeight

    // 计算当前帧的位置
    const frame = Array.from({ length: spriteCount }, (_, index) => index * spriteHeight)
    const currentFrameIndex = frame.findIndex(
      (value, index, array) => percent > index / array.length && percent <= (index + 1) / array.length,
    )
    spriteY = frame[currentFrameIndex !== -1 ? currentFrameIndex : 0]
    const currentFrame = frame[currentFrameIndex !== -1 ? currentFrameIndex : 0]

    // 在画布上绘制当前帧
    ctx.drawImage(
      this.image,
      spriteX,
      currentFrame,
      spriteWidth,
      spriteHeight,

      drawX,
      drawY,
      drawWidth,
      drawHeight,
    )
  }
}
