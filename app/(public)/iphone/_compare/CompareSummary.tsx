/**
 * 2機種サマリーセクション（画像・価格・主要スペックを左右に並列表示）
 */

import Image from 'next/image'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import type { RelatedLinkMeta } from '@/lib/data/related-links'
import { calcAvgPriceRange } from './helpers'
import { calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import s from './CompareSummary.module.css'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  priceL: IPhonePriceLog | null
  priceR: IPhonePriceLog | null
  /** セクション見出しのテキスト */
  heading?: string
  /** イオシスURL */
  iosysUrlL?: string | null
  iosysUrlR?: string | null
  /** 2機種比較関連リンク */
  compareLinks?: RelatedLinkMeta[]
}

/** モデルの主要スペックをラベル・値ペアで返す */
function getKeySpecs(model: IPhoneModel): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = []
  if (model.cpu) specs.push({ label: 'チップ', value: model.cpu })
  if (model.display) specs.push({ label: '画面', value: model.display })
  if (model.image_sensor) specs.push({ label: 'カメラ', value: model.image_sensor })
  if (model.battery) specs.push({ label: 'バッテリー', value: model.battery })
  const osLife = calculateOSLifespan(model.date, model.last_ios)
  if (osLife.osEndYear > 0) specs.push({ label: 'iOS', value: `${osLife.osEndYear}年頃まで` })
  return specs
}

/** 2機種を比較して各モデルの「こんな人におすすめ」を動的生成 */
function getRecommendFor(
  model: IPhoneModel,
  other: IPhoneModel,
  myPrice: number | null,
  otherPrice: number | null,
): string[] {
  const recs: string[] = []

  // 価格が安い方 → コスパ
  if (myPrice != null && otherPrice != null && myPrice < otherPrice) {
    const diff = otherPrice - myPrice
    recs.push(`コスパ重視の方（約¥${diff.toLocaleString()}安い）`)
  }

  // カメラ機能が豊富な方
  const cameraScore = (m: IPhoneModel) =>
    [m.apple_proraw, m.apple_prores, m.lidar, m.macro_mode, m.cinematic_mode, m.night_mode].filter(Boolean).length
  if (cameraScore(model) > cameraScore(other)) {
    recs.push('カメラにこだわりたい方')
  }

  // ベンチマークスコアが高い方
  const singleL = model.score_single || 0
  const singleR = other.score_single || 0
  if (singleL > singleR && singleL - singleR > 100) {
    recs.push('ゲームや動画編集などの高負荷用途に')
  }

  // バッテリー容量
  const batL = parseInt(String(model.battery || '0').replace(/,/g, ''), 10) || 0
  const batR = parseInt(String(other.battery || '0').replace(/,/g, ''), 10) || 0
  if (batL > batR && batL - batR >= 100) {
    recs.push('バッテリー持ちを重視する方')
  }

  // 軽さ
  const wL = parseFloat(String(model.weight || '0')) || 0
  const wR = parseFloat(String(other.weight || '0')) || 0
  if (wL > 0 && wR > 0 && wL < wR && wR - wL >= 5) {
    recs.push('軽さ・携帯性を重視する方')
  }

  // Apple Intelligence
  if (model.apple_intelligence && !other.apple_intelligence) {
    recs.push('Apple Intelligence（AI機能）を使いたい方')
  }

  // ProMotion（120Hz）
  if (model.promotion && !other.promotion) {
    recs.push('なめらかな画面表示（ProMotion）にこだわる方')
  }

  // 価格が高い方だけどメリットが少ない場合のフォールバック
  if (recs.length === 0) {
    recs.push('普段使いやSNS・動画視聴がメインの方')
  }

  return recs
}

export default function CompareSummary({ modelL, modelR, priceL, priceR, heading, iosysUrlL, iosysUrlR, compareLinks }: Props) {
  const rangeL = calcAvgPriceRange(priceL)
  const rangeR = calcAvgPriceRange(priceR)
  const recsL = getRecommendFor(modelL, modelR, rangeL.avg, rangeR.avg)
  const recsR = getRecommendFor(modelR, modelL, rangeR.avg, rangeL.avg)

  return (
    <section className="l-section" id="summary" aria-labelledby="heading-summary">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
          {heading || '今回比較する2機種のiPhone'}
        </h2>
        <p className="m-section-desc">
          主要スペックと中古相場をまとめました。詳細は各セクションをご覧ください。
        </p>

        <div className="compare-summary">
          <SummaryCol
            model={modelL}
            priceRange={rangeL}
            specs={getKeySpecs(modelL)}
            recommends={recsL}
            iosysUrl={iosysUrlL}
          />
          <SummaryCol
            model={modelR}
            priceRange={rangeR}
            specs={getKeySpecs(modelR)}
            recommends={recsR}
            iosysUrl={iosysUrlR}
          />
        </div>

        {compareLinks && compareLinks.length > 0 && (
          <div className="u-mt-2xl">
            <h3 className="m-section-heading m-section-heading--md u-mb-md" style={{ textAlign: 'left' }}>
              2機種比較
            </h3>
            <div className="l-grid l-grid--2col l-grid--gap-lg">
              {compareLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="m-card m-card--shadow m-card--hoverable"
                  style={{ padding: 'var(--space-md) var(--space-lg)', display: 'block', textDecoration: 'none' }}
                >
                  <p className="related-link-card__title">{item.title}</p>
                  <p className="related-link-card__desc">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function SummaryCol({ model, priceRange, specs, recommends, iosysUrl }: {
  model: IPhoneModel
  priceRange: { min: number | null; max: number | null; avg: number | null }
  specs: { label: string; value: string }[]
  recommends: string[]
  iosysUrl?: string | null
}) {
  return (
    <div className={`compare-summary__col ${s.col}`}>
      <div className={`compare-summary__img ${s.img}`}>
        {model.image && (
          <Image
            src={`/images/iphone/${model.image}`}
            alt={model.model}
            width={180}
            height={180}
            loading="lazy"
          />
        )}
      </div>
      <p className={`compare-summary__name ${s.name}`}>{model.model}</p>

      {priceRange.avg != null && (
        <div className={`compare-summary__price ${s.price}`}>
          <div className="compare-summary__price-main">
            <span className="compare-summary__price-label">中古相場（税込）</span>
            <span className="compare-summary__price-value">
              &yen;{priceRange.avg?.toLocaleString()}〜
            </span>
          </div>
          <span className="compare-summary__price-range">
            最安値 &yen;{priceRange.min?.toLocaleString()} 〜 最高値 &yen;{priceRange.max?.toLocaleString()}
          </span>
        </div>
      )}

      {/* 主要スペック＋こんな人におすすめ */}
      <div className={s.infoBlock}>
        {specs.length > 0 && (
          <>
            <p className={s.infoTitle}>主要スペック</p>
            <table className={s.specTable}>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={i}>
                    <th className={s.specLabel}>{spec.label}</th>
                    <td className={s.specValue}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {recommends.length > 0 && (
          <>
            <hr className={s.divider} />
            <p className={s.recTitle}>
              <i className={`fa-solid fa-user-check ${s.recIcon}`} aria-hidden="true"></i>
              こんな人におすすめ
            </p>
            <ul className={s.recList}>
              {recommends.map((rec, i) => (
                <li key={i} className={s.recItem}>・{rec}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {iosysUrl && (
        <div className={s.shopLink}>
          <a
            href={iosysUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="m-btn m-btn--primary m-btn--block"
          >
            イオシスで{model.model}を見る
          </a>
        </div>
      )}
    </div>
  )
}
