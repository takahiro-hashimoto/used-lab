'use client'

import { BoolCell } from '@/app/components/spec-table-utils'

type PencilSpec = {
  name: string
  pressureSensitivity: boolean
  tiltSensitivity: boolean
  squeeze: boolean
  doubleTap: boolean
  hover: boolean
  findMy: boolean
  pairing: string
  magnetic: boolean
  length: string
  weight: string
  amazonUrl: string
}

const PENCILS: PencilSpec[] = [
  {
    name: 'Apple Pencil\nPro',
    pressureSensitivity: true,
    tiltSensitivity: true,
    squeeze: true,
    doubleTap: true,
    hover: true,
    findMy: true,
    pairing: 'マグネット取付',
    magnetic: true,
    length: '166mm',
    weight: '19.15g',
    amazonUrl: 'https://www.amazon.co.jp/dp/B0D3J71RM7?tag=and-and-22',
  },
  {
    name: 'Apple Pencil\n第2世代',
    pressureSensitivity: true,
    tiltSensitivity: true,
    squeeze: false,
    doubleTap: true,
    hover: true,
    findMy: false,
    pairing: 'マグネット取付',
    magnetic: true,
    length: '166mm',
    weight: '20.7g',
    amazonUrl: 'https://www.amazon.co.jp/dp/B07K1NDB7Q?tag=and-and-22',
  },
  {
    name: 'Apple Pencil\nUSB-C',
    pressureSensitivity: false,
    tiltSensitivity: true,
    squeeze: false,
    doubleTap: false,
    hover: false,
    findMy: false,
    pairing: 'USB-Cケーブル',
    magnetic: true,
    length: '155mm',
    weight: '20.5g',
    amazonUrl: 'https://www.amazon.co.jp/dp/B0CSWDP9F7?tag=and-and-22',
  },
  {
    name: 'Apple Pencil\n第1世代',
    pressureSensitivity: true,
    tiltSensitivity: true,
    squeeze: false,
    doubleTap: false,
    hover: false,
    findMy: false,
    pairing: 'Lightning',
    magnetic: false,
    length: '175.7mm',
    weight: '20.7g',
    amazonUrl: 'https://www.amazon.co.jp/dp/B018MX3PNU?tag=and-and-22',
  },
]

type SpecRow = {
  label: string
  category?: boolean
  render: (p: PencilSpec) => React.ReactNode
}

const SPEC_ROWS: SpecRow[] = [
  { label: '書き味・操作性', category: true, render: () => null },
  { label: '筆圧感知', render: (p) => <BoolCell value={p.pressureSensitivity} /> },
  { label: '傾き検知', render: (p) => <BoolCell value={p.tiltSensitivity} /> },
  { label: 'スクイーズ / 回転', render: (p) => <BoolCell value={p.squeeze} /> },
  { label: 'ダブルタップ', render: (p) => <BoolCell value={p.doubleTap} /> },
  { label: 'ホバー', render: (p) => <BoolCell value={p.hover} /> },
  { label: '利便性・充電', category: true, render: () => null },
  { label: '「探す」アプリ', render: (p) => p.findMy ? '対応' : <span className="m-spec-row__dash" aria-label="非対応">ー</span> },
  { label: 'ペアリング・充電', render: (p) => p.pairing },
  { label: '磁石での固定', render: (p) => <BoolCell value={p.magnetic} /> },
]

export default function PencilSpecTable() {
  return (
    <section className="l-section" id="pencil-spec" aria-labelledby="heading-pencil-spec">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pencil-spec">
          Apple Pencil スペック比較表（できることの違い）
        </h2>
        <p className="m-section-desc">
          Apple Pencil（第1世代、第2世代、USB-C、Proモデル）の違いを比較表にまとめました。
        </p>
        <p className="m-section-desc">
          スペックの高さは<strong>Apple Pencil Pro ＞ 第2世代 ＞ USB-C ＞ 第1世代</strong>の順番になります。
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table spec-compare-table">
              <caption className="visually-hidden">Apple Pencil スペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col" className="spec-compare-table__sticky">機能・スペック</th>
                  {PENCILS.map((p) => (
                    <th key={p.name} scope="col">
                      {p.name.split('\n').map((line, i) => (
                        <span key={i}>{i > 0 && <br />}{line}</span>
                      ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPEC_ROWS.map((row) =>
                  row.category ? (
                    <tr key={row.label} className="spec-compare-table__category-row">
                      <th scope="row" className="spec-compare-table__sticky spec-compare-table__category">
                        {row.label}
                      </th>
                      {PENCILS.map((p) => (
                        <td key={p.name}></td>
                      ))}
                    </tr>
                  ) : (
                    <tr key={row.label}>
                      <th scope="row" className="spec-compare-table__sticky">{row.label}</th>
                      {PENCILS.map((p) => (
                        <td key={p.name}>{row.render(p)}</td>
                      ))}
                    </tr>
                  )
                )}
                {/* リンク行 */}
                <tr className="spec-compare-table__action-row">
                  <th scope="row" className="spec-compare-table__sticky">リンク</th>
                  {PENCILS.map((p) => (
                    <td key={p.name}>
                      <a
                        href={p.amazonUrl}
                        className="m-btn m-btn--primary m-btn--sm"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                      >
                        価格を見る
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
