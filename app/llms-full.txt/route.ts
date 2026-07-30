import { buildLlmsFullTxt } from '@/lib/llms-builder'

// 機種別の中古価格レンジ（実データ）を含むため、価格ログ系の基準に合わせて1日1回だけ再生成する。
// revalidate: false のままでは価格が永久に固定され、AI/LLM に古い金額を提供し続けてしまう。
// 対象は本ルート1件のみなので ISR Write Units への影響は無視できる（CLAUDE.md のガード参照）。
export const revalidate = 86400

export async function GET() {
  const body = await buildLlmsFullTxt()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
