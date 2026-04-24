/**
 * macbook_models テーブルに benchmarks カラムを追加し、データを投入するスクリプト
 *
 * 実行: npx tsx scripts/add-benchmarks.ts
 *
 * データソース:
 *   CPU: https://browser.geekbench.com/mac-benchmarks
 *   GPU: https://browser.geekbench.com/metal-benchmarks
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ 環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

type BenchmarkData = Record<string, { single: number; multi: number; metal: number }>

const BENCHMARK_DATA: { id: number; model: string; benchmarks: BenchmarkData }[] = [
  {
    id: 1,
    model: 'MacBook Air 13インチ（2020）',
    benchmarks: {
      'M1': { single: 2347, multi: 8342, metal: 32394 },
    },
  },
  {
    id: 2,
    model: 'MacBook Air 13インチ（2022）',
    benchmarks: {
      'M2': { single: 2587, multi: 9666, metal: 44727 },
    },
  },
  {
    id: 3,
    model: 'MacBook Air 15インチ（2023）',
    benchmarks: {
      'M2': { single: 2597, multi: 9709, metal: 44727 },
    },
  },
  {
    id: 4,
    model: 'MacBook Air 13インチ（2024）',
    benchmarks: {
      'M3': { single: 3065, multi: 11959, metal: 44336 },
    },
  },
  {
    id: 5,
    model: 'MacBook Air 15インチ（2024）',
    benchmarks: {
      'M3': { single: 3067, multi: 11988, metal: 44336 },
    },
  },
  {
    id: 6,
    model: 'MacBook Air 13インチ（2025）',
    benchmarks: {
      'M4': { single: 3697, multi: 14745, metal: 54713 },
    },
  },
  {
    id: 7,
    model: 'MacBook Air 15インチ（2025）',
    benchmarks: {
      'M4': { single: 3708, multi: 14707, metal: 54713 },
    },
  },
  {
    id: 8,
    model: 'MacBook Pro 13インチ（2020）',
    benchmarks: {
      'M1': { single: 2324, multi: 8189, metal: 32394 },
    },
  },
  {
    id: 9,
    model: 'MacBook Pro 14インチ（2021）',
    benchmarks: {
      'M1 Pro': { single: 2386, multi: 12348, metal: 62109 },
      'M1 Max': { single: 2386, multi: 12348, metal: 112213 },
    },
  },
  {
    id: 10,
    model: 'MacBook Pro 16インチ（2021）',
    benchmarks: {
      'M1 Pro': { single: 2374, multi: 12261, metal: 62109 },
      'M1 Max': { single: 2374, multi: 12261, metal: 112213 },
    },
  },
  {
    id: 11,
    model: 'MacBook Pro 13インチ（2022）',
    benchmarks: {
      'M2': { single: 2600, multi: 9643, metal: 44727 },
    },
  },
  {
    id: 12,
    model: 'MacBook Pro 14インチ（2023年2月）',
    benchmarks: {
      'M2 Pro': { single: 2656, multi: 14456, metal: 78225 },
      'M2 Max': { single: 2749, multi: 14744, metal: 133580 },
    },
  },
  {
    id: 13,
    model: 'MacBook Pro 16インチ（2023年2月）',
    benchmarks: {
      'M2 Pro': { single: 2643, multi: 14355, metal: 78225 },
      'M2 Max': { single: 2749, multi: 14744, metal: 133580 },
    },
  },
  {
    id: 14,
    model: 'MacBook Pro 14インチ（2023年11月）',
    benchmarks: {
      'M3': { single: 3076, multi: 11537, metal: 44336 },
      'M3 Pro': { single: 3100, multi: 15260, metal: 74427 },
      'M3 Max': { single: 3107, multi: 18935, metal: 143825 },
    },
  },
  {
    id: 15,
    model: 'MacBook Pro 16インチ（2023年11月）',
    benchmarks: {
      'M3 Pro': { single: 3105, multi: 15249, metal: 74427 },
      'M3 Max': { single: 3128, multi: 20962, metal: 143825 },
    },
  },
  {
    id: 16,
    model: 'MacBook Pro 14インチ（2024）',
    benchmarks: {
      'M4': { single: 3754, multi: 14920, metal: 54713 },
      'M4 Pro': { single: 3851, multi: 22429, metal: 105442 },
      'M4 Max': { single: 3884, multi: 25647, metal: 179229 },
    },
  },
  {
    id: 17,
    model: 'MacBook Pro 16インチ（2024）',
    benchmarks: {
      'M4 Pro': { single: 3877, multi: 22508, metal: 105442 },
      'M4 Max': { single: 3916, multi: 25712, metal: 179229 },
    },
  },
]

async function main() {
  console.log('🚀 ベンチマークデータの投入を開始...\n')

  // まずカラムが存在するか確認（存在しなければSupabase Dashboard/SQLエディタで事前に追加が必要）
  const { error: testError } = await supabase
    .from('macbook_models')
    .select('id, benchmarks')
    .limit(1)
    .single()

  if (testError && testError.message.includes('benchmarks')) {
    console.error('❌ benchmarks カラムが存在しません。')
    console.error('   Supabase Dashboard の SQL Editor で以下を実行してください:')
    console.error('   ALTER TABLE macbook_models ADD COLUMN IF NOT EXISTS benchmarks jsonb DEFAULT NULL;')
    process.exit(1)
  }

  let success = 0
  let failed = 0

  for (const item of BENCHMARK_DATA) {
    const { error } = await supabase
      .from('macbook_models')
      .update({ benchmarks: item.benchmarks })
      .eq('id', item.id)

    if (error) {
      console.error(`❌ ID=${item.id} ${item.model}: ${error.message}`)
      failed++
    } else {
      const chips = Object.keys(item.benchmarks).join(', ')
      console.log(`✅ ID=${item.id} ${item.model} → ${chips}`)
      success++
    }
  }

  console.log(`\n完了: ${success}件成功 / ${failed}件失敗`)
}

main()
