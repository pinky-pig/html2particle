

<div align="center">
	<h1 style="margin:10px">html2particles</h1>
	<h6 align="center">Component based in Vue3</h6>
</div>


# 🌸 Get Started

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesdrag.gif"  height="300">
</p>

使用 html2particles 开发的示例。   
演示地址： [Demo - Vercel](https://dragblock.mmeme.me/)  
仓库地址： [Demo -Github](https://github.com/pinky-pig/what-is-html2particles)

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

## 🍄 Usage Steps

```bash
npm i html2particles
```

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

## ⚡ Configurations

这里展示一些组件的配置，包括设置 拖拽、缩放、吸附功能是否开启，以及一些事件方法。

```vue
<template>
  <V3Dragblock
    class="V3Dragblock"
    :grid-cells="gridCells"
    :draggable="true"
    :resizable="true"
    :adsorbable="true"
    :adsorb-line-style="adsorbLineStyle"
    @dragging="print('dragging', $event)"
    @drag-start="print('drag-start', $event)"
    @drag-end="save('drag-end', $event)"
    @resizing="print('resizing', $event)"
    @resize-start="print('resize-start', $event)"
    @resize-end="save('resize-end', $event)"
  />
</template>
```

### 🍔 `class="V3Dragblock"`

盒子的类名，用于比如设置拖拽盒子的尺寸或是一些其他 style 样式。子元素位置是在这个盒子内部的，不能超过这个尺寸。

### 🍔 `:activated="true"`

是否激活功能，这里其实就是监听 `activated` 添加或删除鼠标监听事件。

### 🍕 `:grid-cells="gridCells"`

> 需要用 `ref` 包着，具有响应性。

传入要拖拽的组件数组，要具有以下格式：

```js
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
```

| 字段 | 作用 |
| :---: | :--: |
|  id  |   唯一标识  |
|  index  |   层级，两个元素重叠的层级  |
|  x |   离盒子的左边距离  |
|  y |    离盒子的上边距离  |
|  width |   元素的宽度  |
|  height |  元素的高度  |
|  component |  自定义的组件  |


### 🍟 `:draggable="true" | :resizable="true" | :adsorbable="true"`

| Props | 作用 | 默认|
| :---: | :--: |:--: |
|  draggable  |   拖拽  |true  ( 启用 ) |
|  resizable  |   缩放  |true  ( 启用 ) |
|  adsorbable |   吸附  |true  ( 启用 ) |

### 🍿 `:adsorb-line-style="adsorbLineStyle"`

开启吸附功能的时候，吸附线的样式

```js
const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}
```

### 🍳 `@dragging | @resizing | @drag-start | @resize-start| @drag-end|@resize-end`

| handles | 作用 | 返回值|
| :---: | :--: |:--: |
|  @dragging  |   正在拖拽  | 当前对象 |
|  @resizing  |   正在缩放  | 当前对象 |
|  @drag-start |   拖拽开始  | 当前对象 |
|  @resize-start |   缩放开始  | 当前对象 |
|  @drag-end |   拖拽结束  | 所有对象的信息 |
|  @resize-end |   缩放结束  | 所有对象的信息 |
 

