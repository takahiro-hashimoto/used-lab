import Link from 'next/link'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { calculateOSLifespan, calculatePriceRange } from '@/lib/utils/iphone-helpers'

type Props = {
  model: IPhoneModel
  latestPrice: IPhonePriceLog | null
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

  // スペックサマリーを動的に構築
  const specs: string[] = []
  if (model.cpu) specs.push(model.cpu)
  if (model.size) specs.push(model.size)
  if (model.weight) specs.push(model.weight)
  if (model.apple_intelligence) specs.push('Apple Intelligence対応')

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
              ? <>iOSサポートは<strong>{osLife.osEndYear}年頃</strong>までの見込み。</>
              : <>iOSサポートは終了済みのため、セキュリティ面に注意が必要です。</>
            }
            今から買うべきか判断できるよう、スペック・ベンチマーク・カメラ性能・バッテリー・中古価格の情報をまとめました。
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            情報を網羅的に得たい方は「<Link href="/iphone">中古iPhone購入完全ガイド</Link>」も参考にしてみてください！
          </p>
        </div>
      </div>
    </section>
  )
}
