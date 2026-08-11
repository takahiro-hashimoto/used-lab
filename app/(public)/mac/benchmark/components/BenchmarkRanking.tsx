'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { ProductShopLink, MacDeviceType } from '@/lib/types'
import { getIosysUrl } from '@/lib/utils/benchmark-helpers'

// MacBook版（macbook/benchmark/components/BenchmarkRanking.tsx）が元。
// 絞り込みを Air/Pro から device_type に変え、リンク先を /mac/ に向けている。
//
// mac_models のスコアは現在すべて NULL（Geekbench Browser が Geekbench 7 に
// 切り替わり、既存カテゴリの GB6 とスケールが揃わないため保留中）。
// 全件が hasScore=false でも表が破綻しないようにしてある。

export type BenchModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  date: string | null
  device_type: MacDeviceType
  cpu: string | null
  gpu: string | null
  score_single: number
  score_multi: number
  score_metal: number
  minPrice: number | null
  chipVariant: string | null
  hasScore?: boolean
}

type FilterCategory = 'all' | MacDeviceType

const FILTERS: [FilterCategory, string][] = [
  ['all', 'すべて'],
  ['imac', 'iMac'],
  ['mac-mini', 'Mac mini'],
  ['mac-studio', 'Mac Studio'],
]

export default function BenchmarkRanking({ models, shopLinks }: { models: BenchModel[]; shopLinks: ProductShopLink[] }) {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const allFiltered = filter === 'all' ? models : models.filter((m) => m.device_type === filter)
  const withScore = allFiltered.filter((m) => m.hasScore !== false)
  const noScore = allFiltered.filter((m) => m.hasScore === false)

  const sorted = [...withScore].sort((a, b) => b.score_single - a.score_single)

  // 全件スコア未取得だと Math.max が 0 になり BenchBar が 0 除算になる。
  // 1 を下限にしておく（withScore が空ならバー自体描画されない）
  const maxOf = (pick: (m: BenchModel) => number) =>
    Math.max(1, ...models.map(pick))
  const maxSingle = maxOf((m) => m.score_single)
  const maxMulti = maxOf((m) => m.score_multi)
  const maxMetal = maxOf((m) => m.score_metal)

  const renderShopCell = (m: BenchModel) => {
    const url = getIosysUrl(shopLinks, m.id)
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary m-btn--sm">
        イオシスで探す
      </a>
    ) : null
  }

  return (
    <section className="l-section" id="ranking" aria-labelledby="heading-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-ranking">
          歴代iMac・Mac mini ベンチマーク総合ランキング
        </h2>
        <p className="m-section-desc">iMac・Mac mini・Mac Studioの性能をスコアで比較。</p>
        <p className="m-section-desc">中古相場も併記しているのでコスパ重視の方にもおすすめです。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {FILTERS.map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${filter === key ? ' is-active' : ''}`}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {withScore.length === 0 ? (
          <div className="m-callout m-callout--tip u-mb-xl">
            <span className="m-callout__label">準備中</span>
            <p className="m-callout__text">
              iMac・Mac miniのベンチマークスコアは現在集計中です。スコアが入り次第、ここにランキングを掲載します。
              チップ構成とスペックの違いは「
              <Link prefetch={false} href="/mac/mac-spec-table/">歴代iMac・Mac miniスペック比較表</Link>
              」でご確認いただけます。
            </p>
          </div>
        ) : null}

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--sticky-col bench-ranking-table">
              <caption className="visually-hidden">歴代iMac・Mac mini ベンチマークランキング</caption>
              <thead>
                <tr>
                  <th scope="col">順位</th>
                  <th scope="col" className="bench-ranking-table__model">モデル</th>
                  <th scope="col">シングル</th>
                  <th scope="col">マルチ</th>
                  <th scope="col">Metal</th>
                  <th scope="col">中古相場</th>
                  <th scope="col">ショップ</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((m, i) => {
                  const rank = i + 1
                  return (
                    <tr key={`${m.id}-${m.chipVariant || 'default'}`} className={rank <= 3 ? 'bench-ranking-table__top' : undefined}>
                      <td className="bench-ranking-table__rank-cell">
                        <span className={`bench-rank ${rank <= 3 ? `bench-rank--${rank}` : ''}`}>{rank}</span>
                      </td>
                      <th scope="row" className="bench-ranking-table__model-cell bench-table__sticky">
                        <Link prefetch={false} href={`/mac/${m.slug}/`} className="bench-model-link">
                          {m.image && m.image.startsWith('/') ? (
                            <Image src={m.image} alt={m.model} width={40} height={40} className="bench-model-img" />
                          ) : null}
                          <span className="bench-model-info">
                            <span className="bench-model-name">{m.shortname || m.model}</span>
                            <span className="bench-model-chip">{m.chipVariant || m.cpu}</span>
                          </span>
                        </Link>
                      </th>
                      <td><BenchBar value={m.score_single} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={m.score_multi} maxValue={maxMulti} color="#f0a030" /></td>
                      <td><BenchBar value={m.score_metal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                      <td className="bench-ranking-table__price-cell">
                        {m.minPrice ? `¥${m.minPrice.toLocaleString()}` : '-'}
                      </td>
                      <td>{renderShopCell(m)}</td>
                    </tr>
                  )
                })}
                {noScore.map((m) => (
                  <tr key={`${m.id}-noscore`}>
                    <td className="bench-ranking-table__rank-cell">
                      <span className="bench-rank">-</span>
                    </td>
                    <th scope="row" className="bench-ranking-table__model-cell bench-table__sticky">
                      <Link prefetch={false} href={`/mac/${m.slug}/`} className="bench-model-link">
                        <span className="bench-model-info">
                          <span className="bench-model-name">{m.shortname || m.model}</span>
                          <span className="bench-model-chip">{m.cpu}</span>
                        </span>
                      </Link>
                    </th>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td className="bench-ranking-table__price-cell">
                      {m.minPrice ? `¥${m.minPrice.toLocaleString()}` : '-'}
                    </td>
                    <td>{renderShopCell(m)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StickyTableWrapper>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            ランキングはシングルコアスコアの高い順です。動画書き出しや3Dのように複数コアを使い切る作業ではマルチコアとMetal、
            ブラウジングや文書作成のように1つの処理を速く終わらせたい場面では、シングルコアの高さがそのまま体感速度になります。
          </p>
        </div>
      </div>
    </section>
  )
}
