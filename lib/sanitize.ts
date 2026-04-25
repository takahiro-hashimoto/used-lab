import sanitize from 'sanitize-html'

/**
 * 管理者入力HTMLをサーバーサイドでサニタイズする。
 * 許可タグ以外はすべて除去し、a タグは安全な属性のみ残す。
 * Server Component 専用（Node.js 環境）。
 */
export function sanitizeHtml(html: string): string {
  return sanitize(html, {
    allowedTags: ['a', 'b', 'i', 'em', 'strong', 'br', 'p', 'ul', 'ol', 'li', 'span'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: 'a',
        attribs: { ...attribs, rel: 'noopener noreferrer' },
      }),
    },
  })
}
