// ============================================
// 管理画面用 Supabase クライアント（Service Role Key）
// サーバーサイド専用 — RLS をバイパスして全テーブルの CRUD が可能
// ============================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    '[used-lab] Supabase admin env vars are missing.\n' +
    '  Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY\n' +
    '  Copy .env.example to .env.local and fill in the values.'
  )
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
