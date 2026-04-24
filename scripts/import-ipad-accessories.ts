// ============================================
// iPad アクセサリデータ インポートスクリプト
// ============================================
// 使い方: npx tsx scripts/import-ipad-accessories.ts
//
// WordPress の wp_ipad_accessories / wp_used_ipad_accessories を
// Supabase の ipad_accessories / ipad_accessory_compatibility に投入する

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { getSupabase } from './lib/supabase-client'

const supabase = getSupabase()

// Pencil の短縮ラベル（検証時のテキスト復元用）
function getPencilShortLabel(name: string): string {
  if (name.includes('第1世代')) return '第1世代'
  if (name.includes('第2世代')) return '第2世代'
  if (name.includes('USB-C')) return 'USB-C'
  if (name.includes('Pro')) return 'Pro'
  return name
}

// ============================================
// アクセサリマスタデータ (wp_used_ipad_accessories から)
// ============================================
const ACCESSORIES = [
  // Pencils
  { id: 1,  name: 'Apple Pencil（第1世代）',     type: 'pencil',   image: 'mk0c2ja.jpg',   model_number: 'MK0C2J/A',   release_date: '2015-11-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fgroup%3DPencil%2B%25E7%25AC%25AC1%25E4%25B8%2596%25E4%25BB%25A3%2BMK0C2J%2FA%26l%3Dl', amazon_url: 'https://amzn.to/4iUyZd1', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIOesrDHkuJbku6M', display_order: 1 },
  { id: 2,  name: 'Apple Pencil（第2世代）',     type: 'pencil',   image: 'mu8f2ja.jpg',   model_number: 'MU8F2J/A',   release_date: '2018-11-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fgroup%3DPencil%2B%25E7%25AC%25AC2%25E4%25B8%2596%25E4%25BB%25A3%2BMU8F2J%2FA%26l%3Dl', amazon_url: 'https://amzn.to/4kohK5L', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIOesrDLkuJbku6M', display_order: 2 },
  { id: 3,  name: 'Apple Pencil（USB-C）',       type: 'pencil',   image: 'muwa3zaa.jpg',  model_number: 'MUWA3ZA/A',  release_date: '2023-11-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphonegoods%2Ftouchpen%2Fpencil_muwa3za_a', amazon_url: 'https://amzn.to/4i6zktt', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIFVTQi1D', display_order: 3 },
  { id: 4,  name: 'Apple Pencil Pro',            type: 'pencil',   image: 'mx2d3zaa.jpg',  model_number: 'MX2D3ZA/A',  release_date: '2024-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Ftouchpen%2Fpencil_pro_mx2d3ch_a', amazon_url: 'https://amzn.to/3FAoHAM', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1hcHBsZSBwZW5jaWwgcHJv', display_order: 4 },
  // Keyboards
  { id: 10, name: 'Smart Keyboard',                                type: 'keyboard', image: 'mx3l2ja.jpg',  model_number: 'MX3L2J/A',   release_date: '2020-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fq%3DSmart%2BKeyboard%2BMX3L2J%2FA%2BA1829%26genre%3Dkeyboard%26srsltid%3DAfmBOooRd2QfOr6nesxZUto1V2J15qIPdaUb4PLVFCKsXuDKz4KV3ni7', amazon_url: 'https://amzn.to/4ha8P4Y', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1NWDNMMkovQQ', display_order: 10 },
  { id: 11, name: 'Magic Keyboard Folio',                          type: 'keyboard', image: 'mqdp3ja.jpg',  model_number: 'MQDP3J/A',   release_date: '2022-10-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_10.9%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581_%25E7%2594%25A8_magic_keyboard_folio_-jis_mqdp3j_a', amazon_url: 'https://amzn.to/3Rb3Fej', mercari_url: 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1NUURQM0ovQQ', display_order: 11 },
  { id: 12, name: 'Smart Keyboard Folio（12.9インチ）',             type: 'keyboard', image: 'mxnl2ja.jpg', model_number: 'MXNL2J/A',   release_date: '2020-03-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fcase%2F12.9%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581ipad_pro_%25E7%2594%25A8_smart_keyboard_folio_-jis_mxnl2j_a%3Fsrsltid%3DAfmBOorbqsCaHA5tGCG5ME9qFdcOHiTKKPF3NWIDgKo9KUNy5iG64nJd', amazon_url: 'https://amzn.to/3DK3V0O', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhuazFqL2E', display_order: 12 },
  { id: 13, name: 'Smart Keyboard Folio（11インチ）',               type: 'keyboard', image: 'mxnk2ja.jpg', model_number: 'MXNK2J/A',   release_date: '2020-03-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2F11%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581ipad_pro_%25E7%2594%25A8_smart_keyboard_folio_-jis_mxnk2j_a%3Fsrsltid%3DAfmBOopFIljB1Sj-_YoIgEtFG3AaqwYGmCJ-Hmn_67DO9jdaJEUbWBjy', amazon_url: 'https://amzn.to/4hdH8Iv', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhuazJqL2E', display_order: 13 },
  { id: 14, name: 'Magic Keyboard（ブラック・11インチ旧）',         type: 'keyboard', image: 'mxqt2ja.jpg', model_number: 'MXQT2J/A',   release_date: '2020-04-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/4if2tCQ', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhxdDJqYQ', display_order: 14 },
  { id: 15, name: 'Magic Keyboard（ホワイト・11インチ旧）',         type: 'keyboard', image: 'mjqj3ja.jpg', model_number: 'MJQJ3J/A',   release_date: '2022-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/3DTPMy3', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbWpxajNqL2E', display_order: 15 },
  { id: 16, name: 'Magic Keyboard（ブラック・12.9インチ）',         type: 'keyboard', image: 'mjqk3ja.jpg', model_number: 'MJQK3JA',    release_date: '2022-01-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/3FxF40Q', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTUpRSzNKQQ', display_order: 16 },
  { id: 17, name: 'Magic Keyboard（ホワイト・12.9インチ）',         type: 'keyboard', image: 'mjql3ja.jpg', model_number: 'MJQL3J/A',   release_date: '2022-01-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/43Q0H6t', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbWpxazNsbC9h', display_order: 17 },
  { id: 18, name: 'Magic Keyboard（ホワイト・11インチ M4）',        type: 'keyboard', image: 'mwr03ja.jpg', model_number: 'MWR03J/A',   release_date: '2024-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/43Q0EaN', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXdyMDNqL2E', display_order: 18 },
  { id: 19, name: 'Magic Keyboard（ブラック・11インチ M4）',        type: 'keyboard', image: 'mwr23ja.jpg', model_number: 'MWR23J/A',   release_date: '2024-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/4kReboC', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXdyMjNqL2E', display_order: 19 },
  { id: 20, name: 'Magic Keyboard（ホワイト・13インチ M4）',        type: 'keyboard', image: 'mwr43ja.jpg', model_number: 'MWR43J/A',   release_date: '2024-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/3XUwMGt', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTVdSNDNKL0E', display_order: 20 },
  { id: 21, name: 'Magic Keyboard（ブラック・13インチ M4）',        type: 'keyboard', image: 'mwr53ja.jpg', model_number: 'MWR53J/A',   release_date: '2024-05-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/4iuXldD', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTVdSNTNKL0E', display_order: 21 },
  { id: 22, name: 'Magic Keyboard（ホワイト・11インチ M3 Air）',    type: 'keyboard', image: 'mdfv4ja.jpg', model_number: 'MDFV4J/A',   release_date: '2025-03-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/4iyenr9', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTURGVjRKL0EgaVBhZA', display_order: 22 },
  { id: 23, name: 'Magic Keyboard（ホワイト・13インチ M3 Air）',    type: 'keyboard', image: 'mdfw4ja .jpg', model_number: 'MDFW4J/A',  release_date: '2025-03-01', iosys_url: 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', amazon_url: 'https://amzn.to/428UFww', mercari_url: 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdaVBhZCBNREZXNEovQSA', display_order: 23 },
]

// ============================================
// 対応関係データ (wp_ipad_accessories から、ID変換済み)
// ============================================
const COMPATIBILITY: { ipad_model_id: number; accessory_id: number }[] = [
  // iPad 第9世代 (1)
  { ipad_model_id: 1, accessory_id: 1 },
  { ipad_model_id: 1, accessory_id: 10 },
  // iPad 第10世代 (2)
  { ipad_model_id: 2, accessory_id: 1 },
  { ipad_model_id: 2, accessory_id: 3 },
  { ipad_model_id: 2, accessory_id: 11 },
  // iPad 第11世代 (3)
  { ipad_model_id: 3, accessory_id: 1 },
  { ipad_model_id: 3, accessory_id: 3 },
  { ipad_model_id: 3, accessory_id: 11 },
  // iPad mini 第5世代 (4)
  { ipad_model_id: 4, accessory_id: 1 },
  // iPad mini 第6世代 (5)
  { ipad_model_id: 5, accessory_id: 2 },
  { ipad_model_id: 5, accessory_id: 3 },
  // iPad mini 第7世代 (6)
  { ipad_model_id: 6, accessory_id: 4 },
  { ipad_model_id: 6, accessory_id: 3 },
  // iPad Air 第4世代 (7)
  { ipad_model_id: 7, accessory_id: 2 },
  { ipad_model_id: 7, accessory_id: 3 },
  { ipad_model_id: 7, accessory_id: 14 },
  { ipad_model_id: 7, accessory_id: 15 },
  // iPad Air 第5世代 (8)
  { ipad_model_id: 8, accessory_id: 2 },
  { ipad_model_id: 8, accessory_id: 3 },
  { ipad_model_id: 8, accessory_id: 14 },
  { ipad_model_id: 8, accessory_id: 15 },
  // iPad Air 11 第6世代 (9)
  { ipad_model_id: 9, accessory_id: 3 },
  { ipad_model_id: 9, accessory_id: 4 },
  { ipad_model_id: 9, accessory_id: 14 },
  { ipad_model_id: 9, accessory_id: 15 },
  // iPad Air 13 第6世代 (10)
  { ipad_model_id: 10, accessory_id: 3 },
  { ipad_model_id: 10, accessory_id: 4 },
  { ipad_model_id: 10, accessory_id: 16 },
  { ipad_model_id: 10, accessory_id: 17 },
  // iPad Air 11 第7世代 (11)
  { ipad_model_id: 11, accessory_id: 3 },
  { ipad_model_id: 11, accessory_id: 4 },
  { ipad_model_id: 11, accessory_id: 22 },
  // iPad Air 13 第7世代 (12)
  { ipad_model_id: 12, accessory_id: 3 },
  { ipad_model_id: 12, accessory_id: 4 },
  { ipad_model_id: 12, accessory_id: 23 },
  // iPad Pro 11 第2世代 (13)
  { ipad_model_id: 13, accessory_id: 2 },
  { ipad_model_id: 13, accessory_id: 3 },
  { ipad_model_id: 13, accessory_id: 13 },
  // iPad Pro 11 第3世代 (14)
  { ipad_model_id: 14, accessory_id: 2 },
  { ipad_model_id: 14, accessory_id: 3 },
  { ipad_model_id: 14, accessory_id: 14 },
  { ipad_model_id: 14, accessory_id: 15 },
  // iPad Pro 11 第4世代 (15)
  { ipad_model_id: 15, accessory_id: 2 },
  { ipad_model_id: 15, accessory_id: 3 },
  { ipad_model_id: 15, accessory_id: 14 },
  { ipad_model_id: 15, accessory_id: 15 },
  // iPad Pro 11 第5世代 (16)
  { ipad_model_id: 16, accessory_id: 3 },
  { ipad_model_id: 16, accessory_id: 4 },
  { ipad_model_id: 16, accessory_id: 18 },
  { ipad_model_id: 16, accessory_id: 19 },
  // iPad Pro 11 第6世代 (17)
  { ipad_model_id: 17, accessory_id: 3 },
  { ipad_model_id: 17, accessory_id: 4 },
  { ipad_model_id: 17, accessory_id: 18 },
  { ipad_model_id: 17, accessory_id: 19 },
  // iPad Pro 12.9 第4世代 (18)
  { ipad_model_id: 18, accessory_id: 2 },
  { ipad_model_id: 18, accessory_id: 3 },
  { ipad_model_id: 18, accessory_id: 12 },
  // iPad Pro 12.9 第5世代 (19)
  { ipad_model_id: 19, accessory_id: 2 },
  { ipad_model_id: 19, accessory_id: 3 },
  { ipad_model_id: 19, accessory_id: 12 },
  // iPad Pro 12.9 第6世代 (20)
  { ipad_model_id: 20, accessory_id: 2 },
  { ipad_model_id: 20, accessory_id: 3 },
  { ipad_model_id: 20, accessory_id: 12 },
  // iPad Pro 13 第1世代 (21)
  { ipad_model_id: 21, accessory_id: 3 },
  { ipad_model_id: 21, accessory_id: 4 },
  { ipad_model_id: 21, accessory_id: 20 },
  { ipad_model_id: 21, accessory_id: 21 },
  // iPad Pro 13 第2世代 (22)
  { ipad_model_id: 22, accessory_id: 3 },
  { ipad_model_id: 22, accessory_id: 4 },
  { ipad_model_id: 22, accessory_id: 20 },
  { ipad_model_id: 22, accessory_id: 21 },
]

async function main() {
  console.log('📥 iPad アクセサリデータ インポート開始')

  // ============================================
  // Step 1: ipad_accessories マスタ投入
  // ============================================
  console.log('\n--- Step 1: アクセサリマスタ投入 ---')

  // 既存データを削除して再投入
  const { error: delAccessoriesErr } = await supabase
    .from('ipad_accessories')
    .delete()
    .gte('id', 0)

  if (delAccessoriesErr) {
    console.error('既存アクセサリ削除エラー:', delAccessoriesErr.message)
    return
  }

  const { error: insertAccessoriesErr } = await supabase
    .from('ipad_accessories')
    .insert(ACCESSORIES)

  if (insertAccessoriesErr) {
    console.error('アクセサリ INSERT エラー:', insertAccessoriesErr.message)
    return
  }
  console.log(`  ✅ ${ACCESSORIES.length} 件のアクセサリを投入`)

  // ============================================
  // Step 2: ipad_accessory_compatibility 投入
  // ============================================
  console.log('\n--- Step 2: 対応関係データ投入 ---')

  const { error: delCompatErr } = await supabase
    .from('ipad_accessory_compatibility')
    .delete()
    .gte('id', 0)

  if (delCompatErr) {
    console.error('既存対応関係削除エラー:', delCompatErr.message)
    return
  }

  const { error: insertCompatErr } = await supabase
    .from('ipad_accessory_compatibility')
    .insert(COMPATIBILITY)

  if (insertCompatErr) {
    console.error('対応関係 INSERT エラー:', insertCompatErr.message)
    return
  }
  console.log(`  ✅ ${COMPATIBILITY.length} 件の対応関係を投入`)

  // ============================================
  // Step 3: 検証 — 既存の pencil/keyboard テキストと比較
  // ============================================
  console.log('\n--- Step 3: データ整合性検証 ---')

  const { data: models, error: modelsErr } = await supabase
    .from('ipad_models')
    .select('id, model, pencil, keyboard')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (modelsErr || !models) {
    console.error('ipad_models 取得エラー:', modelsErr?.message)
    return
  }

  const { data: allCompat, error: compatErr } = await supabase
    .from('ipad_accessory_compatibility')
    .select('ipad_model_id, accessory_id')

  if (compatErr || !allCompat) {
    console.error('対応関係取得エラー:', compatErr?.message)
    return
  }

  const { data: allAccessories, error: accErr } = await supabase
    .from('ipad_accessories')
    .select('*')
    .order('display_order', { ascending: true })

  if (accErr || !allAccessories) {
    console.error('アクセサリ取得エラー:', accErr?.message)
    return
  }

  const accessoryMap = new Map(allAccessories.map((a: { id: number }) => [a.id, a]))
  let mismatchCount = 0

  for (const model of models) {
    const compatIds = allCompat
      .filter((c: { ipad_model_id: number }) => c.ipad_model_id === model.id)
      .map((c: { accessory_id: number }) => c.accessory_id)

    const accessories = compatIds
      .map((id: number) => accessoryMap.get(id))
      .filter((a): a is { id: number; name: string; type: string; display_order: number } => a != null)

    // Pencil テキスト復元
    const pencils = accessories
      .filter((a: { type: string }) => a.type === 'pencil')
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order)
      .map((a: { name: string }) => getPencilShortLabel(a.name))
    const pencilText = pencils.length > 0 ? pencils.join('/') : null

    // Keyboard テキスト復元
    const keyboards = accessories.filter((a: { type: string }) => a.type === 'keyboard')
    const hasKeyboard = keyboards.length > 0

    // 比較
    if (!pencilText && model.pencil) {
      console.warn(`  ⚠️ ${model.model}: pencil 旧="${model.pencil}" → 新=null（対応データなし）`)
      mismatchCount++
    } else if (pencilText && !model.pencil) {
      console.warn(`  ⚠️ ${model.model}: pencil 旧=null → 新="${pencilText}"（旧データなし）`)
      mismatchCount++
    } else {
      console.log(`  ✅ ${model.model}: pencil="${pencilText || '-'}" / keyboard=${hasKeyboard ? '対応' : '非対応'}`)
    }
  }

  if (mismatchCount === 0) {
    console.log('\n🎉 全モデルのデータ整合性チェック完了（不一致なし）')
  } else {
    console.log(`\n⚠️ ${mismatchCount} 件の不一致がありました（確認が必要です）`)
  }

  console.log('\n📥 インポート完了')
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
