
<script setup>
import V3DragblockDemo from './demo.vue'
</script>

# Get Started

<br> 
<V3DragblockDemo />

::: tip
使用 html2particles 开发的示例。   
Versel 演示地址： [Demo - Vercel](https://v3-drag.vercel.app/)  
Github 代码地址： [Demo -Github](https://github.com/pinky-pig/what-is-drag-resize-attached-card)
:::

## 🎉 Introduce

html2particles 是一个基于 Vue3 的拖拽组件，支持拖拽移动、缩放、吸附功能。目前初始版本暂时只支持 Vue3 版本，而且具有很多优化空间。

## 🏄‍♂️ Feature

- 可配置 draggable 、 resizable 、 adsorbable
- 可传入 draggable 和 resizable 的 start 和 end 事件
- 可配置吸附线 adsorbline 的样式， 及吸附误差范围


## 👊 Todo

- [ ] 简化组织代码
- [ ] 按需打包 VueUse 的依赖
- [ ] 适配 Vue2 
- [ ] 适配 React 


## ⚡ Installation

```bash
npm i html2particles
```

## 🍄 Usage Steps

如果已经经过 `npm i html2particles`，那么下面就开始使用。
仅仅只需要，在需要的组件中 `import V3Dragblock from 'html2particles'` 后，定义子项组件传入 `V3Dragblock` 后就可以使用。
当然需要通过 `CSS` 设置拖拽画布的大小。如果有不太理解的可以参考上面的 [Demo Github](https://github.com/pinky-pig/what-is-drag-resize-attached-card)


```vue
<script setup lang="ts">
import V3Dragblock from 'html2particles'
import GridCellOne from '../components/GridCellOne.vue'
import GridCellTwo from '../components/GridCellTwo.vue'
import GridCellThree from '../components/GridCellThree.vue'
import GridCellFour from '../components/GridCellFour.vue'

const gridCells = ref([
  { id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) },
  { id: '1', index: 0, x: 550, y: 95, width: 240, height: 240, component: markRaw(GridCellTwo) },
  { id: '2', index: 0, x: 377, y: 457, width: 305, height: 70, component: markRaw(GridCellThree) },
  { id: '3', index: 0, x: 180, y: 30, width: 130, height: 145, component: markRaw(GridCellFour) },
])
</script>

<template>
  <V3Dragblock
    class="V3Dragblock"
    :grid-cells="gridCells"
  />
</template>

<style scoped>
.V3Dragblock{
  background: #f7f4f0;
  width: 75vw;
  height: 75vh;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
</style>
```
