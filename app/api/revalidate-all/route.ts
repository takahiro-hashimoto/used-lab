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

/** paths で指定できるのはこの4つだけ。任意パスの再検証はさせない */
const KNOWN_PATHS = ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt'] as const

async function resolveBody(
  req: NextRequest
): Promise<{ tags: CacheTag[]; extraPaths: string[]; isFullPurge: boolean }> {
  const all = Object.values(CACHE_TAGS) as CacheTag[]
  const known = new Set<string>(all)
  const knownPaths = new Set<string>(KNOWN_PATHS)

  try {
    const body = await req.json()
    const tags = Array.isArray(body?.tags)
      ? // 未知のタグは無視する。任意の文字列で無効化させない
        body.tags.filter((t: unknown): t is CacheTag => typeof t === 'string' && known.has(t))
      : all
    // タグを絞った呼び出しでも sitemap 等だけは道連れにできる。
    // 価格cronが使う: sitemap は価格ページの lastmod を「当日」で出す設計
    // (app/sitemap.ts) なので、日次の再検証が止まると lastmod が凍る
    const extraPaths = Array.isArray(body?.paths)
      ? body.paths.filter((p: unknown): p is string => typeof p === 'string' && knownPaths.has(p))
      : []
    return { tags, extraPaths, isFullPurge: !Array.isArray(body?.tags) }
  } catch {
    // ボディ無し（デプロイ後の再検証）は全タグ
    return { tags: all, extraPaths: [], isFullPurge: true }
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { tags, extraPaths, isFullPurge } = await resolveBody(req)
  for (const tag of tags) {
    revalidateTag(tag, 'max')
  }

  // sitemap/robots/llms 系のRoute Handlerも、デプロイ後に明示的に再検証しておく。
  // タグを絞った呼び出し（管理画面の保存）では機種が増減しないので走らせないが、
  // body.paths での明示指定（KNOWN_PATHS 内のみ）は尊重する
  const paths = isFullPurge ? [...KNOWN_PATHS] : extraPaths
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    ok: true,
    revalidatedTags: tags,
    revalidatedPaths: paths,
  })
}
