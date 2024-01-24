---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "html2particle"
  text: "DOM To Particle"
  tagline: "将HTML转换为Particle"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/get-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/pinky-pig/html2particle
    - theme: alt
      text: View on NPM
      link: https://www.npmjs.com/package/html2particle

features:
  - title: 💥 爆炸粒子
    details: DOM 转为粒子四周爆炸后自由落地运动
  - title: 🎈 气泡粒子
    details: 水平方向正弦波动，竖直方向匀速向上运动至消失
  - title: ✨ Todo - 自定义
    details: 支持自定义动画
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
