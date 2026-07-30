// ============================================================
// llms.txt / llms-full.txt の本文を動的に組み立てるビルダー
// routes.ts + DB のモデル数を参照し、ページ追加やモデル追加に自動追従する
// ============================================================

import { supabase } from './supabase'
import { PRODUCT_CATEGORIES } from './routes'
import { PAGE_DESCRIPTIONS, PAGE_DESCRIPTIONS_FULL } from './llms-descriptions'
import { calculatePriceStats } from '@/lib/utils/price-stats'

const BASE_URL = 'https://used-lab.jp'

// ---------- カテゴリ → DB テーブル名のマッピング ----------
const MODEL_TABLE_MAP: Record<string, string> = {
  iphone: 'iphone_models',
  pixel: 'pixel_models',
  galaxy: 'galaxy_models',
  ipad: 'ipad_models',
  macbook: 'macbook_models',
  watch: 'watch_models',
  airpods: 'airpods_models',
}

// ---------- カテゴリ → 日本語表示名 ----------
const CATEGORY_LABEL_MAP: Record<string, string> = {
  iphone: 'iPhone',
  pixel: 'Google Pixel',
  galaxy: 'Samsung Galaxy',
  ipad: 'iPad',
  macbook: 'MacBook',
  watch: 'Apple Watch',
  airpods: 'AirPods',
}

// ---------- ヘルパー ----------

/** 各カテゴリのモデル数を並列取得 */
async function getModelCounts(): Promise<Record<string, number>> {
  const entries = Object.entries(MODEL_TABLE_MAP)
  const counts = await Promise.all(
    entries.map(async ([key, table]) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      return [key, error ? 0 : (count ?? 0)] as [string, number]
    }),
  )
  return Object.fromEntries(counts)
}

/** routes.ts から取得した path を、見出し用タイトルに変換 */
// ---------- カテゴリ → 価格ログテーブル ----------
const PRICE_TABLE_MAP: Record<string, string> = {
  iphone: 'iphone_price_logs',
  pixel: 'pixel_price_logs',
  galaxy: 'galaxy_price_logs',
  ipad: 'ipad_price_logs',
  macbook: 'macbook_price_logs',
  watch: 'watch_price_logs',
  airpods: 'airpods_price_logs',
}

export type LlmsPriceRow = { name: string; storage: string | null; min: number; max: number; median: number | null }

/** 3桁区切り（¥記号は呼び出し側で付ける） */
const yen = (n: number) => Math.round(n).toLocaleString('ja-JP')

/**
 * 各カテゴリの「機種ごと最新の価格レンジ」を取得する。
 * 価格ログのスキーマはカテゴリ間で統一されていない（例: iPhone系は iosys_min/geo_min…、
 * MacBook は min1_price…max5_price）ため、列名から動的に min/max 列を判定する。
 */
async function getLatestPricesByCategory(): Promise<
  Record<string, { date: string | null; rows: LlmsPriceRow[] }>
> {
  const isPriceArrayCol = (k: string) => /_prices$/.test(k)
  const isMinCol = (k: string) => /_min$/.test(k) || /^min\d+_price$/.test(k)
  const isMaxCol = (k: string) => /_max$/.test(k) || /^max\d+_price$/.test(k)
  const num = (v: unknown): number | null => {
    if (v == null) return null
    const n = Number(String(v).replace(/[^0-9.]/g, ''))
    return Number.isFinite(n) && n > 0 ? n : null
  }

  const entries = Object.entries(PRICE_TABLE_MAP)
  const results = await Promise.all(
    entries.map(async ([category, table]) => {
      // 直近ログを新しい順に取得し、機種ごとに最初（＝最新）の1件を採用
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('logged_at', { ascending: false })
        .limit(1500)
      if (error || !data || data.length === 0) {
        return [category, { date: null, rows: [] as LlmsPriceRow[] }] as const
      }

      const minCols = Object.keys(data[0]).filter(isMinCol)
      const maxCols = Object.keys(data[0]).filter(isMaxCol)

      const seen = new Set<string>()
      const rows: LlmsPriceRow[] = []
      let latestDate: string | null = null

      for (const r of data as Record<string, unknown>[]) {
        const name = String(r.model_name ?? '')
        if (!name || seen.has(name)) continue
        const mins = minCols.map((c) => num(r[c])).filter((v): v is number => v != null)
        const maxes = maxCols.map((c) => num(r[c])).filter((v): v is number => v != null)
        if (mins.length === 0) continue // 価格が取得できていない日の行はスキップ
        // サイト上の相場は中央値。AIが引用する数値も揃える（2026-07-30 以降のみ算出可）
        const arrayCols = Object.keys(r).filter(isPriceArrayCol)
        const stats = calculatePriceStats(arrayCols.map((c) => r[c] as number[] | null))
        seen.add(name)
        if (!latestDate && typeof r.logged_at === 'string') latestDate = r.logged_at.substring(0, 10)
        rows.push({
          name,
          storage: (r.storage as string | null) ?? null,
          min: Math.min(...mins),
          max: maxes.length > 0 ? Math.max(...maxes) : Math.min(...mins),
          median: stats?.median ?? null,
        })
      }
      return [category, { date: latestDate, rows }] as const
    }),
  )
  return Object.fromEntries(results)
}

