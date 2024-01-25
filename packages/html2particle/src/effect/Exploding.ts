export const ExplodingParticle = function (this: any) {
  this.name = 'ExplodingParticle'
  this.animationDuration = 1000 // in ms

  /********************************************************/
  /*                 x方向匀速运动                          */
  /*                 y方向匀加速运动                        */
  /********************************************************/

  this.speed = {
    x: Math.random() * 30 - 15, // [-20, 20]
    y: Math.random() * 40 - 20,
    ax: 0,
    ay: 0.98,
  }

  this.radius = 5 + Math.random() * 5

  this.draw = (ctx: CanvasRenderingContext2D, percent: number) => {
    // 这里是每帧刷一次，所以里面的操作根据 percent 比较好，不然太快了（省事直接 speed / 10 算了）

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
