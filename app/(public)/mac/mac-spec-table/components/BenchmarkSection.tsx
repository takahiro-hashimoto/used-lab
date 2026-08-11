import Link from 'next/link'
import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { MacModel, MacDeviceType } from '@/lib/types'

// MacBook版（macbook-spec-table/components/BenchmarkSection.tsx）が元。
// 変更点は2つ:
//   1. Air/Pro ではなく device_type（iMac / Mac mini / Mac Studio）で表を分ける
//   2. 機種名をモーダルではなく詳細ページへのリンクにした
//      （MacBook版の ModelModal はノート固有のスペックを前提にしているため）

type Props = {
  models: MacModel[]
}

const GROUPS: { type: MacDeviceType; label: string }[] = [
  { type: 'imac', label: 'iMac' },
  { type: 'mac-mini', label: 'Mac mini' },
  { type: 'mac-studio', label: 'Mac Studio' },
]

function BenchTable({
  models,
  caption,
  maxSingle,
  maxMulti,
  maxMetal,
}: {
  models: MacModel[]
  caption: string
  maxSingle: number
  maxMulti: number
  maxMetal: number
}) {
  const sorted = [...models].sort((a, b) => (b.score_single || 0) - (a.score_single || 0))

  return (
    <StickyTableWrapper floatingHeader>
      <div className="m-card m-card--shadow m-table-card">
        <div className="m-table-scroll">
          <table className="m-table bench-table">
            <caption className="visually-hidden">{caption}</caption>
            <thead>
              <tr>
                <th scope="col" className="bench-table__sticky">モデル</th>
                <th scope="col">シングルコア</th>
                <th scope="col">マルチコア</th>
                <th scope="col">Metal</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => (
                <tr key={m.id}>
                  <th scope="row" className="bench-table__sticky u-shrink">
                    <Link prefetch={false} href={`/mac/${m.slug}/`}>{m.shortname || m.model}</Link>
                  </th>
                  <td><BenchBar value={m.score_single!} maxValue={maxSingle} color="#e74c6f" /></td>
                  <td><BenchBar value={m.score_multi!} maxValue={maxMulti} color="#f0a030" /></td>
                  <td><BenchBar value={m.score_metal!} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StickyTableWrapper>
  )
}

export default function BenchmarkSection({ models }: Props) {
  const scored = models.filter(
    (m) => m.score_single != null && m.score_multi != null && m.score_metal != null,
  )
  if (scored.length === 0) return null

  // 3つの表でバーの長さを揃えるため、最大値は全機種から取る
  const maxSingle = Math.max(...scored.map((m) => m.score_single || 0))
  const maxMulti = Math.max(...scored.map((m) => m.score_multi || 0))
  const maxMetal = Math.max(...scored.map((m) => m.score_metal || 0))

  return (
    <section className="l-section" id="benchmark" aria-labelledby="heading-benchmark">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-benchmark">
          歴代iMac・Mac miniのチップ性能・処理速度を比較（ベンチマークスコア）
        </h2>
        <p className="m-section-desc">
          iMac・Mac mini・Mac Studioのチップ性能の違いを可視化するためにGeekbench 6のスコアを用意しました。
        </p>
        <p className="m-section-desc">
          買い替えたらどれくらい処理速度が上がるのか確認するのにご活用ください。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg u-mb-xl">
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">シングルスコア</p>
            <p className="glossary-item-desc">1つのCPUコアの処理性能を示す指標でアプリの起動やWeb閲覧など日常的な操作に影響する</p>
          </div>
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">マルチスコア</p>
            <p className="glossary-item-desc">複数のCPUコアを同時に使ったときの処理能力で動画編集やコード実行などの重たい作業に効果を発揮</p>
          </div>
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">メタルスコア</p>
            <p className="glossary-item-desc">GPUのグラフィック性能を示す指標で、3Dレンダリングや映像編集、ゲームの描画処理に関わる</p>
          </div>
        </div>

        {GROUPS.map(({ type, label }, i) => {
          const group = scored.filter((m) => m.device_type === type)
          if (group.length === 0) return null
          return (
            <div key={type} className={i > 0 ? 'u-mt-2xl' : undefined}>
              <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
                {label}
              </h3>
              <BenchTable
                models={group}
                caption={`${label} Geekbench 6 ベンチマークスコア比較`}
                maxSingle={maxSingle}
                maxMulti={maxMulti}
                maxMetal={maxMetal}
              />
            </div>
          )
        })}

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            スコアは最小構成のチップ（Mac Studioなら Max）の実測中央値です。
            用途別に必要な性能の目安は「<Link prefetch={false} href="/mac/benchmark/">歴代iMac・Mac miniのベンチマーク比較</Link>」で解説しています。
          </p>
        </div>
      </div>
    </section>
  )
}
