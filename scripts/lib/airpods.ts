// ============================================
// AirPods 価格取得
// ============================================

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS_AIRPODS } from './config'
import { searchMultiKeywordAndMatch } from './rakuten-api'
import { type PriceResult } from './utils'

// --- 検索キーワード生成 ---

function buildAirPodsGenerationKeyword(modelName: string): string | null {
  const name = modelName.toLowerCase()

  if (name.includes('pro 2') || name.includes('pro2')) return 'AirPods Pro 第2世代'
  if (name.includes('pro') && !name.includes('2')) return 'AirPods Pro 第1世代'
  if (name.includes('4')) return 'AirPods 第4世代'
  if (name.includes('3')) return 'AirPods 第3世代'
  if (name.includes('2')) return 'AirPods 第2世代'
  if (name === 'airpods' || name.includes('初代') || name.includes('1'))
    return 'AirPods 第1世代'

  return null
}

function buildAirPodsSearchKeywords(
  modelName: string,
  modelNumber: string | null,
  releaseYear: string | null
): string[] {
  const keywords: string[] = []

  // AirPods Max 特別処理
  if (modelName.toLowerCase().includes('max')) {
    if (releaseYear === '2020') {
      keywords.push('AirPods Max')
    } else if (releaseYear === '2024') {
      keywords.push('AirPods Max USB-C')
      keywords.push('AirPods Max 2024')
    } else {
      keywords.push('AirPods Max')
    }
    return keywords
  }

  // 型番で検索（最優先）
  if (modelNumber) {
    keywords.push(modelNumber)
  }

  // 世代表記
  const genKeyword = buildAirPodsGenerationKeyword(modelName)
  if (genKeyword) {
    keywords.push(genKeyword)
  }

  return keywords
}

// --- マッチング ---

function isAirPodsOnlyCase(itemName: string): boolean {
  const caseOnlyKeywords = [
    'ケースのみ',
    'case only',
    'caseonly',
    '充電ケースのみ',
    'ケース単体',
    'ケース 単体',
    '充電器のみ',
    'ケース（のみ',
    'ケース(のみ',
    'charging case only',
  ]
  return caseOnlyKeywords.some((kw) => itemName.includes(kw))
}

function isAirPodsOnlyOneEar(itemName: string): boolean {
  const oneEarKeywords = [
    '右耳のみ',
    '左耳のみ',
    '片耳のみ',
    '右耳 ',
    '左耳 ',
    '片耳 ',
    'r側',
    'l側',
    '右側のみ',
    '左側のみ',
    'right only',
    'left only',
    '片方',
    '右のみ',
    '左のみ',
  ]
  return oneEarKeywords.some((kw) => itemName.includes(kw))
}

function extractAirPodsGenerationFromItem(itemName: string): string | null {
  const genMatch = itemName.match(/第(\d)世代/)
  if (genMatch) return genMatch[1]
  const numMatch = itemName.match(/airpods\s?(\d)(?!\d)/)
  if (numMatch) return numMatch[1]
  return null
}

