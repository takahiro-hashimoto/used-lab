// ============================================================
// 容量フィルタの回帰テスト
//
// 2026-08-10 に実データを照合して見つかった2件の不具合を対象にする。
// どちらも「最小構成の相場」という前提が崩れ、上位容量の個体が
// 相場に混ざって価格を押し上げていた。
// ============================================================

import { describe, it, expect } from 'vitest'
import { capacityMatches } from '../galaxy'
import { buildMatchFn as buildMacbookMatchFn, type RakutenItem } from '../macbook'

const item = (itemName: string): RakutenItem =>
  ({ itemCode: 'x:1', itemName, itemPrice: 100000, shopName: 's', availability: 1 })

describe('galaxy: capacityMatches', () => {
  it('型番検索で返る上位容量を弾く', () => {
    // 検索キーワードに型番(SCG20 等)を使うため容量で絞れず、
    // matchFn で足切りしないと 1TB/512GB が 256GB の相場に混ざる
    expect(capacityMatches('Galaxy S24 Ultra SC-52E[1TB] docomo', '256GB')).toBe(false)
    expect(capacityMatches('Galaxy S24 SCG25[512GB] au オニキスブラック', '256GB')).toBe(false)
  })

  it('一致する容量は通す', () => {
    expect(capacityMatches('Galaxy S24 Ultra SM-S928Q[256GB] SIMフリー', '256GB')).toBe(true)
  })

  it('RAM表記(12GB)をストレージと誤認しない', () => {
    expect(capacityMatches('Galaxy S23 Ultra 12GB/256GB ファントムブラック', '256GB')).toBe(true)
  })

  it('容量表記が無い商品名は判定しない（取りこぼしを防ぐ）', () => {
    expect(capacityMatches('Galaxy S24 Ultra チタニウムブラック', '256GB')).toBe(true)
  })
})

describe('macbook: MacBook Neo の容量チェック', () => {
  const NEO = { model: 'MacBook Neo 13インチ（2026）', cpu: 'A18 Pro', strage: '256GB ~ 512GB' }

  it('Neo 分岐でも上位容量を弾く', () => {
    // Neo は A18 Pro 搭載で M系チップの判定に乗らないため早期 return しており、
    // 容量チェックまで飛ばして 512GB が最小構成の相場に混ざっていた
    const match = buildMacbookMatchFn(NEO)
    expect(match(item('中古パソコン MacBook Neo MHFG4J/A Early 2026【Apple A18 Pro/8GB/512GB SSD】'))).toBe(false)
  })

  it('最小構成(256GB)は通す', () => {
    const match = buildMacbookMatchFn(NEO)
    expect(match(item('中古パソコン MacBook Neo MHFF4J/A Early 2026【Apple A18 Pro/8GB/256GB SSD】'))).toBe(true)
  })

  it('従来どおり Air/Pro の容量チェックも効く', () => {
    const air = { model: 'MacBook Air 13インチ（2024）', cpu: 'M3', strage: '256GB ~ 2TB' }
    const match = buildMacbookMatchFn(air)
    expect(match(item('【中古】MacBook Air 13インチ M3 2024 8GB/256GB'))).toBe(true)
    expect(match(item('【中古】MacBook Air 13インチ M3 2024 16GB/512GB'))).toBe(false)
  })
})
