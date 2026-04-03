import AuthorByline from '@/app/components/AuthorByline'
const BASE_ITEMS = [
  { id: 'buy-now', label: '今から買うのはあり？' },
  { id: 'shops', label: 'おすすめ購入サイト' },
  { id: 'lifespan', label: 'いつまで使える？' },
  { id: 'price-trend', label: '中古価格相場の推移' },
  { id: 'upgrade', label: '前機種から進化した点' },
  { id: 'compare', label: 'スペック比較' },
  { id: 'geekbench', label: 'GeekBench ベンチマーク' },
  { id: 'antutu', label: 'Antutu ベンチマーク' },
]

const AFTER_ITEMS = [
  { id: 'popular', label: '目的別の人気機種' },
  { id: 'faq', label: 'よくある質問' },
  { id: 'related', label: '関連記事' },
]

const REVIEW_ITEM = { id: 'reviews', label: '口コミ・評判' }

type Props = {
  hasReviews: boolean
}

export default function TableOfContents({ hasReviews }: Props) {
  const items = hasReviews
    ? [...BASE_ITEMS, REVIEW_ITEM, ...AFTER_ITEMS]
    : [...BASE_ITEMS, ...AFTER_ITEMS]
  return (
    <nav className="l-section l-section--no-pt" aria-label="目次">
      <div className="l-container">
        <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
        <ol className={`l-grid ${hasReviews ? 'l-grid--4col' : 'l-grid--3col'} u-list-reset`}>
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
        <AuthorByline />
      </div>
    </nav>
  )
}
