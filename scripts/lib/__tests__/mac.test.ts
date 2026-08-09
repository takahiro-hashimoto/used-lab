// ============================================================
// デスクトップMac 相場取得ロジックのテスト
//
// 楽天APIはVultrの固定IPからしか叩けないため、手元では実データで
// 検証できない。キーワード組み立てと matchFn（誤爆除去）だけでも
// 先に固めておき、Vultr での実行のやり直しを減らす。
//
// 商品名は楽天の中古Mac出品でよく見る表記を模したもの。
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  buildSearchKeyword,
  buildSizeSearchKeyword,
  buildChipOnlyKeyword,
  buildMatchFn,
  getMinChip,
  getMinStorage,
  type MacModelRow,
  type RakutenItem,
} from '../mac'

/** DBの mac_models 相当の行を組み立てる */
function row(over: Partial<MacModelRow>): MacModelRow {
  return {
    id: 1,
    model: 'Mac mini（2024）',
    slug: 'mac-mini-2024',
    cpu: 'M4 / M4 Pro',
    strage: '256GB ~ 8TB',
    date: '2024/11/08',
    device_type: 'mac-mini',
    ...over,
  }
}

function item(itemName: string): RakutenItem {
  return { itemCode: 'x:1', itemName, itemPrice: 90000, shopName: 'shop', availability: 1 }
}

const MINI_2024 = row({})
const MINI_2023 = row({ id: 5, model: 'Mac mini（2023）', slug: 'mac-mini-2023', cpu: 'M2 / M2 Pro', strage: '256GB ~ 8TB', device_type: 'mac-mini' })
const IMAC_2024 = row({ id: 3, model: 'iMac 24インチ（2024）', slug: 'imac-24-2024', cpu: 'M4', strage: '256GB ~ 2TB', device_type: 'imac' })
const STUDIO_2025 = row({ id: 9, model: 'Mac Studio（2025）', slug: 'mac-studio-2025', cpu: 'M4 Max / M3 Ultra', strage: '512GB ~ 16TB', device_type: 'mac-studio' })

describe('getMinChip / getMinStorage', () => {
  it('複数チップ構成から最小構成のチップを取る', () => {
    expect(getMinChip('M4 / M4 Pro')).toBe('M4')
    expect(getMinChip('M4 Max / M3 Ultra')).toBe('M4 Max')
    expect(getMinChip('M1')).toBe('M1')
  })

  it('ストレージ範囲から最小容量を取る', () => {
    expect(getMinStorage('256GB ~ 8TB')).toBe('256GB')
    expect(getMinStorage('512GB ~ 16TB')).toBe('512GB')
  })
})

describe('buildSearchKeyword', () => {
  it('device_type ごとに製品名を切り替える', () => {
    expect(buildSearchKeyword(MINI_2024)).toBe('Mac mini M4 2024')
    expect(buildSearchKeyword(IMAC_2024)).toBe('iMac M4 2024')
    expect(buildSearchKeyword(STUDIO_2025)).toBe('Mac Studio M4 Max 2025')
  })

  it('サイズ指定の予備キーワードは iMac のみ。mini/Studio は無効', () => {
    expect(buildSizeSearchKeyword(IMAC_2024)).toBe('iMac 24インチ M4 2024')
    expect(buildSizeSearchKeyword(MINI_2024)).toBeNull()
    expect(buildSizeSearchKeyword(STUDIO_2025)).toBeNull()
  })
})

describe('buildMatchFn — Mac mini', () => {
  const match = buildMatchFn(MINI_2024)

  it('該当する出品を通す', () => {
    expect(match(item('Apple Mac mini M4 2024 16GB 256GB SSD 中古'))).toBe(true)
  })

  it('MacBook を弾く（"Mac" の部分一致で最も混入しやすい）', () => {
    expect(match(item('Apple MacBook Pro 14インチ M4 2024 16GB 256GB 中古'))).toBe(false)
    expect(match(item('MacBook Air M4 2024 256GB 中古美品'))).toBe(false)
  })

  it('チップのグレード違いを弾く', () => {
    // M4 の行に M4 Pro が混ざらない
    expect(match(item('Mac mini M4 Pro 2024 24GB 512GB 中古'))).toBe(false)
  })

  it('世代違いを弾く', () => {
    expect(match(item('Mac mini M2 2023 8GB 256GB 中古'))).toBe(false)
  })

  it('容量違いを弾く（最小構成に統一するため）', () => {
    expect(match(item('Mac mini M4 2024 16GB 512GB SSD 中古'))).toBe(false)
  })

  it('新品・未使用を弾く', () => {
    expect(match(item('【新品未使用】Apple Mac mini M4 2024 16GB 256GB'))).toBe(false)
  })
})

