'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { ProductShopLink } from '@/lib/types'
import { getIosysUrl } from '@/lib/utils/benchmark-helpers'

export type GalaxyBenchModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  ram: string | null
  series: string | null
  score_single: number
  score_multi: number
  antutu_total: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  minPrice: number | null
  storageLabel: string | null
}

type FilterCategory = 'all' | 's' | 'a' | 'z'

function getModelCategory(series: string | null): 's' | 'a' | 'z' | null {
  if (!series) return null
  if (series === 'S') return 's'
  if (series === 'A') return 'a'
  if (series === 'Z Flip' || series === 'Z Fold') return 'z'
  return null
}

export default function BenchmarkRanking({ models, shopLinks }: { models: GalaxyBenchModel[]; shopLinks: ProductShopLink[] }) {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const filtered = filter === 'all' ? models : models.filter((m) => getModelCategory(m.series) === filter)

  const sorted = [...filtered].sort((a, b) => b.score_single - a.score_single)

  const maxSingle = Math.max(...models.map((m) => m.score_single))
  const maxMulti = Math.max(...models.map((m) => m.score_multi))
  const maxAntutu = Math.max(...models.map((m) => m.antutu_total ?? 0))

  // AnTuTu内訳（CPU/GPU/MEM/UXが揃っているモデルのみ）
  const antutuBreakdown = [...filtered]
    .filter((m) => m.antutu_cpu != null && m.antutu_gpu != null && m.antutu_mem != null && m.antutu_ux != null)
    .sort(
      (a, b) =>
        ((b.antutu_cpu || 0) + (b.antutu_gpu || 0) + (b.antutu_mem || 0) + (b.antutu_ux || 0)) -
        ((a.antutu_cpu || 0) + (a.antutu_gpu || 0) + (a.antutu_mem || 0) + (a.antutu_ux || 0)),
    )
  const maxAntutuTotal = Math.max(...antutuBreakdown.map((m) => (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)), 0)
  const maxAntutuCpu = Math.max(...antutuBreakdown.map((m) => m.antutu_cpu || 0), 0)
  const maxAntutuGpu = Math.max(...antutuBreakdown.map((m) => m.antutu_gpu || 0), 0)
  const maxAntutuMem = Math.max(...antutuBreakdown.map((m) => m.antutu_mem || 0), 0)
  const maxAntutuUx = Math.max(...antutuBreakdown.map((m) => m.antutu_ux || 0), 0)

  return (
    <section className="l-section" id="ranking" aria-labelledby="heading-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-ranking">
          歴代Samsung Galaxy ベンチマーク総合ランキング
        </h2>
        <p className="m-section-desc">Geekbench 6のスコアで歴代Galaxyの性能を比較。中古相場も併記しているのでコスパ重視の方にもおすすめです。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([['all', 'すべて'], ['s', 'Sシリーズ'], ['a', 'Aシリーズ'], ['z', '折りたたみ(Z)']] as const).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${filter === key ? ' is-active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table bench-ranking-table">
              <caption className="visually-hidden">歴代Samsung Galaxy Geekbench 6 / AnTuTu ベンチマークランキング</caption>
              <thead>
                <tr>
                  <th scope="col">順位</th>
                  <th scope="col" className="bench-ranking-table__model">モデル</th>
                  <th scope="col">シングル</th>
                  <th scope="col">マルチ</th>
                  <th scope="col">AnTuTu</th>
                  <th scope="col">中古相場</th>
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
                      <th scope="row" className="bench-ranking-table__model-cell">
                        <div className="bench-model-link">
                          {m.image && m.image.startsWith('/') && (
                            <Image src={m.image} alt={m.model} width={40} height={40} className="bench-model-img" />
                          )}
                          <span className="bench-model-info">
                            <Link prefetch={false} href={`/galaxy/${m.slug}/`} className="bench-model-name">{m.model}</Link>
                            <span className="bench-model-chip">{m.cpu}</span>
                          </span>
                        </div>
                      </th>
                      <td><BenchBar value={m.score_single} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={m.score_multi} maxValue={maxMulti} color="#f0a030" /></td>
                      <td>
                        {m.antutu_total != null
                          ? <BenchBar value={m.antutu_total} maxValue={maxAntutu} color="var(--color-primary, #2589d0)" />
                          : <span className="u-text-muted">-</span>}
                      </td>
                      <td className="bench-ranking-table__price-cell">
                        {m.minPrice ? `¥${m.minPrice.toLocaleString()}` : '-'}
                      </td>
                      <td>
                        {(() => {
                          const url = getIosysUrl(shopLinks, m.id)
                          return url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary m-btn--sm">
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
        </StickyTableWrapper>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            ランキングはGeekbench 6のシングルコアスコア順で並べています。マルチコア・AnTuTu v11総合スコアも併記しているので、用途に合わせて見比べてください。
          </p>
        </div>

        {antutuBreakdown.length > 0 && (
          <div className="u-mt-3xl">
            <h3 className="m-section-heading m-section-heading--md" id="heading-antutu-breakdown" style={{ textAlign: 'left' }}>
              AnTuTu v11 内訳スコア（合計 / CPU / GPU / MEM / UX）
            </h3>
            <p className="m-section-desc" style={{ textAlign: 'left' }}>
              AnTuTu総合スコアの内訳です。CPUは演算処理、GPUは3D描画、MEMはメモリ／ストレージ速度、UXは日常操作の快適性を表します。得意分野を見比べる際にご活用ください。
            </p>

            <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
              <div className="m-table-scroll">
                <table className="m-table m-table--sticky-col bench-table">
                  <caption className="visually-hidden">歴代Samsung Galaxy AnTuTu Benchmark v10 内訳スコア比較</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="bench-table__sticky">モデル</th>
                      <th scope="col">合計</th>
                      <th scope="col">CPU</th>
                      <th scope="col">GPU</th>
                      <th scope="col">MEM</th>
                      <th scope="col">UX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {antutuBreakdown.map((m) => {
                      const total = (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
                      return (
                        <tr key={m.id}>
                          <th scope="row" className="bench-table__sticky u-shrink">
                            <Link prefetch={false} href={`/galaxy/${m.slug}/`}>{m.model}</Link>
                          </th>
                          <td><BenchBar value={total}        maxValue={maxAntutuTotal} color="var(--color-primary, #2589d0)" /></td>
                          <td><BenchBar value={m.antutu_cpu!} maxValue={maxAntutuCpu}   color="#e74c6f" /></td>
                          <td><BenchBar value={m.antutu_gpu!} maxValue={maxAntutuGpu}   color="#34a853" /></td>
                          <td><BenchBar value={m.antutu_mem!} maxValue={maxAntutuMem}   color="#34a853" /></td>
                          <td><BenchBar value={m.antutu_ux!}  maxValue={maxAntutuUx}    color="#f0a030" /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </StickyTableWrapper>
          </div>
        )}
      </div>
    </section>
  )
}
