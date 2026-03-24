// ============================================
// MacBook 価格取得
// ============================================
// 全ショップ横断で最小構成の最安値Top5・最高値Top5を取得する
// iPhone/iPad版と異なり、shopCodeなしで楽天全体を検索する

import { getSupabase } from './supabase-client'
import { env, RAKUTEN_API_BASE } from './config'
import { sleep, getTodayJST, getNowISOJST } from './utils'

const GENRE_NOTEBOOK_PC = '100040'
const NG_KEYWORD = 'ケース フィルム カバー キーボード バッグ ACアダプタ 充電器 スリーブ レンタル 液晶パネル 液晶ユニット パーツ 修理 交換用 ふるさと納税'
const MAX_PAGES = 4 // 30件 × 4 = 最大120件

interface RakutenItem {
  itemCode: string
  itemName: string
  itemPrice: number
  shopName: string
  availability: number
}

// ─── API ────────────────────────────────────────────

async function searchAll(params: {
  keyword: string
  ngKeyword?: string
  genreId?: string
  hits?: number
  page?: number
}): Promise<{ items: RakutenItem[]; count: number }> {
  const { keyword, ngKeyword, genreId, hits = 30, page = 1 } = params
  const e = env()

  const url = new URL(RAKUTEN_API_BASE)
  url.searchParams.set('applicationId', e.RAKUTEN_APP_ID)
  url.searchParams.set('affiliateId', e.RAKUTEN_AFFILIATE_ID)
  url.searchParams.set('keyword', keyword)
  url.searchParams.set('hits', String(hits))
  url.searchParams.set('page', String(page))
  url.searchParams.set('sort', '+itemPrice')
  if (genreId) url.searchParams.set('genreId', genreId)
  if (ngKeyword) url.searchParams.set('NGKeyword', ngKeyword)

  const response = await fetch(url.toString())
  if (!response.ok) return { items: [], count: 0 }

  const json = await response.json()
  if (!json.Items || json.Items.length === 0) return { items: [], count: 0 }

  const items: RakutenItem[] = json.Items.map(
    (itemData: { Item: RakutenItem }) => itemData.Item
  )
  return { items, count: json.count }
}

// ─── モデル情報の解析 ────────────────────────────────

/**
 * 最小チップ名を取得
 * "M1 Pro / M1 Max" → "M1 Pro"
 * "M4 / M4 Pro / M4 Max" → "M4"
 */
function getMinChip(cpu: string): string {
  return cpu.split('/')[0].trim()
}

/** ベースチップ名（世代のみ）: "M1 Pro" → "M1" */
function getBaseChipGen(chip: string): string {
  const match = chip.match(/M\d+/)
  return match ? match[0] : chip
}

/** 最小容量: "512GB ~ 8TB" → "512GB" */
function getMinStorage(strage: string): string {
  const match = strage.match(/(\d+)(GB|TB)/i)
  return match ? `${match[1]}${match[2]}` : ''
}

/** モデル名から年: "MacBook Air 13インチ（2022）" → "2022" */
function getYear(model: string): string {
  const match = model.match(/（(\d{4})）/)
  return match ? match[1] : ''
}

/** モデル名からサイズ: "MacBook Air 13インチ（2022）" → "13" */
function getSize(model: string): string {
  const match = model.match(/(\d+)インチ/)
  return match ? match[1] : ''
}

function getType(model: string): 'Air' | 'Pro' {
  return model.includes('Air') ? 'Air' : 'Pro'
}

// ─── 検索キーワード組み立て ──────────────────────────

function buildSearchKeyword(model: { model: string; cpu: string }): string {
  const minChip = getMinChip(model.cpu)
  const year = getYear(model.model)
  const type = getType(model.model)
  return `MacBook ${type} ${minChip} ${year}`
}

// ─── matchFn ─────────────────────────────────────────

/** "256GB" → 256, "256G" → 256, "1TB" → 1024, "1T" → 1024 */
function parseStorageToGB(storage: string): number {
  const match = storage.match(/(\d+)\s*(GB|TB|G|T)(?!\w)/i)
  if (!match) return 0
  const num = parseInt(match[1])
  const unit = match[2].toUpperCase()
  return (unit === 'TB' || unit === 'T') ? num * 1024 : num
}

