import Link from 'next/link'
import type { MacModel, MacPriceLog } from '@/lib/types'
import { calculateOSLifespan, calculatePriceRange } from '@/lib/utils/macbook-helpers'

type Props = {
  model: MacModel
  latestPrice: MacPriceLog | null
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
  const osLife = calculateOSLifespan(model.date, model.last_macos)

  return (
    <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
      <div className="l-container">
        <div className="lead-box">
          <p>
            「中古の{model.model}って、今から買っても大丈夫？」この記事では、そんな疑問を解消するために中古価格の推移やベンチマーク、搭載チップの性能など<strong>購入判断に必要な情報</strong>をまとめました。
          </p>
          <p>
            {releaseDateFormatted && `${releaseDateFormatted}発売の${model.model}は`}
            {(priceRange.realisticMinPrice ?? priceRange.minPrice) && (
              // 「〜から手に入る」は下限の話。生の最安値だと1点限りの特価を指してしまうため、
              // 実際に見つかる水準（下位10%点）を使う
              <>中古<strong>¥{(priceRange.realisticMinPrice ?? priceRange.minPrice)!.toLocaleString()}〜</strong>で手に入り、</>
            )}
            {osLife.isSupported
              ? <>macOSサポートも<strong>{osLife.osEndYear}年頃</strong>まで続く見込みのため、コスパよく長く使える一台です。</>
              : <>ただしmacOSサポートは終了済みのため、セキュリティ面には注意が必要です。</>
            }
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            機種選びから始めたい方は「<Link prefetch={false} href="/mac/">中古Mac購入ガイド</Link>」もどうぞ。
          </p>
        </div>
      </div>
    </section>
  )
}
