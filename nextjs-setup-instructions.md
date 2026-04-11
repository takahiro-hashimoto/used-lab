# Next.js サイト品質チェックリスト（AI向け指示書）

このドキュメントは、Next.js（App Router）でWebサイトを構築・レビューする際に、AIが漏れなく確認・実装すべき項目をまとめたものです。
新規プロジェクト開始時、または既存プロジェクトのレビュー依頼時に、この指示書を参照して全項目を順番に確認・対応してください。

---

## 事前調査（作業前に必ず行うこと）

以下のファイルを読んで現状を把握してから作業に入ること。

- `next.config.ts` / `next.config.js`
- `app/layout.tsx`
- `package.json`（Next.jsバージョン・依存関係の確認）
- `middleware.ts`（存在するか）
- `app/sitemap.ts`・`app/robots.ts`（存在するか）
- `app/**/loading.tsx`・`app/**/error.tsx`（存在するか）
- `.gitignore`

---

## 1. セキュリティ

### 1-1. CSP を middleware.ts で nonce 方式に設定する

`middleware.ts` がなければ作成する。

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data:",
    "connect-src 'self'",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
```

- `next.config.ts` に CSP が書かれていれば **削除**し、middleware に集約する
- `app/layout.tsx` の `<Script>` タグに `nonce` prop を追加する

```ts
// app/layout.tsx
import { headers } from 'next/headers'

export default async function RootLayout({ children }) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  return (
    <html>
      <head>
        <Script id="example" nonce={nonce} .../>
      </head>
      ...
    </html>
  )
}
```

### 1-2. `next.config.ts` のセキュリティヘッダー

CSP 以外のヘッダーは next.config.ts に残す。

```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
]
```

### 1-3. `dangerouslySetInnerHTML` のサニタイズ

CMS・DB 由来の HTML を `dangerouslySetInnerHTML` で出力している箇所を全て `grep` で探す。
見つかった場合はサニタイザーを適用する（`sanitize-html` ライブラリ、または最低限 script/on* 属性を除去する関数を作成）。

```ts
// lib/sanitize.ts
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}
```

### 1-4. `document.execCommand` の除去

`grep -r "execCommand"` で検索し、見つかれば `navigator.clipboard.writeText()` に置き換える。

### 1-5. `'unsafe-eval'` の除去

CSP に `'unsafe-eval'` が含まれている場合は削除を検討する（GTM など外部スクリプトで不要なことが多い）。

---

## 2. パフォーマンス

### 2-1. `<Suspense>` でストリーミング

データ取得が遅いセクション（ニュース・ランキング・外部API依存など）を独立した async Server Component に切り出し、`<Suspense>` で囲む。

```tsx
// 遅い取得を独立コンポーネントに
async function SlowSection() {
  const data = await fetchSlowData()
  return <div>{data}</div>
}

// ページ側
<Suspense fallback={<div>読み込み中...</div>}>
  <SlowSection />
</Suspense>
```

### 2-2. `'use client'` の最小化

`grep -r "'use client'"` で一覧を出し、以下を確認する：
- インタラクティビティが不要なのに `'use client'` になっていないか
- クライアントコンポーネントの中に静的部分があれば分離できないか

### 2-3. `revalidate` の値

各ページの `export const revalidate` を確認し、更新頻度に合った値になっているか確認する。

| コンテンツの種類 | 推奨値 |
|---|---|
| 静的ページ（ほぼ変わらない） | `false` または `86400`（24時間） |
| ニュース・ブログ | `300`（5分） |
| 価格・在庫など頻繁に変わるもの | `60`（1分）または `0` |

### 2-4. `next/image` の使用確認

`grep -r "<img "` で `<img>` タグを探し、`next/image` に置き換えられるものは置き換える。

### 2-5. `next/font` の使用確認

外部CDN（Google Fonts の `<link>` タグなど）でフォントを読み込んでいる場合は `next/font/google` に移行する。

---

## 3. SEO

### 3-1. `sitemap.ts` を動的生成

`public/sitemap.xml` が存在する場合は削除し、`app/sitemap.ts` に置き換える。

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'
  // DBやCMSからページ一覧を取得してマッピング
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
  ]
}
```

### 3-2. `robots.ts` を動的生成

`public/robots.txt` が存在する場合は削除し、`app/robots.ts` に置き換える。

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

### 3-3. metadata API の確認

各ページに `export const metadata` または `export async function generateMetadata` があるか確認する。
ルートレイアウトに最低限以下が設定されているか確認する。

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'サイト名', template: '%s | サイト名' },
  description: '説明文',
  openGraph: { type: 'website', locale: 'ja_JP', siteName: 'サイト名' },
  twitter: { card: 'summary_large_image' },
}
```

### 3-4. 見出し階層の確認

各ページで `h1` が1つだけあり、`h2` → `h3` の順で正しく階層化されているか確認する。
`h1` より前に `p` タグや装飾的な要素が来ていないか確認する。

---

## 4. アクセシビリティ

### 4-1. フォームの `<label>` 確認

`grep -r '<input'` で検索し、対応する `<label>` または `aria-label` がない `<input>` を探す。

```tsx
// NG: placeholder のみ
<input type="search" placeholder="検索..." />

// OK: label と id で紐付け
<label htmlFor="search-input" className="visually-hidden">検索</label>
<input id="search-input" type="search" placeholder="検索..." />
```

### 4-2. `aria-hidden` と代替テキスト

装飾目的のアイコン・画像には `aria-hidden="true"` を付ける。
情報を持つ画像・ボタンには `aria-label` または `alt` を付ける。

### 4-3. `target="_blank"` リンクの確認

`grep -r 'target="_blank"'` で検索し、`rel="noopener noreferrer"` が付いているか確認する。

---

## 5. キャッシュ

### 5-1. 静的アセットのキャッシュ設定

`next.config.ts` で以下を確認する：

```ts
// /_next/static/ は Next.js がコンテンツハッシュを付けるため immutable で OK
{ source: '/_next/static/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }

// /images/ などファイル名固定のものは短めに
{ source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] }

// ページ全体
{ source: '/(.*)', headers: [{ key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' }] }
```

`public/` 配下にハッシュなしのCSSファイルがある場合は、ビルド時にコンテンツハッシュを付与するスクリプトを用意する。

---

## 6. UX（ルーティング）

### 6-1. `loading.tsx` の配置

各ルートセグメントに `loading.tsx` を配置する。最低限ルートレイアウトと主要セクションには置く。

```tsx
// app/loading.tsx
export default function Loading() {
  return <div className="loading-spinner" aria-label="読み込み中" role="status" />
}
```

### 6-2. `error.tsx` の配置

`app/error.tsx` が存在するか確認する。なければ作成する。

```tsx
// app/error.tsx
'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>エラーが発生しました</h1>
      <button onClick={reset}>もう一度試す</button>
    </div>
  )
}
```

---

## 7. TypeScript

### 7-1. `any` 型の排除

`grep -r ": any"` で検索し、具体的な型またはジェネリクスに置き換える。
複数の型が入りうる場合はジェネリクス `<T extends BaseType>` を使う。

### 7-2. strict モードの確認

`tsconfig.json` に `"strict": true` があるか確認する。なければ追加する。

---

## チェック完了の確認方法

全項目対応後、以下を実行してエラーがないことを確認する。

```bash
npm run build
npm run lint
```

ビルドエラーまたは型エラーがある場合は修正してから完了とする。