function buildMatchFn(model: {
  model: string
  cpu: string
  strage: string
}): (item: RakutenItem) => boolean {
  const type = getType(model.model)
  const minChip = getMinChip(model.cpu)
  const baseGen = getBaseChipGen(minChip)
  const size = getSize(model.model)
  const minStorage = getMinStorage(model.strage)
  const isChipPro = minChip.includes('Pro')
  const isChipMax = minChip.includes('Max')

  const otherSizePatterns: Record<string, RegExp> = {
    '13': /(?:13(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
    '14': /(?:14(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
    '15': /(?:15(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
    '16': /(?:16(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
  }

  return (item: RakutenItem): boolean => {
    const itemName = item.itemName
    const name = itemName.toUpperCase()

    // 0. 新品・未使用品を除外
    if (name.includes('未使用') || name.includes('新品') || name.includes('未開封')) return false

    // 1. Air/Pro の区別
    if (type === 'Air' && !name.includes('AIR')) return false
    if (type === 'Pro' && !name.includes('PRO')) return false
    if (type === 'Air' && name.includes('PRO')) return false

    // 2. Apple Silicon のみ
    if (!/M[1-9]\b/.test(name)) return false

    // 3. チップ世代の一致
    if (!name.includes(baseGen)) return false

    // 4. チップのグレード区別
    if (isChipPro) {
      if (!name.includes(`${baseGen} PRO`)) return false
    } else if (isChipMax) {
      if (!name.includes(`${baseGen} MAX`)) return false
    } else {
      if (name.includes(`${baseGen} PRO`) || name.includes(`${baseGen} MAX`)) return false
    }

    // 5. サイズの確認
    if (size) {
      for (const [s, pattern] of Object.entries(otherSizePatterns)) {
        if (s === size) continue
        if (pattern.test(itemName)) return false
      }
    }

    // 6. 容量の確認（最小容量と一致するか）
    if (minStorage) {
      const storageInName = itemName.match(/(\d+)\s*(GB|TB|G|T)(?!\w)/gi)
      if (storageInName) {
        const minStorageNum = parseStorageToGB(minStorage)
        const ssdStorages = storageInName
          .map((s) => parseStorageToGB(s))
          .filter((s) => s >= 128)
        if (ssdStorages.length > 0) {
          const itemMinStorage = Math.min(...ssdStorages)
          if (itemMinStorage !== minStorageNum) return false
        }
      }
    }

    return true
  }
}

// ─── メイン ─────────────────────────────────────────

export async function fetchMacbookPrices(): Promise<void> {
  console.log('\n💻 ========== MacBook 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('macbook_models')
    .select('id, model, slug, cpu, strage, date')
    .is('last_macos', null)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('MacBook モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const keyword = buildSearchKeyword(model)
    const matchFn = buildMatchFn(model)
    const minChip = getMinChip(model.cpu)
    const minStorage = getMinStorage(model.strage)

    console.log(`\n🚀 ${model.model} (${minChip} / ${minStorage})`)
    console.log(`   検索KW: "${keyword}"`)

    // 最大120件取得してmatchFnで絞り込み
    const matchedItems: RakutenItem[] = []
    const itemCodeSet = new Set<string>()

    for (let page = 1; page <= MAX_PAGES; page++) {
      await sleep(1100)
      const { items, count } = await searchAll({
        keyword,
        ngKeyword: NG_KEYWORD,
        genreId: GENRE_NOTEBOOK_PC,
        hits: 30,
        page,
      })

      if (items.length === 0) break

      for (const item of items) {
        if (!itemCodeSet.has(item.itemCode) && matchFn(item)) {
          matchedItems.push(item)
          itemCodeSet.add(item.itemCode)
        }
      }

      if (count <= page * 30) break
    }

    if (matchedItems.length === 0) {
      console.log(`   ❌ ヒットなし`)
      continue
    }

    // 在庫ありを優先
    const available = matchedItems.filter((i) => i.availability === 1)
    const targets = available.length > 0 ? available : matchedItems

    // 価格ソート
    const sorted = [...targets].sort((a, b) => a.itemPrice - b.itemPrice)
    const minTop5 = sorted.slice(0, 5)
    const maxTop5 = sorted.slice(-5).reverse()

    console.log(`   ✅ ${matchedItems.length}件マッチ`)
    console.log(`   💰 最安: ¥${minTop5[0].itemPrice.toLocaleString()} | ${minTop5[0].shopName}`)
    console.log(`   💰 最高: ¥${maxTop5[0].itemPrice.toLocaleString()} | ${maxTop5[0].shopName}`)

    // DB保存: 当日の既存データを削除
    const todayJST = getTodayJST()
    await supabase
      .from('macbook_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    // Top5データを組み立て
    const row: Record<string, unknown> = {
      logged_at: getNowISOJST(),
      model_id: model.id,
      model_name: model.model,
      storage: minStorage || null,
    }

    for (let i = 0; i < 5; i++) {
      const n = i + 1
      if (i < minTop5.length) {
        row[`min${n}_price`] = minTop5[i].itemPrice
        row[`min${n}_item_name`] = minTop5[i].itemName
        row[`min${n}_shop_name`] = minTop5[i].shopName
      }
      if (i < maxTop5.length) {
        row[`max${n}_price`] = maxTop5[i].itemPrice
        row[`max${n}_item_name`] = maxTop5[i].itemName
        row[`max${n}_shop_name`] = maxTop5[i].shopName
      }
    }

    const { error: insertError } = await supabase
      .from('macbook_price_logs')
      .insert(row)

    if (insertError) {
      console.error(`   ❌ DB INSERT失敗: ${model.model}`, insertError.message)
    } else {
      console.log(`   📤 DB保存完了: ${model.model}`)
    }
  }

  console.log('\n💻 ========== MacBook 価格取得完了 ==========')
}
