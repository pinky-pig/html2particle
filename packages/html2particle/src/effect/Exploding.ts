export const ExplodingParticle = function (this: any) {
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
