import Link from 'next/link'
import type { BenchModel } from './BenchmarkRanking'
import type { ProductShopLink } from '@/lib/types'
import { type UseCaseItem, findBestMatch, getIosysUrl } from '@/lib/utils/benchmark-helpers'

/**
 * 推奨スコアの根拠:
 * Geekbench 6 公式ベンチマーク を参照し、
 * 各用途で快適に動作するチップ世代の実測値を下限目安として設定。
 *
 * - Web/動画視聴: A13 Bionic (Single ~1,300 / Multi ~3,200) で十分
 * - ノート/勉強: A14 Bionic (Single ~1,600 / Multi ~4,200) が快適
 * - イラスト制作: A15 Bionic (Single ~2,300 / Multi ~5,500 / Metal ~6,500) が目安
 * - ゲーム: M1 (Single ~2,300 / Multi ~8,400 / Metal ~20,000) 推奨
 * - 動画編集/プロ: M2 (Single ~2,600 / Multi ~9,700 / Metal ~30,000) 推奨
 */
const USE_CASES: UseCaseItem[] = [
  {
    icon: 'fa-play',
    title: '動画視聴・Web閲覧',
    description: 'YouTube、Netflix、Web閲覧がメイン',
    singleMin: 1300,
    multiMin: 3200,
    metalMin: null,
  },
  {
    icon: 'fa-graduation-cap',
    title: 'ノート・勉強',
    description: 'GoodNotes、PDF閲覧、教科書のデジタル化',
    singleMin: 1600,
    multiMin: 4200,
    metalMin: null,
  },
  {
    icon: 'fa-pen-nib',
    title: 'イラスト制作',
    description: 'Procreate、CLIP STUDIO PAINTでのお絵かき',
    singleMin: 2300,
    multiMin: 5500,
    metalMin: 6500,
  },
  {
    icon: 'fa-gamepad',
    title: 'ゲーム',
    description: '原神、FPSなどの3Dゲームを大画面で',
    singleMin: 2300,
    multiMin: 8400,
    metalMin: 20000,
  },
  {
    icon: 'fa-film',
    title: '動画編集・プロ用途',
    description: 'LumaFusion、DaVinci Resolveでの4K編集',
    singleMin: 2600,
    multiMin: 9700,
    metalMin: 30000,
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
                <div className="usecase-card__header">
                  <i className={`fa-solid ${uc.icon}`} aria-hidden="true"></i>
                  <h3 className="usecase-card__title">{uc.title}</h3>
                </div>
                <p className="usecase-card__desc">{uc.description}</p>

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

                {bestModel && (
                  <div className="usecase-card__recommend">
                    <div className="usecase-card__recommend-left">
                      <span className="usecase-card__recommend-label">おすすめモデル</span>
                      <Link href={`/ipad/${bestModel.slug}/`} className="usecase-card__recommend-name">
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
                      <a href={iosysUrl} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary">
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
            上記の推奨スコアはGeekbench 6公式ベンチマークの実測値をもとに、各用途で快適に動作するチップ世代の下限を目安として設定しています。予算に余裕があれば1段階上のモデルを選ぶと、数年後もストレスなく使い続けられます。
          </p>
        </div>
      </div>
    </section>
  )
}
