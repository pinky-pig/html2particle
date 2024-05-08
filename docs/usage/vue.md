# Vue

> stackblitz 预览：<https://stackblitz.com/edit/vitejs-vite-cjksfh?file=src%2FApp.vue>  
> Demo 代码：<https://github.com/pinky-pig/html2particle/tree/main/playground/vue>

主要就是两点，一传入 DOM ， 二调用 `startAnimation`。
具体代码可以看 GitHub 上的示例。

```vue{9,20}
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import html2particle from 'html2particle'

const item4Ref = ref<HTMLElement>()
let handleItem4Click = () => { }
const isShow4 = ref(true)
function initItem4Event() {
  const { startAnimation } = html2particle(item4Ref.value!, { type: 'ExplodingParticle' })
  handleItem4Click = () => {
    isShow4.value = false
    startAnimation()
  }
}

const item5Ref = ref<HTMLElement>()
let handleItem5Click = () => { }
const isShow5 = ref(true)
function initItem5Event() {
  const { startAnimation } = html2particle(item5Ref.value!, { type: 'SinWaveParticle' })
  handleItem5Click = () => {
    isShow5.value = false
    startAnimation()
  }
}

onMounted(() => {
  initItem4Event()
  initItem5Event()
})
</script>

<template>
  <div class="container">
    <div ref="item4Ref" class="image" @click="handleItem4Click">
      <img v-if="isShow4" src="/1.jpg" alt="">
    </div>

    <div ref="item5Ref" class="image" @click="handleItem5Click">
      <img v-if="isShow5" src="/2.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  user-select: none;
  display: flex;
  flex-direction: row;
}

.image {
  width: 300px;
  height: 200px;
  cursor: pointer;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  outline: 2px solid #887cc8;
  outline-offset: 2px;
}
</style>

```
