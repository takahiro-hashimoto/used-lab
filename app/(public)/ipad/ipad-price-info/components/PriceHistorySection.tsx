'use client'

import { useState } from 'react'
import type { ModelData, PriceEntry } from '../page'

type Props = {
  models: ModelData[]
}

type MonthlySummary = {
  month: string
  label: string
  avg: number
  min: number
  max: number
}

function calcMonthlySummary(prices: PriceEntry[]): MonthlySummary[] {
  const monthly = new Map<string, { avgs: number[]; min: number; max: number }>()
  for (const p of prices) {
    const ym = p.date.substring(0, 7)
    if (!monthly.has(ym)) {
      monthly.set(ym, { avgs: [], min: Infinity, max: 0 })
    }
    const bucket = monthly.get(ym)!
    bucket.avgs.push(p.avg)
    bucket.min = Math.min(bucket.min, p.min)
    bucket.max = Math.max(bucket.max, p.max)
  }

  return [...monthly.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([ym, data]) => {
      const [y, m] = ym.split('-')
      return {
        month: ym,
        label: `${y}年${parseInt(m)}月`,
        avg: Math.round(data.avgs.reduce((a, b) => a + b, 0) / data.avgs.length / 100) * 100,
        min: data.min,
        max: data.max,
      }
    })
}

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土']

export default function PriceHistorySection({ models }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="l-section" id="pd-history" aria-labelledby="pd-history-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-history-title">
          iPad 価格推移データ（過去90日間）
        </h2>
        <p className="m-section-desc">各モデルの価格推移を日別・月別で確認できます。</p>

        {models.map((model) => {
          if (model.prices.length === 0) return null

          const monthlySummary = calcMonthlySummary(model.prices)
          const firstPrice = model.prices[0].avg
          const lastPrice = model.prices[model.prices.length - 1].avg
          const totalChange = lastPrice - firstPrice
          const totalChangePercent = firstPrice > 0 ? Math.round((totalChange / firstPrice) * 1000) / 10 : 0
          const isOpen = openId === model.id

          const reversedPrices = [...model.prices].reverse()
          const latestEntry = model.prices[model.prices.length - 1]

          return (
            <div key={model.id} className="pd-history-model">
              <button
                className="pd-history-summary"
                onClick={() => setOpenId(isOpen ? null : model.id)}
                aria-expanded={isOpen}
              >
                <div className="pd-history-summary-left">
                  <h3 className="pd-history-model-name">{model.name}</h3>
                  <span className="pd-history-model-meta">{model.year}年発売 / {model.chip}</span>
                </div>
                <div className="pd-history-summary-right">
                  <div className="pd-history-summary-price">
                    <span className="pd-history-price-range">
                      <small className="pd-history-price-range__label">中古相場（{model.storage}）</small>
                      &yen;{latestEntry.min.toLocaleString()}
                    </span>
                    <span className={`pd-history-trend${totalChange < 0 ? ' is-down' : totalChange > 0 ? ' is-up' : ''}`}>
                      {totalChange !== 0 ? (
                        <>90日間で&yen;{Math.abs(totalChange).toLocaleString()}{totalChange < 0 ? '値下がり' : '値上がり'}傾向</>
                      ) : (
                        <>90日間で価格変動なし</>
                      )}
                    </span>
                  </div>
                  <i className={`fa-solid fa-chevron-down pd-history-toggle${isOpen ? ' is-open' : ''}`} aria-hidden="true"></i>
                </div>
              </button>

              {isOpen && (
                <div className="pd-history-content">
                  {/* 月別サマリー */}
                  {monthlySummary.length > 0 && (
                    <div className="pd-history-monthly">
                      <h4 className="pd-history-subtitle">月別平均価格</h4>
                      <div className="l-grid l-grid--3col l-grid--gap-lg">
                        {monthlySummary.map((ms) => (
                          <div key={ms.month} className="m-card m-card--sm m-stat-card monthly-card">
                            <p className="m-stat-card__label">{ms.label}</p>
                            <p className="m-stat-card__value">&yen;{ms.avg.toLocaleString()}</p>
                            <p className="m-stat-card__note">
                              &yen;{ms.min.toLocaleString()} 〜 &yen;{ms.max.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 日別データ */}
                  <div className="pd-history-daily">
                    <h4 className="pd-history-subtitle">日別価格データ</h4>
                    <div className="price-table-wrap">
                      <table className="m-table">
                        <caption className="visually-hidden">{model.name}の価格推移データ</caption>
                        <thead>
                          <tr>
                            <th scope="col">日付</th>
                            <th scope="col">最安値</th>
                            <th scope="col">最高値</th>
                            <th scope="col">平均相場</th>
                            <th scope="col">前日比</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reversedPrices.map((price, idx) => {
                            const d = new Date(price.date)
                            const dateShort = `${d.getMonth() + 1}/${d.getDate()}`
                            const dayOfWeek = DAY_NAMES[d.getDay()]
                            const prevPrice = idx < reversedPrices.length - 1 ? reversedPrices[idx + 1] : null
                            const dayChange = prevPrice ? price.avg - prevPrice.avg : null

                            return (
                              <tr key={price.date}>
                                <td>
                                  <time dateTime={price.date}>
                                    {dateShort}({dayOfWeek})
                                  </time>
                                </td>
                                <td>&yen;{price.min.toLocaleString()}</td>
                                <td>&yen;{price.max.toLocaleString()}</td>
                                <td>
                                  <strong>&yen;{price.avg.toLocaleString()}</strong>
                                </td>
                                <td
                                  className={
                                    dayChange != null && dayChange > 0
                                      ? 'm-table-up'
                                      : dayChange != null && dayChange < 0
                                        ? 'm-table-down'
                                        : 'm-table-flat'
                                  }
                                >
                                  {dayChange != null && dayChange !== 0 ? (
                                    <>
                                      {dayChange > 0 ? '+' : ''}
                                      {dayChange.toLocaleString()}
                                    </>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )
        })}

        {/* SEO用テキスト */}
        <div className="pd-history-seo">
          <p>
            当ページでは、中古iPad全{models.length}機種の価格推移データを毎日更新で公開しています。イオシス・ゲオ・じゃんぱらの3店舗から自動取得した実売価格をもとに、最安値・最高値・平均相場を算出。過去90日間の日別データと月別サマリーにより、価格トレンドを把握できます。
          </p>
          <p>
            iPad Pro（M4/M2/M1）、iPad Air（M3/M2/M1）、iPad（第10/9世代）、iPad mini（第7/6世代）など、現行モデルから型落ちモデルまで網羅。新型発売後の値下がりタイミングや、お買い得な時期の見極めにご活用ください。
          </p>
        </div>
      </div>
    </section>
  )
}
