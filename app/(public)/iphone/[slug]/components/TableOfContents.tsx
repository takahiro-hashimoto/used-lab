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

const REVIEW_ITEM = { id: 'reviews', label: '口コミ・評判' }

type Props = {
  hasReviews: boolean
}

export default function TableOfContents({ hasReviews }: Props) {
  // AFTER_ITEMSを削除し、BASE_ITEMSとREVIEW_ITEMのみで構成
  const items = hasReviews
    ? [...BASE_ITEMS, REVIEW_ITEM]
    : [...BASE_ITEMS]

  return (
    <nav className="l-section l-section--no-pt" aria-label="目次">
      <div className="l-container">
        <div className="toc-wrapper">
          <p className="toc-title">
            <i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次
          </p>
          {/* AFTER_ITEMSがなくなったことで全体の件数が減るため、
            レイアウトに合わせて 'l-grid--4col' などのクラスは適宜調整してください。
          */}
          <ol className={`l-grid ${hasReviews ? 'l-grid--3col' : 'l-grid--3col'} u-list-reset`}>
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