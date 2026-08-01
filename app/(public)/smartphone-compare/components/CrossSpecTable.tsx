import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import ContentImage from '@/app/components/ContentImage'
import { BenchBar } from '@/app/components/spec-table-utils'
import RatingMark from '@/app/components/RatingMark'
import { formatRelease } from '@/app/(public)/iphone/price-info/components/cardFormat'
import { byPerf, yen, type Brand, type NormalizedPhone } from '../lib'

const BRAND_ORDER: Brand[] = ['iphone', 'pixel', 'galaxy']

/** 各ブランド上位 N 台を代表として抽出し、性能順に並べる */
function pickRepresentatives(phones: NormalizedPhone[], perBrand: number): NormalizedPhone[] {
  const reps: NormalizedPhone[] = []
  for (const brand of BRAND_ORDER) {
    reps.push(...phones.filter((p) => p.brand === brand).sort(byPerf).slice(0, perBrand))
  }
  return reps.sort(byPerf)
}

export default function CrossSpecTable({ phones }: { phones: NormalizedPhone[] }) {
  const rows = pickRepresentatives(phones, 5)
  if (rows.length === 0) return null

  const maxAntutu = Math.max(...rows.map((r) => r.antutuTotal ?? 0), 0)
  const maxSingle = Math.max(...rows.map((r) => r.scoreSingle ?? 0), 0)
  const maxMulti = Math.max(...rows.map((r) => r.scoreMulti ?? 0), 0)

  // 先頭列（スペック名）を横スクロールでも固定
  const stickyFirst: CSSProperties = { position: 'sticky', left: 0, background: 'var(--color-bg)', zIndex: 2 }

  // 行＝スペック、列＝機種（転置）。各スペックの1行分を定義
  const specRows: { label: string; render: (r: NormalizedPhone) => ReactNode }[] = [
    { label: '中古相場', render: (r) => yen(r.price) },
    { label: '発売日', render: (r) => (r.releaseDate ? formatRelease(r.releaseDate) : '-') },
    { label: 'AnTuTu総合', render: (r) => (r.antutuTotal != null ? <BenchBar value={r.antutuTotal} maxValue={maxAntutu} color="#2589d0" /> : '-') },
    { label: 'GB single', render: (r) => (r.scoreSingle != null ? <BenchBar value={r.scoreSingle} maxValue={maxSingle} color="#e74c6f" /> : '-') },
    { label: 'GB multi', render: (r) => (r.scoreMulti != null ? <BenchBar value={r.scoreMulti} maxValue={maxMulti} color="#f0a030" /> : '-') },
    { label: '画面', render: (r) => r.display ?? '-' },
    { label: 'メインカメラ', render: (r) => r.mainCamera ?? '-' },
    { label: '電池', render: (r) => r.battery ?? '-' },
    { label: '重量', render: (r) => r.weight ?? '-' },
    { label: 'サポート', render: (r) => r.supportUntil ?? '-' },
    { label: 'FeliCa', render: (r) => (r.felica == null ? '-' : <RatingMark mark={r.felica ? '◯' : '×'} size="sm" />) },
  ]

  return (
    <section className="l-section" id="cross-spec" aria-labelledby="heading-cross-spec">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-cross-spec">
          横断スペック＆ベンチマーク比較表
        </h2>
        <p className="m-section-desc">
          iPhone・Pixel・Galaxy の代表モデルを1つの表にまとめました。
        </p>
        <p className="m-section-desc">
          価格・発売日・AnTuTu・Geekbench・画面・カメラ・電池・重量・サポート期限・FeliCa をまとめて見比べられます。
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table">
              <caption className="visually-hidden">iPhone・Pixel・Galaxy 横断スペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ position: 'sticky', left: 0, zIndex: 3, background: 'var(--color-bg-dark)', minWidth: 96 }}>
                    モデル
                  </th>
                  {rows.map((r) => (
                    <th scope="col" key={`${r.brand}-${r.slug}`} style={{ minWidth: 128 }}>
                      <Link prefetch={false} href={r.detailHref} style={{ color: 'inherit' }}>{r.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((sr, rowIdx) => (
                  <tr key={sr.label}>
                    <th scope="row" style={stickyFirst}>{sr.label}</th>
                    {rows.map((r) => (
                      <td key={`${r.brand}-${r.slug}`}>
                        {/* 機種名だけだと横スクロール中に見失いやすいので、先頭行に画像を添える。
                            見出し（th）に入れると行の高さが揃わないため tbody 側に置く */}
                        {rowIdx === 0 && r.imageSrc && (
                          <ContentImage
                            src={r.imageSrc}
                            alt=""
                            width={50}
                            height={65}
                            loading="lazy"
                            sizes="50px"
                            className="spec-compare-table__cell-img"
                          />
                        )}
                        {sr.render(r)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            AnTuTu総合バーは表内の最高スコアを100%として相対表示しています。iPhone は AnTuTu の内訳（CPU/GPU/MEM/UX）合計、メインカメラ欄はセンサー情報を掲載しています。
          </p>
        </div>
      </div>
    </section>
  )
}
