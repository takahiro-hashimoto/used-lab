import type { MetadataRoute } from 'next'
import {
  getAllIPhoneSlugs,
  getAllIPadSlugs,
  getAllWatchSlugs,
  getAllMacBookSlugs,
  getAllAirPodsSlugs,
} from '@/lib/queries'

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

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/iphone/iphone-spec-table/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // 動的ページ生成
  const iPhonePages: MetadataRoute.Sitemap = iPhoneSlugs.map((slug) => ({
    url: `${baseUrl}/iphone/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const iPadPages: MetadataRoute.Sitemap = iPadSlugs.map((slug) => ({
    url: `${baseUrl}/ipad/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const watchPages: MetadataRoute.Sitemap = watchSlugs.map((slug) => ({
    url: `${baseUrl}/watch/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const macBookPages: MetadataRoute.Sitemap = macBookSlugs.map((slug) => ({
    url: `${baseUrl}/macbook/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const airPodsPages: MetadataRoute.Sitemap = airPodsSlugs.map((slug) => ({
    url: `${baseUrl}/airpods/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...iPhonePages,
    ...iPadPages,
    ...watchPages,
    ...macBookPages,
    ...airPodsPages,
  ]
}
