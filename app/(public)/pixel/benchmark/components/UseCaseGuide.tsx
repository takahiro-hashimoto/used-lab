import Link from 'next/link'
import type { PixelBenchModel } from './BenchmarkRanking'
import type { ProductShopLink } from '@/lib/types'
import { getIosysUrl } from '@/lib/utils/benchmark-helpers'

/**
 * 推奨スコアの根拠:
 * Geekbench 6 / AnTuTu v11 の実測値を参照し、
 * 各用途で快適に動作するGoogle Tensor世代の目安を下限として設定。
 *
 * - SNS/Web: Tensor（初代）相当 (Single ~1,000 / Multi ~2,900) で十分
 * - 写真・カメラAI: Tensor G2 相当 (Single ~1,050 / Multi ~3,200) が目安
 * - ゲーム（一般）: Tensor G3 相当 (Single ~1,700 / Multi ~4,400 / AnTuTu ~1,000,000) が快適ライン
 * - 動画・編集マジック: Tensor G3 Pro 相当 (Single ~1,750 / Multi ~4,600 / AnTuTu ~1,050,000) 推奨
 * - ヘビーゲーム: Tensor G4 相当 (Single ~1,900 / Multi ~4,600 / AnTuTu ~1,200,000) 推奨
 */
type PixelUseCase = {
  icon: string
  title: string
  description: string
  singleMin: number
  multiMin: number
  antutuMin: number | null
}

const USE_CASES: PixelUseCase[] = [
  {
    icon: 'fa-comment-dots',
    title: 'SNS・Web閲覧',
    description: 'LINE、X、Instagram、Web閲覧がメイン',
    singleMin: 1000,
    multiMin: 2900,
    antutuMin: null,
  },
  {
    icon: 'fa-camera',
    title: 'カメラ・写真AI',
    description: '夜景モードや消しゴムマジックなどカメラ重視',
    singleMin: 1050,
    multiMin: 3200,
    antutuMin: null,
  },
  {
    icon: 'fa-gamepad',
    title: 'ゲーム（一般）',
    description: '原神、FPSなどの3Dゲームを快適に',
    singleMin: 1700,
    multiMin: 4400,
    antutuMin: 1000000,
  },
  {
    icon: 'fa-wand-magic-sparkles',
    title: '動画・編集マジック',
    description: '4K撮影や編集マジック・動画ブースト',
    singleMin: 1750,
    multiMin: 4600,
    antutuMin: 1050000,
  },
  {
    icon: 'fa-vr-cardboard',
    title: 'ヘビーゲーム',
    description: '最新3Dゲームを高画質で快適に',
    singleMin: 1900,
    multiMin: 4600,
    antutuMin: 1200000,
  },
]

/** 推奨スコアを満たすモデルの中から最もコスパの良いモデルを返す */
function findBestMatch(models: PixelBenchModel[], uc: PixelUseCase): PixelBenchModel | null {
  const candidates = models.filter((m) => {
    if (m.score_single < uc.singleMin) return false
    if (m.score_multi < uc.multiMin) return false
    if (uc.antutuMin && (m.antutu_total == null || m.antutu_total < uc.antutuMin)) return false
    return true
  })

  if (candidates.length === 0) return null

  const withPrice = candidates.filter((m) => m.minPrice != null)
  if (withPrice.length > 0) {
    return withPrice.sort((a, b) => (a.minPrice || Infinity) - (b.minPrice || Infinity))[0]
  }
  return candidates.sort((a, b) => (a.score_single + a.score_multi) - (b.score_single + b.score_multi))[0]
}

type Props = {
  models: PixelBenchModel[]
  shopLinks: ProductShopLink[]
}

export default function UseCaseGuide({ models, shopLinks }: Props) {
  return (
    <section className="l-section" id="usecase" aria-labelledby="heading-usecase">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-usecase">
          用途別おすすめスコアの目安
        </h2>
        <p className="m-section-desc">
          「自分の使い方ならどのくらいのスコアが必要？」をまとめました。
        </p>
        <p className="m-section-desc">
          推奨モデルは条件を満たす中で最もコスパの良いモデルを自動選出しています。
        </p>

        <div className="usecase-cards">
          {USE_CASES.map((uc) => {
            const bestModel = findBestMatch(models, uc)
            const iosysUrl = bestModel ? getIosysUrl(shopLinks, bestModel.id) : null
            return (
              <div key={uc.title} className="m-card m-card--shadow m-card--padded usecase-card">
                {/* 用途ヘッダー */}
                <div className="usecase-card__header">
                  <i className={`fa-solid ${uc.icon}`} aria-hidden="true"></i>
                  <h3 className="usecase-card__title">{uc.title}</h3>
                </div>
                <p className="usecase-card__desc">{uc.description}</p>

                {/* 推奨スコア */}
                <div className="usecase-card__score-label">推奨スコア</div>
                <dl className="usecase-card__scores">
                  <div className="usecase-card__score">
                    <dt><span className="usecase-card__score-dot" style={{ background: '#e74c6f' }}></span>シングル</dt>
                    <dd>{uc.singleMin.toLocaleString()}+</dd>
                  </div>
                  <div className="usecase-card__score">
                    <dt><span className="usecase-card__score-dot" style={{ background: '#f0a030' }}></span>マルチ</dt>
                    <dd>{uc.multiMin.toLocaleString()}+</dd>
                  </div>
                  {uc.antutuMin && (
                    <div className="usecase-card__score">
                      <dt><span className="usecase-card__score-dot" style={{ background: 'var(--color-primary)' }}></span>AnTuTu</dt>
                      <dd>{uc.antutuMin.toLocaleString()}+</dd>
                    </div>
                  )}
                </dl>

                {/* おすすめモデル */}
                {bestModel && (
                  <div className="usecase-card__recommend">
                    <div className="usecase-card__recommend-left">
                      <span className="usecase-card__recommend-label">おすすめモデル</span>
                      <Link prefetch={false} href={`/pixel/${bestModel.slug}/`} className="usecase-card__recommend-name">
                        {bestModel.model}
                      </Link>
                    </div>
                    <div className="usecase-card__recommend-right">
                      {bestModel.minPrice && (
                        <>
                          <span className="usecase-card__recommend-price-label">中古相場{bestModel.storageLabel ? `（${bestModel.storageLabel}）` : ''}</span>
                          <span className="usecase-card__recommend-price">¥{bestModel.minPrice.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    {iosysUrl && (
                      <a
                        href={iosysUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-btn m-btn--primary m-btn--sm"
                      >
                        <span>在庫情報を見る</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            上記の推奨スコアは<a href="https://browser.geekbench.com/android-benchmarks" target="_blank" rel="noopener noreferrer">Geekbench 6 公式ベンチマーク</a>やAnTuTu v11の実測値をもとに、各用途で快適に動作するGoogle Tensor世代の下限を目安として設定しています。予算に余裕があれば1段階上のモデルを選ぶと、7年サポートと相まって数年後もストレスなく使い続けられます。
          </p>
        </div>
      </div>
    </section>
  )
}
