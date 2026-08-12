// advance データが無い機種ではセクションごと描画されないため、目次にも出さない
const UPGRADE_ITEM = { id: 'upgrade', label: '前機種から進化した点' }

const BASE_ITEMS = [
  { id: 'buy-now', label: '今から買うのはあり？' },
  { id: 'shops', label: 'おすすめ購入サイト' },
  { id: 'lifespan', label: 'いつまで使える？' },
  { id: 'price-trend', label: '中古価格相場の推移' },
  { id: 'compare', label: 'スペック比較' },
  { id: 'geekbench', label: 'GeekBench ベンチマーク' },
  { id: 'antutu', label: 'Antutu ベンチマーク' },
]

const REVIEW_ITEM = { id: 'reviews', label: '口コミ・評判' }
// 近い価格帯の機種が見つからない場合はセクションごと出ないため、目次にも出さない
const SIMILAR_ITEM = { id: 'similar-price', label: '同じ予算で狙える他機種' }

type Props = {
  hasUpgrade?: boolean
  hasReviews: boolean
  hasSimilarPrice?: boolean
}

export default function TableOfContents({ hasUpgrade = true,hasReviews, hasSimilarPrice = false }: Props) {
  // AFTER_ITEMSを削除し、BASE_ITEMSとREVIEW_ITEMのみで構成
  const base = hasSimilarPrice
    ? BASE_ITEMS.flatMap((item) => (item.id === 'price-trend' ? [item, SIMILAR_ITEM] : [item]))
    : BASE_ITEMS
  const withUpgrade = hasUpgrade
      ? base.flatMap((item) => (item.id === 'price-trend' ? [item, UPGRADE_ITEM] : [item]))
      : base
    const items = hasReviews ? [...withUpgrade, REVIEW_ITEM] : [...withUpgrade]

  return (
    <>
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
      </div>
    </nav>
    </>
  )
}