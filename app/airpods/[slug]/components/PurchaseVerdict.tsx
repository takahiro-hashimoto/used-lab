import type { AirPodsModel } from '@/lib/types'
import { getVerdict, calculateFirmwareLifespan } from '@/lib/utils/airpods-helpers'

type Props = {
  model: AirPodsModel
}

const SUIT_ICONS: Record<string, string> = {
  headphones: 'fa-solid fa-headphones',
  'calendar-check': 'fa-solid fa-calendar-check',
  'yen-sign': 'fa-solid fa-yen-sign',
  'boxes-stacked': 'fa-solid fa-boxes-stacked',
  'volume-xmark': 'fa-solid fa-volume-xmark',
  cube: 'fa-solid fa-cube',
}

function getRatingClass(mark: string): string {
  if (mark === '◎') return 'm-rating__icon--excellent'
  if (mark === '◯') return 'm-rating__icon--good'
  return 'm-rating__icon--fair'
}

function getRatingEntity(mark: string): string {
  if (mark === '◎') return '\u25CE' // ◎
  if (mark === '◯') return '\u25CB' // ○
  return '\u25B3' // △
}

export default function PurchaseVerdict({ model }: Props) {
  const v = getVerdict(model)
  const fwLife = calculateFirmwareLifespan(model.date)

  return (
    <section className="l-section l-section--bg-subtle" id="buy-now" aria-labelledby="heading-buy-now">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-buy-now">
          中古{model.name}（{model.model}）を今買うのはあり？
        </h2>
        <p className="m-section-desc">
          サポート寿命、搭載チップの世代から導き出した「失敗しないための結論」です。
        </p>

        <div className="m-card conclusion-card">
          {/* ヘッダー：見出し＋ラベル */}
          <div className={`conclusion-header conclusion-header--${v.rank}`}>
            <h3 className="conclusion-headline">{v.verdictMain}</h3>
            <span className="m-badge m-badge--translucent">
              <i className="fa-solid fa-star" aria-hidden="true"></i> {v.statusLabel}
            </span>
          </div>

          {/* 結論テキスト */}
          <div className="conclusion-body">
            {v.descriptions.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* 評価マトリックス */}
          <dl className="l-grid l-grid--3col">
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> 発売からの経過
              </dt>
              <dd className="m-rating__value">{v.yearsPassed}年</dd>
            </div>
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-code-branch" aria-hidden="true"></i> サポート期間 推定
              </dt>
              <dd className="m-rating__value">
                {fwLife.isSupported ? `残り${v.remainingYears}年` : '終了'}
              </dd>
            </div>
            <div className="m-rating">
              <dt className="m-rating__label">
                <i className="fa-solid fa-microchip" aria-hidden="true"></i> 搭載チップ
              </dt>
              <dd className="m-rating__value">{model.chip || '-'}</dd>
            </div>

            {v.suitability.map((item) => (
              <div key={item.label} className="m-rating">
                <dt className="m-rating__label">
                  <i className={SUIT_ICONS[item.icon] || 'fa-solid fa-circle'} aria-hidden="true"></i>{' '}
                  {item.label}
                </dt>
                <dd className={`m-rating__icon ${getRatingClass(item.mark)}`}>
                  {getRatingEntity(item.mark)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
