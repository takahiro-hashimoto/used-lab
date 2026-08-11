// ============================================
// Mac（デスクトップ）価格取得
// ============================================
// iMac / Mac mini / Mac Studio。scripts/lib/macbook.ts と同じ方式で、
// 全ショップ横断の最安値Top5・最高値Top5を取得する。
//
// MacBook版との違いは4点だけ:
//   1. NGキーワードから「キーボード」を外す
//      → iMacはMagic Keyboard同梱が商品名に入るため、除外すると本命が消える
//   2. getType() が iMac / mini / Studio を返す
//   3. matchFn にデスクトップ固有の誤爆除去を追加
//      （mini↔MacBook、iMac↔iMac Pro、Studio↔Studio Display）
//   4. サイズ指定の再取得は iMac のみ（mini/Studioに画面サイズはない）

import { getSupabase } from './supabase-client'
import { env, RAKUTEN_API_BASE } from './config'
import { sleep, getTodayJST, getNowISOJST, isExcludedCondition, fetchJsonWithRetry } from './utils'

/**
 * 中古デスクトップPCのジャンルID。
 *
 * 2026-08-09 に DEBUG_GENRE=1 で実測して確定した。
 * ジャンル指定なしで走らせると、本体以外（保護フィルム・スタンド・
 * 電子書籍など）が大量に混入する。iMac M1 の検索では108件マッチして
 * 最高値が¥17,589、つまり全件がアクセサリという状態だった。
 * 本物の出品はすべてこのジャンルに入っていたため、ここで足切りする。
 *
 * 空文字にすればジャンル指定なしに戻せる（分布を取り直したいとき用）。
 */
const GENRE_DESKTOP_PC = '211368'

/**
 * 除外キーワード。
 *
 * MacBook版から「キーボード」を外している（iMacはMagic Keyboard同梱が
 * 商品名に入るため）。代わりにデスクトップで頻出する周辺機器・部品を追加。
 */
const NG_KEYWORD = 'ケース フィルム カバー スタンド VESA アーム バッグ ACアダプタ 電源ユニット 充電器 レンタル 液晶パネル 液晶ユニット パーツ 修理 交換用 増設 ジャンク ふるさと納税'

const MAX_PAGES = 4 // 30件 × 4 = 最大120件
/** 中央値の算出に必要な最小サンプル数（lib/utils/price-stats.ts と揃える） */
const MIN_SAMPLES = 5

/** genreId の分布を出力するデバッグモード。GENRE_DESKTOP_PC の確定に使う */
const DEBUG_GENRE = process.env.DEBUG_GENRE === '1'

export interface RakutenItem {
  itemCode: string
  itemName: string
  itemPrice: number
  shopName: string
  availability: number
  genreId?: string
}

/** 楽天商品検索APIのレスポンス（利用している項目のみ） */
interface MacSearchResponse {
  Items?: { Item: RakutenItem }[]
  count?: number
}

type MacDeviceType = 'imac' | 'mac-mini' | 'mac-studio'

export interface MacModelRow {
  id: number
  model: string
  slug: string
  cpu: string
  strage: string
  date: string | null
  device_type: MacDeviceType
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
  url.searchParams.set('accessKey', e.RAKUTEN_ACCESS_KEY) // 2026年刷新で必須
  url.searchParams.set('affiliateId', e.RAKUTEN_AFFILIATE_ID)
  url.searchParams.set('keyword', keyword)
  url.searchParams.set('hits', String(hits))
  url.searchParams.set('page', String(page))
  url.searchParams.set('sort', '+itemPrice')
  if (genreId) url.searchParams.set('genreId', genreId)
  if (ngKeyword) url.searchParams.set('NGKeyword', ngKeyword)

