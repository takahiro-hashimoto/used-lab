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
import { getApiStats } from './lib/utils'
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

  // 楽天APIが全滅していないかを確認する。
  // 各カテゴリは取得0件でも「価格null」の行をINSERTして正常終了するため、
  // ここで見ないと障害が成功として記録される。実際に見逃した:
  //   2026-06-29〜07-13（15日間）… 2026年インフラ刷新でエンドポイント変更
  //   2026-08-18〜08-19（2日間） … APIバージョン 20220601 が廃止
  // どちらも「認証情報は正しいのに全リクエストが4xx」という同じ壊れ方だった。
  const api = getApiStats()
  console.log(`\n📊 楽天API: 成功 ${api.ok}件 / 失敗 ${api.failed}件`)
  if (api.ok === 0 && api.failed > 0) {
    console.error(
      `\n🚨 楽天APIが1件も成功していません（失敗 ${api.failed}件）。\n` +
        `   価格が全てnullのまま保存されています。以下を上から順に確認してください:\n` +
        `   1. APIバージョンの廃止 — ログに "API Configuration not found" が出ていれば これ。\n` +
        `      scripts/lib/config.ts の RAKUTEN_API_BASE 末尾を新しい版に上げる\n` +
        `   2. IP制限 — "CLIENT_IP_NOT_ALLOWED" なら 楽天の許可IPを確認\n` +
        `   3. 認証情報 — 上記以外なら applicationId / accessKey を確認`
    )
    process.exitCode = 1
    return
  }

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
