'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { ProductShopLink } from '@/lib/types'
import { getIosysUrl } from '@/lib/utils/benchmark-helpers'

export type PixelBenchModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  ram: string | null
  tensor_gen: string | null
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

type FilterCategory = 'all' | 'pro' | 'standard' | 'a'

function getModelCategory(model: string): 'pro' | 'standard' | 'a' {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  // Pixel 6a / 7a / 8a / 9a などの廉価版（末尾 a）
  if (/\d+a\b/.test(lower) || /\d+a$/.test(lower.trim())) return 'a'
  return 'standard'
}

export default function BenchmarkRanking({ models, shopLinks }: { models: PixelBenchModel[]; shopLinks: ProductShopLink[] }) {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const filtered = filter === 'all' ? models : models.filter((m) => getModelCategory(m.model) === filter)

  const sorted = [...filtered].sort((a, b) => b.score_single - a.score_single)

  const maxSingle = Math.max(...models.map((m) => m.score_single))
  const maxMulti = Math.max(...models.map((m) => m.score_multi))
  const maxAntutu = Math.max(...models.map((m) => m.antutu_total ?? 0))

  // AnTuTu 内訳（合計/CPU/GPU/MEM/UX）— 4項目が全て揃うモデルのみ
  const antutuModels = filtered.filter(
    (m) => m.antutu_cpu != null && m.antutu_gpu != null && m.antutu_mem != null && m.antutu_ux != null,
  )
  const antutuTotals = antutuModels
    .map((m) => ({ m, total: (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0) }))
    .sort((a, b) => b.total - a.total)
  const maxAntutuTotal = Math.max(...antutuTotals.map((x) => x.total), 0)
  const maxAntutuCpu = Math.max(...antutuModels.map((m) => m.antutu_cpu || 0), 0)
  const maxAntutuGpu = Math.max(...antutuModels.map((m) => m.antutu_gpu || 0), 0)
  const maxAntutuMem = Math.max(...antutuModels.map((m) => m.antutu_mem || 0), 0)
  const maxAntutuUx = Math.max(...antutuModels.map((m) => m.antutu_ux || 0), 0)

  return (
    <section className="l-section" id="ranking" aria-labelledby="heading-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-ranking">
          歴代Google Pixel ベンチマーク総合ランキング
        </h2>
        <p className="m-section-desc">Geekbench 6のスコアで歴代Pixelの性能を比較。中古相場も併記しているのでコスパ重視の方にもおすすめです。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([['all', 'すべて'], ['pro', 'Pro'], ['standard', 'スタンダード'], ['a', 'aシリーズ']] as const).map(([key, label]) => (
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
              <caption className="visually-hidden">歴代Google Pixel Geekbench 6 / AnTuTu ベンチマークランキング</caption>
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
                            <Link prefetch={false} href={`/pixel/${m.slug}/`} className="bench-model-name">{m.model}</Link>
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

        {antutuModels.length > 0 && (
          <div className="u-mt-3xl">
            <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
              AnTuTu v11 スコア内訳（合計 / CPU / GPU / MEM / UX）
            </h3>
            <p className="m-section-desc" style={{ textAlign: 'left' }}>
              AnTuTu総合スコアの内訳です。CPU・GPU・メモリ・UXの各項目を比較することで、ゲーム性能や日常操作の快適さなど、どの分野が得意な端末かを把握できます。
            </p>

            <div className="l-grid l-grid--4col l-grid--gap-lg u-mb-xl">
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">CPU</p>
                <p className="glossary-item-desc">デバイスの演算処理能力。アプリの起動や動作速度、OSの基本操作の速さに直結します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">GPU</p>
                <p className="glossary-item-desc">3Dグラフィックスの描画性能。主に高負荷な3Dゲームや動画編集の処理速度に影響します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">MEM</p>
                <p className="glossary-item-desc">RAMとストレージのデータ読み書き速度。アプリの切り替えやロード時間、ファイル転送速度に影響します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">UX</p>
                <p className="glossary-item-desc">アプリのレスポンス速度や並行処理能力など、日常操作の総合的な快適性を評価する指標です。</p>
              </div>
            </div>

            <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
              <div className="m-table-scroll">
                <table className="m-table m-table--sticky-col bench-table">
                  <caption className="visually-hidden">歴代Google Pixel AnTuTu v11 スコア内訳比較</caption>
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
                    {antutuTotals.map(({ m, total }) => (
                      <tr key={m.id}>
                        <th scope="row" className="bench-table__sticky u-shrink">
                          <Link prefetch={false} href={`/pixel/${m.slug}/`} className="bench-model-name">{m.model}</Link>
                        </th>
                        <td><BenchBar value={total}        maxValue={maxAntutuTotal} color="var(--color-primary, #2589d0)" /></td>
                        <td><BenchBar value={m.antutu_cpu!} maxValue={maxAntutuCpu}   color="#e74c6f" /></td>
                        <td><BenchBar value={m.antutu_gpu!} maxValue={maxAntutuGpu}   color="#34a853" /></td>
                        <td><BenchBar value={m.antutu_mem!} maxValue={maxAntutuMem}   color="#34a853" /></td>
                        <td><BenchBar value={m.antutu_ux!}  maxValue={maxAntutuUx}    color="#f0a030" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </StickyTableWrapper>
          </div>
        )}

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            ランキングはGeekbench 6のシングルコアスコア順で並べています。マルチコア・AnTuTu v11総合スコアも併記しているので、用途に合わせて見比べてください。
          </p>
        </div>
      </div>
    </section>
  )
}
