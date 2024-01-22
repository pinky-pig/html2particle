export const ExplodingParticle = function (this: any) {
  this.name = 'ExplodingParticle'
  this.animationDuration = 1000 // in ms

  /********************************************************/
  /*                 y 方向                                */
  /*    自由落体就是匀加速运动 就是速度每次增加相同的值           */
  /*    那么定义其加速度 每次给速度加上就好了                   */
  /*    在这里体现为 因为 l = v * t                          */
  /* 而 v 可以定义， t 也是固定的是 requestAnimation 的间隔时间 */
  /* 加速度设置为 0.98 模拟重力加速度，这样每次给 y 值增加就好了   */
  /********************************************************/

  this.gravity = 0.98
  this.speed = {
    x: 0,
    y: 5,
  }

  /********************************************************/
  /*                 x方向                                 */
  /*       匀速运动。左侧减去，中间随机，右侧加上                */
  /********************************************************/

  this.radius = 5 + Math.random() * 5
  this.life = 30 + Math.random() * 10
  this.remainingLife = this.life

  /** 计算在 X 轴上的 */
  function determineParticleOffsetX(startX: number, width: number) {
    const centerX = width / 2
    const offsetX = startX - centerX
    return offsetX
  }

  this.draw = (ctx: CanvasRenderingContext2D, percent: number) => {
    if (this.remainingLife > 0
    && this.radius > 0) {
      ctx.beginPath()
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]}, 1)`
      ctx.fill()
      this.remainingLife--
      // this.radius -= 0.25

      this.speed.y += this.gravity

      this.radius = 1

      const offsetX = determineParticleOffsetX(this.startX, this.disWidth)
      this.speed.x = offsetX * 0.1

      this.startX += this.speed.x

      this.startY += this.speed.y
    }
  }
}
