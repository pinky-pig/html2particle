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

function handleShowImg() {
  isShow4.value = true
  isShow5.value = true
}
</script>

<template>
  <div class="btn" @click="handleShowImg">
    Show
  </div>
  <div class="container">
    <div ref="item4Ref" class="image" @click="handleItem4Click">
      <img v-show="isShow4" src="https://source.unsplash.com/random/800x450" alt="">
    </div>

    <div ref="item5Ref" class="image" @click="handleItem5Click">
      <img v-show="isShow5" src="https://source.unsplash.com/random/1600x900" alt="">
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 100px;
  height: 38px;
  background: #ffffff;
  margin-bottom: 40px;
  border-radius: 10px;
  color: black;
  mix-blend-mode: difference;
  font-size: 20px;
  line-height: 38px;
  text-align: center;
  user-select: none;
  transition: all 0.3s ease-in-out;
  outline: 2px solid #000;
  outline-offset: 2px;
  cursor: pointer;
}
.btn:hover {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

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