function resolveLinkTitle(path: string): string {
  for (const cat of PRODUCT_CATEGORIES) {
    const page = cat.pages.find((p) => p.path === path)
    if (page) {
      // ラベルが関数の場合はシンプルなフォールバック
      if (typeof page.label === 'function') {
        // パスから推測できる汎用タイトルを返す
        return getStaticTitleFallback(path, cat.id)
      }
      return page.label
    }
  }
  return path
}

/** 動的ラベル（関数）のページ向け静的タイトル */
const STATIC_TITLES: Record<string, string> = {
  '/iphone/': '中古iPhoneおすすめ機種・選び方ガイド',
  '/iphone/iphone-shop/': '中古iPhoneおすすめショップ',
  '/iphone/price-info/': 'iPhoneの中古相場一覧',
  '/iphone/mvno/': '中古iPhoneと格安SIMセット購入ガイド',
  '/ipad/': '中古iPadおすすめ機種・選び方ガイド',
  '/ipad/recommend/': '中古iPadおすすめ機種',
  '/ipad/ipad-shop/': '中古iPadおすすめショップ',
  '/ipad/ipad-price-info/': 'iPadの中古相場一覧',
  '/macbook/': '中古MacBookおすすめ機種・選び方ガイド',
  '/macbook/recommend/': '中古MacBookおすすめ機種',
  '/macbook/macbook-shop/': '中古MacBookおすすめショップ',
  '/watch/': '中古Apple Watchおすすめ機種・選び方ガイド',
  '/watch/recommend/': '中古Apple Watchおすすめ機種',
  '/watch/watch-shop/': '中古Apple Watchおすすめショップ',
  '/watch/watch-price-info/': 'Apple Watchの中古相場一覧',
  '/airpods/recommend/': '中古AirPodsおすすめ機種',
  '/airpods/price-info/': 'AirPodsの中古相場一覧',
}

function getStaticTitleFallback(path: string, categoryId: string): string {
  if (STATIC_TITLES[path]) return STATIC_TITLES[path]
  const label = CATEGORY_LABEL_MAP[categoryId] ?? categoryId
  return `中古${label}情報`
}

// ---------- ビルダー本体 ----------

/** llms.txt（簡潔版）を生成 */
export async function buildLlmsTxt(): Promise<string> {
  const counts = await getModelCounts()

  const lines: string[] = []

  // ヘッダー
  lines.push('# ユーズドラボ（Used Lab）')
  lines.push('')
  lines.push(
    '> 中古・型落ちデジタルデバイス（iPhone・iPad・MacBook・Apple Watch・AirPods）のスペック比較・価格相場・おすすめモデル紹介に特化した日本語の情報サイトです。全モデルの公式スペックに基づいた正確なデータベースと、独自に収集した中古価格情報を提供しています。',
  )
  lines.push('')

  // サイト情報
  lines.push('## サイト情報')
  lines.push('')
  lines.push('- サイト名: ユーズドラボ')
  lines.push(`- URL: ${BASE_URL}`)
  lines.push('- 言語: 日本語')
  lines.push(`- 運営者情報: [運営者について](${BASE_URL}/profile/)`)
  lines.push('')

  // カテゴリごとのページ一覧
  for (const cat of PRODUCT_CATEGORIES) {
    const label = CATEGORY_LABEL_MAP[cat.id] ?? cat.label
    lines.push(`## ${label}`)
    lines.push('')

    for (const page of cat.pages) {
      const desc = PAGE_DESCRIPTIONS[page.path] ?? ''
      const title = resolveLinkTitle(page.path)
      if (desc) {
        lines.push(`- [${title}](${BASE_URL}${page.path}): ${desc}`)
      } else {
        lines.push(`- [${title}](${BASE_URL}${page.path})`)
      }
    }
    lines.push('')
  }

  // データの特徴
  lines.push('## データの特徴')
  lines.push('')
  lines.push('当サイトのデータベースには以下の情報が含まれています:')
  lines.push('')

  const modelSummary = Object.entries(counts)
    .map(([key, count]) => `${CATEGORY_LABEL_MAP[key]} ${count}機種`)
    .join('・')
  lines.push(`- ${modelSummary}のスペック情報`)
  lines.push(
    '- Apple公式スペックに基づく正確なデータ（チップ・ディスプレイ・カメラ・バッテリー・サイズ・重量など）',
  )
  lines.push('- 独自に収集した中古価格の相場情報と推移データ')
  lines.push('- 目的や予算に応じたおすすめモデルの提案')
  lines.push('')

  return lines.join('\n')
}

