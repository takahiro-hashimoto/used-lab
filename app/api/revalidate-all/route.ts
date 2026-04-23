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

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const tags = Object.values(CACHE_TAGS)
  for (const tag of tags) {
    revalidateTag(tag, 'max')
  }

  // sitemap/robots/llms 系のRoute Handlerも、デプロイ後に明示的に再検証しておく。
  revalidatePath('/sitemap.xml')
  revalidatePath('/robots.txt')
  revalidatePath('/llms.txt')
  revalidatePath('/llms-full.txt')

  return NextResponse.json({
    ok: true,
    revalidatedTags: tags,
    revalidatedPaths: ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt'],
  })
}
