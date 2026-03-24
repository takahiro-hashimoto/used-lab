import type { IPadModel, IPadPriceLog } from '@/lib/types'
import {
  getVerdict,
} from '@/lib/utils/ipad-helpers'

type Props = {
  model: IPadModel
  latestPrice: IPadPriceLog | null
}

const SUIT_ICONS: Record<string, string> = {
  gamepad: 'fa-solid fa-gamepad',
  smartphone: 'fa-solid fa-mobile-screen',
  calendar: 'fa-solid fa-calendar-check',
  box: 'fa-solid fa-store',
  yen: 'fa-solid fa-yen-sign',
  pencil: 'fa-solid fa-pen-nib',
}

import RatingMark from '@/app/components/RatingMark'

export default function PurchaseVerdict({ model, latestPrice }: Props) {
  const v = getVerdict(model, latestPrice)

  return (
    <section className="l-section" id="buy-now" aria-labelledby="heading-buy-now">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-buy-now">
          中古{model.model}を今買うのはあり？
        </h2>
        <p className="m-section-desc">
          ベンチマーク性能、サポート寿命、最新相場から導き出した「失敗しないための結論」です。
        </p>

        <div className="m-card conclusion-card">
          {/* ヘッダー：見出し＋ラベル */}
          <div className={`conclusion-header conclusion-header--${v.rank}`}>
            <p className="conclusion-headline">{v.verdictMain}</p>
            <span className="m-badge m-badge--translucent">
              <i className="fa-solid fa-star" aria-hidden="true"></i> {v.statusLabel}
            </span>
          </div>

          {/* 結論テキスト */}
          <div className="conclusion-body m-rich-text">
            {v.descriptions.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* 評価マトリックス */}
          <dl className="l-grid l-grid--3col">
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-microchip" aria-hidden="true"></i> 性能・最新比
              </dt>
              <dd className="m-rating__value">{v.performanceRatio}%</dd>
            </div>
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-code-branch" aria-hidden="true"></i> OS寿命 推定
              </dt>
              <dd className="m-rating__value">残り{v.remainingYears}年</dd>
            </div>
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-yen-sign" aria-hidden="true"></i> 実質年単価
              </dt>
              <dd className="m-rating__value">
                {v.annualCost != null ? `¥${v.annualCost.toLocaleString()}` : '-'}
              </dd>
            </div>

            {v.suitability.map((item) => (
              <div key={item.label} className="m-rating">
                <dt className="m-rating__label">
                  <i className={SUIT_ICONS[item.icon] || 'fa-solid fa-circle'} aria-hidden="true"></i>{' '}
                  {item.label}
                </dt>
                <dd className="m-rating__icon">
                  <RatingMark mark={item.mark} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
