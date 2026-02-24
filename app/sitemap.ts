import type { MetadataRoute } from 'next'
import {
  getAllIPhoneSlugs,
  getAllIPadSlugs,
  getAllWatchSlugs,
  getAllMacBookSlugs,
  getAllAirPodsSlugs,
} from '@/lib/queries'
import { getAllStaticRoutes } from '@/lib/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://used-lab.com'

  // 全製品のスラッグを並列取得
  const [iPhoneSlugs, iPadSlugs, watchSlugs, macBookSlugs, airPodsSlugs] = await Promise.all([
    getAllIPhoneSlugs(),
    getAllIPadSlugs(),
    getAllWatchSlugs(),
    getAllMacBookSlugs(),
    getAllAirPodsSlugs(),
  ])

  // 静的ページ（lib/routes.ts から一元取得）
  const staticPages: MetadataRoute.Sitemap = getAllStaticRoutes().map((route) => ({
    url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // 動的ページ（製品詳細）
  const dynamicSlugs: { prefix: string; slugs: string[] }[] = [
    { prefix: '/iphone', slugs: iPhoneSlugs },
    { prefix: '/ipad', slugs: iPadSlugs },
    { prefix: '/watch', slugs: watchSlugs },
    { prefix: '/macbook', slugs: macBookSlugs },
    { prefix: '/airpods', slugs: airPodsSlugs },
  ]

  const dynamicPages: MetadataRoute.Sitemap = dynamicSlugs.flatMap(({ prefix, slugs }) =>
    slugs.map((slug) => ({
      url: `${baseUrl}${prefix}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  )

  return [...staticPages, ...dynamicPages]
}