  // 新APIは登録ドメイン・登録IPからのアクセスを想定。
  // Origin/Refererヘッダーが無いと403、許可外IPからは CLIENT_IP_NOT_ALLOWED になる。
  const json = await fetchJsonWithRetry<MacSearchResponse>(
    url.toString(),
    { Origin: e.RAKUTEN_ORIGIN, Referer: e.RAKUTEN_ORIGIN },
    `kw="${keyword}"`
  )
  if (json == null) return { items: [], count: 0 }
  if (!json.Items || json.Items.length === 0) return { items: [], count: 0 }

  const items: RakutenItem[] = json.Items.map((itemData) => itemData.Item)
  return { items, count: json.count ?? 0 }
}

// ─── モデル情報の解析 ────────────────────────────────

/**
 * 最小チップ名を取得
 * "M4 / M4 Pro" → "M4"
 * "M3 Ultra / M4 Max" → "M3 Ultra"
 */
export function getMinChip(cpu: string): string {
  return cpu.split('/')[0].trim()
}

/** ベースチップ名（世代のみ）: "M4 Pro" → "M4" */
function getBaseChipGen(chip: string): string {
  const match = chip.match(/M\d+/)
  return match ? match[0] : chip
}

/** 最小容量: "256GB ~ 8TB" → "256GB" */
export function getMinStorage(strage: string): string {
  const match = strage.match(/(\d+)(GB|TB)/i)
  return match ? `${match[1]}${match[2]}` : ''
}

/** モデル名から年: "Mac mini（2024）" → "2024" */
function getYear(model: string): string {
  const match = model.match(/（(\d{4})）/)
  return match ? match[1] : ''
}

/** モデル名からサイズ: "iMac 24インチ（2024）" → "24"。mini/Studio は "" */
function getSize(model: string): string {
  const match = model.match(/(\d+)インチ/)
  return match ? match[1] : ''
}

// ─── 検索キーワード組み立て ──────────────────────────

export function buildSearchKeyword(model: MacModelRow): string {
  const minChip = getMinChip(model.cpu)
  const year = getYear(model.model)
  switch (model.device_type) {
    case 'imac':
      return `iMac ${minChip} ${year}`
    case 'mac-mini':
      return `Mac mini ${minChip} ${year}`
    case 'mac-studio':
      return `Mac Studio ${minChip} ${year}`
  }
}

/**
 * サイズを含めた予備キーワード。
 *
 * iMac の 24インチ / 27インチ を分けるためだけに使う。
 * mini と Studio に画面サイズはないので null を返し、再取得を無効化する。
 */
export function buildSizeSearchKeyword(model: MacModelRow): string | null {
  if (model.device_type !== 'imac') return null
  const size = getSize(model.model)
  if (!size) return null
  return `iMac ${size}インチ ${getMinChip(model.cpu)} ${getYear(model.model)}`
}

/**
 * 年号を外した予備キーワード。
 *
 * 出品名に発売年を書かないショップが多く、"Mac Studio M2 Max 2023" では
 * 1件も引けなかった（2026-08-09 実測）。デスクトップMacはチップと世代が
 * 1対1で対応する（M1 Max=2022 Studio、M3=2023 iMac など）ため、
 * 年号を落としても別世代を拾う心配がない。
 * matchFn 側でチップのグレードと容量は引き続き検査される。
 */
