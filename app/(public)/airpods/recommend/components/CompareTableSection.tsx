import type { ReactNode } from 'react'
import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { AirPodsModel, AirPodsPriceLog } from '@/lib/types'
import { calculateFirmwareLifespan } from '@/lib/utils/airpods-helpers'
import { RECOMMEND_COUNT_LABEL } from '@/lib/data/airpods-recommend'

type CompareItem = {
  model: AirPodsModel
  latestPrice: AirPodsPriceLog | null
  ancLabel: string
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
          {heading ?? <>おすすめAirPods{RECOMMEND_COUNT_LABEL}のスペック比較表</>}
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
              <caption className="visually-hidden">おすすめ中古AirPods{RECOMMEND_COUNT_LABEL}のスペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col">項目</th>
                  {items.map(({ model }) => (
                    <th key={model.id} scope="col">
                      {model.name}
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
                          src={`/images/airpods/${model.image}`}
                          alt={model.name}
                          width={60}
                          height={80}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={placeholder(60, 80, 'AirPods')}
                          alt={model.name}
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
                    <td key={model.id}>{model.name}</td>
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

                {/* サポート期間 */}
                <tr>
                  <th scope="row">サポート期間</th>
                  {items.map(({ model }) => {
                    const fwLife = calculateFirmwareLifespan(model.date)
                    return (
                      <td key={model.id}>
                        {fwLife.endYear}年頃まで
                        <br />
                        <small>（残り約{fwLife.remainingYears}年）</small>
                      </td>
                    )
                  })}
                </tr>

                {/* チップ */}
                <tr>
                  <th scope="row">チップ</th>
                  {items.map(({ model }) => (
                    <td key={model.id}>{model.chip || '-'}</td>
                  ))}
                </tr>

                {/* ノイズキャンセリング */}
                <tr>
                  <th scope="row">ノイズキャンセリング</th>
                  {items.map(({ model, ancLabel }) => (
                    <td key={model.id}>{ancLabel}</td>
                  ))}
                </tr>

                {/* バッテリー */}
                <tr>
                  <th scope="row">バッテリー</th>
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
                        aria-label={`${model.name}の詳細を見る`}
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
