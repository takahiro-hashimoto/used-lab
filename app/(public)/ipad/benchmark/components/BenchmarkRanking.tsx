'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BenchBar } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'
import { getTotal, getIosysUrl } from '@/lib/utils/benchmark-helpers'

export type BenchModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  ram: string | null
  score_single: number
  score_multi: number
  score_metal: number
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  minPrice: number | null
  storageLabel: string | null
}

type FilterCategory = 'all' | 'pro' | 'air' | 'other'

function getModelCategory(model: string): 'pro' | 'air' | 'other' {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('air')) return 'air'
  return 'other'
}


export default function BenchmarkRanking({ models, shopLinks }: { models: BenchModel[]; shopLinks: ProductShopLink[] }) {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const filtered = filter === 'all' ? models : models.filter((m) => getModelCategory(m.model) === filter)

  const sorted = [...filtered].sort((a, b) => getTotal(b) - getTotal(a))

  const maxSingle = Math.max(...models.map((m) => m.score_single))
  const maxMulti = Math.max(...models.map((m) => m.score_multi))
  const maxMetal = Math.max(...models.map((m) => m.score_metal))

  return (
    <section className="l-section" id="ranking" aria-labelledby="heading-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-ranking">
          歴代iPad ベンチマーク総合ランキング
        </h2>
        <p className="m-section-desc">Geekbench 6のスコアで歴代iPadの性能を比較。中古最安価格も併記しているのでコスパ重視の方にもおすすめです。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([['all', 'すべて'], ['pro', 'Pro'], ['air', 'Air'], ['other', 'mini/無印']] as const).map(([key, label]) => (
                <button key={key} className={`spec-filter__tag${filter === key ? ' is-active' : ''}`} onClick={() => setFilter(key)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--sticky-col bench-ranking-table">
              <caption className="visually-hidden">歴代iPad Geekbench 6 ベンチマークランキング</caption>
              <thead>
                <tr>
                  <th scope="col" className="bench-ranking-table__rank">順位</th>
                  <th scope="col" className="bench-ranking-table__model">モデル</th>
                  <th scope="col">シングル</th>
                  <th scope="col">マルチ</th>
                  <th scope="col">Metal</th>
                  <th scope="col">中古最安</th>
                  <th scope="col">ショップ</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((m, i) => {
                  const rank = i + 1
                  return (
                    <tr key={m.id} className={rank <= 3 ? 'bench-ranking-table__top' : undefined}>
                      <td className="bench-ranking-table__rank-cell">
                        <span className={`bench-rank ${rank <= 3 ? `bench-rank--${rank}` : ''}`}>{rank}</span>
                      </td>
                      <td className="bench-ranking-table__model-cell">
                        <Link href={`/ipad/${m.slug}/`} className="bench-model-link">
                          {m.image && m.image.startsWith('/') && (
                            <Image src={m.image} alt={m.model} width={40} height={40} className="bench-model-img" />
                          )}
                          <span className="bench-model-info">
                            <span className="bench-model-name">{m.model}</span>
                            <span className="bench-model-chip">{m.cpu}</span>
                          </span>
                        </Link>
                      </td>
                      <td><BenchBar value={m.score_single} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={m.score_multi} maxValue={maxMulti} color="#f0a030" /></td>
                      <td><BenchBar value={m.score_metal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                      <td className="bench-ranking-table__price-cell">
                        {m.minPrice ? `¥${m.minPrice.toLocaleString()}〜` : '-'}
                      </td>
                      <td>
                        {(() => {
                          const url = getIosysUrl(shopLinks, m.id)
                          return url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary">
                              イオシスで探す
                            </a>
                          ) : null
                        })()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            ランキングはGeekbench 6の総合スコア（シングル＋マルチ＋Metal）の合計で算出しています。
          </p>
        </div>
      </div>
    </section>
  )
}
