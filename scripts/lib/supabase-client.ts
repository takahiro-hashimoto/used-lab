// ============================================
// スクリプト用 Supabase クライアント（Service Role Key）
// ============================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from './config'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const e = env()
    _client = createClient(e.SUPABASE_URL, e.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _client
}
