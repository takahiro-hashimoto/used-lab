// ============================================
// iPad 価格取得
// ============================================

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS, GENRE_TABLET } from './config'
import { searchWithStrategies } from './rakuten-api'
import { extractMinCapacity, getTodayJST, getNowISOJST, isExcludedCondition, type PriceResult } from './utils'

// NGキーワードマッピング
const IPAD_NG_KEYWORD_MAP: Record<string, string> = {
  'iPad 第9世代': 'Pro Air mini',
  'iPad 第10世代': 'Pro Air mini',
  'iPad 第11世代': 'Pro Air mini',
  'iPad mini 第5世代': 'Pro Air',
  'iPad mini 第6世代': 'Pro Air',
  'iPad mini 第7世代': 'Pro Air',
  'iPad Air 第4世代': 'Pro mini 11 13',
  'iPad Air 第5世代': 'Pro mini 11 13',
  'iPad Air 11 第6世代': 'Pro mini 13 12.9',
  'iPad Air 13 第6世代': 'Pro mini 11 12.9',
  'iPad Air 11 第7世代': 'Pro mini 13 12.9',
  'iPad Air 13 第7世代': 'Pro mini 11 12.9',
  'iPad Pro 11 第2世代': 'Air mini 12.9 13',
  'iPad Pro 11 第3世代': 'Air mini 12.9 13',
  'iPad Pro 11 第4世代': 'Air mini 12.9 13',
  'iPad Pro 11 第5世代': 'Air mini 13',
  'iPad Pro 11 第6世代': 'Air mini 12.9 13',
  'iPad Pro 12.9 第4世代': 'Air mini 11 13',
  'iPad Pro 12.9 第5世代': 'Air mini 11 13',
  'iPad Pro 12.9 第6世代': 'Air mini 11 13',
  'iPad Pro 13 第1世代': 'Air mini 11 12.9',
  'iPad Pro 13 第2世代': 'Air mini 11 12.9',
}

/**
 * NGキーワードをモデル名から導出する。
 *
 * 上のマップは機種を1件ずつ手で登録する方式だったため、新機種を追加すると
 * 登録漏れがそのまま「NG指定なし」になり、検索結果が他シリーズで埋まって
 * 1件もマッチしない状態になっていた（例: iPad Air 11/13 第8世代）。
 * 自分と違うシリーズ名と、同シリーズの別サイズを機械的に除外する。
 */
function buildDefaultIpadNgKeyword(modelName: string): string {
  const base = modelName.replace(/第\d+世代/, '').trim()
  const isMini = /mini/i.test(base)
  const isAir = /air/i.test(base)
  const isPro = /pro/i.test(base)

  const words: string[] = []
  if (!isPro) words.push('Pro')
  if (!isAir) words.push('Air')
  if (!isMini) words.push('mini')

  // Air / Pro はサイズ違いが併売されるので、自分以外のサイズも弾く
  if (isAir || isPro) {
    const size = base.match(/(\d+\.?\d*)\s*$/)?.[1] ?? null
    for (const s of ['11', '12.9', '13']) {
      if (s !== size) words.push(s)
    }
  }
  return words.join(' ')
}

function getIpadNgKeyword(modelName: string, cpuName: string | null, type: string): string | null {
  // マップは例外指定用。無ければモデル名から導出する
  let ng = IPAD_NG_KEYWORD_MAP[modelName] ?? buildDefaultIpadNgKeyword(modelName)
  if (type === 'cpu' && ng && cpuName && cpuName.toLowerCase().includes('pro')) {
    ng = ng
      .split(' ')
      .filter((word) => word.toLowerCase() !== 'pro')
      .join(' ')
  }
  return ng
}

function buildIpadSearchKeyword(
  modelName: string,
  capacity: string | null,
  cpuName: string | null,
  releaseYear: string | null,
  type: 'generation' | 'cpu' | 'year'
): string {
  const series = modelName.replace(/第\d+世代/, '').trim()

  if (type === 'generation') {
    return capacity ? `${modelName} ${capacity}` : modelName
  }
  if (type === 'cpu') {
    const cpuCore = cpuName ? cpuName.replace(/\s*Bionic|\s*Pro|\s*チップ/gi, '').trim() : ''
    return `${series} ${cpuCore} ${capacity || ''}`.trim()
  }
  if (type === 'year') {
    return `${series} ${releaseYear || ''} ${capacity || ''}`.trim()
  }
  return modelName
}

