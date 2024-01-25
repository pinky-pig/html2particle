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
    this.radius = 2
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
      ctx.beginPath()
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.rgbaArray[0]},${this.rgbaArray[1]},${this.rgbaArray[2]}, ${this.rgbaArray[3]})`
      ctx.fill()

      this.startX += this.speed.x / 10
      this.startY = this.startY + this.yPosFunc(percent) * this.heightScaler / 10 + this.speed.y / 10
    }
  }
}
