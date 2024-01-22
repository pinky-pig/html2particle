<script setup lang="ts">
import { onMounted, ref } from 'vue'
import html2particles from '../../packages/html2particles/src'

const containerRef = ref<HTMLElement>()

let handleClick = () => {}
const isShow = ref(true)
onMounted(() => {
  const { startAnimation } = html2particles(containerRef.value!, {
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
