import Link from 'next/link'
import Image from 'next/image'
import type { BenchModel } from './BenchmarkRanking'
import type { ProductShopLink } from '@/lib/types'
import { type UseCaseItem, findBestMatch, getIosysUrl } from '@/lib/utils/benchmark-helpers'


/**
 * 推奨スコアの根拠:
 * Geekbench 6 公式ベンチマーク (https://browser.geekbench.com/mac-benchmarks) を参照し、
 * 各用途で快適に動作するチップ世代の実測値を下限目安として設定。
 *
 * - Web閲覧: M1 (Single 2,350 / Multi 8,262) で十分快適
 * - プログラミング: M2 (Single 2,600 / Multi 9,666) でDocker含め快適
 * - 写真編集: M2 + GPU活用 (Metal 43,608) が目安
 * - 動画4K: M3 Pro級 (Multi 15,246 / Metal 74,427) が必要
 * - 3D/ML: M4 Pro級 (Multi 22,429 / Metal 105,442) を推奨
 */
const USE_CASES: UseCaseItem[] = [
  {
    icon: 'fa-globe',
    title: 'Web閲覧・事務作業',
    description: 'ブラウザ、メール、Office系アプリの利用がメイン',
    singleMin: 2300,
    multiMin: 8000,
    metalMin: null,
  },
  {
    icon: 'fa-code',
    title: 'プログラミング（Web系）',
    description: 'VS Code、Docker、Node.js等でのWeb開発',
    singleMin: 2500,
    multiMin: 9500,
    metalMin: null,
  },
  {
    icon: 'fa-camera',
    title: '写真編集・RAW現像',
    description: 'Lightroom、Photoshopでの写真編集',
    singleMin: 2500,
    multiMin: 9500,
    metalMin: 40000,
  },
  {
    icon: 'fa-film',
    title: '動画編集（4K）',
    description: 'Final Cut Pro、DaVinci Resolveでの4K編集',
    singleMin: 3000,
    multiMin: 15000,
    metalMin: 70000,
  },
  {
    icon: 'fa-cube',
    title: '3D・機械学習',
    description: 'Blender、3Dレンダリング、MLモデルの推論',
    singleMin: 3500,
    multiMin: 22000,
    metalMin: 100000,
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

                {/* おすすめモデル: 左=ラベル+機種名 | 右=相場+価格+ボタン */}
                {bestModel && (
                  <div className="usecase-card__recommend">
                    <div className="usecase-card__recommend-left">
                      <span className="usecase-card__recommend-label">おすすめモデル</span>
                      <Link href={`/macbook/${bestModel.slug}/`} className="usecase-card__recommend-name">
                        {bestModel.shortname || bestModel.model}
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

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            上記の推奨スコアは<a href="https://browser.geekbench.com/mac-benchmarks" target="_blank" rel="noopener noreferrer">Geekbench 6 公式ベンチマーク</a>の実測値をもとに、各用途で快適に動作するチップ世代の下限を目安として設定しています。予算に余裕があれば1段階上のモデルを選ぶと、数年後もストレスなく使い続けられます。
          </p>
        </div>
      </div>
    </section>
  )
}
