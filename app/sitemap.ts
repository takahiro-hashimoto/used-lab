import type { MetadataRoute } from 'next'
import {
  getAllIPhoneSlugs,
  getAllIPadSlugs,
  getAllWatchSlugs,
  getAllMacBookSlugs,
  getAllMacSlugs,
  getAllAirPodsSlugs,
  getAllPixelSlugs,
  getAllGalaxySlugs,
  getLatestPriceDatesPerCategory,
} from '@/lib/queries'
import { getAllStaticRoutes } from '@/lib/routes'
import { isHiddenCategory } from '@/lib/data/feature-flags'
import { getGitDateForFile, getTodayDate } from '@/lib/utils/shared-helpers'

/** 毎日自動更新するデータページ。lastmod は当日にして新鮮性を示す */
const DAILY_UPDATED_PATHS = new Set([
  '/iphone/price-info/',
  // Pixel / Galaxy は非公開のあいだ sitemap に出ない（lib/data/feature-flags.ts）
  '/pixel/price-info/',
  '/galaxy/price-info/',
  '/ipad/ipad-price-info/',
  '/watch/watch-price-info/',
  '/macbook/price-info/',
  '/airpods/price-info/',
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
  const [iPhoneSlugs, iPadSlugs, watchSlugs, macBookSlugs, macSlugs, airPodsSlugs, pixelSlugs, galaxySlugs, priceDates] = await Promise.all([
    getAllIPhoneSlugs().catch(() => [] as string[]),
    getAllIPadSlugs().catch(() => [] as string[]),
    getAllWatchSlugs().catch(() => [] as string[]),
    getAllMacBookSlugs().catch(() => [] as string[]),
    getAllMacSlugs().catch(() => [] as string[]),
    getAllAirPodsSlugs().catch(() => [] as string[]),
    getAllPixelSlugs().catch(() => [] as string[]),
    getAllGalaxySlugs().catch(() => [] as string[]),
    getLatestPriceDatesPerCategory().catch(() => ({}) as Record<string, string | null>),
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
  // lastmod は「価格ログが実際に更新された日」を使う。当日固定にすると内容が変わって
  // いなくても毎日更新扱いになり、Google に lastmod 全体を無視される恐れがあるため。
  // 非公開カテゴリは sitemap に載せない（lib/data/feature-flags.ts）
  const dynamicSlugs: { prefix: string; slugs: string[]; category: string }[] = ([
    { prefix: '/iphone', slugs: iPhoneSlugs, category: 'iphone' },
    { prefix: '/pixel',  slugs: pixelSlugs, category: 'pixel' },
    { prefix: '/galaxy', slugs: galaxySlugs, category: 'galaxy' },
    { prefix: '/ipad',   slugs: iPadSlugs, category: 'ipad' },
    { prefix: '/watch',  slugs: watchSlugs, category: 'watch' },
    { prefix: '/macbook', slugs: macBookSlugs, category: 'macbook' },
    { prefix: '/mac',    slugs: macSlugs, category: 'mac' },
    { prefix: '/airpods', slugs: airPodsSlugs, category: 'airpods' },
  ] as { prefix: string; slugs: string[]; category: string }[]).filter(({ category }) => !isHiddenCategory(category))

  const dynamicPages: MetadataRoute.Sitemap = dynamicSlugs.flatMap(({ prefix, slugs, category }) => {
    // 価格ログが無い/取得失敗時のみ当日にフォールバック
    const dateStr = priceDates[category] ?? todayStr
    return slugs.map((slug) => ({
      url: `${baseUrl}${prefix}/${slug}/`,
      lastModified: new Date(dateStr),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  })

  return [...staticPages, ...dynamicPages]
}
