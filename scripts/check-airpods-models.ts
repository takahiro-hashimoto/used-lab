import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data: models } = await supabase
    .from('airpods_models')
    .select('id, model')
    .order('id', { ascending: true })

  console.log('=== airpods_models 一覧 ===')
  for (const m of models ?? []) {
    console.log(`  ID ${m.id}: ${m.model}`)
  }
}

check().catch(console.error)
