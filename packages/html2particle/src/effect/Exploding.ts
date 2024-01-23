export const ExplodingParticle = function (this: any) {
  this.name = 'ExplodingParticle'
  this.animationDuration = 3000 // in ms

  /********************************************************/
  /*                 x方向匀速运动                          */
  /*                 y方向匀加速运动                        */
  /********************************************************/

  this.speed = {
    x: Math.random() * 40 - 20, // [-20, 20]
    y: Math.random() * 40 - 20,
    ax: 0,
    ay: 0.98,
  }

  this.radius = 5 + Math.random() * 5
  this.life = 30 + Math.random() * 10
  this.remainingLife = this.life

  this.draw = (ctx: CanvasRenderingContext2D, percent: number) => {
    if (this.remainingLife > 0
    && this.radius > 0) {
      ctx.beginPath()
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]}, 1)`
      ctx.fill()
      this.remainingLife--
      // this.radius -= 0.25

      this.radius = 1

      this.speed.y += this.speed.ay

      this.startX += this.speed.x
      this.startY += this.speed.y
    }
  }
}