function isExactAirPodsModelMatch(
  itemName: string,
  modelName: string,
  modelNumber: string | null,
  releaseYear: string | null
): boolean {
  const nItem = itemName.toLowerCase().replace(/\s+/g, '').replace(/　/g, '')
  const nModel = modelName.toLowerCase().replace(/\s+/g, '')
  const nModelNumber = modelNumber
    ? modelNumber.toLowerCase().replace(/\s+/g, '').replace('/', '')
    : ''

  // 除外条件
  if (isAirPodsOnlyCase(nItem)) return false
  if (isAirPodsOnlyOneEar(nItem)) return false
  if (nItem.includes('ジャンク') || nItem.includes('junk')) return false
  if (nItem.includes('未使用') || nItem.includes('新品')) return false

  // AirPods Max
  if (nModel.includes('max')) {
    if (
      !nItem.includes('airpodsmax') &&
      !nItem.includes('airpods max') &&
      !nItem.includes('airpods　max')
    )
      return false

    const isMax2020ByModelNumber = nModelNumber.includes('mgy') && nModelNumber.includes('3j')
    const isMax2024ByModelNumber = nModelNumber.includes('mww') && nModelNumber.includes('3za')

    const itemHas2020Pattern = nItem.includes('mgy') && !!nItem.match(/mgy.?3j/)
    const itemHas2024Pattern = nItem.includes('mww') && !!nItem.match(/mww.?3za/)

    const itemHasLightning = nItem.includes('lightning')
    const itemHasUSBC =
      nItem.includes('usb-c') || nItem.includes('usbc') || nItem.includes('usb c')

    const itemHas2020 = nItem.includes('2020')
    const itemHas2024 = nItem.includes('2024')

    if (isMax2020ByModelNumber || releaseYear === '2020') {
      if (itemHas2024Pattern || itemHasUSBC || itemHas2024) return false
      return (
        itemHas2020Pattern ||
        itemHasLightning ||
        itemHas2020 ||
        (!itemHas2024Pattern && !itemHasUSBC && !itemHas2024)
      )
    }

    if (isMax2024ByModelNumber || releaseYear === '2024') {
      if (itemHas2020Pattern || itemHas2020) return false
      return itemHas2024Pattern || itemHasUSBC || itemHas2024
    }

    return true
  }

  // AirPods Pro
  if (nModel.includes('pro')) {
    if (nItem.includes('max')) return false
    if (!nItem.includes('airpodspro') && !nItem.includes('airpods pro')) return false

    if (nModelNumber) {
      const modelNumberClean = nModelNumber.replace(/[\/\-\[\]]/g, '').toLowerCase()
      const itemModelNumber = nItem.replace(/[\/\-\[\]]/g, '')
      return itemModelNumber.includes(modelNumberClean)
    }

    const isPro2Model = nModel.includes('pro2') || nModel.includes('pro 2')
    const isPro2Item =
      nItem.includes('pro2') ||
      nItem.includes('第2世代') ||
      nItem.includes('2nd') ||
      nItem.includes('mqd83') ||
      nItem.includes('mtjv3')

    if (isPro2Model) return isPro2Item
    return !isPro2Item
  }

  // 通常 AirPods
  if (nItem.includes('pro') || nItem.includes('max')) return false
  if (!nItem.includes('airpods')) return false

  if (nModelNumber) {
    const modelNumberClean = nModelNumber.replace(/[\/\-\[\]]/g, '').toLowerCase()
    const itemModelNumber = nItem.replace(/[\/\-\[\]]/g, '')
    return itemModelNumber.includes(modelNumberClean)
  }

  const modelGen = nModel.match(/(\d)/)?.[1] ?? null
  const itemGen = extractAirPodsGenerationFromItem(nItem)
  if (modelGen && itemGen) return modelGen === itemGen

  return false
}

export async function fetchAirPodsPrices(): Promise<void> {
  console.log('\n🎧 ========== AirPods 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('airpods_models')
    .select('id, name, model, date')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('AirPods モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.name
    const modelNumber: string | null = model.model
    const releaseDate: string | null = model.date
    const releaseYear = releaseDate ? String(releaseDate).match(/(\d{4})/)?.[1] ?? null : null

    console.log(`\n🚀 ${modelName} (${modelNumber || '-'})`)

    const keywords = buildAirPodsSearchKeywords(modelName, modelNumber, releaseYear)
    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS_AIRPODS) {
      const result = await searchMultiKeywordAndMatch({
        shopCode: shop.code,
        shopName: shop.name,
        keywords,
        maxPages: 3,
        matchFn: (itemName) =>
          isExactAirPodsModelMatch(itemName, modelName, modelNumber, releaseYear),
      })
      prices[shop.key] = result
    }

    // 当日の既存データを削除（最新を優先）
    const today = new Date().toISOString().split('T')[0]
    await supabase
      .from('airpods_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${today}T00:00:00Z`)
      .lte('logged_at', `${today}T23:59:59Z`)

    const { error: insertError } = await supabase.from('airpods_price_logs').insert({
      logged_at: new Date().toISOString(),
      model_id: model.id,
      model_name: modelName,
      iosys_min: prices.iosys?.min === '-' ? null : prices.iosys?.min ?? null,
      iosys_max: prices.iosys?.max === '-' ? null : prices.iosys?.max ?? null,
      janpara_min: prices.janpara?.min === '-' ? null : prices.janpara?.min ?? null,
      janpara_max: prices.janpara?.max === '-' ? null : prices.janpara?.max ?? null,
      eearphone_min: prices.eearphone?.min === '-' ? null : prices.eearphone?.min ?? null,
      eearphone_max: prices.eearphone?.max === '-' ? null : prices.eearphone?.max ?? null,
    })

    if (insertError) {
      console.error(`  ❌ DB INSERT失敗: ${modelName}`, insertError.message)
    } else {
      console.log(`  📤 DB保存完了: ${modelName}`)
    }
  }

  console.log('\n🎧 ========== AirPods 価格取得完了 ==========')
}
