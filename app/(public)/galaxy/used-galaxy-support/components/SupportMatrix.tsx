'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { GalaxyModel } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'

/* ------------------------------------------------------------------
   support_until("YYYY-MM") → Date（月初）
   ------------------------------------------------------------------ */
function parseSupportUntil(str: string | null): Date | null {
  if (!str) return null
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return null
  return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, 1)
}

/** "2032-01" → "2032年1月" */
function formatSupportUntil(str: string | null): string {
  if (!str) return '-'
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return str
  return `${m[1]}年${parseInt(m[2], 10)}月`
}

/**
 * 更新保証の内訳表示。
 * Galaxy は世代・シリーズで保証年数が異なる。
 * S24/S25・Flip6/Fold6（update_years=7）はOS・セキュリティとも7年、
 * S22/S23（update_years=5）はセキュリティ5年・OSメジャー4回、
 * それ以前やAシリーズ（3〜4）はOS3〜4回・セキュリティ数年。
 */
function updatePolicyLabel(years: number | null): { main: string; sub: string } {
  if (years === 7) return { main: '7年', sub: 'OS・セキュリティ' }
  if (years === 5) return { main: '5年', sub: 'OS更新は4回' }
  if (years != null) return { main: `${years}年`, sub: 'OS更新は数回' }
  return { main: '-', sub: '' }
}

type Props = {
  models: GalaxyModel[]
}

export default function SupportMatrix({ models }: Props) {
  // 残り年数は「現在日」に依存するため、クライアントのマウント後に算出する。
  // （サーバ側 new Date() だと revalidate:false でビルド時に固定されてしまうため）
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date())
  }, [])

  // 発売日が新しい順に並べる
  const sorted = [...models].sort((a, b) => {
    const ay = a.date ? new Date(a.date.replace(/\//g, '-')).getTime() : 0
    const by = b.date ? new Date(b.date.replace(/\//g, '-')).getTime() : 0
    return by - ay
  })

  function remainingLabel(model: GalaxyModel): string {
    if (model.last_android) return '終了済み'
    const until = parseSupportUntil(model.support_until)
    if (!until) return '-'
    if (!now) return '…' // マウント前プレースホルダ（ハイドレーション不一致を避ける）
    const diffMs = until.getTime() - now.getTime()
    if (diffMs <= 0) return '終了'
    const years = diffMs / (365.25 * 24 * 60 * 60 * 1000)
    return `約${(Math.round(years * 10) / 10).toFixed(1)}年`
  }

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          Galaxy機種別 Androidアップデート・サポート期間一覧表
        </h2>
        <p className="m-section-desc">
          Samsung Galaxyは機種ごとにアップデート保証年数とサポート終了予定が定められていますが、
          Pixelと違い<strong>シリーズ・世代で年数の差が大きい</strong>のが特徴です。
          <br />
          お使いのGalaxyが「あと何年アップデートを受けられるか」の目安としてご活用ください。
        </p>

        <p className="m-section-heading m-section-heading--sm">Galaxy機種別 サポート状況一覧</p>

        <StickyTableWrapper floatingHeader>
          <div className="m-scroll-x m-scroll-x--styled m-table-scroll">
            <table className="m-table m-table--sticky-col">
              <caption className="visually-hidden">Samsung Galaxy機種別 サポート期間一覧表</caption>
              <thead>
                <tr>
                  <th>機種</th>
                  <th>発売日</th>
                  <th>更新保証</th>
                  <th>サポート終了予定</th>
                  <th>残り年数</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((m) => {
                  const policy = updatePolicyLabel(m.update_years)
                  return (
                    <tr key={m.id}>
                      <th className="u-shrink">
                        <Link prefetch={false} href={`/galaxy/${m.slug}`}>{m.model}</Link>
                      </th>
                      <td>{formatReleaseDate(m.date) || '-'}</td>
                      <td>
                        <strong>{policy.main}</strong>
                        {policy.sub && (
                          <>
                            <br />
                            <small>{policy.sub}</small>
                          </>
                        )}
                      </td>
                      <td>
                        {m.last_android ? (
                          <strong>終了済み</strong>
                        ) : (
                          <>
                            <strong>{formatSupportUntil(m.support_until)}</strong>
                            <br />
                            <small>頃まで</small>
                          </>
                        )}
                      </td>
                      <td>{remainingLabel(m)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </StickyTableWrapper>

        <p className="m-footnote">
          ※ 目安として、<strong>Galaxy S24／S25・Z Flip6／Z Fold6以降はOS・セキュリティとも7年</strong>、
          S22／S23世代は<strong>セキュリティ更新5年・OSメジャー更新4回</strong>、S20／S21世代やAシリーズは
          機種により<strong>OS更新2〜4回・セキュリティ数年</strong>と幅があります。
          <br />
          ※ 更新保証年数・終了予定は
          <a href="https://www.samsung.com/jp/support/mobile-devices/" target="_blank" rel="noopener noreferrer">Samsung公式サイト</a>
          の情報を基にしています。残り年数は本日時点での概算です。
        </p>
      </div>
    </section>
  )
}