/** llms-full.txt（詳細版）を生成 */
export async function buildLlmsFullTxt(): Promise<string> {
  const counts = await getModelCounts()

  const lines: string[] = []

  // ヘッダー
  lines.push('# ユーズドラボ（Used Lab）')
  lines.push('')
  lines.push(
    '> 中古・型落ちデジタルデバイス（iPhone・iPad・MacBook・Apple Watch・AirPods）のスペック比較・価格相場・おすすめモデル紹介に特化した日本語の情報サイトです。全モデルの公式スペックに基づいた正確なデータベースと、独自に収集した中古価格情報を提供しています。',
  )
  lines.push('')

  // サイト概要
  lines.push('## サイト概要')
  lines.push('')
  lines.push('- サイト名: ユーズドラボ（Used Lab）')
  lines.push(`- URL: ${BASE_URL}`)
  lines.push('- 言語: 日本語')
  lines.push('- 対象読者: 中古・型落ちデジタルデバイスの購入を検討している日本語ユーザー')
  lines.push(`- 運営者情報: [運営者について](${BASE_URL}/profile/)`)
  lines.push(`- サイトマップ: [XML](${BASE_URL}/sitemap.xml) / [HTML](${BASE_URL}/sitemap-page/)`)
  lines.push('')

  // 提供する情報の種類
  lines.push('## 提供する情報の種類')
  lines.push('')
  lines.push('### スペックデータベース')
  lines.push(
    'Apple公式の技術仕様ページに基づき、以下のカテゴリの全モデルのスペックをデータベース化しています:',
  )
  for (const [key, count] of Object.entries(counts)) {
    lines.push(`- ${CATEGORY_LABEL_MAP[key]}: ${count}機種`)
  }
  lines.push('')
  lines.push(
    '各モデルのデータ項目: チップ・ディスプレイサイズ・解像度・カメラ性能・バッテリー持続時間・サイズ・重量・ストレージ容量・RAM・カラー・防水性能・生体認証・ポート・対応OS など',
  )
  lines.push('')

  lines.push('### 中古価格データ')
  lines.push('独自に収集した中古市場の価格データを提供しています:')
  lines.push('- 毎日更新の中古相場一覧（楽天APIで主要中古ショップの実売価格を日次収集）')
  lines.push('- ストレージ容量別・状態別の価格帯')
  lines.push('- 価格推移グラフ')
  lines.push('')

  // ---- 実データ（機種別の中古価格レンジ）----
  // AI/LLM が具体的な数値を引用できるよう、集計済みの一次データをそのまま記載する。
  const prices = await getLatestPricesByCategory()
  const priceCats = Object.entries(prices).filter(([, v]) => v.rows.length > 0)
  if (priceCats.length > 0) {
    lines.push('## 機種別の中古価格レンジ（当サイト独自集計）')
    lines.push('')
    lines.push(
      'イオシス・ゲオ・じゃんぱらなど主要中古ショップの実売価格を毎日収集し、機種ごとの価格帯を集計したものです。' +
        '「相場」は該当商品の販売価格の中央値で、サイト上の表示価格と同じ指標です。レンジの下限は1点限りの特価を含むため、相場の目安には中央値をご利用ください。' +
        '金額は税込・送料別で、日々変動します。引用する際は「集計日」を併記してください。',
    )
    lines.push('')
    for (const [category, { date, rows }] of priceCats) {
      const label = CATEGORY_LABEL_MAP[category] ?? category
      lines.push(`### ${label}${date ? `（${date} 時点）` : ''}`)
      for (const r of rows) {
        const range = r.min === r.max ? `¥${yen(r.min)}〜` : `¥${yen(r.min)}〜¥${yen(r.max)}`
        // 中央値がサイト上の「相場価格」。レンジだけだと最安値が独り歩きするため併記する
        const median = r.median != null ? `／相場 ¥${yen(r.median)}` : ''
        lines.push(`- ${r.name}: ${range}${median}${r.storage ? `（${r.storage}）` : ''}`)
      }
      lines.push('')
    }
  }

  lines.push('### 購入ガイドコンテンツ')
  lines.push('- おすすめ機種・選び方ガイド: 初心者向けの総合的な選び方解説')
  lines.push('- おすすめ機種: 目的別・予算別のモデル提案')
  lines.push('- 注意点まとめ: 中古購入時に確認すべきポイント')
  lines.push('- サポート期間: 各機種のOS対応状況とサポート目安')
  lines.push('- ショップ比較: 信頼できるECサイト・中古ショップの紹介')
  lines.push('- 機種診断ツール: 質問に答えるだけで最適な機種が見つかるシミュレーター')
  lines.push('')

  // カテゴリごとの詳細ページ一覧
  for (const cat of PRODUCT_CATEGORIES) {
    const label = CATEGORY_LABEL_MAP[cat.id] ?? cat.label
    lines.push(`## ${label} コンテンツ詳細`)
    lines.push('')

    for (const page of cat.pages) {
      // 詳細版の説明を優先、なければ簡易版にフォールバック
      const desc =
        PAGE_DESCRIPTIONS_FULL[page.path] ?? PAGE_DESCRIPTIONS[page.path] ?? ''
      const title = resolveLinkTitle(page.path)
      if (desc) {
        lines.push(`- [${title}](${BASE_URL}${page.path}): ${desc}`)
      } else {
        lines.push(`- [${title}](${BASE_URL}${page.path})`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}