export function buildChipOnlyKeyword(model: MacModelRow): string | null {
  const kw = buildSearchKeyword(model)
  const year = getYear(model.model)
  if (!year) return null
  const stripped = kw.replace(` ${year}`, '').trim()
  return stripped === kw ? null : stripped
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

export function buildMatchFn(model: MacModelRow): (item: RakutenItem) => boolean {
  const type = model.device_type
  const minChip = getMinChip(model.cpu)
  const baseGen = getBaseChipGen(minChip)
  const size = getSize(model.model)
  const minStorage = getMinStorage(model.strage)
  const isChipPro = minChip.includes('Pro')
  const isChipMax = minChip.includes('Max')
  const isChipUltra = minChip.includes('Ultra')

  // iMac のみサイズ判定が要る（24インチ / 27インチ）
  const otherSizePatterns: Record<string, RegExp> = {
    '21': /(?:21(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
    '24': /(?:24(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
    '27': /(?:27(?:\.\d)?)\s*[-]?\s*(?:インチ|inch|"|″)/i,
  }

  return (item: RakutenItem): boolean => {
    const itemName = item.itemName
    const name = itemName.toUpperCase()
    // 出品名は "Mac mini" / "Macmini" / "MacMini" と表記が揺れる。
    // 空白を潰した文字列で製品名とチップグレードを判定する
    // （全角スペースも混ざるので両方落とす）
    const compact = name.replace(/[\s\u3000]/g, '')

    // 0. 新品・未使用・ジャンクなどを除外（判定は utils に一元化）
    if (isExcludedCondition(itemName)) return false

    // 1. 機種の区別（デスクトップ固有の誤爆をここで潰す）
    if (type === 'mac-mini') {
      if (!compact.includes('MACMINI')) return false
      // "Mac" の部分一致で MacBook が大量に混入する
      if (compact.includes('MACBOOK')) return false
    } else if (type === 'imac') {
      if (!compact.includes('IMAC')) return false
      // iMac Pro は Intel Xeon 世代の別製品
      if (compact.includes('IMACPRO')) return false
    } else {
      if (!compact.includes('MACSTUDIO')) return false
      // Studio Display はディスプレイ単体。Studio 検索の最大の誤爆源
      if (compact.includes('STUDIODISPLAY')) return false
      if (compact.includes('MACBOOK')) return false
    }

    // 2. Apple Silicon のみ（Intel世代を除外）
    //    通常は空白区切りの name で判定する。compact だけで見ると
    //    "M4 2024" が "M42024" に繋がって判定できないため。
    //    "M4Max" のような無スペースのグレード表記だけ compact 側で拾う
    if (!/M[1-9]\b/.test(name) && !/M[1-9](PRO|MAX|ULTRA)/.test(compact)) return false

    // 3. チップ世代の一致。
    //    部分一致だと Apple の型番に紛れた文字列を拾ってしまう。
    //    例: "MGPM3J/A" は M1 搭載 iMac(2021) の型番だが "M3" を含むため、
    //    M3(2023) の行に M1 の個体が混入していた（2026-08-09 に実際に発生し、
    //    その価格がちょうど中央値になって表示相場が歪んでいた）。
    //    前後が英数字でない「独立したトークン」であることを要求する。
    //    "M4Max" のような連結表記も拾えるようグレード語は許容する。
    const genToken = new RegExp(`(^|[^A-Z0-9])${baseGen}(PRO|MAX|ULTRA)?([^A-Z0-9]|$)`)
    if (!genToken.test(name) && !genToken.test(compact)) return false

    // 4. チップのグレード区別
    // グレードも "M4 Pro" / "M4Pro" の両表記があるので compact で判定する
    if (isChipUltra) {
      if (!compact.includes(`${baseGen}ULTRA`)) return false
    } else if (isChipMax) {
      if (!compact.includes(`${baseGen}MAX`)) return false
    } else if (isChipPro) {
      if (!compact.includes(`${baseGen}PRO`)) return false
    } else {
      if (
        compact.includes(`${baseGen}PRO`) ||
        compact.includes(`${baseGen}MAX`) ||
        compact.includes(`${baseGen}ULTRA`)
      ) return false
    }

    // 5. サイズの確認（iMac のみ）
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

export async function fetchMacPrices(): Promise<void> {
  console.log('\n🖥️ ========== Mac（デスクトップ）価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('mac_models')
    .select('id, model, slug, cpu, strage, date, device_type')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('Mac モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)
  if (!GENRE_DESKTOP_PC) {
    console.log('  ⚠️ GENRE_DESKTOP_PC 未設定 — ジャンル指定なしで検索します')
  }

  for (const model of models as MacModelRow[]) {
    const keyword = buildSearchKeyword(model)
    const matchFn = buildMatchFn(model)
    const minChip = getMinChip(model.cpu)
    const minStorage = getMinStorage(model.strage)

    console.log(`\n🚀 ${model.model} (${minChip} / ${minStorage})`)
    console.log(`   検索KW: "${keyword}"`)

    // 最大120件取得してmatchFnで絞り込み
    const matchedItems: RakutenItem[] = []
    const itemCodeSet = new Set<string>()
    /** DEBUG_GENRE 用。マッチした商品のジャンルID分布 */
    const genreHits: Record<string, number> = {}

    const collect = async (kw: string) => {
      for (let page = 1; page <= MAX_PAGES; page++) {
        await sleep(1100)
        const { items, count } = await searchAll({
          keyword: kw,
          ngKeyword: NG_KEYWORD,
          genreId: GENRE_DESKTOP_PC || undefined,
          hits: 30,
          page,
        })

        if (items.length === 0) break

        for (const item of items) {
          if (!itemCodeSet.has(item.itemCode) && matchFn(item)) {
            matchedItems.push(item)
            itemCodeSet.add(item.itemCode)
            if (DEBUG_GENRE && item.genreId) {
              genreHits[item.genreId] = (genreHits[item.genreId] ?? 0) + 1
            }
          }
        }

        if (count <= page * 30) break
      }
    }

    await collect(keyword)

    // 年号なしでも必ず取得する。
    // 発売年を書かない出品が多く、年号付きだけだと取りこぼす。
    // 2026-08-09 の実測では iMac 2021 が 13件 → 18件 に増えた。
    // 「件数が足りないときだけ」にしていると、そこそこ件数がある機種で
    // この取りこぼしに気づけないため、常に両方を回す。
    // itemCode で重複排除しているので二重計上にはならない。
    const chipKeyword = buildChipOnlyKeyword(model)
    if (chipKeyword && chipKeyword !== keyword) {
      await collect(chipKeyword)
      console.log(`   ↻ 年号なしでも取得: "${chipKeyword}" → 計${matchedItems.length}件`)
    }

    // それでも中央値に必要な5件に届かなければ、iMac だけサイズ指定で追う
    if (matchedItems.length < MIN_SAMPLES) {
      const sizeKeyword = buildSizeSearchKeyword(model)
      if (sizeKeyword && sizeKeyword !== keyword) {
        console.log(`   ↻ ${matchedItems.length}件のみ → サイズ指定で追加取得: "${sizeKeyword}"`)
        await collect(sizeKeyword)
      }
    }

    if (DEBUG_GENRE) {
      console.log(`   🔎 genreId分布: ${JSON.stringify(genreHits)}`)
    }

    if (matchedItems.length === 0) {
      console.log(`   ❌ ヒットなし`)
      continue
    }

    // 中央値が出せない件数のときは、相場として使えないことをログに残す
    // （Mac Studio は流通量が少なく、ここに落ちる可能性がある）
    if (matchedItems.length < MIN_SAMPLES) {
      console.log(`   ⚠️ ${matchedItems.length}件のみ（中央値の算出には${MIN_SAMPLES}件必要）`)
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
      .from('mac_price_logs')
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
      // 流通量の目安。Macはショップ横断のため総件数
      matched_count: targets.length,
      // 取得した全商品の価格（中央値・分布の算出用）
      matched_prices: sorted.map((i) => i.itemPrice),
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
      .from('mac_price_logs')
      .insert(row)

    if (insertError) {
      console.error(`   ❌ DB INSERT失敗: ${model.model}`, insertError.message)
    } else {
      console.log(`   📤 DB保存完了: ${model.model}`)
    }
  }

  console.log('\n🖥️ ========== Mac（デスクトップ）価格取得完了 ==========')
}
