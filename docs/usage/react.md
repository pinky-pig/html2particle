# React

> Demo 代码：<https://github.com/pinky-pig/html2particle/tree/main/playground/react>

主要就是两点，一传入 DOM ， 二调用 `startAnimation`。
这里有个例子，具体代码可以看 GitHub 上的示例。

```jsx
import { useEffect, useRef, useState } from 'react'
import './App.css'
import html2particle from 'html2particle'

function App() {
  /** 第一张图片 */
  const item4Ref = useRef(null)
  const [isShow4, setIsShow4] = useState(true)
  const [handleItem4Click, setHandleItem4Click] = useState(() => () => {})
  useEffect(() => {
    const { startAnimation } = html2particle(item4Ref.current, { type: 'ExplodingParticle' })
    setHandleItem4Click(() => () => {
      setIsShow4(false)
      startAnimation()
    })
  }, [item4Ref.current])

  /** 第二张图片 */
  const item5Ref = useRef(null)
  const [isShow5, setIsShow5] = useState(true)
  const [handleItem5Click, setHandleItem5Click] = useState(() => () => {})
  useEffect(() => {
    const { startAnimation } = html2particle(item5Ref.current, { type: 'SinWaveParticle' })
    setHandleItem5Click(() => () => {
      setIsShow5(false)
      startAnimation()
    })
  }, [item5Ref.current])

  /** 按钮 */
  function handleShowImg() {
    setIsShow4(true)
    setIsShow5(true)
  }

  return (
    <div className="App">
      <div className="btn" onClick={handleShowImg}>
        Show
      </div>
      <div className="container">
        <div ref={item4Ref} className="image" onClick={handleItem4Click}>
          <img
            style={{ display: isShow4 ? 'block' : 'none' }}
            src="/1.jpg"
            alt=""
          />
        </div>

        <div ref={item5Ref} className="image" onClick={handleItem5Click}>
          <img
            style={{ display: isShow5 ? 'block' : 'none' }}
            src="/2.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default App

```


```css

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-height: 100vh;
}

.btn{
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
.btn:hover{
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.container {
  align-items: center;
  user-select: none;
  display: flex;
  flex-direction: row;
  gap:20px;
  flex-wrap: wrap;
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

```
