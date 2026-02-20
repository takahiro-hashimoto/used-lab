import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  // 1件取得してカラム構造を確認
  const { data, error } = await supabase
    .from('airpods_price_logs')
    .select('*')
    .limit(1)

  if (error) {
    console.error('エラー:', error.message)
    return
  }

  if (data && data.length > 0) {
    console.log('=== airpods_price_logs カラム ===')
    for (const [key, val] of Object.entries(data[0])) {
      console.log(`  ${key}: ${typeof val} = ${JSON.stringify(val)}`)
    }
  } else {
    console.log('データなし。INSERTしてカラムを確認します')
    // カラム名はTypeScript型から推測
  }

  // airpods_models の詳細確認
  const { data: models } = await supabase
    .from('airpods_models')
    .select('id, model, name, slug')
    .order('id', { ascending: true })

  console.log('\n=== airpods_models 詳細 ===')
  for (const m of models ?? []) {
    console.log(`  ID ${m.id}: model="${m.model}" name="${m.name}" slug="${m.slug}"`)
  }
}

check().catch(console.error)
