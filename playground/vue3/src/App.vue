<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import html2particle from 'html2particle'
import html2particle from '../../../packages/html2particle/src/index'
// import { CustomParticle } from './customParticle'
import { PoofEffect } from './PoofEffect'

const item1Ref = ref<HTMLElement>()
let handleItem1Click = () => { }
const isShow1 = ref(true)
function initItem1Event() {
  const { startAnimation } = html2particle(item1Ref.value!, { type: 'PoofParticle', particleGap: 40 })
  handleItem1Click = async () => {
    isShow1.value = false

    if (item1Ref.value) {
      const animation = item1Ref.value.animate(
        [
          { transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.3)' },
        ],
        {
          duration: 500,
          easing: 'linear',
          fill: 'forwards',
        },
      )

      // Promise.all([animation].map(animation => animation.finished)).then(
      //   () => {
      //     startAnimation()
      //   },
      // )

      setTimeout(() => {
        startAnimation()
      }, getRandomInt(0, 100))

      function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
      }
    }
  }
}

const item2Ref = ref<HTMLElement>()
let handleItem2Click = () => { }
const isShow2 = ref(true)
function initItem2Event() {
  const { startAnimation } = html2particle(item2Ref.value!, {
    type: 'CustomParticle',
    particleGap: 40,
    customParticle: PoofEffect,
    // customParticle: CustomParticle,
  })
  handleItem2Click = () => {
    isShow2.value = false
    startAnimation()
  }
}

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
  initItem1Event()
  initItem2Event()
  initItem3Event()
  initItem4Event()
  initItem5Event()
})
</script>

<template>
  <div class="container">
    <div ref="item1Ref" class="text" @click="handleItem1Click">
      <span>Hello world!</span>
    </div>

    <div ref="item2Ref" class="emoji" @click="handleItem2Click">
      <span v-show="isShow2">🍑</span>
    </div>

    <div ref="item3Ref" class="emoji" @click="handleItem3Click">
      <span>🥰</span>
    </div>

    <div ref="item4Ref" class="image" @click="handleItem4Click">
      <img src="/1.jpg" alt="">
    </div>

    <div ref="item5Ref" class="image" @click="handleItem5Click">
      <img src="/2.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  gap: 20px;
  row-gap: 50px;
  align-items: center;
  user-select: none;
}

@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr !important;
  }
  .text{
    grid-column: span 1 !important;
  }
}
.text {
  --text-color: #887cc8;
  grid-column: span 2;
  font-family: 'Cherry Bomb One', cursive;
  font-size: 90px;
  position: relative;
  cursor: pointer;
  color: var(--text-color);
  -webkit-text-stroke: 6px #fff;
  z-index: 1;
  margin: 0 auto;
}

.text::before {
  content: 'Hello world!';
  position: absolute;
  color: transparent;
  -webkit-text-stroke: 40px var(--text-color);
  z-index: -1;
  top: 0;
  left: 0;
}

.image {
  width: 300px;
  height: 200px;
  cursor: pointer;
  margin: 0 auto;
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

.emoji {
  width: 300px;
  height: 180px;
  font-size: 120px;
  margin: 0 auto;
  cursor: pointer;
}
</style>
