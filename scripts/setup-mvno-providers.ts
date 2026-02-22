/**
 * mvno_providers テーブルを Supabase に作成し、データを投入するスクリプト
 * Usage: npx tsx scripts/setup-mvno-providers.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const providers = [
  {
    id: 1,
    provider_name: '楽天モバイル',
    provider_slug: 'rakuten-mobile',
    official_url: 'https://hb.afl.rakuten.co.jp/hgc/258cf4cc.6d6fceff.258cf4cd.200f7802/?pc=https%3A%2F%2Fwww.rakuten.ne.jp%2Fgold%2Frakutenmobile-store%2Fproduct%2Frakuten-certified%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9',
    certified_program_name: 'Rakuten認定中古',
    available_iphones: 'iPhone 14,iPhone 13 Pro Max,iPhone 13 Pro,iPhone 13 mini,iPhone 12 Pro Max,iPhone 12 Pro,iPhone 12 mini,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)',
    used_device_note: '楽天モバイル公式 楽天市場店限定販売。グレードはA+（美品）とA（良品）の2段階。楽天モバイル公式サイト・店舗では取扱なし。',
    network_carriers: 'rakuten',
    sim_types: '音声SIM,eSIM',
    min_monthly_fee: 1078,
    min_monthly_fee_note: '～3GB時。従量制で～20GB 2,178円、20GB超 3,278円（税込）',
    warranty_days: 90,
    battery_guarantee_percent: 80,
    set_discount_available: true,
    set_discount_note: 'Rakuten最強プランとのセット購入で最大22,000円OFFクーポンあり（時期により変動）。MNP乗り換え+初契約でポイント還元あり。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 1,
    last_verified_at: '2025-01-29',
  },
  {
    id: 2,
    provider_name: 'IIJmio',
    provider_slug: 'iijmio',
    official_url: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=892528273',
    certified_program_name: null,
    available_iphones: 'iPhone 13,iPhone 12 Pro Max,iPhone 12 Pro,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)',
    used_device_note: 'グレードは未使用品・美品・良品・Apple認定整備済製品の4段階。リユースモバイルガイドライン評価基準A以上のみ販売。SIMフリーまたはSIMロック解除済。',
    network_carriers: 'docomo,au',
    sim_types: '音声SIM,音声eSIM,SMS SIM,データSIM,データeSIM',
    min_monthly_fee: 850,
    min_monthly_fee_note: '2GB時（税込）。5GB 950円、10GB 1,400円など',
    warranty_days: 30,
    battery_guarantee_percent: null,
    set_discount_available: true,
    set_discount_note: 'MNP転入+ギガプラン音声SIM/eSIM+端末同時購入で「のりかえ価格」適用。スマホ大特価セールで大幅割引あり。',
    store_support: false,
    online_only: true,
    is_published: true,
    display_order: 2,
    last_verified_at: '2025-01-29',
  },
  {
    id: 3,
    provider_name: 'UQモバイル',
    provider_slug: 'uq-mobile',
    official_url: 'https://shop.uqmobile.jp/shop/aucertified/?srsltid=AfmBOooqyfDGNAyOQzJ-RqC3fgGafoH-qaxizWUyWwFjuXjsZ1OgiSiE',
    certified_program_name: 'au Certified',
    available_iphones: 'iPhone 14 Pro,iPhone 14,iPhone 13 Pro,iPhone 13,iPhone 13 mini,iPhone SE(第3世代),iPhone SE(第2世代)',
    used_device_note: 'au認定リユース品。専門業者による外観検査・機能検査をクリア。付属品なし（端末とSIMピンのみ）。ネットワーク利用制限の心配なし。',
    network_carriers: 'au',
    sim_types: '音声SIM,eSIM',
    min_monthly_fee: 2178,
    min_monthly_fee_note: 'トクトクプラン2 30GB時（税込・各種割引なし）。自宅セット割+au PAYカード割で1,628円',
    warranty_days: 30,
    battery_guarantee_percent: 80,
    set_discount_available: true,
    set_discount_note: 'MNP+コミコミプランバリューまたはトクトクプラン2+増量オプションⅡで最大44,000円割引。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 3,
    last_verified_at: '2025-01-29',
  },
  {
    id: 4,
    provider_name: 'ワイモバイル',
    provider_slug: 'ymobile',
    official_url: 'https://www.ymobile.jp/store/sp/iphone_sbc/',
    certified_program_name: 'ソフトバンク認定中古品',
    available_iphones: 'iPhone 14,iPhone 13,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)',
    used_device_note: 'ソフトバンクが厳選した認定整備済みiPhone。付属品なし（端末のみ）。軽微な傷・使用感あり。ネットワーク利用制限なし。オンラインストア限定販売。',
    network_carriers: 'softbank',
    sim_types: '音声SIM,eSIM',
    min_monthly_fee: 2365,
    min_monthly_fee_note: 'シンプル3 S 5GB時（税込・割引なし）。おうち割光セット(A)+PayPayカード ゴールド割で858円',
    warranty_days: 8,
    battery_guarantee_percent: 80,
    set_discount_available: true,
    set_discount_note: '新規・MNP+シンプル3 M/Lで端末割引あり。年末年始セール等で大幅値引きあり。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 4,
    last_verified_at: '2025-01-29',
  },
  {
    id: 5,
    provider_name: 'ahamo',
    provider_slug: 'ahamo',
    official_url: 'https://ahamo.com/products/used/',
    certified_program_name: 'docomo Certified',
    available_iphones: 'iPhone 15,iPhone 14,iPhone 13,iPhone 12,iPhone 11,iPhone SE(第3世代),iPhone SE(第2世代)',
    used_device_note: 'ドコモ認定リユース品。ランクA+/A/Bの3段階評価。付属品はSIM取り出しピンのみ。ネットワーク利用制限なし。新規契約時はahamoサイトで購入可、既存契約者はドコモオンラインショップで購入。',
    network_carriers: 'docomo',
    sim_types: '音声SIM,eSIM',
    min_monthly_fee: 2970,
    min_monthly_fee_note: '30GB+5分通話無料（税込・割引なし）。シンプルワンプラン。大盛りオプション+1,980円で110GB。',
    warranty_days: 30,
    battery_guarantee_percent: 80,
    set_discount_available: true,
    set_discount_note: '新規・MNPで端末割引あり（最大33,000円引き等）。SIMのみ乗り換えで20,000dポイント還元。',
    store_support: false,
    online_only: true,
    is_published: true,
    display_order: 5,
    last_verified_at: '2025-01-29',
  },
  {
    id: 6,
    provider_name: 'イオンモバイル',
    provider_slug: 'aeon-mobile',
    official_url: 'https://aeonmobile.jp/iphone/',
    certified_program_name: null,
    available_iphones: 'iPhone 16e,iPhone 15,iPhone 14',
    used_device_note: '中古（未使用品）を販売。キャリア認定プログラムではなく独自仕入れ。出荷前にキッティング（APN設定等）済み。Yahoo!ショッピング店でも購入可能。',
    network_carriers: 'docomo,au',
    sim_types: '音声SIM,データSIM,シェアSIM,eSIM',
    min_monthly_fee: 803,
    min_monthly_fee_note: '音声プラン 0.5GB時（税込）。1GB 858円、3GB 1,078円、5GB 1,298円。60歳以上向け「やさしいプラン」あり。',
    warranty_days: null,
    battery_guarantee_percent: null,
    set_discount_available: true,
    set_discount_note: 'MNP乗り換えでWAONポイント進呈、エントリーパッケージ利用で2,000WAONポイント等。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 6,
    last_verified_at: '2025-01-29',
  },
  {
    id: 7,
    provider_name: 'ゲオモバイル',
    provider_slug: 'geo-mobile',
    official_url: 'https://mvno.geo-mobile.jp/uqmobile/?utm_source=felmat&utm_medium=affiliate&utm_campaign=reg_uq_ec&utm_content=seo&tgcs=6ddba9d5b0e84ab470b8721292fa4330',
    certified_program_name: null,
    available_iphones: 'iPhone 12 mini,iPhone 12,iPhone 11,iPhone SE(第3世代),iPhone SE(第2世代),iPhone XR',
    used_device_note: 'ゲオ独自の中古品。状態S（未使用）/A（良好）/B（使用感あり）の3段階評価。UQモバイルSIMとのセット販売専用。赤ロム永久保証。データ消去は国際認証Blancco社ソリューション使用。バッテリー保証なし。',
    network_carriers: 'au',
    sim_types: '音声SIM',
    min_monthly_fee: 2178,
    min_monthly_fee_note: 'UQモバイル トクトクプラン2 30GB時（税込・割引なし）。自宅セット割+au PAYカード割で1,628円。コミコミプランバリュー35GB 3,828円。',
    warranty_days: 30,
    battery_guarantee_percent: null,
    set_discount_available: true,
    set_discount_note: 'MNP+コミコミプランバリュー/トクトクプラン2+増量オプションⅡで端末大幅割引（1円端末も）。選べるe-GIFT付きキャンペーンあり。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 7,
    last_verified_at: '2025-01-29',
  },
  {
    id: 8,
    provider_name: 'mineo',
    provider_slug: 'mineo',
    official_url: 'https://mineo.jp/device/iphone/',
    certified_program_name: null,
    available_iphones: 'iPhone 17,iPhone Air,iPhone 16,iPhone 16e,iPhone 15,iPhone 13',
    used_device_note: '中古未使用品が中心（端末本体・付属品ともに通常使用されておらず新品同様の状態）。一部新品あり（iPhone 13）。国内版SIMフリー。メーカー1年保証・AppleCare+は原則対象外。初期設定済みで届いてすぐ使える。',
    network_carriers: 'docomo,au,softbank',
    sim_types: '音声SIM,データSIM,eSIM',
    min_monthly_fee: 1298,
    min_monthly_fee_note: 'マイピタ デュアルタイプ 3GB（税込）。7GB 1,518円、15GB 1,958円、30GB 2,178円、50GB 2,948円。パケット放題Plus（最大3Mbps使い放題）15GB以上無料付帯。',
    warranty_days: 30,
    battery_guarantee_percent: null,
    set_discount_available: true,
    set_discount_note: '端末購入で電子マネーギフト進呈。マイピタ最大6カ月間割引キャンペーン等。長期利用特典「ファン∞とく」で端末購入クーポンあり。',
    store_support: true,
    online_only: false,
    is_published: true,
    display_order: 8,
    last_verified_at: '2025-01-29',
  },
]

async function main() {
  console.log('Creating mvno_providers table via RPC...')

  // テーブル作成（Supabase SQL Editor の代替 — service_role で実行）
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS mvno_providers (
      id              serial PRIMARY KEY,
      provider_name   varchar(100) NOT NULL,
      provider_slug   varchar(100) NOT NULL UNIQUE,
      official_url    varchar(500) NOT NULL,
      certified_program_name varchar(100),
      available_iphones varchar(500),
      used_device_note text,
      network_carriers varchar(100),
      sim_types       varchar(100),
      min_monthly_fee integer,
      min_monthly_fee_note varchar(255),
      warranty_days   integer DEFAULT 0,
      battery_guarantee_percent smallint,
      set_discount_available boolean DEFAULT false,
      set_discount_note text,
      store_support   boolean DEFAULT false,
      online_only     boolean DEFAULT false,
      is_published    boolean DEFAULT true,
      display_order   integer DEFAULT 0,
      last_verified_at date,
      created_at      timestamptz DEFAULT now(),
      updated_at      timestamptz DEFAULT now()
    );
  `

  // Supabase REST API で直接 SQL を実行
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({ query: createTableSQL }),
  })

  // rpc が使えない場合は直接 insert で対応
  // テーブルが既に存在する前提で、まず upsert を試す
  console.log('Upserting provider data...')
  const { data, error } = await supabase
    .from('mvno_providers')
    .upsert(providers, { onConflict: 'provider_slug' })

  if (error) {
    console.error('Upsert failed:', error.message)
    console.log('')
    console.log('テーブルが存在しない場合は、Supabase Dashboard の SQL Editor で')
    console.log('sql/mvno_providers.sql を実行してください。')
    console.log('その後、このスクリプトを再実行するとデータが投入されます。')
    process.exit(1)
  }

  console.log(`✅ ${providers.length} providers upserted successfully!`)

  // 確認
  const { data: check } = await supabase
    .from('mvno_providers')
    .select('id, provider_name, provider_slug')
    .eq('is_published', true)
    .order('display_order')
  console.log('Current providers:', check)
}

main().catch(console.error)
