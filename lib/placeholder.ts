/**
 * Generate a local SVG placeholder data URI — replaces external placehold.co dependency.
 */
export function placeholder(
  width: number,
  height: number,
  text: string,
  bg = 'f5f5f7',
  fg = '1d1d1f',
): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  const fontSize = Math.max(10, Math.min(20, Math.floor(width / (text.length + 1))))
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="#${bg}" width="100%" height="100%"/><text fill="#${fg}" font-family="system-ui,sans-serif" font-size="${fontSize}" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${escaped}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
