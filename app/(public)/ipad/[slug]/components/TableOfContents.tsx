import AuthorByline from '@/app/components/AuthorByline'
const TOC_ITEMS = [
  { id: 'buy-now', label: '今から買うのはあり？' },
  { id: 'shops', label: 'おすすめ購入サイト' },
  { id: 'lifespan', label: 'いつまで使える？' },
  { id: 'price-trend', label: '中古価格相場の推移' },
  { id: 'upgrade', label: '前機種から進化した点' },
  { id: 'compare', label: 'スペック比較' },
  { id: 'geekbench', label: 'GeekBench ベンチマーク' },
  { id: 'antutu', label: 'Antutu ベンチマーク' },
  { id: 'accessories', label: '対応アクセサリー' },
  { id: 'popular', label: '目的別の人気機種' },
  { id: 'faq', label: 'よくある質問' },
]

export default function TableOfContents() {
  return (
    <nav className="l-section l-section--no-pt" aria-label="目次">
      <div className="l-container">
        <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
        <ol className="l-grid l-grid--3col u-list-reset">
          {TOC_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="toc-item">
                {item.label}{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ol>
</div>
        <AuthorByline />
      </div>
    </nav>
  )
}
