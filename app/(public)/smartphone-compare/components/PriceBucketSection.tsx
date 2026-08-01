import {
  PRICE_BUCKETS,
  buildBucketRanking,
  topByAntutu,
  yen,
  type NormalizedPhone,
  type RankedPhone,
} from '../lib'
import { PhoneActions, PhoneImage, PhoneName, PhoneSpecs, PriceRow, SupportTag } from './phone-card-parts'

function RankedCard({ entry }: { entry: RankedPhone }) {
  const { phone, rank } = entry

  return (
    <article className="m-card m-card--shadow ifd-result-card">
      <div className="ifd-result-card__header">
        <div className="ifd-result-card__img-wrap">
          {/* 順位は見出しの「おすすめTOP3」と並び順で伝わるので、支援技術には読ませない */}
          <span className="ifd-result-card__rank" aria-hidden="true">{rank}</span>
          <PhoneImage phone={phone} size={80} />
        </div>
        <div className="ifd-result-card__info">
          <PhoneName phone={phone} />
          {/* ブランド名は機種名（"Samsung Galaxy S26" 等）に含まれるためタグでは出さない */}
          <div className="ifd-result-card__tags">
            <SupportTag phone={phone} />
          </div>
        </div>
      </div>

      <div className="ifd-result-card__body">
        <PriceRow phone={phone} />
        <PhoneSpecs phone={phone} withAntutu />
      </div>

      <PhoneActions phone={phone} />
    </article>
  )
}

/**
 * 価格帯ごとの「狙い目」を実データから生成。
 * 最高性能・クロスブランドの性能差＆価格差・コスパ・最安をその時点の相場から組み立てるため、
 * 価格が動けば内容も自動で切り替わる。
 */
function bucketVerdict(inBucket: NormalizedPhone[]): string[] {
  const priced = inBucket.filter((p) => p.price > 0)
  if (priced.length === 0) return ['この価格帯の在庫が揃うと、ブランド横断のねらい目を表示します。']

  const cheapest = priced.reduce((a, b) => (b.price < a.price ? b : a))
  const withPerf = priced.filter((p) => p.antutuTotal != null)
  const topPerf = withPerf.length
    ? withPerf.reduce((a, b) => ((b.antutuTotal ?? 0) > (a.antutuTotal ?? 0) ? b : a))
    : null
  const bestValue = withPerf.length
    ? withPerf.reduce((a, b) => ((b.antutuTotal ?? 0) / b.price > (a.antutuTotal ?? 0) / a.price ? b : a))
    : null
  const topApple = topByAntutu(priced.filter((p) => p.brand === 'iphone'))
  const topAndroid = topByAntutu(priced.filter((p) => p.brand !== 'iphone'))

  const s: string[] = []

  // 1) 最高性能（価格つき）
  if (topPerf?.antutuTotal != null) {
    s.push(`処理性能が最も高いのは${topPerf.name}（AnTuTu ${topPerf.antutuTotal.toLocaleString()}・${yen(topPerf.price)}〜）。`)
  }

  // 2) クロスブランドの妙味（性能差＋価格差）
  if (topApple?.antutuTotal != null && topAndroid?.antutuTotal != null) {
    if (topAndroid.antutuTotal > topApple.antutuTotal) {
      const diff = Math.round(((topAndroid.antutuTotal - topApple.antutuTotal) / topApple.antutuTotal) * 100)
      const cheaper = topApple.price - topAndroid.price
      s.push(
        `同じ予算でも${topAndroid.brandLabel}「${topAndroid.name}」は${topApple.name}よりAnTuTuで約${diff}%上` +
          (cheaper > 0 ? `、しかも${yen(cheaper)}安い。` : '。') +
          `処理性能を取るならAndroid、iPhoneは値落ちの緩やかさ（リセール）で選ぶ価格帯です。`,
      )
    } else {
      const diff = Math.round(((topApple.antutuTotal - topAndroid.antutuTotal) / topAndroid.antutuTotal) * 100)
      s.push(
        `性能では${topApple.name}がAndroidトップより約${diff}%上。iPhoneは中古でも値崩れしにくく、下取り・売却まで含めた実質コストで有利です。`,
      )
    }
  } else if (topAndroid && !topApple) {
    s.push(`iPhoneの中古在庫はまだ薄く、${topAndroid.brandLabel}「${topAndroid.name}」など型落ちAndroidが実質のねらい目です。`)
  } else if (topApple && !topAndroid) {
    s.push(`iPhone中心の価格帯。長く使えてリセールも堅い「${topApple.name}」が有力です。`)
  }

  // 3) コスパ / 最安
  if (bestValue && cheapest) {
    if (bestValue.slug === cheapest.slug) {
      s.push(`とにかく安く1台なら${cheapest.name}（${yen(cheapest.price)}〜）が本命。`)
    } else {
      s.push(`価格あたり性能（コスパ）は${bestValue.name}、最安は${cheapest.name}（${yen(cheapest.price)}〜）です。`)
    }
  }

  return s
}

/** 各帯で上位何台までランキングにするか */
const RANK_LIMIT = 3

export default function PriceBucketSection({ phones }: { phones: NormalizedPhone[] }) {
  const activeBuckets = PRICE_BUCKETS.map((bucket) => {
    const inBucket = phones.filter((p) => p.price >= bucket.min && p.price <= bucket.max)
    return { bucket, inBucket, ranked: buildBucketRanking(inBucket, RANK_LIMIT) }
  }).filter((b) => b.ranked.length > 0)

  if (activeBuckets.length === 0) return null

  return (
    <section className="l-section" id="by-price" aria-labelledby="heading-by-price">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-by-price">
          価格帯別ランキング｜同じ中古予算で狙える機種
        </h2>
        <p className="m-section-desc">
          中古相場の実データをもとに、3万円刻みの5つの価格帯に分けておすすめ機種を並べました。
        </p>
        <p className="m-section-desc">
          順位は<strong>その予算で買えるAnTuTu総合スコアの高い順</strong>です。
        </p>

        {activeBuckets.map(({ bucket, inBucket, ranked }, i) => (
          <div key={bucket.key} style={{ marginTop: i === 0 ? 'var(--space-2xl)' : 'var(--space-3xl)' }}>
            <h3
              className="m-section-heading m-section-heading--md"
              id={`bucket-${bucket.key}`}
              style={{ textAlign: 'left', margin: 0 }}
            >
              {bucket.label}の中古スマホ おすすめTOP{ranked.length}
              <span className="m-stat-card__note" style={{ marginLeft: 8, fontWeight: 400 }}>
                {bucket.hint}
              </span>
            </h3>
            <div className="ifd-results-grid" style={{ marginTop: 'var(--space-lg)' }}>
              {ranked.map((entry) => (
                <RankedCard key={`${entry.phone.brand}-${entry.phone.slug}`} entry={entry} />
              ))}
            </div>

            {/* 各機種の詳細を見たあとに読む内容なので、カードの下に置く */}
            <div className="m-callout m-callout--tip u-mt-2xl">
              <span className="m-callout__label">この価格帯の見どころ</span>
              {bucketVerdict(inBucket).map((line, j) => (
                <p key={j} className="m-callout__text" style={{ margin: j === 0 ? 0 : 'var(--space-sm) 0 0' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
