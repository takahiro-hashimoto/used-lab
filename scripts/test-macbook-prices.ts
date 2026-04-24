/**
 * MacBook 中古価格取得テストスクリプト
 * 全ショップ横断で最小構成の最安値を取得する
 *
 * 実行: npx tsx scripts/test-macbook-prices.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

const APP_ID = process.env.RAKUTEN_APP_ID ?? ''
const AFF_ID = process.env.RAKUTEN_AFFILIATE_ID ?? ''
const GENRE_NOTEBOOK_PC = '100040'

interface RakutenItem {
  itemCode: string
  itemName: string
  itemPrice: number
  shopName: string
  availability: number
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

  const url = new URL('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601')
  url.searchParams.set('applicationId', APP_ID)
  url.searchParams.set('affiliateId', AFF_ID)
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

interface MacBookModel {
  id: number
  model: string
  cpu: string
  strage: string
  date: string
}

/**
 * 最小チップ名を取得
 * "M1 Pro / M1 Max" → "M1 Pro"
 * "M4 / M4 Pro / M4 Max" → "M4"
 */
function getMinChip(cpu: string): string {
  return cpu.split('/')[0].trim()
}

/**
 * ベースチップ名（世代のみ）を取得
 * "M1 Pro" → "M1", "M4" → "M4"
 */
function getBaseChipGen(chip: string): string {
  const match = chip.match(/M\d+/)
  return match ? match[0] : chip
}

/** 最小容量を取得: "512GB ~ 8TB" → "512GB" */
function getMinStorage(strage: string): string {
  const match = strage.match(/(\d+)(GB|TB)/i)
  return match ? `${match[1]}${match[2]}` : ''
}

/** モデル名から年を取得: "MacBook Air 13インチ（2022）" → "2022" */
function getYear(model: string): string {
  const match = model.match(/（(\d{4})）/)
  return match ? match[1] : ''
}

/** モデル名からサイズを取得: "MacBook Air 13インチ（2022）" → "13" */
function getSize(model: string): string {
  const match = model.match(/(\d+)インチ/)
  return match ? match[1] : ''
}

/** Air か Pro か */
function getType(model: string): 'Air' | 'Pro' {
  return model.includes('Air') ? 'Air' : 'Pro'
}

// ─── 検索キーワード組み立て ──────────────────────────

function buildSearchParams(model: MacBookModel) {
  const minChip = getMinChip(model.cpu)
  const year = getYear(model.model)
  const type = getType(model.model)

  // 検索キーワード: チップ名にPro等が含まれればそのまま使う
  const keyword = `MacBook ${type} ${minChip} ${year}`

  // NGキーワードはアクセサリ・レンタル・部品を除外
  const ngKeyword = 'ケース フィルム カバー キーボード バッグ ACアダプタ 充電器 スリーブ レンタル 液晶パネル 液晶ユニット パーツ 修理 交換用 ふるさと納税'

  return { keyword, ngKeyword }
}

// ─── matchFn: 商品名からモデルを正確に判別 ─────────

