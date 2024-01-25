import type { IParticleInstance } from '../../../packages/html2particle/src/index'

function genNormalizedVal() {
  return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
}
export class CustomParticle implements IParticleInstance {
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
  yPosFunc: (t: any) => any
  heightScaler: number

  constructor() {
    this.name = 'ExplodingParticle'
    this.animationDuration = 1000
    this.speed = {
      x: Math.random() * 20 - 10, // [-20, 20]
      y: Math.random() * 20 - 10,
      ax: 0,
      ay: 0.98,
    }
    this.radius = 10
    this.startX = 0
    this.startY = Math.random() * 40 - 20
    this.rgbaArray = [0, 0, 0, 0]
    this.disWidth = 0
    this.disHeight = 0
    this.disLeft = 0
    this.disTop = 0

    this.heightScaler = Math.round(65 * (genNormalizedVal() + 1) / 2) + 10
    this.yPosFunc = (t: any) => t
  }

  draw(ctx: CanvasRenderingContext2D, percent: number): void {
    if (this.radius > 0) {
      if (this.rgbaArray[3] !== 0)
        this.drawEmojiHeart(ctx, this.startX, this.startY, '🍑', this.radius)

      this.startX += this.speed.x / 10
      this.startY = this.startY + this.yPosFunc(percent) * this.heightScaler / 10 + this.speed.y / 10
    }
  }

  /**
   * 绘制 Emoji
   * @param ctx 图层
   * @param centerX 位置 X
   * @param centerY 位置 Y
   * @param emoji emoji
   * @param size 大小
   */
  drawEmojiHeart(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, emoji: string, size: number) {
    ctx.font = `${size}px serif`
    ctx.fillText(emoji, centerX - size / 2, centerY + size / 4)
  }

  /**
   * 绘制五角星
   * @param ctx 图层
   * @param centerX 位置 X
   * @param centerY 位置 Y
   * @param radius 大小
   * @param rgbaArray 颜色
   */
  drawFivePointedStar(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, rgbaArray: number[]) {
    ctx.beginPath()
    const points = 5
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2
      const distance = i % 2 === 0 ? radius : (radius * 2) / 3 // 判断奇偶，奇数为外角点，偶数为内角点
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      ctx.lineTo(x, y)
    }

    ctx.closePath()
    ctx.fillStyle = `rgba(${rgbaArray[0]},${rgbaArray[1]},${rgbaArray[2]}, ${rgbaArray[3]})`
    ctx.fill()
  }
}
