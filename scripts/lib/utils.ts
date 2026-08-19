// ============================================
// 共通ユーティリティ
// ============================================

/** JST (Asia/Tokyo) の今日の日付を "YYYY-MM-DD" 形式で返す */
export function getTodayJST(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
}

/** JST (Asia/Tokyo) の現在時刻を ISO 8601 風文字列で返す（タイムゾーンは+09:00） */
export function getNowISOJST(): string {
  const now = new Date()
  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }))
  const y = jst.getFullYear()
  const m = String(jst.getMonth() + 1).padStart(2, '0')
  const d = String(jst.getDate()).padStart(2, '0')
  const h = String(jst.getHours()).padStart(2, '0')
  const mi = String(jst.getMinutes()).padStart(2, '0')
  const s = String(jst.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d}T${h}:${mi}:${s}+09:00`
}

/** レートリミット対策の sleep */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ============================================================
// 楽天APIの取得（例外を投げない）
//
// 以前は response.json() をそのまま呼んでいたため、楽天APIが空ボディを返した際に
// "Unexpected end of JSON input" が main() まで伝播し、実行中のカテゴリだけでなく
// 後続の全カテゴリが道連れで停止した（2026-07-30、iPhone13の途中で全処理が落ちた）。
// 通信・パースの失敗はここで完結させ、呼び出し側には null を返す。
// ============================================================

/** 一時的な失敗とみなしてリトライするHTTPステータス */
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504])

/**
 * JSONを取得する。失敗しても例外を投げず null を返す。
 * 空ボディ・パース失敗・一時的なHTTPエラーは指数バックオフでリトライする。
 *
 * @param context ログに出す識別子（どのショップ・キーワードで失敗したか）
 */
// ------------------------------------------------------------------
// 楽天API呼び出しの成否カウンタ
//
// API側の仕様変更で全リクエストが弾かれても、各カテゴリは「ヒット0件」として
// null行をINSERTし、cronは正常終了する。2026-06-29〜07-13（15日間）と
// 2026-08-18〜08-19（2日間）の障害は、どちらもこれで見逃した。
// 実行の最後に main() がこの値を見て、1件も取れていなければ異常終了する。
// ------------------------------------------------------------------
let apiOkCount = 0
let apiFailCount = 0

export function getApiStats(): { ok: number; failed: number } {
  return { ok: apiOkCount, failed: apiFailCount }
}

export async function fetchJsonWithRetry<T>(
  url: string,
  headers: Record<string, string>,
  context: string,
  maxAttempts = 3
): Promise<T | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const retryable = attempt < maxAttempts
    // 失敗の理由を残す。黙って空配列を返すと障害に気づけない（MacBookで1ヶ月見逃した）
    const giveUp = (reason: string): null => {
      console.error(`  ⚠️ 楽天API取得失敗(${attempt}/${maxAttempts}): ${reason} ${context}`)
      apiFailCount++
      return null
    }

    let text: string
    try {
      const response = await fetch(url, { headers })
      if (!response.ok) {
        const body = await response.text().catch(() => '')
        const reason = `HTTP ${response.status} body=${body.slice(0, 200)}`
        // 4xx（認証・IP制限など）はリトライしても直らないので即座に諦める
        if (!RETRYABLE_STATUS.has(response.status) || !retryable) return giveUp(reason)
        console.error(`  ⚠️ 楽天APIエラー(${attempt}/${maxAttempts}): ${reason} ${context}`)
        await sleep(1000 * 2 ** attempt)
        continue
      }
      text = await response.text()
    } catch (err) {
      const reason = `通信エラー ${err instanceof Error ? err.message : String(err)}`
      if (!retryable) return giveUp(reason)
      console.error(`  ⚠️ 楽天API(${attempt}/${maxAttempts}): ${reason} ${context}`)
      await sleep(1000 * 2 ** attempt)
      continue
    }

    // 空ボディ: 200で返ってくることがある。JSON.parse すると例外になるため先に弾く
    if (text.trim() === '') {
      if (!retryable) return giveUp('空のレスポンス')
      console.error(`  ⚠️ 楽天API(${attempt}/${maxAttempts}): 空のレスポンス ${context}`)
      await sleep(1000 * 2 ** attempt)
      continue
    }

    try {
      const parsed = JSON.parse(text) as T
      // HTTP 200 でも本文に error を載せてくることがある。これを成功と数えると
      // 障害検知が効かなくなるので、error の無いレスポンスだけを成功とする
      if (parsed != null && typeof parsed === 'object' && 'error' in parsed) {
        apiFailCount++
      } else {
        apiOkCount++
      }
      return parsed
    } catch {
      const reason = `JSON解析失敗 body=${text.slice(0, 200)}`
      if (!retryable) return giveUp(reason)
      console.error(`  ⚠️ 楽天API(${attempt}/${maxAttempts}): ${reason} ${context}`)
      await sleep(1000 * 2 ** attempt)
    }
  }
  return null
}

/** 容量抽出（iPhone / iPad 共通）: "64GB / 256GB" → "64GB" */
export function extractMinCapacity(storageRange: string | null): string | null {
  if (!storageRange) return null
  const str = String(storageRange)
  const match = str.match(/(\d+)(GB|TB)/i)
  return match ? `${match[1]}${match[2].toUpperCase()}` : null
}

/** サイズ抽出（Watch共通）: "40mm / 44mm" → "40mm" */
export function extractMinSize(sizeRange: string | null): string | null {
  if (!sizeRange) return null
  const str = String(sizeRange)
  const matches = str.match(/(\d+)mm/gi)
  if (!matches || matches.length === 0) return null
  const sizes = matches.map((m) => parseInt(m))
  const minSize = Math.min(...sizes)
  return `${minSize}mm`
}

/** 価格取得結果 */
// ============================================================
// 相場算出から除外する商品の判定
//
// 従来はカテゴリごとに除外語がバラバラだった（iPhone/iPad/Watch は「未使用」のみ、
// MacBook は「未使用|新品|未開封」）ため、同じ条件の商品がカテゴリによって
// 含まれたり除かれたりしていた。ここに一元化して全カテゴリで揃える。
//
// 特に「バッテリー80%未満」は実データで最安値の商品名に多数出現しており
// （2026-07時点でiPhone/Pixel/Galaxy/iPad合計77件）、これが相場の下限として
// 表示されると「その価格で普通の中古が買える」という誤認を生むため除外する。
// ============================================================
const EXCLUDED_CONDITION_WORDS = [
  // 新品系: 中古相場に混ぜない
  '未使用',
  '新品',
  '未開封',
  // バッテリー劣化: 同一機種でも相場から大きく外れるため除外
  'バッテリー80%未満',
  'バッテリー劣化',
  // 難あり系: 通常の中古とは別物
  '難あり',
  '訳あり',
  'ジャンク',
  '部品取り',
  '画面割れ',
  'ガラス割れ',
  '液晶不良',
]

/**
 * 商品名から「中古相場の算出対象外」を判定する。
 * 空白と全角％を正規化してから部分一致で判定する。
 */
export function isExcludedCondition(itemName: string): boolean {
  const normalized = itemName.replace(/[\s　]/g, '').replace(/％/g, '%')
  return EXCLUDED_CONDITION_WORDS.some((w) => normalized.includes(w))
}

export interface PriceResult {
  min: number | string
  max: number | string
  minItemName: string
  maxItemName: string
  /** 相場算出に使用した該当商品数（流通量の目安。DBの *_count に保存する） */
  count: number
  /**
   * 相場算出に使用した全商品の価格（昇順・円）。DBの *_prices に保存する。
   * min/max だけでは中央値・価格分布が出せず、集計ロジックを変えても
   * 過去分を再計算できないため、価格そのものを残す。
   */
  prices: number[]
}

export const EMPTY_RESULT: PriceResult = {
  min: '-',
  max: '-',
  minItemName: '-',
  maxItemName: '-',
  count: 0,
  // 「検索したが0件」を表す。過去分のNULL（そもそも記録していない）とは区別する
  prices: [],
}
