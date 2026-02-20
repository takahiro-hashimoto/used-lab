// ============================================
// 環境変数・定数管理
// ============================================

// 環境変数はアクセス時に評価する（dotenvのロード後に読まれるようにする）
export function env() {
  return {
    RAKUTEN_APP_ID: process.env.RAKUTEN_APP_ID ?? '',
    RAKUTEN_AFFILIATE_ID: process.env.RAKUTEN_AFFILIATE_ID ?? '',
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }
}

// 楽天 ジャンルID
export const GENRE_SMARTPHONE = '560202'  // スマートフォン本体
export const GENRE_TABLET = '560029'      // タブレットPC本体
export const GENRE_EARPHONE = '502835'    // ヘッドホン・イヤホン

// 楽天API ベースURL
export const RAKUTEN_API_BASE = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601'

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
  if (!e.RAKUTEN_AFFILIATE_ID) missing.push('RAKUTEN_AFFILIATE_ID')
  if (!e.SUPABASE_URL) missing.push('SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL')
  if (!e.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}
