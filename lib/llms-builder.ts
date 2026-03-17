// ============================================================
// llms.txt / llms-full.txt の本文を動的に組み立てるビルダー
// routes.ts + DB のモデル数を参照し、ページ追加やモデル追加に自動追従する
// ============================================================

import { supabase } from './supabase'
import { PRODUCT_CATEGORIES } from './routes'
import { PAGE_DESCRIPTIONS, PAGE_DESCRIPTIONS_FULL } from './llms-descriptions'

const BASE_URL = 'https://used-lab.com'

// ---------- カテゴリ → DB テーブル名のマッピング ----------
const MODEL_TABLE_MAP: Record<string, string> = {
  iphone: 'iphone_models',
  ipad: 'ipad_models',
  macbook: 'macbook_models',
  watch: 'watch_models',
  airpods: 'airpods_models',
}

// ---------- カテゴリ → 日本語表示名 ----------
const CATEGORY_LABEL_MAP: Record<string, string> = {
  iphone: 'iPhone',
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

/** 動的ラベル（関数）のページ向けフォールバックタイトル */
function getStaticTitleFallback(path: string, categoryId: string): string {
  const label = CATEGORY_LABEL_MAP[categoryId] ?? categoryId
  const desc = PAGE_DESCRIPTIONS[path]
  if (desc) return `中古${label} - ${desc}`
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
    '> 中古Apple製品（iPhone・iPad・MacBook・Apple Watch・AirPods）のスペック比較・価格相場・おすすめモデル紹介に特化した日本語の情報サイトです。全モデルの公式スペックに基づいた正確なデータベースと、独自に収集した中古価格情報を提供しています。',
  )
  lines.push('')

  // サイト情報
  lines.push('## サイト情報')
  lines.push('')
  lines.push('- サイト名: ユーズドラボ')
  lines.push(`- URL: ${BASE_URL}`)
  lines.push('- 言語: 日本語')
  lines.push(`- 運営者情報: [運営者について](${BASE_URL}/about/)`)
  lines.push('')

  // カテゴリごとのページ一覧
  for (const cat of PRODUCT_CATEGORIES) {
    const label = CATEGORY_LABEL_MAP[cat.id] ?? cat.label
    lines.push(`## ${label}`)
    lines.push('')

    for (const page of cat.pages) {
      const desc = PAGE_DESCRIPTIONS[page.path] ?? ''
      const title = resolveLinkTitle(page.path)
      const shortTitle = desc
        ? desc
        : typeof page.label === 'string'
          ? page.label
          : label
      lines.push(`- [${shortTitle}](${BASE_URL}${page.path}): ${desc || shortTitle}`)
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
    '> 中古Apple製品（iPhone・iPad・MacBook・Apple Watch・AirPods）のスペック比較・価格相場・おすすめモデル紹介に特化した日本語の情報サイトです。全モデルの公式スペックに基づいた正確なデータベースと、独自に収集した中古価格情報を提供しています。',
  )
  lines.push('')

  // サイト概要
  lines.push('## サイト概要')
  lines.push('')
  lines.push('- サイト名: ユーズドラボ（Used Lab）')
  lines.push(`- URL: ${BASE_URL}`)
  lines.push('- 言語: 日本語')
  lines.push('- 対象読者: 中古Apple製品の購入を検討している日本語ユーザー')
  lines.push(`- 運営者情報: [運営者について](${BASE_URL}/about/)`)
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
  lines.push('- 月次更新の中古相場一覧')
  lines.push('- ストレージ容量別・状態別の価格帯')
  lines.push('- 価格推移グラフ')
  lines.push('')

  lines.push('### 購入ガイドコンテンツ')
  lines.push('- 完全購入ガイド: 初心者向けの総合的な選び方解説')
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
      const shortTitle = desc
        ? desc
        : typeof page.label === 'string'
          ? page.label
          : label
      lines.push(`- [${shortTitle}](${BASE_URL}${page.path}): ${desc || shortTitle}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}
