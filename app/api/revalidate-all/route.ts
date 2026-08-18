import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return false

  const auth = req.headers.get('authorization')
  const headerSecret = req.headers.get('x-revalidate-secret')
  const querySecret = req.nextUrl.searchParams.get('secret')

  return (
    auth === `Bearer ${secret}` ||
    headerSecret === secret ||
    querySecret === secret
  )
}

/**
 * 無効化するタグを決める。
 *
 * ボディで tags を渡せば、そのタグだけを無効化する。
 * 管理画面をローカルからのみ使う運用で、保存のたびに本番へ
 * 「いま自分がパージしたタグ」を送るために使う。
 * 全21タグを毎回パージすると、編集1件で全ページが再生成対象になり
 * ISR Writes が膨らむ（クレジットを圧迫する）。
 *
 * tags を渡さなければ従来どおり全タグ。デプロイ後の再検証はこちら。
 */
type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

async function resolveTags(req: NextRequest): Promise<CacheTag[]> {
  const all = Object.values(CACHE_TAGS) as CacheTag[]
  const known = new Set<string>(all)

  try {
    const body = await req.json()
    if (!Array.isArray(body?.tags)) return all
    // 未知のタグは無視する。任意の文字列で無効化させない
    return body.tags.filter((t: unknown): t is CacheTag => typeof t === 'string' && known.has(t))
  } catch {
    // ボディ無し（デプロイ後の再検証）は全タグ
    return all
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const tags = await resolveTags(req)
  for (const tag of tags) {
    revalidateTag(tag, 'max')
  }

  // sitemap/robots/llms 系のRoute Handlerも、デプロイ後に明示的に再検証しておく。
  // タグを絞った呼び出し（管理画面の保存）では機種が増減しないので走らせない
  const isFullPurge = tags.length === Object.values(CACHE_TAGS).length
  const paths = isFullPurge
    ? ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt']
    : []
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    ok: true,
    revalidatedTags: tags,
    revalidatedPaths: paths,
  })
}
