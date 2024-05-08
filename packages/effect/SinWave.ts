import type { IParticleInstance } from '../types'

const EaseIn = (power: number) => (t: number) => t ** power
const EaseOut = (power: number) => (t: number) => 1 - Math.abs((t - 1) ** power)
const EaseInOut = (power: any) => (t: number) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5

function genNormalizedVal() {
  return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
}

export class SinWaveParticle implements IParticleInstance {
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
  widthScaler: number
  disParticleGap: number
  numWaves: number
  xPosFunc: (t: number) => number
  heightScaler: number
  yPosFunc: (t: any) => any
  startSize: number
  sizeFunc: (t: number) => number
  opacityFactor: number
  opacityFunc: (t: any) => number

  constructor(
    { rgbaArray, startX, startY, index, disWidth, disHeight, disTop, disLeft, disParticleGap }: IParticleInstance,
  ) {
    this.name = 'SinWaveParticle'
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

    this.widthScaler = Math.round(50 * genNormalizedVal()) // Normalized val between -50 and 50
    this.numWaves = (genNormalizedVal() + 1 / 2) * 2 + 1
    this.xPosFunc = (t: number) => Math.sin(this.numWaves * Math.PI * t)

    this.heightScaler = Math.round(65 * (genNormalizedVal() + 1) / 2) + 10 // Normalized val between 10 and 75
    this.yPosFunc = (t: any) => t

    this.startSize = 10
    this.sizeFunc = (t: number) => 1 - t

    this.opacityFactor = Math.round(((genNormalizedVal() + 1) / 2) * 3 + 1)
    this.opacityFunc = (t: any) => 1 - EaseInOut(this.opacityFactor)(t)
  }

  draw(ctx: CanvasRenderingContext2D, percent: number): void {
    percent = percent >= 1 ? 1 : percent

    const currX = this.startX + this.xPosFunc(percent) * this.widthScaler
    const currY = this.startY - this.yPosFunc(percent) * this.heightScaler
    const currSize = this.startSize * this.sizeFunc(percent)
    const _currOpacity = this.opacityFunc(percent)

    ctx.fillStyle = `rgba(${this.rgbaArray[0]},${this.rgbaArray[1]},${this.rgbaArray[2]},${this.rgbaArray[3]})`
    ctx.fillRect(currX - currSize / 2, currY - currSize / 2, currSize, currSize)
  }
}
