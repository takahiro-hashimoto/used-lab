// ============================================
// Amazon整備済み(Renewed) Apple製品 取得テスト
// ============================================
// 使い方:
//   npx tsx scripts/fetch-amazon-renewed.ts                 # "Apple" で検索
//   npx tsx scripts/fetch-amazon-renewed.ts "MacBook Air"   # キーワード指定
// ============================================

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { searchAppleRenewed, hasAmazonCredentials } from '../lib/amazon'

async function main() {
  if (!hasAmazonCredentials()) {
    console.error('❌ .env.local に AMAZON_ACCESS_KEY / AMAZON_SECRET_KEY / AMAZON_PARTNER_TAG を設定してください')
    process.exit(1)
  }

  const keywords = process.argv.slice(2).join(' ') || 'Apple 整備済み品'
  console.log(`🔎 Amazon Renewed 検索: "${keywords}"`)

  const items = await searchAppleRenewed(keywords, 10)
  console.log(`   取得: ${items.length} 件\n`)

  for (const it of items) {
    console.log(`[${it.asin}] ${it.priceDisplay ?? '価格なし'}  condition=${it.condition ?? '-'}`)
    console.log(`   ${it.title}`)
  }
  console.log('\n✅ 完了')
}

main().catch((err) => {
  console.error('❌ エラー:', err instanceof Error ? err.message : err)
  process.exit(1)
})
