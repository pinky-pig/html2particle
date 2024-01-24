# 开始

**html2particle** 是一个复制 DOM 元素为 canvas 粒子效果的库。

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

## Usage Example

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
