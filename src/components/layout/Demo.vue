<script setup lang="ts">
import html2particle from '../../../packages'
// import html2particle from '../../../output-lib/html2particle.es.js'

const item3Ref = ref<HTMLElement>()
let handleItem3Click = () => { }
const isShow3 = ref(true)
function initItem3Event() {
  const { startAnimation } = html2particle(item3Ref.value!, { type: 'SinWaveParticle' })
  handleItem3Click = () => {
    isShow3.value = false
    startAnimation()
  }
}

onMounted(() => {
  initItem3Event()
})
</script>

<template>
  <br>
  <br>
  <h2>Demo</h2>

  <div ref="item3Ref" class="text-[108px] w-fit h-fit" @click="handleItem3Click">
    <span>🥰</span>
  </div>
</template>
