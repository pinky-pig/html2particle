const EaseIn = (power: number) => (t: number) => t ** power
const EaseOut = (power: number) => (t: number) => 1 - Math.abs((t - 1) ** power)
const EaseInOut = (power: any) => (t: number) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5

function genNormalizedVal() {
  return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)) / 3
}

export const Particle = function (this: any) {
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