function buildMatchFn(model: MacBookModel): (itemName: string) => boolean {
  const type = getType(model.model)
  const minChip = getMinChip(model.cpu)
  const baseGen = getBaseChipGen(minChip)  // "M1", "M2" etc.
  const size = getSize(model.model)
  const minStorage = getMinStorage(model.strage)
  const isChipPro = minChip.includes('Pro')
  const isChipMax = minChip.includes('Max')

  return (itemName: string): boolean => {
    const name = itemName.toUpperCase()

    // 0. 新品・未使用品を除外（「【中古】【未使用品】」のようなタイトルも弾く）
    if (name.includes('未使用') || name.includes('新品') || name.includes('未開封')) return false

    // 1. Air/Pro の区別
    if (type === 'Air' && !name.includes('AIR')) return false
    if (type === 'Pro' && !name.includes('PRO')) return false
    if (type === 'Air' && name.includes('PRO')) return false

    // 2. Intelモデルを除外（M1以降のApple Siliconのみ対象）
    const hasAppleSilicon = /M[1-9]\b/.test(name)
    if (!hasAppleSilicon) return false

    // 3. チップ世代の一致確認
    if (!name.includes(baseGen)) return false

    // 4. チップのグレード区別
    //    "M1 Pro" を探す時: 商品名に "M1 PRO" が含まれること
    //    "M1" (無印) を探す時: "M1" はあるが "M1 PRO" "M1 MAX" がないこと
    if (isChipPro) {
      if (!name.includes(`${baseGen} PRO`)) return false
    } else if (isChipMax) {
      if (!name.includes(`${baseGen} MAX`)) return false
    } else {
      // 無印チップの場合、Pro/Max を除外
      if (name.includes(`${baseGen} PRO`) || name.includes(`${baseGen} MAX`)) return false
    }

    // 5. サイズの確認
    //    楽天の商品名では "13インチ" "13.6インチ" "14.2-inch" "16.2inch" など表記ゆれがある
    //    自モデルのサイズが含まれていること、または他サイズが含まれていないことを確認
    if (size) {
      // サイズグループ: 13=13/13.3/13.6, 14=14/14.2, 15=15/15.3, 16=16/16.2
      // 他サイズの検出パターン（小数点付きも含む）
      const otherSizePatterns: Record<string, RegExp> = {
        '13': /(?:13(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
        '14': /(?:14(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
        '15': /(?:15(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
        '16': /(?:16(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
      }
      // 他サイズが含まれているか
      for (const [s, pattern] of Object.entries(otherSizePatterns)) {
        if (s === size) continue
        if (pattern.test(itemName)) {
          // 他サイズが明記されている → 除外
          return false
        }
      }
    }

    // 6. 容量の確認（商品名に容量が明記されている場合、最小容量と一致するか）
    //    表記ゆれ: "256GB" "SSD256GB" "256G" "512G" "1T" "1TB" など
    if (minStorage) {
      const storageInName = itemName.match(/(\d+)\s*(GB|TB|G|T)(?!\w)/gi)
      if (storageInName) {
        const minStorageNum = parseStorageToGB(minStorage)
        const itemStorages = storageInName.map(s => parseStorageToGB(s))
        // SSDの容量として妥当な値だけ見る（8G/16Gはメモリなので除外）
        const ssdStorages = itemStorages.filter(s => s >= 128)
        if (ssdStorages.length > 0) {
          const itemMinStorage = Math.min(...ssdStorages)
          if (itemMinStorage !== minStorageNum) return false
        }
      }
    }

    return true
  }
}

/** "256GB" → 256, "256G" → 256, "1TB" → 1024, "1T" → 1024 */
function parseStorageToGB(storage: string): number {
  const match = storage.match(/(\d+)\s*(GB|TB|G|T)(?!\w)/i)
  if (!match) return 0
  const num = parseInt(match[1])
  const unit = match[2].toUpperCase()
  return (unit === 'TB' || unit === 'T') ? num * 1024 : num
}

// ─── メイン ─────────────────────────────────────────

async function main() {
  const testModels: MacBookModel[] = [
    { id: 1, model: 'MacBook Air 13インチ（2020）', cpu: 'M1', strage: '256GB ~ 2TB', date: '2020/11/17' },
    { id: 2, model: 'MacBook Air 13インチ（2022）', cpu: 'M2', strage: '256GB ~ 2TB', date: '2022/07/15' },
    { id: 3, model: 'MacBook Air 15インチ（2023）', cpu: 'M2', strage: '256GB ~ 2TB', date: '2023/06/13' },
    { id: 4, model: 'MacBook Air 13インチ（2024）', cpu: 'M3', strage: '256GB ~ 2TB', date: '2024/03/04' },
    { id: 6, model: 'MacBook Air 13インチ（2025）', cpu: 'M4', strage: '256GB ~ 2TB', date: '2025/03/12' },
    { id: 8, model: 'MacBook Pro 13インチ（2020）', cpu: 'M1', strage: '256GB ~ 2TB', date: '2020/11/17' },
    { id: 9, model: 'MacBook Pro 14インチ（2021）', cpu: 'M1 Pro / M1 Max', strage: '512GB ~ 8TB', date: '2021/10/26' },
    { id: 10, model: 'MacBook Pro 16インチ（2021）', cpu: 'M1 Pro / M1 Max', strage: '512GB ~ 8TB', date: '2021/10/26' },
    { id: 11, model: 'MacBook Pro 13インチ（2022）', cpu: 'M2', strage: '256GB ~ 2TB', date: '2022/06/24' },
    { id: 12, model: 'MacBook Pro 14インチ（2023）', cpu: 'M2 Pro / M2 Max', strage: '512GB ~ 8TB', date: '2023/02/03' },
    { id: 14, model: 'MacBook Pro 14インチ（2023）', cpu: 'M3', strage: '512GB ~ 2TB', date: '2023/11/07' },
    { id: 16, model: 'MacBook Pro 14インチ（2024）', cpu: 'M4 / M4 Pro / M4 Max', strage: '512GB ~ 8TB', date: '2024/11/08' },
  ]

  console.log('=== MacBook 中古価格取得テスト（genreId + matchFn方式）===\n')

  for (const model of testModels) {
    const { keyword, ngKeyword } = buildSearchParams(model)
    const matchFn = buildMatchFn(model)
    const minChip = getMinChip(model.cpu)
    const minStorage = getMinStorage(model.strage)

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📱 ${model.model} (${minChip} / ${minStorage})`)
    console.log(`   検索KW: "${keyword}"`)

    // 最大3ページ検索してmatchFnで絞り込み
    const matchedItems: RakutenItem[] = []
    const itemCodeSet = new Set<string>()
    let totalCount = 0

    for (let page = 1; page <= 4; page++) {
      await sleep(1100)
      const { items, count } = await searchAll({
        keyword,
        ngKeyword,
        genreId: GENRE_NOTEBOOK_PC,
        hits: 30,
        page,
      })

      if (page === 1) totalCount = count
      if (items.length === 0) break

      for (const item of items) {
        if (!itemCodeSet.has(item.itemCode) && matchFn(item.itemName)) {
          matchedItems.push(item)
          itemCodeSet.add(item.itemCode)
        }
      }

      if (count <= page * 30) break
    }

    if (matchedItems.length === 0) {
      console.log(`   API ${totalCount}件 → matchFn通過 0件 ❌\n`)
      continue
    }

    // 在庫ありを優先
    const available = matchedItems.filter(i => i.availability === 1)
    const targets = available.length > 0 ? available : matchedItems

    // 最安値
    const minItem = targets.reduce((a, b) => a.itemPrice < b.itemPrice ? a : b)

    console.log(`   API ${totalCount}件 → matchFn通過 ${matchedItems.length}件 ✅`)
    console.log(`   💰 最安: ¥${minItem.itemPrice.toLocaleString()} | ${minItem.shopName}`)
    console.log(`      ${minItem.itemName.substring(0, 90)}`)

    // 上位5件も表示
    const sorted = [...targets].sort((a, b) => a.itemPrice - b.itemPrice)
    if (sorted.length > 1) {
      console.log(`   --- 上位${Math.min(5, sorted.length)}件 ---`)
      for (const item of sorted.slice(0, 5)) {
        const mark = item === minItem ? '→' : ' '
        console.log(`   ${mark} ¥${item.itemPrice.toLocaleString()} | ${item.shopName} | ${item.itemName.substring(0, 70)}`)
      }
    }
    console.log('')
  }
}

main().catch(console.error)
