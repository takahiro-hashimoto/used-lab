/**
 * デッドリンクチェッカー
 *
 * 使い方:
 *   tsx scripts/check-links.ts                     # 本番サイト (used-lab.jp) を全リンクチェック
 *   tsx scripts/check-links.ts --local             # ローカル (localhost:3000) をチェック
 *   tsx scripts/check-links.ts --internal-only     # 内部リンクのみ（外部URLをスキップ）
 *   tsx scripts/check-links.ts --url https://...   # 任意のURLを起点に
 */

import { LinkChecker, LinkState, type LinkResult } from 'linkinator'

// ============================================================
// 引数パース
// ============================================================
const args = process.argv.slice(2)
const isLocal       = args.includes('--local')
const internalOnly  = args.includes('--internal-only')
const urlArgIdx     = args.indexOf('--url')
const customUrl     = urlArgIdx !== -1 ? args[urlArgIdx + 1] : null

const PROD_URL  = 'https://used-lab.jp'
const LOCAL_URL = 'http://localhost:3000'
const BASE_URL  = customUrl ?? (isLocal ? LOCAL_URL : PROD_URL)

// ============================================================
// スキップパターン（アフィリエイト・リダイレクト系）
// ============================================================
const ALWAYS_SKIP: RegExp[] = [
  // アフィリエイトリダイレクト（正常チェック不可）
  /a8\.net/,
  /af\.moshimo\.com/,
  /hb\.afl\.rakuten/,
  /rebates\.jp/,
  /rakuten\.co\.jp\/r\//,
  // その他リダイレクト追跡が難しいもの
  /amzn\.to/,
  /bit\.ly/,
]

const INTERNAL_ONLY_SKIP: RegExp[] = [
  // 上記に加えて外部ドメイン全般をスキップ
  /^https?:\/\/(?!used-lab\.jp|localhost)/,
]

const skipPatterns = internalOnly
  ? [...ALWAYS_SKIP, ...INTERNAL_ONLY_SKIP]
  : ALWAYS_SKIP

// ============================================================
// チェック実行
// ============================================================
interface BrokenLink {
  url: string
  status: number
  parent: string
}

async function main() {
  console.log(`\n🔍 デッドリンクチェック開始`)
  console.log(`   起点URL    : ${BASE_URL}`)
  console.log(`   モード     : ${internalOnly ? '内部リンクのみ' : '全リンク（外部含む）'}`)
  console.log(`   スキップ   : アフィリエイト系URL\n`)

  const checker = new LinkChecker()
  const broken: BrokenLink[] = []
  const skipped: string[] = []
  let checked = 0

  checker.on('link', (result: LinkResult) => {
    checked++

    if (result.state === LinkState.BROKEN) {
      const entry: BrokenLink = {
        url: result.url,
        status: result.status ?? 0,
        parent: result.parent ?? '',
      }
      broken.push(entry)
      process.stdout.write('\n')
      console.log(`❌  [${entry.status || 'ERR'}] ${entry.url}`)
      console.log(`    └ ${entry.parent}`)
    } else if (result.state === LinkState.SKIPPED) {
      skipped.push(result.url)
    } else {
      // 進捗表示（同一行上書き）
      process.stdout.write(`\r✅  チェック済み: ${checked} 件`)
    }
  })

  await checker.check({
    path: BASE_URL,
    recurse: true,
    linksToSkip: skipPatterns.map((r) => r.source),
    timeout: 15_000,
    concurrency: 8,
    retryErrors: true,
    retryErrorsCount: 2,
    retryErrorsJitter: 500,
  })

  // ============================================================
  // レポート出力
  // ============================================================
  process.stdout.write('\n')
  console.log('\n' + '='.repeat(60))
  console.log('📊  チェック結果')
  console.log('='.repeat(60))
  console.log(`  チェック済み : ${checked} 件`)
  console.log(`  スキップ     : ${skipped.length} 件`)
  console.log(`  ❌ 壊れたリンク: ${broken.length} 件`)

  if (broken.length === 0) {
    console.log('\n✅  デッドリンクは見つかりませんでした！')
  } else {
    console.log('\n' + '='.repeat(60))
    console.log('❌  壊れたリンク一覧')
    console.log('='.repeat(60))

    // ページ別にグループ化
    const byParent = new Map<string, BrokenLink[]>()
    for (const link of broken) {
      const arr = byParent.get(link.parent) ?? []
      arr.push(link)
      byParent.set(link.parent, arr)
    }

    for (const [parent, links] of byParent) {
      console.log(`\n📄  ${parent}`)
      for (const link of links) {
        console.log(`    [${link.status || 'ERR'}] ${link.url}`)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log(`合計 ${broken.length} 件のデッドリンクが見つかりました`)

    // JSON レポートを出力
    const reportPath = 'broken-links-report.json'
    const { writeFileSync } = await import('fs')
    writeFileSync(
      reportPath,
      JSON.stringify(
        {
          checkedAt: new Date().toISOString(),
          baseUrl: BASE_URL,
          totalChecked: checked,
          brokenCount: broken.length,
          broken: broken.map((b) => ({
            url: b.url,
            status: b.status,
            foundOn: b.parent,
          })),
        },
        null,
        2
      )
    )
    console.log(`\n📄  詳細レポート: ${reportPath}`)

    process.exit(1) // CI で失敗扱いにする場合
  }
}

main().catch((err) => {
  console.error('チェック中にエラーが発生しました:', err)
  process.exit(1)
})
