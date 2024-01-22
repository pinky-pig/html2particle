<script setup lang="ts">
import { onMounted, ref } from 'vue'
import html2particles from '../../packages/html2particles/src'

const containerRef = ref<HTMLElement>()

let handleClick = () => {}
onMounted(() => {
  const { startAnimation } = html2particles(containerRef.value!, {
    type: 'Particle',
  })
  handleClick = startAnimation
})
</script>

<template>
  <div ref="containerRef" class="container" @click="handleClick">
    <img src="/default.webp" alt="">
  </div>
</template>

<style scoped>
.container{
  width: 300px;
  height: 300px;
  cursor: pointer;
}
img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
