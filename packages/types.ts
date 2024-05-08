export interface IParticle {
  /** 当前粒子的序号 */
  index: number
  /** 粒子的初始大小 */
  disParticleGap: number
  /** 会传给自定义类的值：粒子的 X 值 */
  startX: number
  /** 会传给自定义类的值：粒子的 Y 值 */
  startY: number
  /** 会传给自定义类的值：粒子的 RGBA */
  rgbaArray: Uint8ClampedArray
  /** 会传给自定义类的值：DOM的 Width */
  disWidth: number
  /** 会传给自定义类的值：DOM的 Height */
  disHeight: number
  /** 会传给自定义类的值：DOM的 Left */
  disLeft: number
  /** 会传给自定义类的值：DOM的 TOP */
  disTop: number
}
export interface IParticleInstance extends IParticle {
  /** 渲染动画的持续时间 */
  animationDuration: number
  /** 渲染所需的绘制方法 */
  draw: (ctx: CanvasRenderingContext2D, percent: number) => void
  [key: string]: any
}

export interface IOptions {
  type: 'SinWaveParticle' | 'ExplodingParticle' | 'PoofParticle' | 'CustomParticle'
  particleGap?: number
  customParticle?: new (...args: any[]) => IParticleInstance
}

export interface Html2particleReturn {
  isAnimating: boolean
  startAnimation: () => void
}

export interface IDisplayObj {
  el: HTMLElement
  width: number
  height: number
  top: number
  left: number
  particleType: IOptions['type']
  particleGap: number
  particleObj: {
    startTime: number
    myParticles: any[]
  }
  animationDuration: number
  canvas?: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D
  scrnCanvas?: HTMLCanvasElement
  scrnCtx?: CanvasRenderingContext2D
}
