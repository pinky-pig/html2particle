import { useEffect, useRef, useState } from 'react'
import './App.css'
import html2particle from '../../../packages/html2particle/src/index'

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
