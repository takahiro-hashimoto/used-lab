import Image from 'next/image'
import Link from 'next/link'
import type { IPadModel, IPadPriceLog, ProductShopLink } from '@/lib/types'
import { calculateOSLifespan } from '@/lib/utils/ipad-helpers'
import { RECOMMEND_COUNT_LABEL } from '@/lib/data/ipad-recommend'

type CompareItem = {
  model: IPadModel
  latestPrice: IPadPriceLog | null
  shopLinks: ProductShopLink[]
  pencilLabel: string
  displayLabel: string
  targetUser: string
}

type Props = {
  items: CompareItem[]
}

export default function CompareTableSection({ items }: Props) {
  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          おすすめiPad{RECOMMEND_COUNT_LABEL}のスペック比較表
        </h2>
        <p className="m-section-desc">
          今回紹介した{RECOMMEND_COUNT_LABEL}の主要スペックを一覧で比較できます。
        </p>
        <p className="m-section-desc">自分の使い方に合った機種を見つけましょう。</p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table">
              <caption className="visually-hidden">おすすめ中古iPad{RECOMMEND_COUNT_LABEL}のスペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col">項目</th>
                  {items.map(({ model }) => (
                    <th key={model.id} scope="col">
                      <strong>{model.model}</strong>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 画像 */}
                <tr>
                  <th scope="row">画像</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>
                      {model.image ? (
                        <Image
                          src={`/images/ipad/${model.image}`}
                          alt={model.model}
                          width={60}
                          height={80}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="https://placehold.co/60x80/f5f5f7/1d1d1f?text=iPad"
                          alt={model.model}
                          width={60}
                          height={80}
                          loading="lazy"
                        />
                      )}
                    </td>
                  ))}
                </tr>

                {/* モデル名 */}
                <tr>
                  <th scope="row">モデル名</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>{model.model}</td>
                  ))}
                </tr>

                {/* 発売年 */}
                <tr>
                  <th scope="row">発売年</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>
                      {model.date ? `${model.date.split('/')[0]}年` : '-'}
                    </td>
                  ))}
                </tr>

                {/* iPadOSの寿命 */}
                <tr>
                  <th scope="row">iPadOSの寿命</th>
                  {items.map(({ model }) => {
                    const osLife = calculateOSLifespan(model.date)
                    return (
                      <td key={model.id}>
                        {osLife.osEndYear}年頃まで
                        <br />
                        <small>（残り約{osLife.remainingYears}年）</small>
                      </td>
                    )
                  })}
                </tr>

                {/* チップ */}
                <tr>
                  <th scope="row">チップ</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>{model.cpu || '-'}</td>
                  ))}
                </tr>

                {/* ディスプレイ */}
                <tr>
                  <th scope="row">ディスプレイ</th>
                  {items.map(({ model, displayLabel }) => (
                    <td key={model.id}>{displayLabel}</td>
                  ))}
                </tr>

                {/* Apple Pencil */}
                <tr>
                  <th scope="row">Apple Pencil</th>
                  {items.map(({ model, pencilLabel }) => (
                    <td key={model.id}>{pencilLabel}</td>
                  ))}
                </tr>

                {/* こんな人向け */}
                <tr>
                  <th scope="row">こんな人向け</th>
                  {items.map(({ model, targetUser }) => (
                    <td key={model.id} dangerouslySetInnerHTML={{ __html: targetUser }} />
                  ))}
                </tr>

                {/* イオシスで探す */}
                <tr>
                  <th scope="row">イオシスで探す</th>
                  {items.map(({ model, shopLinks }) => {
                    const iosysLink = shopLinks.find((l) => l.shop_id === 1)
                    return (
                      <td key={model.id}>
                        {iosysLink ? (
                          <a
                            href={iosysLink.url}
                            className="m-btn m-btn--primary m-btn--sm"
                            rel="nofollow noopener noreferrer"
                            target="_blank"
                          >
                            在庫を見る
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 関連リンクカード */}
        <div className="l-grid l-grid--3col l-grid--gap-lg related-links">
          <Link href="/ipad/ipad-spec-table/" className="m-card m-card--shadow related-link-card">
            <span className="related-link-card__icon related-link-card__icon--blue">
              <i className="fa-solid fa-table-cells" aria-hidden="true"></i>
            </span>
            <h3 className="related-link-card__title">スペック比較表</h3>
            <p className="related-link-card__desc">歴代iPadのスペックを網羅。細かな仕様まで確認</p>
            <span className="related-link-card__arrow">
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </span>
          </Link>
          <Link href="/ipad/used-ipad-support/" className="m-card m-card--shadow related-link-card">
            <span className="related-link-card__icon">
              <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
            </span>
            <h3 className="related-link-card__title">サポート期間一覧</h3>
            <p className="related-link-card__desc">iPadの寿命とサポート期間を機種別に一覧で紹介</p>
            <span className="related-link-card__arrow">
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </span>
          </Link>
          <Link href="/ipad/used-ipad-attention/" className="m-card m-card--shadow related-link-card">
            <span className="related-link-card__icon">
              <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            </span>
            <h3 className="related-link-card__title">購入時の注意点</h3>
            <p className="related-link-card__desc">中古iPadを買う前に確認すべきチェックポイント</p>
            <span className="related-link-card__arrow">
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
