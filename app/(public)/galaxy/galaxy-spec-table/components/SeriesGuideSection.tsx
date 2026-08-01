import Link from 'next/link'
import type { GalaxyModel } from '@/lib/types'

type Props = {
  models: GalaxyModel[]
  /** model_id → 中古平均価格。掲載機種の価格帯表示に使う */
  prices?: Record<number, number | null>
}

type SeriesDef = {
  key: GalaxyModel['series']
  label: string
  icon: string
  catch: string
  desc: string
  points: string[]
}

/** Galaxy のシリーズ定義（S / A / Z Flip / Z Fold）。DBの series 値と対応 */
const SERIES: SeriesDef[] = [
  {
    key: 'S',
    label: 'Sシリーズ',
    icon: 'fa-solid fa-crown',
    catch: '性能重視のフラッグシップ',
    desc:
      '毎年春に登場する最上位モデル。最新のSnapdragonを搭載し、カメラ・画面・処理性能すべてが最高クラスです。上位の「Ultra」はSペン内蔵・望遠カメラ強化で、写真や動画も本格的に撮りたい人向け。',
    points: ['最新の高性能チップ', '望遠カメラ搭載（Ultra）', '中古でも値落ちしにくい'],
  },
  {
    key: 'A',
    label: 'Aシリーズ',
    icon: 'fa-solid fa-wallet',
    catch: 'コスパ重視のミドル・エントリー',
    desc:
      '普段使い中心の人向けの価格重視モデル。処理性能はSシリーズに譲りますが、大容量バッテリー・おサイフケータイ・防水など日本で必要な機能はしっかり押さえています。中古なら特に狙い目の価格帯です。',
    points: ['本体価格が安い', '電池持ちが良い', 'SDカード対応モデルあり'],
  },
  {
    key: 'Z Flip',
    label: 'Z Flipシリーズ',
    icon: 'fa-solid fa-mobile-screen',
    catch: '縦折りでコンパクト',
    desc:
      'パカッと縦に折りたためる二つ折りモデル。畳めば手のひらサイズになり、ポケットやバッグに収まります。開けば普通のスマホと同じ大画面。カバー画面だけで通知確認や自撮りもできます。',
    points: ['畳むと手のひらサイズ', '自撮りしやすい', 'デザイン性が高い'],
  },
  {
    key: 'Z Fold',
    label: 'Z Foldシリーズ',
    icon: 'fa-solid fa-book-open',
    catch: '横開きでタブレット級',
    desc:
      '開くとタブレットのような大画面になる横開きモデル。動画視聴や電子書籍、2つのアプリを並べた作業に強く、スマホとタブレットを1台にまとめたい人向けです。Galaxyの中では最も高価な最上位クラス。',
    points: ['開けば約8インチの大画面', '2画面で同時作業', '価格は最上位'],
  },
]

const yen = (n: number) => `¥${Math.round(n).toLocaleString()}`

export default function SeriesGuideSection({ models, prices = {} }: Props) {
  // 掲載中の機種からシリーズごとの実数・価格帯を算出（データが増減しても自動追従）
  const stats = SERIES.map((s) => {
    const list = models.filter((m) => m.series === s.key)
    const priced = list.map((m) => prices[m.id]).filter((p): p is number => p != null && p > 0)
    return {
      ...s,
      count: list.length,
      min: priced.length ? Math.min(...priced) : null,
      max: priced.length ? Math.max(...priced) : null,
    }
  }).filter((s) => s.count > 0)

  if (stats.length === 0) return null

  return (
    <section className="l-section" id="series-guide" aria-labelledby="heading-series-guide">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-series-guide">
          GalaxyのS・A・Z｜シリーズの違いをかんたん解説
        </h2>
        <p className="m-section-desc">
          Galaxyは大きく4つのシリーズに分かれています。<br />
          まずは自分に合うシリーズを絞ってから、下のスペック表で機種を比べるのがおすすめです。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {stats.map((s) => (
            <div key={s.label} className="m-card m-card--shadow m-card--padded">
              <p style={{ margin: 0, fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>
                <i className={s.icon} aria-hidden="true"></i> {s.label}
                <span style={{ marginLeft: 8, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {s.catch}
                </span>
              </p>
              <p style={{ margin: 'var(--space-xs) 0 0', lineHeight: 1.8 }}>{s.desc}</p>
              <ul className="u-list-reset" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs) var(--space-md)', marginTop: 'var(--space-sm)' }}>
                {s.points.map((p) => (
                  <li key={p} className="m-stat-card__note">
                    <i className="fa-solid fa-check" aria-hidden="true"></i> {p}
                  </li>
                ))}
              </ul>
              <p className="m-stat-card__note" style={{ marginTop: 'var(--space-sm)' }}>
                掲載 {s.count}機種
                {s.min != null && s.max != null && (
                  <> ／ 中古 {yen(s.min)}〜{yen(s.max)}</>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            迷ったら、性能重視なら<strong>S</strong>、価格重視なら<strong>A</strong>、持ち運びやすさなら<strong>Z Flip</strong>、大画面なら<strong>Z Fold</strong>が目安です。
            価格の目安は「<Link prefetch={false} href="/galaxy/price-info/">中古Galaxyの相場</Link>」もあわせてご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
