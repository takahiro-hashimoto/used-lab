import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/llms.txt', '/llms-full.txt'],
    },
    sitemap: 'https://used-lab.jp/sitemap.xml',
  }
}
