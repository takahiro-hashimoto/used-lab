import Link from 'next/link'
import type { WatchModel, WatchPriceLog } from '@/lib/types'
import { calculateOSLifespan, calculatePriceRange } from '@/lib/utils/watch-helpers'

type Props = {
  model: WatchModel
  latestPrice: WatchPriceLog | null
}

function formatDate(date: string | null): string {
  if (!date) return ''
  const parts = date.split('/')
  if (parts.length >= 2) {
    return `${parts[0]}年${parts[1]}月`
  }
  return date
}

export default function LeadText({ model, latestPrice }: Props) {
  const releaseDateFormatted = formatDate(model.date)
  const priceRange = calculatePriceRange(latestPrice)
  const osLife = calculateOSLifespan(model.date)

  const specs: string[] = []
  if (model.size) specs.push(model.size)
  if (model.always_on_display) specs.push('常時表示')
  if (model.blood_oxygen) specs.push('血中酸素')
  if (model.cardiogram) specs.push('心電図')

  return (
    <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
      <div className="l-container">
        <div className="lead-box">
          <p>
            {releaseDateFormatted ? `${releaseDateFormatted}に発売された` : ''}
            {model.model}
            {specs.length > 0 && `（${specs.join('／')}）`}。
            {priceRange.minPrice && (
              <>中古相場は<strong>¥{priceRange.minPrice.toLocaleString()}〜</strong>。</>
            )}
          </p>
          <p>
            {osLife.isSupported
              ? <>watchOSサポートは<strong>{osLife.osEndYear}年頃</strong>までの見込み。</>
              : <>watchOSサポートは終了済みのため、セキュリティ面に注意が必要です。</>
            }
            今から買うべきか判断できるよう、スペック・健康機能・中古価格の情報をまとめました。
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            もっと全体像から知りたい方は「<Link href="/watch">中古Apple Watch購入ガイド</Link>」をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
