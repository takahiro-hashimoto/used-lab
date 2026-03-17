import { buildLlmsFullTxt } from '@/lib/llms-builder'

export const revalidate = 86400 // 24時間キャッシュ

export async function GET() {
  const body = await buildLlmsFullTxt()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
