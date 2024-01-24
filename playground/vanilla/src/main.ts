import html2particle from '../../../packages/html2particle/src/index'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="btn" class="btn" > Show </div>
    <div class="container">
      <div id="item4Ref" class="image" >
        <img src="/1.jpg" alt="" />
      </div>

      <div id="item5Ref" class="image" >
        <img src="/2.jpg" alt="" />
      </div>
    </div>
  </div>
`

/** 第一张图片 */
const item4Ref = document.getElementById('item4Ref') as HTMLElement
function initItem4Event() {
  const { startAnimation } = html2particle(item4Ref, { type: 'ExplodingParticle' })
  item4Ref.onclick = () => {
    (item4Ref.firstElementChild as HTMLElement).style.display = 'none'
    startAnimation()
  }
}
initItem4Event()

/** 第二张图片 */
const item5Ref = document.getElementById('item5Ref') as HTMLElement
function initItem5Event() {
  const { startAnimation } = html2particle(item5Ref, { type: 'SinWaveParticle' })
  item5Ref.onclick = () => {
    (item5Ref.firstElementChild as HTMLElement).style.display = 'none'
    startAnimation()
  }
}
initItem5Event()

/** 按钮 */
const btn = document.getElementById('btn') as HTMLElement
btn.onclick = () => {
  (item4Ref.firstElementChild as HTMLElement).style.display = 'unset';
  (item5Ref.firstElementChild as HTMLElement).style.display = 'unset'
}
