# HTML

> Demo 代码：<https://github.com/pinky-pig/html2particle/tree/main/playground/html>

<iframe height="300" style="width: 100%;" scrolling="no" title="html2canvas" src="https://codepen.io/pinky-pig/embed/jOJGGoO?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pinky-pig/pen/jOJGGoO">
  html2canvas</a> by pinky-pig (<a href="https://codepen.io/pinky-pig">@pinky-pig</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>html2particle</title>

  <style>
    :root {
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }

    body {
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
    }

    #app {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

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
      gap: 20px;
      flex-wrap: wrap;
    }

    .emoji {
      width: 300px;
      height: 180px;
      font-size: 120px;
      margin: 0 auto;
      cursor: pointer;
    }
  </style>

</head>

<body>
  <div id="app">
    <div id="btn" class="btn"> Show </div>
    <div class="container">

      <div id="item4Ref" class="emoji">
        <span>🍑</span>
      </div>

      <div id="item5Ref" class="emoji">
        <span>🥰</span>
      </div>

    </div>
  </div>

  <script>
    const item4Ref = document.getElementById('item4Ref')
    function initItem4Event() {
      // eslint-disable-next-line no-undef
      const { startAnimation } = html2particle.html2particle(item4Ref, { type: 'ExplodingParticle' })
      item4Ref.onclick = () => {
        item4Ref.firstElementChild.style.display = 'none'
        startAnimation()
      }
    }
    initItem4Event()

    /** 第二张图片 */
    const item5Ref = document.getElementById('item5Ref')
    function initItem5Event() {
      // eslint-disable-next-line no-undef
      const { startAnimation } = html2particle.html2particle(item5Ref, { type: 'SinWaveParticle' })
      item5Ref.onclick = () => {
        item5Ref.firstElementChild.style.display = 'none'
        startAnimation()
      }
    }
    initItem5Event()

    /** 按钮 */
    const btn = document.getElementById('btn')
    btn.onclick = () => {
      item4Ref.firstElementChild.style.display = 'unset'
      item5Ref.firstElementChild.style.display = 'unset'
    }
  </script>

</body>

</html>

```
