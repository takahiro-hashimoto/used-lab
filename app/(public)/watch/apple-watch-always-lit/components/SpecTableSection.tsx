'use client'

import { useState, useMemo } from 'react'

type Series = 'normal' | 'se' | 'ultra'

interface WatchModel {
  name: string
  slug: string
  series: Series
  size: string
  releaseDate: string
  releaseDateSort: number
  cpu: string
  material: string
  storage: string
  battery: string
  brightness: string
  waterResist: string
  alwaysOn: boolean
  fastCharge: boolean
  bloodOxygen: boolean
  ecg: boolean
  crashDetect: boolean
  fallDetect: boolean
  skinTemp: boolean
  doubleTap: boolean
  jpInput: boolean
  sleepApnea: boolean
}

const models: WatchModel[] = [
  { name: 'Apple Watch SE', slug: 'se', series: 'se', size: '40mm / 44mm', releaseDate: '2020年9月', releaseDateSort: 202009, cpu: 'S5 SiP', material: 'アルミニウム', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: false, fastCharge: false, bloodOxygen: false, ecg: false, crashDetect: false, fallDetect: true, skinTemp: false, doubleTap: false, jpInput: false, sleepApnea: false },
  { name: 'Apple Watch SE2', slug: 'se2-2', series: 'se', size: '40mm / 44mm', releaseDate: '2022年9月', releaseDateSort: 202209, cpu: 'S8 SiP', material: 'アルミニウム', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: false, fastCharge: false, bloodOxygen: false, ecg: false, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: false, jpInput: false, sleepApnea: false },
  { name: 'Apple Watch SE3', slug: 'se3-2', series: 'se', size: '40mm / 44mm', releaseDate: '2025年9月', releaseDateSort: 202509, cpu: 'S10 SiP', material: 'アルミニウム', storage: '64GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: false, ecg: false, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: false, sleepApnea: true },
  { name: 'Apple Watch 4', slug: 'series4', series: 'normal', size: '40mm / 44mm', releaseDate: '2018年9月', releaseDateSort: 201809, cpu: 'S4 SiP', material: 'アルミニウム\nステンレス', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: false, fastCharge: false, bloodOxygen: false, ecg: false, crashDetect: false, fallDetect: true, skinTemp: false, doubleTap: false, jpInput: false, sleepApnea: false },
  { name: 'Apple Watch 5', slug: 'series5', series: 'normal', size: '40mm / 44mm', releaseDate: '2019年9月', releaseDateSort: 201909, cpu: 'S5 SiP', material: 'アルミニウム\nステンレス\nチタニウム', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: false, bloodOxygen: false, ecg: true, crashDetect: false, fallDetect: true, skinTemp: false, doubleTap: false, jpInput: false, sleepApnea: false },
  { name: 'Apple Watch 6', slug: 'series6', series: 'normal', size: '40mm / 44mm', releaseDate: '2020年9月', releaseDateSort: 202009, cpu: 'S6 SiP', material: 'アルミニウム\nステンレス\nチタニウム', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: false, bloodOxygen: true, ecg: true, crashDetect: false, fallDetect: true, skinTemp: false, doubleTap: false, jpInput: false, sleepApnea: false },
  { name: 'Apple Watch 7', slug: 'series7', series: 'normal', size: '41mm / 45mm', releaseDate: '2021年10月', releaseDateSort: 202110, cpu: 'S7 SiP', material: 'アルミニウム\nステンレス\nチタニウム', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: false, fallDetect: true, skinTemp: false, doubleTap: false, jpInput: true, sleepApnea: false },
  { name: 'Apple Watch 8', slug: 'series8', series: 'normal', size: '41mm / 45mm', releaseDate: '2022年9月', releaseDateSort: 202209, cpu: 'S8 SiP', material: 'アルミニウム\nステンレス', storage: '32GB', battery: '最大18時間', brightness: '1,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: false, jpInput: true, sleepApnea: false },
  { name: 'Apple Watch 9', slug: 'series9', series: 'normal', size: '41mm / 45mm', releaseDate: '2023年9月', releaseDateSort: 202309, cpu: 'S9 SiP', material: 'アルミニウム\nステンレス', storage: '64GB', battery: '最大18時間', brightness: '2,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: true, sleepApnea: true },
  { name: 'Apple Watch 10', slug: 'series10', series: 'normal', size: '42mm / 46mm', releaseDate: '2024年9月', releaseDateSort: 202409, cpu: 'S10 SiP', material: 'アルミニウム\nチタニウム', storage: '64GB', battery: '最大18時間', brightness: '2,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: true, sleepApnea: true },
  { name: 'Apple Watch 11', slug: 'series11', series: 'normal', size: '42mm / 46mm', releaseDate: '2025年9月', releaseDateSort: 202509, cpu: 'S10 SiP', material: 'アルミニウム\nチタニウム', storage: '64GB', battery: '最大24時間', brightness: '2,000ニト', waterResist: '50m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: true, sleepApnea: true },
  { name: 'Apple Watch Ultra', slug: 'ultra', series: 'ultra', size: '49mm', releaseDate: '2022年9月', releaseDateSort: 202209, cpu: 'S8 SiP', material: 'チタニウム', storage: '32GB', battery: '最大36時間', brightness: '2,000ニト', waterResist: '100m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: false, jpInput: true, sleepApnea: false },
  { name: 'Apple Watch Ultra2', slug: 'ultra2', series: 'ultra', size: '49mm', releaseDate: '2023年9月', releaseDateSort: 202309, cpu: 'S9 SiP', material: 'チタニウム', storage: '64GB', battery: '最大54時間', brightness: '3,000ニト', waterResist: '100m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: true, sleepApnea: true },
  { name: 'Apple Watch Ultra3', slug: 'ultra3', series: 'ultra', size: '49mm', releaseDate: '2025年9月', releaseDateSort: 202509, cpu: 'S10 SiP', material: 'チタニウム', storage: '64GB', battery: '最大72時間', brightness: '3,000ニト', waterResist: '100m', alwaysOn: true, fastCharge: true, bloodOxygen: true, ecg: true, crashDetect: true, fallDetect: true, skinTemp: true, doubleTap: true, jpInput: true, sleepApnea: true },
]

const specRows: { label: string; key: keyof WatchModel; type: 'text' | 'bool' }[] = [
  { label: 'サイズ', key: 'size', type: 'text' },
  { label: '発売日', key: 'releaseDate', type: 'text' },
  { label: 'CPU', key: 'cpu', type: 'text' },
  { label: '素材', key: 'material', type: 'text' },
  { label: '容量', key: 'storage', type: 'text' },
  { label: 'バッテリー', key: 'battery', type: 'text' },
  { label: '輝度', key: 'brightness', type: 'text' },
  { label: '耐水性能', key: 'waterResist', type: 'text' },
  { label: '常時点灯', key: 'alwaysOn', type: 'bool' },
  { label: '急速充電', key: 'fastCharge', type: 'bool' },
  { label: '血中酸素濃度', key: 'bloodOxygen', type: 'bool' },
  { label: '心電図測定', key: 'ecg', type: 'bool' },
  { label: '事故検出機能', key: 'crashDetect', type: 'bool' },
  { label: '転倒検出機能', key: 'fallDetect', type: 'bool' },
  { label: '皮膚温測定', key: 'skinTemp', type: 'bool' },
  { label: 'ダブルタップ', key: 'doubleTap', type: 'bool' },
  { label: '日本語入力', key: 'jpInput', type: 'bool' },
  { label: '睡眠時無呼吸通知', key: 'sleepApnea', type: 'bool' },
]

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'normal' | 'se' | 'ultra' | 'alwaysOn' | 'fastCharge'

export default function SpecTableSection() {
  const [sort, setSort] = useState<SortOrder>('old')
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    let list = [...models]
    if (filter === 'normal') list = list.filter(m => m.series === 'normal')
    else if (filter === 'se') list = list.filter(m => m.series === 'se')
    else if (filter === 'ultra') list = list.filter(m => m.series === 'ultra')
    else if (filter === 'alwaysOn') list = list.filter(m => m.alwaysOn)
    else if (filter === 'fastCharge') list = list.filter(m => m.fastCharge)

    list.sort((a, b) => sort === 'old' ? a.releaseDateSort - b.releaseDateSort : b.releaseDateSort - a.releaseDateSort)
    return list
  }, [sort, filter])

  return (
    <section className="l-section l-section--bg-subtle" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          ディスプレイ常時点灯を搭載しているモデル一覧
        </h2>
        <p className="m-section-desc">
          歴代Apple Watchの常時点灯対応状況を含むスペック比較表です。
        </p>

        {/* フィルターUI */}
        <div className="spec-filter" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">並び替え</span>
            <div className="spec-filter__tags">
              {([
                ['old', '発売日が古い順'],
                ['new', '発売日が新しい順'],
              ] as [SortOrder, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${sort === key ? ' is-active' : ''}`}
                  onClick={() => setSort(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['normal', 'ノーマル'],
                ['se', 'SE'],
                ['ultra', 'Ultra'],
                ['alwaysOn', '常時点灯あり'],
                ['fastCharge', '急速充電あり'],
              ] as [FilterType, string][]).map(([key, label]) => (
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

        {/* テーブル */}
        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <caption className="visually-hidden">歴代Apple Watch スペック比較表</caption>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  {filtered.map(m => (
                    <th key={m.slug} scope="col" style={{ whiteSpace: 'nowrap' }}>
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">画像</th>
                  {filtered.map(m => (
                    <td key={`img-${m.slug}`}>
                      <img
                        src={`/images/watch/${m.slug}.png`}
                        alt={`${m.name}の商品画像`}
                        width={60}
                        height={60}
                        loading="lazy"
                        style={{ display: 'block', margin: '0 auto' }}
                      />
                    </td>
                  ))}
                </tr>
                {specRows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.label}</th>
                    {filtered.map(m => {
                      const val = m[row.key]
                      return (
                        <td key={m.slug} style={{ whiteSpace: 'pre-line' }}>
                          {row.type === 'bool' ? (
                            val ? (
                              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>◯</span>
                            ) : (
                              <span style={{ color: 'var(--color-text-tertiary)' }}>×</span>
                            )
                          ) : (
                            String(val)
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                {/* ショップリンク */}
                <tr>
                  <th scope="row">イオシス</th>
                  {filtered.map(m => (
                    <td key={`iosys-${m.slug}`}>
                      <a href={`https://iosys.co.jp/items?keyword=Apple+Watch+${encodeURIComponent(m.name.replace('Apple Watch ', ''))}`} target="_blank" rel="noopener noreferrer nofollow">中古価格を見る</a>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Amazon</th>
                  {filtered.map(m => (
                    <td key={`amz-${m.slug}`}>
                      <a href={`https://www.amazon.co.jp/s?k=Apple+Watch+${encodeURIComponent(m.name.replace('Apple Watch ', ''))}`} target="_blank" rel="noopener noreferrer nofollow">中古価格を見る</a>
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
