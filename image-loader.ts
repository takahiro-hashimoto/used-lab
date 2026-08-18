import type { ImageLoaderProps } from 'next/image'

// ============================================================
// Cloudflare Images（/cdn-cgi/image）向けのカスタムローダー
//
// Cloudflare には Vercel の画像最適化に当たる仕組みが無いため、
// next/image のURL生成を差し替えて Cloudflare の変換に載せる。
// 利用にはゾーンで Image Transformations を有効にする必要がある。
//
// ── 注意 ──
// このローダーは next.config の remotePatterns を強制しない。
// 変換を許可する配信元は Cloudflare 側のダッシュボードで絞ること。
// 絞らないと、任意の外部URLを自分のゾーン経由で変換できてしまう。
// ============================================================

/** Cloudflare が扱えない src はそのまま返す */
function isPassthrough(src: string): boolean {
  // placeholder() が返すインラインSVG。変換対象にならない
  return src.startsWith('data:') || src.startsWith('blob:')
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  if (isPassthrough(src)) return src

  const params = [`width=${width}`]
  if (quality) params.push(`quality=${quality}`)
  // AVIF はエンコードが重く変換コストが増えるため WebP に固定する
  // （Vercel 側の images.formats: ['image/webp'] と揃える）
  params.push('format=webp')

  // next dev では /cdn-cgi が無いので素のパスを返す（最適化されない）
  if (process.env.NODE_ENV === 'development') return src

  // 絶対URLはそのまま source として渡す。相対パスは先頭の / を落とす
  const source = /^https?:\/\//.test(src) ? src : src.replace(/^\//, '')
  return `/cdn-cgi/image/${params.join(',')}/${source}`
}