function isExactIpadModelMatch(
  itemName: string,
  modelName: string,
  cpuName: string | null,
  capacity: string | null,
  releaseYear: string | null
): boolean {
  const nItem = itemName.toLowerCase().replace(/\s+/g, '').replace(/　/g, '')
  const nModel = modelName.toLowerCase().replace(/\s+/g, '')

  // 除外条件
  if (nItem.includes('cellular') || nItem.includes('セルラー')) return false
  if (isExcludedCondition(itemName)) return false

  // 容量チェック
  if (capacity && !nItem.includes(capacity.toLowerCase())) return false

  // シリーズ・タイプチェック
  const types = ['ipadmini', 'ipadair', 'ipadpro']
  const currentType = types.find((t) => nModel.includes(t)) || 'ipad'

  for (const t of types) {
    if (currentType !== t && nItem.includes(t)) return false
  }

  // サイズチェック (Pro / Air)
  if (currentType === 'ipadair' || currentType === 'ipadpro') {
    const mSize = nModel.match(/(\d+\.?\d*)/)?.[1]
    if (mSize) {
      if (mSize === '12.9') {
        if (!nItem.includes('12.9') || nItem.includes('13インチ') || nItem.includes('13inch'))
          return false
      } else if (mSize === '13') {
        if (!nItem.includes('13') || nItem.includes('12.9')) return false
      } else {
        if (!nItem.includes(mSize)) return false
      }
    }
  }

  // 世代チェック
  const mGen = nModel.match(/第(\d+)世代/)?.[1]
  const iGen = nItem.match(/第(\d+)世代/)?.[1]
  if (mGen && iGen && mGen !== iGen) return false

  // 識別要素チェック (OR: 世代・CPU・年)
  let genMatch = !!(mGen && iGen && mGen === iGen)
  if (!genMatch && mGen) {
    const seriesGenPattern = new RegExp(currentType + mGen + '(?![0-9])')
    if (seriesGenPattern.test(nItem)) genMatch = true
  }

  const cpuShort = cpuName
    ? cpuName.toLowerCase().replace(/\s+/g, '').replace(/bionic|pro|チップ/g, '')
    : null
  let cpuMatch = false
  if (cpuShort) {
    const cpuRegex = new RegExp(cpuShort + '(?![0-9])')
    cpuMatch = cpuRegex.test(nItem)
  }

  const yearMatch = releaseYear ? nItem.includes(String(releaseYear)) : false

  return genMatch || cpuMatch || yearMatch
}

export async function fetchIpadPrices(): Promise<void> {
  console.log('\n📱 ========== iPad 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('ipad_models')
    .select('id, model, strage, cpu, date')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('iPad モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.model
    const cpuName: string | null = model.cpu
    const releaseDate: string | null = model.date
    const minCapacity = extractMinCapacity(model.strage)
    const releaseYear = releaseDate ? String(releaseDate).match(/(\d{4})/)?.[1] ?? null : null

    console.log(`\n🚀 ${modelName} (${minCapacity || '-'})`)

    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS) {
      const strategies = [
        {
          type: 'generation',
          keyword: buildIpadSearchKeyword(modelName, minCapacity, cpuName, releaseYear, 'generation'),
        },
        {
          type: 'cpu',
          keyword: buildIpadSearchKeyword(modelName, minCapacity, cpuName, releaseYear, 'cpu'),
        },
        {
          type: 'year',
          keyword: buildIpadSearchKeyword(modelName, minCapacity, cpuName, releaseYear, 'year'),
        },
      ]

      const result = await searchWithStrategies({
        shopCode: shop.code,
        shopName: shop.name,
        strategies,
        genreId: GENRE_TABLET,
        getNgKeyword: (strategyType) =>
          getIpadNgKeyword(modelName, cpuName, strategyType === 'cpu' ? 'cpu' : 'other'),
        matchFn: (itemName) =>
          isExactIpadModelMatch(itemName, modelName, cpuName, minCapacity, releaseYear),
      })
      prices[shop.key] = result
    }

    // 当日(JST)の既存データを削除（最新を優先）
    const todayJST = getTodayJST()
    await supabase
      .from('ipad_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    const { error: insertError } = await supabase.from('ipad_price_logs').insert({
      logged_at: getNowISOJST(),
      model_id: model.id,
      model_name: modelName,
      storage: minCapacity || null,
      iosys_min: prices.iosys.min === '-' ? null : prices.iosys.min,
      iosys_max: prices.iosys.max === '-' ? null : prices.iosys.max,
      iosys_min_text: prices.iosys.minItemName === '-' ? null : prices.iosys.minItemName,
      iosys_max_text: prices.iosys.maxItemName === '-' ? null : prices.iosys.maxItemName,
      geo_min: prices.geo.min === '-' ? null : prices.geo.min,
      geo_max: prices.geo.max === '-' ? null : prices.geo.max,
      geo_min_text: prices.geo.minItemName === '-' ? null : prices.geo.minItemName,
      geo_max_text: prices.geo.maxItemName === '-' ? null : prices.geo.maxItemName,
      janpara_min: prices.janpara.min === '-' ? null : prices.janpara.min,
      janpara_max: prices.janpara.max === '-' ? null : prices.janpara.max,
      janpara_min_text: prices.janpara.minItemName === '-' ? null : prices.janpara.minItemName,
      janpara_max_text: prices.janpara.maxItemName === '-' ? null : prices.janpara.maxItemName,
      // 流通量の目安（適用日以降のみ記録）
      iosys_count: prices.iosys.count,
      geo_count: prices.geo.count,
      janpara_count: prices.janpara.count,
      // 取得した全商品の価格（中央値・分布の算出用。適用日以降のみ記録）
      iosys_prices: prices.iosys.prices,
      geo_prices: prices.geo.prices,
      janpara_prices: prices.janpara.prices,
    })

    // 全ショップで0件は設定漏れ（NGキーワード・検索語）の可能性が高い。
    // 黙って null 行が積まれると気づけないので明示する
    const totalMatched = prices.iosys.count + prices.geo.count + prices.janpara.count
    if (totalMatched === 0) {
      console.warn(`  ⚠️ 全ショップで0件: ${modelName} — 検索語/NGキーワードの設定を確認`)
    }

    if (insertError) {
      console.error(`  ❌ DB INSERT失敗: ${modelName}`, insertError.message)
    } else {
      console.log(`  📤 DB保存完了: ${modelName} (${totalMatched}件)`)
    }
  }

  console.log('\n📱 ========== iPad 価格取得完了 ==========')
}
