// accessories はコンポーネント自体を一時停止中（Amazonアソシエイト対応）。
// page.tsx の <Accessories /> を復活させるときに、この項目も戻すこと。
const TOC_ITEMS = [
  { id: 'buy-now', label: '今から買うのはあり？' },
  { id: 'shops', label: 'おすすめ購入サイト' },
  { id: 'lifespan', label: 'いつまで使える？' },
  { id: 'specs', label: '基本スペック' },
  { id: 'price-trend', label: '中古価格相場の推移' },
  { id: 'upgrade', label: '前機種から進化した点' },
  { id: 'compare', label: 'スペック比較' },
]

type Props = {
  /**
   * 描画されないセクションの id。目次は静的なリストなので、
   * データが無くてセクションごと消える機種では、この指定が無いと
   * ジャンプできないリンクだけが残る。
   */
  omitIds?: string[]
}

export default function TableOfContents({ omitIds = [] }: Props) {
  const items = TOC_ITEMS.filter((item) => !omitIds.includes(item.id))
  return (
    <>
    <nav className="l-section l-section--no-pt" aria-label="目次">
      <div className="l-container">
        <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
        <ol className="l-grid l-grid--3col u-list-reset">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="toc-item">
                {item.label}{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ol>
</div>
      </div>
    </nav>
    </>
  )
}