describe('buildMatchFn — Mac mini（M2 Pro構成）', () => {
  it('M2 の行に M2 Pro を通さない', () => {
    const match = buildMatchFn(MINI_2023)
    expect(match(item('Mac mini M2 2023 8GB 256GB 中古'))).toBe(true)
    expect(match(item('Mac mini M2 Pro 2023 16GB 512GB 中古'))).toBe(false)
  })
})

describe('buildMatchFn — iMac', () => {
  const match = buildMatchFn(IMAC_2024)

  it('該当する出品を通す', () => {
    expect(match(item('Apple iMac 24インチ M4 2024 16GB 256GB 中古'))).toBe(true)
  })

  it('Intel世代の iMac Pro を弾く', () => {
    expect(match(item('Apple iMac Pro 27インチ 2017 Xeon W 中古'))).toBe(false)
  })

  it('画面サイズ違いを弾く', () => {
    expect(match(item('Apple iMac 27インチ M4 2024 16GB 256GB 中古'))).toBe(false)
  })

  it('Magic Keyboard 同梱の表記があっても通す（NGキーワードから除外した理由）', () => {
    expect(match(item('Apple iMac 24インチ M4 2024 16GB 256GB Magic Keyboard付属 中古'))).toBe(true)
  })
})

describe('buildMatchFn — Mac Studio', () => {
  const match = buildMatchFn(STUDIO_2025)

  it('該当する出品を通す', () => {
    expect(match(item('Apple Mac Studio M4 Max 2025 36GB 512GB 中古'))).toBe(true)
  })

  it('Studio Display（モニタ単体）を弾く — Studio検索の最大の誤爆源', () => {
    expect(match(item('Apple Studio Display 27インチ 5K 中古'))).toBe(false)
    expect(match(item('Mac Studio M4 Max + Studio Display セット 中古'))).toBe(false)
  })

  it('Ultra 構成を Max の行に通さない', () => {
    expect(match(item('Apple Mac Studio M3 Ultra 2025 96GB 1TB 中古'))).toBe(false)
  })
})

describe('buildMatchFn — 出品名の表記ゆれ', () => {
  it('Mac mini の無スペース表記を取りこぼさない', () => {
    const match = buildMatchFn(MINI_2024)
    for (const n of [
      'Apple Mac mini M4 2024 16GB 256GB 中古',
      'Apple Macmini M4 2024 16GB 256GB 中古',
      'Apple MacMini M4 2024 16GB 256GB 中古',
      'Apple Mac Mini M4 2024 16GB 256GB 中古',
      'アップル　Mac mini　M4　2024　16GB　256GB　中古', // 全角スペース
    ]) {
      expect(match(item(n)), n).toBe(true)
    }
  })

  it('チップグレードの無スペース表記も判定できる', () => {
    const match = buildMatchFn(MINI_2024)
    // M4 の行に M4Pro を通さない
    expect(match(item('Mac mini M4Pro 2024 24GB 512GB 中古'))).toBe(false)
  })

  it('Mac Studio / Studio Display の無スペース表記', () => {
    const match = buildMatchFn(STUDIO_2025)
    expect(match(item('Apple MacStudio M4Max 2025 36GB 512GB 中古'))).toBe(true)
    expect(match(item('Apple StudioDisplay 27インチ 5K 中古'))).toBe(false)
  })
})

describe('buildChipOnlyKeyword', () => {
  it('年号を落とした予備キーワードを返す', () => {
    expect(buildChipOnlyKeyword(MINI_2024)).toBe('Mac mini M4')
    expect(buildChipOnlyKeyword(IMAC_2024)).toBe('iMac M4')
    expect(buildChipOnlyKeyword(STUDIO_2025)).toBe('Mac Studio M4 Max')
  })

  it('チップは世代と1対1なので、年号なしでも別世代を拾わない', () => {
    // M2 Max は 2023 の Mac Studio にしかない構成
    const studio2023 = row({ id: 8, model: 'Mac Studio（2023）', slug: 'mac-studio-2023', cpu: 'M2 Max / M2 Ultra', strage: '512GB ~ 8TB', device_type: 'mac-studio' })
    expect(buildChipOnlyKeyword(studio2023)).toBe('Mac Studio M2 Max')
    const match = buildMatchFn(studio2023)
    expect(match(item('Apple Mac Studio M2 Max 32GB 512GB 中古'))).toBe(true)
    // 年号が無くても別チップは matchFn が弾く
    expect(match(item('Apple Mac Studio M1 Max 32GB 512GB 中古'))).toBe(false)
  })

  it('年号が取れないモデルでは null（無限に広げない）', () => {
    expect(buildChipOnlyKeyword(row({ model: 'Mac mini' }))).toBeNull()
  })
})
