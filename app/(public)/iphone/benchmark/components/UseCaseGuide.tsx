import Link from 'next/link'
import type { BenchModel } from './BenchmarkRanking'
import type { ProductShopLink } from '@/lib/types'
import { type UseCaseItem, findBestMatch, getIosysUrl } from '@/lib/utils/benchmark-helpers'

/**
 * 推奨スコアの根拠:
 * Geekbench 6 公式ベンチマーク (https://browser.geekbench.com/ios-benchmarks) を参照し、
 * 各用途で快適に動作するチップ世代の実測値を下限目安として設定。
 *
 * - SNS/Web: A13 Bionic (Single ~1,700 / Multi ~4,300) で十分
 * - 写真撮影メイン: A15 Bionic (Single ~2,400 / Multi ~5,800) が目安
 * - ゲーム: A16 Bionic (Single ~2,500 / Metal ~7,600) が快適ライン
 * - 動画編集: A17 Pro (Single ~2,900 / Multi ~7,200 / Metal ~8,300) 推奨
 * - ヘビーゲーム/AR: A18 Pro (Single ~3,400 / Multi ~8,200 / Metal ~10,000) 推奨
 */
const USE_CASES: UseCaseItem[] = [
  {
    icon: 'fa-comment-dots',
    title: 'SNS・Web閲覧',
    description: 'LINE、X、Instagram、Web閲覧がメイン',
    singleMin: 1700,
    multiMin: 4300,
    metalMin: null,
  },
  {
    icon: 'fa-camera',
    title: '写真撮影メイン',
    description: 'ポートレート、ナイトモード等のカメラ重視',
    singleMin: 2400,
    multiMin: 5800,
    metalMin: null,
  },
  {
    icon: 'fa-gamepad',
    title: 'ゲーム（一般）',
    description: '原神、FPSなどの3Dゲームを快適に',
    singleMin: 2500,
    multiMin: 6000,
    metalMin: 7500,
  },
  {
    icon: 'fa-video',
    title: '動画撮影・編集',
    description: '4K撮影やiMovieでの動画編集',
    singleMin: 2900,
    multiMin: 7200,
    metalMin: 8300,
  },
  {
    icon: 'fa-vr-cardboard',
    title: 'ヘビーゲーム・AR',
    description: '最新3Dゲーム最高画質、AR体験',
    singleMin: 3400,
    multiMin: 8200,
    metalMin: 10000,
  },
]

type Props = {
  models: BenchModel[]
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
                  {uc.metalMin && (
                    <div className="usecase-card__score">
                      <dt><span className="usecase-card__score-dot" style={{ background: 'var(--color-primary)' }}></span>Metal</dt>
                      <dd>{uc.metalMin.toLocaleString()}+</dd>
                    </div>
                  )}
                </dl>

                {/* おすすめモデル */}
                {bestModel && (
                  <div className="usecase-card__recommend">
                    <div className="usecase-card__recommend-left">
                      <span className="usecase-card__recommend-label">おすすめモデル</span>
                      <Link href={`/iphone/${bestModel.slug}/`} className="usecase-card__recommend-name">
                        {bestModel.model}
                      </Link>
                    </div>
                    <div className="usecase-card__recommend-right">
                      {bestModel.minPrice && (
                        <>
                          <span className="usecase-card__recommend-price-label">中古相場{bestModel.storageLabel ? `（${bestModel.storageLabel}）` : ''}</span>
                          <span className="usecase-card__recommend-price">¥{bestModel.minPrice.toLocaleString()}〜</span>
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
            上記の推奨スコアは<a href="https://browser.geekbench.com/ios-benchmarks" target="_blank" rel="noopener noreferrer">Geekbench 6 公式ベンチマーク</a>の実測値をもとに、各用途で快適に動作するチップ世代の下限を目安として設定しています。予算に余裕があれば1段階上のモデルを選ぶと、数年後もストレスなく使い続けられます。
          </p>
        </div>
      </div>
    </section>
  )
}
