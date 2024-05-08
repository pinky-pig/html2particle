# 开始

**html2particle** 是一个复制 DOM 元素为 canvas 粒子效果的库。预设两种粒子动画效果，支持传入自定义粒子类效果。

## 安装

纯 TS 开发，依赖于 [html2canvas](https://www.npmjs.com/package/html2canvas) 将 DOM 转为 canvas 。
核心代码只有200多行，不到 7kb 。不过由于依赖了 `html2canvas` ，压缩后的代码有 200+ kb。

::: code-group

```sh [npm]
$ npm i html2particle
```

```sh [pnpm]
$ pnpm add html2particle
```

```sh [yarn]
$ yarn add html2particle
```

```sh [bun]
$ bun add html2particle
```
:::

## Usage

简单的从 html2particle 导出方法就行，传入 DOM ，会返回一个 `startAnimation` 方法，调用该方法即可开始动画。

```vue{10,11,12}
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import html2particle from 'html2particle'

const containerRef = ref<HTMLElement>()

let handleClick = () => {}
const isShow = ref(true)
onMounted(() => {
  const { startAnimation } = html2particle(containerRef.value!, {
    type: 'Particle',
  })
  handleClick = () => {
    isShow.value = false
    startAnimation()
  }
})
</script>

<template>
  <div ref="containerRef" class="container" @click="handleClick">
    <img v-show="isShow" src="/default.webp" alt="">
  </div>
</template>

<style scoped>
.container{
  width: 888px;
  height: 592px;
  cursor: pointer;
}
img{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
```

## 自定义

首先是有 TS类型限制，所以自定义的时候会有些许帮助。

这里有个自定义的示例如下：

<iframe height="300" style="width: 100%;" scrolling="no" title="html2particle CustomParticle" src="https://codepen.io/pinky-pig/embed/bGZoaQa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pinky-pig/pen/bGZoaQa">
  html2particle CustomParticle</a> by pinky-pig (<a href="https://codepen.io/pinky-pig">@pinky-pig</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


```ts
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
```
