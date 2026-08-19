// ============================================
// 環境変数・定数管理
// ============================================

// 環境変数はアクセス時に評価する（dotenvのロード後に読まれるようにする）
export function env() {
  return {
    RAKUTEN_APP_ID: process.env.RAKUTEN_APP_ID ?? '',
    // 2026年の楽天API刷新でaccessKey（pk_...）が必須に
    RAKUTEN_ACCESS_KEY: process.env.RAKUTEN_ACCESS_KEY ?? '',
    RAKUTEN_AFFILIATE_ID: process.env.RAKUTEN_AFFILIATE_ID ?? '',
    // Originヘッダーに使う登録済みドメイン（403回避）
    RAKUTEN_ORIGIN: process.env.RAKUTEN_ORIGIN ?? 'https://used-lab.jp',
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }
}

// 楽天 ジャンルID
export const GENRE_SMARTPHONE = '560202'  // スマートフォン本体
export const GENRE_TABLET = '560029'      // タブレットPC本体
export const GENRE_EARPHONE = '502835'    // ヘッドホン・イヤホン

// 楽天API ベースURL（2026年インフラ刷新後の新エンドポイント。旧 app.rakuten.co.jp は停止）
//
// 末尾のAPIバージョンは楽天側で予告なく廃止される。廃止されると認証情報が正しくても
// 全リクエストが 400 {"error":"wrong_parameter","error_description":"API Configuration not found"}
// になり、1件も取得できない（2026-08-18に 20220601 が廃止され、2日間気づけなかった）。
// このエラーが出たらキーやIPを疑う前に、まず新しいバージョンが出ていないかを確認すること。
export const RAKUTEN_API_BASE = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701'

// ショップ定義
export interface ShopConfig {
  name: string
  code: string
  key: string
}

export const RAKUTEN_SHOPS: ShopConfig[] = [
  { name: 'イオシス', code: 'pc-good', key: 'iosys' },
  { name: 'ゲオ', code: 'geo-mobile', key: 'geo' },
  { name: 'じゃんぱら', code: 'janpara', key: 'janpara' },
]

export const RAKUTEN_SHOPS_AIRPODS: ShopConfig[] = [
  { name: 'イオシス', code: 'pc-good', key: 'iosys' },
  { name: 'じゃんぱら', code: 'janpara', key: 'janpara' },
  { name: 'eイヤホン', code: 'e-earphone', key: 'eearphone' },
]

export function validateEnv(): void {
  const e = env()
  const missing: string[] = []
  if (!e.RAKUTEN_APP_ID) missing.push('RAKUTEN_APP_ID')
  if (!e.RAKUTEN_ACCESS_KEY) missing.push('RAKUTEN_ACCESS_KEY')
  if (!e.RAKUTEN_AFFILIATE_ID) missing.push('RAKUTEN_AFFILIATE_ID')
  if (!e.SUPABASE_URL) missing.push('SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL')
  if (!e.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}
