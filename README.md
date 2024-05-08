<div align="center">
	<h1 style="margin:10px">html2particle</h1>
	<h6 align="center">
    Made by Arvin
  </h6>
</div>

# 🌸 Get Started

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imageshtml2particleNew.gif" alt="html2particle" height="300">
</p>

演示地址： [Demo](https://html2particle.mmeme.me/)
仓库地址： [Github](https://github.com/pinky-pig/html2particle)

## 🎉 Introduce

html2particle 是一个将 HTML 转为 canvas 粒子动画的一个库。逻辑很简单，代码小几百行，结构很清晰。使用了一个依赖库 [html2canvas](https://www.npmjs.com/package/html2canvas) 。

## 🏄‍♂️ Feature

- TS 开发 Vite 打包。
- 返回开始触发动画和是否运动状态。
- 支持传入粒子运动类型和粒子尺寸，提功了两种粒子效果，支持自定义开发。

## 👊 Todo

- [ ] 增加粒子效果
- [ ] 支持自定义粒子动画效果

## 🍄 Usage Steps

```bash
npm i html2particle
```

```vue
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
.container {
  width: 888px;
  height: 592px;
  cursor: pointer;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
```

## ⚡ Configurations

### 🍳 变量

|        变量        |               类型                |     作用     |
| :----------------: | :-------------------------------: | :----------: |
|         el         |            HTMLElement            |   绑定 DOM   |
|    option.type     | 'Particle' \| 'ExplodingParticle' | 粒子动画类型 |
| option.particleize |              number               |   粒子尺寸   |

### 🍟 返回

|      变量      |  类型   |   作用   |
| :------------: | :-----: | :------: |
| startAnimation | boolean | 开始运动 |
