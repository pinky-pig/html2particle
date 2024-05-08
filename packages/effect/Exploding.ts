import type { IParticleInstance } from '../types'

export class ExplodingParticle implements IParticleInstance {
  name: string
  animationDuration: number
  speed: { x: number, y: number, ax: number, ay: number }
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

  constructor(
    { rgbaArray, startX, startY, index, disWidth, disHeight, disTop, disLeft, disParticleGap }: IParticleInstance,
  ) {
    this.name = 'ExplodingParticle'
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
      y: Math.random() * 40 - 20,
      ax: 0,
      ay: 0.98,
    }

    this.radius = 5 + Math.random() * 5
  }

  draw(ctx: CanvasRenderingContext2D, _percent: number): void {
    if (this.radius > 0) {
      ctx.beginPath()
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.rgbaArray[0]},${this.rgbaArray[1]},${this.rgbaArray[2]}, ${this.rgbaArray[3]})`
      ctx.fill()

      this.radius -= 0.1
      this.speed.y += this.speed.ay / 3

      this.startX += this.speed.x / 10
      this.startY += this.speed.y / 10
    }
  }
}
