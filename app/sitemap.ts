import type { MetadataRoute } from 'next'
import {
  getAllIPhoneSlugs,
  getAllIPadSlugs,
  getAllWatchSlugs,
  getAllMacBookSlugs,
  getAllAirPodsSlugs,
  getLatestPriceDatesPerCategory,
} from '@/lib/queries'
import { getAllStaticRoutes } from '@/lib/routes'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'

/** ルートパス → page.tsx ファイルパスに変換 */
function toFilePath(routePath: string): string {
  if (routePath === '/') return 'app/(public)/page.tsx'
  const cleaned = routePath.replace(/^\/|\/$/g, '')
  return `app/(public)/${cleaned}/page.tsx`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://used-lab.jp'

  // 全製品のスラッグとカテゴリ別価格更新日を並列取得（DB失敗時は安全にフォールバック）
  const [iPhoneSlugs, iPadSlugs, watchSlugs, macBookSlugs, airPodsSlugs, priceDates] = await Promise.all([
    getAllIPhoneSlugs().catch(() => [] as string[]),
    getAllIPadSlugs().catch(() => [] as string[]),
    getAllWatchSlugs().catch(() => [] as string[]),
    getAllMacBookSlugs().catch(() => [] as string[]),
    getAllAirPodsSlugs().catch(() => [] as string[]),
    getLatestPriceDatesPerCategory().catch(() => ({} as Record<string, string | null>)),
  ])

  // 静的ページ（lib/routes.ts から一元取得、git の最終コミット日を使用）
  const staticPages: MetadataRoute.Sitemap = getAllStaticRoutes().map((route) => {
    const { dateStr } = getGitDateForFile(toFilePath(route.path))
    return {
      url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
      lastModified: new Date(dateStr),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }
  })

  const dynamicFallbackDates: Record<string, Date> = {
    iphone: new Date(getGitDateForFile('app/(public)/iphone/[slug]/page.tsx').dateStr),
    ipad: new Date(getGitDateForFile('app/(public)/ipad/[slug]/page.tsx').dateStr),
    watch: new Date(getGitDateForFile('app/(public)/watch/[slug]/page.tsx').dateStr),
    macbook: new Date(getGitDateForFile('app/(public)/macbook/[slug]/page.tsx').dateStr),
    airpods: new Date(getGitDateForFile('app/(public)/airpods/[slug]/page.tsx').dateStr),
  }

  const toDynamicLastModified = (category: string) => {
    const dateStr = priceDates[category]
    return dateStr ? new Date(dateStr) : dynamicFallbackDates[category]
  }

  // 動的ページ（製品詳細 — カテゴリ別の価格更新日を使用）
  const dynamicSlugs: { prefix: string; category: string; slugs: string[] }[] = [
    { prefix: '/iphone', category: 'iphone', slugs: iPhoneSlugs },
    { prefix: '/ipad', category: 'ipad', slugs: iPadSlugs },
    { prefix: '/watch', category: 'watch', slugs: watchSlugs },
    { prefix: '/macbook', category: 'macbook', slugs: macBookSlugs },
    { prefix: '/airpods', category: 'airpods', slugs: airPodsSlugs },
  ]

  const dynamicPages: MetadataRoute.Sitemap = dynamicSlugs.flatMap(({ prefix, category, slugs }) =>
    slugs.map((slug) => ({
      url: `${baseUrl}${prefix}/${slug}/`,
      lastModified: toDynamicLastModified(category),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  )

  return [...staticPages, ...dynamicPages]
}
