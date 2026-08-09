// ============================================
// 価格取得スクリプト メインエントリポイント
// ============================================
// 使い方:
//   npx tsx scripts/fetch-prices.ts           # 全製品
//   npx tsx scripts/fetch-prices.ts iphone    # iPhone のみ
//   npx tsx scripts/fetch-prices.ts ipad      # iPad のみ
//   npx tsx scripts/fetch-prices.ts watch     # Watch のみ
//   npx tsx scripts/fetch-prices.ts airpods   # AirPods のみ
//   npx tsx scripts/fetch-prices.ts pixel     # Pixel のみ
//   npx tsx scripts/fetch-prices.ts galaxy    # Galaxy のみ

import { config } from 'dotenv'
// ローカル実行時は .env.local を読み込む（GitHub Actions では環境変数が直接設定される）
config({ path: '.env.local', quiet: true })
import { validateEnv } from './lib/config'
import { fetchIphonePrices } from './lib/iphone'
import { fetchIpadPrices } from './lib/ipad'
import { fetchWatchPrices } from './lib/watch'
import { fetchAirPodsPrices } from './lib/airpods'
import { fetchMacbookPrices } from './lib/macbook'
import { fetchMacPrices } from './lib/mac'
import { fetchPixelPrices } from './lib/pixel'
import { fetchGalaxyPrices } from './lib/galaxy'

const TARGETS = ['iphone', 'ipad', 'watch', 'airpods', 'macbook', 'mac', 'pixel', 'galaxy'] as const
type Target = (typeof TARGETS)[number]

async function main() {
  console.log('🚀 価格取得スクリプト開始')
  console.log(`   実行日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`)

  validateEnv()

  // コマンドライン引数でフィルタリング
  const args = process.argv.slice(2).map((a) => a.toLowerCase())
  const targets: Target[] =
    args.length > 0 ? args.filter((a): a is Target => TARGETS.includes(a as Target)) : [...TARGETS]

  if (targets.length === 0) {
    console.error(`❌ 無効なターゲット: ${args.join(', ')}`)
    console.error(`   有効な値: ${TARGETS.join(', ')}`)
    process.exit(1)
  }

  console.log(`   対象: ${targets.join(', ')}`)

  const startTime = Date.now()
  // 1カテゴリの失敗で後続を道連れにしない。
  // 2026-07-30、iPhoneの途中でJSON解析エラーが main() まで伝播し、
  // 残り6カテゴリが1件も取得されないまま全処理が停止した。
  const failed: string[] = []

  for (const target of targets) {
    try {
      switch (target) {
        case 'iphone':
          await fetchIphonePrices()
          break
        case 'ipad':
          await fetchIpadPrices()
          break
        case 'watch':
          await fetchWatchPrices()
          break
        case 'airpods':
          await fetchAirPodsPrices()
          break
        case 'macbook':
          await fetchMacbookPrices()
          break
        case 'mac':
          await fetchMacPrices()
          break
        case 'pixel':
          await fetchPixelPrices()
          break
        case 'galaxy':
          await fetchGalaxyPrices()
          break
      }
    } catch (err) {
      failed.push(target)
      console.error(`\n❌ ${target} の取得中に想定外のエラー: ${err instanceof Error ? err.stack ?? err.message : String(err)}`)
      console.error(`   このカテゴリはスキップして次に進みます`)
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1)
  if (failed.length > 0) {
    // 部分的な失敗を成功と誤認しないよう、終了コードを立てる（cronの監視で拾える）
    console.error(`\n⚠️ 完了（${elapsed}分）— 失敗したカテゴリ: ${failed.join(', ')}`)
    process.exitCode = 1
    return
  }
  console.log(`\n✅ 全処理完了（${elapsed}分）`)
}

main().catch((err) => {
  console.error('❌ スクリプトエラー:', err)
  process.exit(1)
})
