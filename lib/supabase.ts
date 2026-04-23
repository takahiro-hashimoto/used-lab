import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[used-lab] Supabase env vars are missing.\n' +
    '  Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    '  Copy .env.example to .env.local and fill in the values.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
