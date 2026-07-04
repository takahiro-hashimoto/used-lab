// Font Awesome subsetting: ソースコードで実際に使われている fa-* アイコンを検出し、
// woff2 フォントをそのコードポイントだけにサブセット化 + 未使用アイコンルールを
// 除去した all.subset.min.css を生成する。
// 入力(ソース): public/fonts/fontawesome/all.min.css と元 woff2（そのまま残す）
// 出力: all.subset.min.css / fa-*.subset.<hash>.woff2（hash-assets.mjs が CSS をハッシュ化する）

import subsetFont from 'subset-font'
import { createHash } from 'crypto'
import { readFileSync, writeFileSync, readdirSync, unlinkSync, statSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FA_DIR = join(ROOT, 'public/fonts/fontawesome')
const SOURCE_DIRS = ['app', 'lib']
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.css'])

// アイコンではない FA ユーティリティクラス（未検出トークンの警告から除外する用）
const UTILITY_CLASSES = new Set([
  'fa', 'fa-solid', 'fa-regular', 'fa-brands', 'fa-classic', 'fa-sharp',
  'fa-fw', 'fa-ul', 'fa-li', 'fa-border', 'fa-pull-left', 'fa-pull-right',
  'fa-spin', 'fa-pulse', 'fa-beat', 'fa-fade', 'fa-bounce', 'fa-flip', 'fa-shake',
  'fa-spin-reverse', 'fa-spin-pulse', 'fa-beat-fade', 'fa-inverse',
  'fa-stack', 'fa-stack-1x', 'fa-stack-2x', 'fa-layers', 'fa-layers-counter', 'fa-layers-text',
  'fa-rotate-90', 'fa-rotate-180', 'fa-rotate-270', 'fa-rotate-by',
  'fa-flip-horizontal', 'fa-flip-vertical', 'fa-flip-both',
  'fa-sr-only', 'fa-sr-only-focusable',
  'fa-1x', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x', 'fa-6x', 'fa-7x', 'fa-8x', 'fa-9x', 'fa-10x',
  'fa-2xs', 'fa-xs', 'fa-sm', 'fa-lg', 'fa-xl', 'fa-2xl',
  // フォントファイル名由来のトークン（アイコンではない）
  'fa-solid-900', 'fa-brands-400', 'fa-regular-400', 'fa-v4compatibility',
])

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.next') continue
      yield* walk(p)
    } else if (SOURCE_EXTS.has(extname(name))) {
      yield p
    }
  }
}

// 1. all.min.css からアイコン名 → コードポイントの対応表を作る
const faCss = readFileSync(join(FA_DIR, 'all.min.css'), 'utf8')
const ICON_RULE_RE = /((?:\.fa-[a-z0-9-]+:before,?)+)\{content:"\\([0-9a-f]+)"\}/g
const iconToCp = new Map() // 'fa-house' -> 'f015'
for (const m of faCss.matchAll(ICON_RULE_RE)) {
  const names = m[1].split(',').map((s) => s.replace(/^\./, '').replace(/:before$/, ''))
  for (const name of names) iconToCp.set(name, m[2])
}

// 2. ソースコードから使用トークンを収集
const tokens = new Set()
const directCps = new Set() // CSS で content:"\f058" のように直接参照されるコードポイント
for (const dir of SOURCE_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const src = readFileSync(file, 'utf8')
    for (const m of src.matchAll(/fa-[a-z0-9][a-z0-9-]*/g)) tokens.add(m[0])
    if (extname(file) === '.css') {
      for (const m of src.matchAll(/content:\s*["']\\([0-9a-f]+)["']/g)) directCps.add(m[1])
    }
  }
}

// 3. 使用アイコンを確定（末尾ハイフンのトークンは fa-chevron-${...} のような
//    テンプレートリテラル由来なので前方一致で展開する）
const usedIcons = new Set()
const unknownTokens = []
for (const token of tokens) {
  if (token.endsWith('-')) {
    for (const name of iconToCp.keys()) {
      if (name.startsWith(token)) usedIcons.add(name)
    }
  } else if (iconToCp.has(token)) {
    usedIcons.add(token)
  } else if (!UTILITY_CLASSES.has(token)) {
    unknownTokens.push(token)
  }
}
if (unknownTokens.length > 0) {
  console.warn(`[subset:fa] WARN: 未解決の fa- トークン（アイコン名でもユーティリティでもない）: ${unknownTokens.sort().join(', ')}`)
}

const usedCps = new Set(directCps)
for (const name of usedIcons) usedCps.add(iconToCp.get(name))
const subsetText = [...usedCps].map((hex) => String.fromCodePoint(parseInt(hex, 16))).join('')

// 4. woff2 をサブセット化してハッシュ付きファイル名で出力
function removeOldHashed(baseName) {
  const pattern = new RegExp(`^${baseName}\\.subset\\.[a-f0-9]{8}\\.woff2$`)
  for (const file of readdirSync(FA_DIR)) {
    if (pattern.test(file)) unlinkSync(join(FA_DIR, file))
  }
}

const FONT_FAMILIES = ['fa-solid-900', 'fa-brands-400', 'fa-regular-400']
const hashedFontNames = {}
for (const base of FONT_FAMILIES) {
  const original = readFileSync(join(FA_DIR, `${base}.woff2`))
  const subset = await subsetFont(original, subsetText, { targetFormat: 'woff2' })
  const hash = createHash('md5').update(subset).digest('hex').slice(0, 8)
  const outName = `${base}.subset.${hash}.woff2`
  removeOldHashed(base)
  writeFileSync(join(FA_DIR, outName), subset)
  hashedFontNames[base] = outName
  console.log(`[subset:fa] ${base}.woff2: ${original.length.toLocaleString()} B -> ${subset.length.toLocaleString()} B (${outName})`)
}

// 5. サブセット CSS を生成（未使用アイコンルール除去 + font-face をサブセット woff2 に差し替え）
let subsetCss = faCss.replace(ICON_RULE_RE, (rule, selectors, cp) => {
  const names = selectors.split(',').map((s) => s.replace(/^\./, '').replace(/:before$/, ''))
  const keep = names.some((n) => usedIcons.has(n)) || directCps.has(cp)
  return keep ? rule : ''
})
for (const base of FONT_FAMILIES) {
  subsetCss = subsetCss.replaceAll(
    `url(/fonts/fontawesome/${base}.woff2) format("woff2"),url(/fonts/fontawesome/${base}.ttf) format("truetype")`,
    `url(/fonts/fontawesome/${hashedFontNames[base]}) format("woff2")`,
  )
}
// v4compatibility は ttf が存在しないため woff2 のみ参照に修正
subsetCss = subsetCss.replaceAll(
  'url(/fonts/fontawesome/fa-v4compatibility.woff2) format("woff2"),url(/fonts/fontawesome/fa-v4compatibility.ttf) format("truetype")',
  'url(/fonts/fontawesome/fa-v4compatibility.woff2) format("woff2")',
)

const outCssPath = join(FA_DIR, 'all.subset.min.css')
writeFileSync(outCssPath, subsetCss)
console.log(`[subset:fa] icons: ${usedIcons.size} used / ${iconToCp.size} total (codepoints: ${usedCps.size})`)
console.log(`[subset:fa] css: ${faCss.length.toLocaleString()} B -> ${subsetCss.length.toLocaleString()} B (all.subset.min.css)`)
