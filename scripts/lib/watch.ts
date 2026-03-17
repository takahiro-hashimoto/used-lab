// ============================================
// Apple Watch 価格取得
// ============================================

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS } from './config'
import { searchMultiKeywordAndMatch } from './rakuten-api'
import { extractMinSize, getTodayJST, getNowISOJST, type PriceResult } from './utils'

/** SE系はショップによって表記が異なるため、複数のキーワードを返す */
function buildWatchSearchKeywords(modelName: string, minSize: string | null): string[] {
  const keywords: string[] = []
  const sizeStr = minSize || ''

  if (modelName.includes('SE')) {
    if (modelName.includes('SE2')) {
      keywords.push(`Apple Watch SE 第2世代 ${sizeStr}`)
      keywords.push(`Apple Watch SE2 ${sizeStr}`)
    } else if (modelName.includes('SE3')) {
      keywords.push(`Apple Watch SE 第3世代 ${sizeStr}`)
      keywords.push(`Apple Watch SE3 ${sizeStr}`)
    } else {
      keywords.push(`Apple Watch SE ${sizeStr}`)
    }
  } else if (modelName.includes('Ultra')) {
    if (modelName.includes('Ultra2')) {
      keywords.push(`Apple Watch Ultra2 ${sizeStr}`)
    } else if (modelName.includes('Ultra3')) {
      keywords.push(`Apple Watch Ultra3 ${sizeStr}`)
    } else {
      keywords.push(`Apple Watch Ultra ${sizeStr}`)
    }
  } else {
    const seriesNum = modelName.match(/Watch\s*(\d+)/)?.[1]
    if (seriesNum) {
      keywords.push(`Apple Watch Series${seriesNum} ${sizeStr}`)
    } else {
      keywords.push(`${modelName} ${sizeStr}`)
    }
  }

  return keywords.map((k) => k.trim())
}

function isExactWatchModelMatch(
  itemName: string,
  modelName: string,
  minSize: string | null
): boolean {
  const nItem = itemName.toLowerCase().replace(/\s+/g, '').replace(/　/g, '')
  const nModel = modelName.toLowerCase().replace(/\s+/g, '')

  const isUltra = nModel.includes('ultra')

  // 除外条件
  if (!isUltra) {
    if (nItem.includes('cellular') || nItem.includes('セルラー') || nItem.includes('gps+'))
      return false
  }
  if (nItem.includes('未使用')) return false
  if (!isUltra) {
    if (
      nItem.includes('ステンレス') ||
      nItem.includes('stainless') ||
      nItem.includes('チタン') ||
      nItem.includes('titanium') ||
      nItem.includes('titan')
    )
      return false
  }

  // サイズチェック
  if (minSize) {
    const sizeNum = minSize.replace('mm', '')
    if (!nItem.includes(`${sizeNum}mm`) && !nItem.includes(`${sizeNum}ミリ`)) return false
  }

  const isSE = nModel.includes('se') && !nModel.includes('series')
  const isSeries = !isUltra && !isSE

  // Ultra判定
  if (isUltra) {
    if (!nItem.includes('ultra')) return false
    if (nItem.includes('series') || nItem.includes('se')) return false

    const ultraNum = nModel.match(/ultra(\d)?/)?.[1] || ''
    if (ultraNum === '') {
      if (nItem.includes('ultra2') || nItem.includes('ultra3')) return false
    } else if (ultraNum === '2') {
      if (!nItem.includes('ultra2')) return false
    } else if (ultraNum === '3') {
      if (!nItem.includes('ultra3')) return false
    }
    return true
  }

  // SE判定
  if (isSE) {
    if (!nItem.includes('se')) return false
    if (nItem.includes('series') || nItem.includes('ultra')) return false

    const seNum = nModel.match(/se(\d)?/)?.[1] || ''
    if (seNum === '') {
      if (nItem.includes('se2') || nItem.includes('se3')) return false
      if (nItem.includes('第2世代') || nItem.includes('第3世代')) return false
    } else if (seNum === '2') {
      if (!nItem.includes('se2') && !nItem.includes('第2世代')) return false
      if (nItem.includes('第3世代')) return false
    } else if (seNum === '3') {
      if (!nItem.includes('se3') && !nItem.includes('第3世代')) return false
    }
    return true
  }

  // Series判定
  if (isSeries) {
    if (nItem.includes('ultra')) return false
    if (nItem.match(/se[^r0-9]/) || nItem.match(/se$/)) return false

    const modelSeriesNum = nModel.match(/watch(\d+)/)?.[1]
    if (!modelSeriesNum) return false

    if (!nItem.includes(`series${modelSeriesNum}`)) return false
    return true
  }

  return false
}

export async function fetchWatchPrices(): Promise<void> {
  console.log('\n⌚ ========== Apple Watch 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('watch_models')
    .select('id, model, size, cpu, date')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('Watch モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.model
    const minSize = extractMinSize(model.size)

    console.log(`\n🚀 ${modelName} (${minSize || '-'})`)

    const keywords = buildWatchSearchKeywords(modelName, minSize)
    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS) {
      const result = await searchMultiKeywordAndMatch({
        shopCode: shop.code,
        shopName: shop.name,
        keywords,
        matchFn: (itemName) => isExactWatchModelMatch(itemName, modelName, minSize),
      })
      prices[shop.key] = result
    }

    // 当日(JST)の既存データを削除（最新を優先）
    const todayJST = getTodayJST()
    await supabase
      .from('watch_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    const { error: insertError } = await supabase.from('watch_price_logs').insert({
      logged_at: getNowISOJST(),
      model_id: model.id,
      model_name: modelName,
      storage: minSize || null,
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
    })

    if (insertError) {
      console.error(`  ❌ DB INSERT失敗: ${modelName}`, insertError.message)
    } else {
      console.log(`  📤 DB保存完了: ${modelName}`)
    }
  }

  console.log('\n⌚ ========== Apple Watch 価格取得完了 ==========')
}
