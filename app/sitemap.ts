import type { MetadataRoute } from 'next'
import {
  getAllIPhoneSlugs,
  getAllIPadSlugs,
  getAllWatchSlugs,
  getAllMacBookSlugs,
  getAllAirPodsSlugs,
} from '@/lib/queries'
import { getAllStaticRoutes } from '@/lib/routes'
import { getGitDateForFile, getTodayDate } from '@/lib/utils/shared-helpers'

/** 毎日自動更新するデータページ。lastmod は当日にして新鮮性を示す */
const DAILY_UPDATED_PATHS = new Set([
  '/iphone/price-info/',
  '/ipad/ipad-price-info/',
  '/watch/watch-price-info/',
  '/macbook/price-info/',
  '/airpods/price-info/',
  '/amazon-renewed/',
])

/** ルートパス → page.tsx ファイルパスに変換 */
function toFilePath(routePath: string): string {
  if (routePath === '/') return 'app/(public)/page.tsx'
  const cleaned = routePath.replace(/^\/|\/$/g, '')
  return `app/(public)/${cleaned}/page.tsx`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://used-lab.jp'

  // 全製品のスラッグを並列取得（DB失敗時は安全にフォールバック）
  const [iPhoneSlugs, iPadSlugs, watchSlugs, macBookSlugs, airPodsSlugs] = await Promise.all([
    getAllIPhoneSlugs().catch(() => [] as string[]),
    getAllIPadSlugs().catch(() => [] as string[]),
    getAllWatchSlugs().catch(() => [] as string[]),
    getAllMacBookSlugs().catch(() => [] as string[]),
    getAllAirPodsSlugs().catch(() => [] as string[]),
  ])

  // 静的ページ（lib/routes.ts から一元取得、git の最終コミット日を使用）
  const todayStr = getTodayDate().dateStr
  const staticPages: MetadataRoute.Sitemap = getAllStaticRoutes().map((route) => {
    const dateStr = DAILY_UPDATED_PATHS.has(route.path)
      ? todayStr
      : getGitDateForFile(toFilePath(route.path)).dateStr
    return {
      url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
      lastModified: new Date(dateStr),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }
  })

  // 動的ページ（製品詳細）
  const dynamicSlugs: { prefix: string; slugs: string[] }[] = [
    { prefix: '/iphone', slugs: iPhoneSlugs },
    { prefix: '/ipad',   slugs: iPadSlugs },
    { prefix: '/watch',  slugs: watchSlugs },
    { prefix: '/macbook', slugs: macBookSlugs },
    { prefix: '/airpods', slugs: airPodsSlugs },
  ]

  const dynamicPages: MetadataRoute.Sitemap = dynamicSlugs.flatMap(({ prefix, slugs }) =>
    slugs.map((slug) => ({
      url: `${baseUrl}${prefix}/${slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  )

  return [...staticPages, ...dynamicPages]
}
