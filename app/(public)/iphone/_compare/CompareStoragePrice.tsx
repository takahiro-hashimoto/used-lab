/**
 * ストレージ容量別の中古価格比較テーブル
 * 各容量ごとに最新ログの平均最安値を算出し、2モデルを並べて比較
 */

import Link from 'next/link'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import styles from './CompareStoragePrice.module.css'

type Props = {
  id: string
  title: string
  desc?: string
  modelL: IPhoneModel
  modelR: IPhoneModel
  nameL: string
  nameR: string
  priceLogsL: IPhonePriceLog[]
  priceLogsR: IPhonePriceLog[]
}

/** ストレージ値を表示用ラベルに変換 */
function formatStorage(storage: string): string {
  const num = parseInt(storage, 10)
  if (num >= 1000) return `${num / 1000}TB`
  return `${num}GB`
}

/** ストレージ値を数値に変換（ソート用） */
function storageToNumber(storage: string): number {
  return parseInt(storage, 10)
}

/** 3ショップの最安値の平均を算出 */
function calcAvgMin(log: IPhonePriceLog): number | null {
  const mins: number[] = []
  if (log.iosys_min && log.iosys_min > 0) mins.push(log.iosys_min)
  if (log.geo_min && log.geo_min > 0) mins.push(log.geo_min)
  if (log.janpara_min && log.janpara_min > 0) mins.push(log.janpara_min)
  if (mins.length === 0) return null
  return Math.round(mins.reduce((a, b) => a + b, 0) / mins.length)
}

/** ログ配列をストレージ別にグループ化し、各容量の最新ログから平均最安値を返す */
function getStoragePriceMap(logs: IPhonePriceLog[]): Map<string, number | null> {
  const grouped = new Map<string, IPhonePriceLog[]>()

  for (const log of logs) {
    if (!log.storage) continue
    const key = log.storage
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(log)
  }

  const result = new Map<string, number | null>()
  for (const [storage, storageLogs] of grouped) {
    // 最新ログを取得
    const sorted = storageLogs.sort(
      (a, b) => b.logged_at.localeCompare(a.logged_at),
    )
    result.set(storage, calcAvgMin(sorted[0]))
  }

  return result
}

/** 価格を ¥XX,XXX 形式でフォーマット */
function formatPrice(price: number | null): string {
  if (price == null) return '-'
  return `¥${price.toLocaleString()}`
}

const winCellStyle: React.CSSProperties = {
  color: 'var(--color-primary)',
  fontWeight: 700,
}

export default function CompareStoragePrice({
  id,
  title,
  desc,
  nameL,
  nameR,
  priceLogsL,
  priceLogsR,
}: Props) {
  const mapL = getStoragePriceMap(priceLogsL)
  const mapR = getStoragePriceMap(priceLogsR)

  // 両モデルのストレージキーを統合
  const allStorages = new Set([...mapL.keys(), ...mapR.keys()])

  // ストレージ分化された価格がなければ null を返す
  if (allStorages.size === 0) return null

  // 昇順ソート
  const sortedStorages = [...allStorages].sort(
    (a, b) => storageToNumber(a) - storageToNumber(b),
  )

  return (
    <section className="l-section" id={id} aria-labelledby={`heading-${id}`}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={`heading-${id}`}>
          {title}
        </h2>
        {desc && <p className="m-section-desc">{desc}</p>}

        <div className="m-card m-card--shadow" style={{ padding: 0, overflow: 'visible' }}>
            <table className={`m-table m-table--center ${styles.table}`} style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th scope="col" style={{ position: 'static' }}>容量</th>
                  <th scope="col" style={{ position: 'static' }}>{nameL}</th>
                  <th scope="col" style={{ position: 'static' }}>{nameR}</th>
                </tr>
              </thead>
              <tbody>
                {sortedStorages.map((storage) => {
                  const priceL = mapL.get(storage) ?? null
                  const priceR = mapR.get(storage) ?? null

                  // 勝者判定（安い方が勝ち、null は負け扱い）
                  let winL = false
                  let winR = false
                  if (priceL != null && priceR != null) {
                    if (priceL < priceR) winL = true
                    else if (priceR < priceL) winR = true
                  } else if (priceL != null && priceR == null) {
                    winL = true
                  } else if (priceR != null && priceL == null) {
                    winR = true
                  }

                  return (
                    <tr key={storage}>
                      <th scope="row">{formatStorage(storage)}</th>
                      <td style={winL ? winCellStyle : undefined}>
                        {formatPrice(priceL)}
                      </td>
                      <td style={winR ? winCellStyle : undefined}>
                        {formatPrice(priceR)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            ストレージ容量の選び方は「<Link href="/iphone/storage-guide/">iPhoneストレージ容量ガイド</Link>」を参考にしてください。
          </p>
        </div>
      </div>
    </section>
  )
}
