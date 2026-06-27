import type { ReactNode } from 'react'
import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import { RECOMMEND_COUNT_LABEL } from '@/lib/data/iphone-recommend'

type CompareItem = {
  model: IPhoneModel
  latestPrice: IPhonePriceLog | null
  cameraLabel: string
  batteryLabel: string
  targetUser: string
}

type Props = {
  items: CompareItem[]
  heading?: ReactNode
  descriptions?: ReactNode[]
}

export default function CompareTableSection({ items, heading, descriptions }: Props) {
  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          {heading ?? <>おすすめiPhone{RECOMMEND_COUNT_LABEL}のスペック比較表</>}
        </h2>
        {descriptions ? (
          descriptions.map((d, i) => <p key={i} className="m-section-desc">{d}</p>)
        ) : (
          <>
            <p className="m-section-desc">
              今回紹介した{RECOMMEND_COUNT_LABEL}の主要スペックを一覧で比較できます。
            </p>
            <p className="m-section-desc">自分の使い方に合った機種を見つけましょう。</p>
          </>
        )}

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <caption className="visually-hidden">おすすめ中古iPhone{RECOMMEND_COUNT_LABEL}のスペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col">項目</th>
                  {items.map(({ model }) => (
                    <th key={model.id} scope="col">
                      {model.model}
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
                          src={`/images/iphone/${model.image}`}
                          alt={model.model}
                          width={60}
                          height={80}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={placeholder(60, 80, 'iPhone')}
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

                {/* iOSの寿命 */}
                <tr>
                  <th scope="row">iOSの寿命</th>
                  {items.map(({ model }) => {
                    const osLife = calculateOSLifespan(model.date, model.last_ios)
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

                {/* カメラ */}
                <tr>
                  <th scope="row">カメラ</th>
                  {items.map(({ model, cameraLabel }) => (
                    <td key={model.id}>{cameraLabel}</td>
                  ))}
                </tr>

                {/* バッテリー持ち */}
                <tr>
                  <th scope="row">バッテリー持ち</th>
                  {items.map(({ model, batteryLabel }) => (
                    <td key={model.id}>{batteryLabel}</td>
                  ))}
                </tr>

                {/* こんな人向け */}
                <tr>
                  <th scope="row">こんな人向け</th>
                  {items.map(({ model, targetUser }) => (
                    <td key={model.id} dangerouslySetInnerHTML={{ __html: targetUser }} />
                  ))}
                </tr>

                {/* 詳細（ページ内リンク） */}
                <tr>
                  <th scope="row">詳細</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>
                      <a
                        href={`#detail-${model.slug}`}
                        className="m-btn m-btn--primary m-btn--sm"
                        aria-label={`${model.model}の詳細を見る`}
                      >
                        詳細を見る <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
