import type { PriceHistogram as Histogram } from '@/lib/utils/price-stats'

type Props = {
  histogram: Histogram
  modelName: string
  /** 総件数（見出しの補足に使う） */
  total: number
  /** 集計日（"YYYY-MM-DD"）。価格推移と違い、この日1日分のスナップショットであることを示す */
  date: string | null
}

function yen(value: number): string {
  return `¥${value.toLocaleString()}`
}

/** "2026-07-30" → "2026年7月30日" */
function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number)
  if (!y || !m || !d) return date
  return `${y}年${m}月${d}日`
}

/**
 * 販売中の商品の価格分布を横棒で示す。
 *
 * 価格推移グラフが「時間軸での動き」を示すのに対し、こちらは「今この瞬間、
 * どの価格帯に何件あるか」を示す。相場の中央値だけでは分からない
 * 「その価格帯にどれだけ選択肢があるか」が読み取れる。
 *
 * チャートライブラリは使わない。棒の長さは件数の比率をそのまま width にすれば足り、
 * このためだけにJSを読み込ませる必要がないため。
 */
export default function PriceHistogram({ histogram, modelName, total, date }: Props) {
  const { buckets, below, above, maxCount } = histogram

  return (
    <div className="price-histogram">
      <ul className="price-histogram__list" aria-label={`中古${modelName}の価格分布`}>
        {below > 0 && (
          <li className="price-histogram__row price-histogram__row--outlier">
            <span className="price-histogram__label">{yen(buckets[0].from)}未満</span>
            <span className="price-histogram__track">
              <span className="price-histogram__bar" style={{ width: `${(below / maxCount) * 100}%` }} />
            </span>
            <span className="price-histogram__count">{below}件</span>
          </li>
        )}

        {buckets.map((b) => (
          <li
            key={b.from}
            className={`price-histogram__row${b.isPeak ? ' is-peak' : ''}`}
          >
            <span className="price-histogram__label">
              {yen(b.from)}〜
            </span>
            <span className="price-histogram__track">
              <span
                className="price-histogram__bar"
                style={{ width: `${(b.count / maxCount) * 100}%` }}
              />
            </span>
            <span className="price-histogram__count">{b.count}件</span>
          </li>
        ))}

        {above > 0 && (
          <li className="price-histogram__row price-histogram__row--outlier">
            <span className="price-histogram__label">
              {yen(buckets[buckets.length - 1].to)}以上
            </span>
            <span className="price-histogram__track">
              <span className="price-histogram__bar" style={{ width: `${(above / maxCount) * 100}%` }} />
            </span>
            <span className="price-histogram__count">{above}件</span>
          </li>
        )}
      </ul>
      {/* 価格推移グラフが期間の集計なのに対し、こちらは1日分のスナップショット。
          いつ・何件を集計したのかと、日々変わることを図の下にまとめて添える */}
      <p className="price-histogram__note">
        {date ? `${formatDate(date)}時点 ／ ` : ''}販売中の{total}件
        {'　'}※在庫は日々入れ替わるため、この分布は日ごとに変化します
      </p>
    </div>
  )
}
