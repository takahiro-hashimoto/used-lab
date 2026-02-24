// ============================================================
// 管理画面：カテゴリ別フィールド定義
// ============================================================

export type FieldType = 'text' | 'number' | 'boolean' | 'textarea' | 'json' | 'select'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  group: string
}

export interface CategoryConfig {
  key: string         // URL パス
  table: string       // DB テーブル名
  label: string       // 表示名
  icon: string        // Font Awesome アイコン
  listColumns: string[] // 一覧テーブルに表示するカラム
  fields: FieldDef[]
  productType?: string // product_shop_links の product_type（ショップリンク管理用）
}

// --------------------------------------------------
// 共通フィールド（BaseProductModel 相当）
// --------------------------------------------------

const BASE_FIELDS: FieldDef[] = [
  { key: 'model', label: 'モデル名', type: 'text', required: true, group: '基本情報' },
  { key: 'slug', label: 'スラッグ', type: 'text', required: true, placeholder: 'e.g. iphone-15-pro', group: '基本情報' },
  { key: 'image', label: '画像ファイル名', type: 'text', placeholder: 'model-name.jpg', group: '基本情報' },
  { key: 'date', label: '発売日', type: 'text', placeholder: '2024年9月', group: '基本情報' },
  { key: 'cpu', label: 'チップ', type: 'text', placeholder: 'A17 Pro', group: '基本情報' },
  { key: 'battery', label: 'バッテリー', type: 'text', group: '基本情報' },
  { key: 'official', label: 'Apple公式価格', type: 'text', group: '基本情報' },
  { key: 'point', label: 'ポイント・特徴', type: 'textarea', group: 'その他' },
  { key: 'advance', label: '進化ポイント (JSON)', type: 'json', group: 'その他' },
]

// --------------------------------------------------
// iPhone
// --------------------------------------------------

const IPHONE_FIELDS: FieldDef[] = [
  ...BASE_FIELDS,
  { key: 'strage', label: 'ストレージ', type: 'text', placeholder: '128GB/256GB/512GB', group: '基本情報' },
  { key: 'color', label: 'カラー', type: 'text', group: '基本情報' },
  // ベンチマーク
  { key: 'score_single', label: 'Geekbench Single', type: 'number', group: 'ベンチマーク' },
  { key: 'score_multi', label: 'Geekbench Multi', type: 'number', group: 'ベンチマーク' },
  { key: 'score_metal', label: 'Geekbench Metal', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_cpu', label: 'AnTuTu CPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_gpu', label: 'AnTuTu GPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_mem', label: 'AnTuTu MEM', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_ux', label: 'AnTuTu UX', type: 'number', group: 'ベンチマーク' },
  { key: 'ram', label: 'RAM', type: 'text', placeholder: '6GB', group: 'ベンチマーク' },
  // ディスプレイ・筐体
  { key: 'size', label: 'サイズ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', group: 'ディスプレイ・筐体' },
  // カメラ・メディア
  { key: 'in_camera', label: '背面カメラ', type: 'text', group: 'カメラ・メディア' },
  { key: 'front_camera', label: '前面カメラ', type: 'text', group: 'カメラ・メディア' },
  { key: 'image_sensor', label: 'イメージセンサー', type: 'text', group: 'カメラ・メディア' },
  { key: 'video', label: 'ビデオ撮影', type: 'text', group: 'カメラ・メディア' },
  { key: 'streaming', label: 'ストリーミング', type: 'text', group: 'カメラ・メディア' },
  { key: 'audio', label: 'オーディオ', type: 'text', group: 'カメラ・メディア' },
  // 接続・その他
  { key: 'port', label: 'ポート', type: 'text', group: '接続・その他' },
  { key: 'certification', label: '認証', type: 'text', group: '接続・その他' },
  { key: 'sim', label: 'SIM', type: 'text', group: '接続・その他' },
  { key: 'last_ios', label: '最終対応iOS', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'apple_intelligence', label: 'Apple Intelligence', type: 'boolean', group: '機能' },
  { key: 'photography_style', label: 'フォトグラフスタイル', type: 'boolean', group: '機能' },
  { key: 'portrait_mode', label: 'ポートレートモード', type: 'boolean', group: '機能' },
  { key: 'action_mode', label: 'アクションモード', type: 'boolean', group: '機能' },
  { key: 'cinematic_mode', label: 'シネマティックモード', type: 'boolean', group: '機能' },
  { key: 'macro_mode', label: 'マクロ撮影', type: 'boolean', group: '機能' },
  { key: 'night_mode', label: 'ナイトモード', type: 'boolean', group: '機能' },
  { key: 'apple_proraw', label: 'Apple ProRAW', type: 'boolean', group: '機能' },
  { key: 'apple_prores', label: 'Apple ProRes', type: 'boolean', group: '機能' },
  { key: 'magsafe', label: 'MagSafe', type: 'boolean', group: '機能' },
  { key: 'dynamic_island', label: 'Dynamic Island', type: 'boolean', group: '機能' },
  { key: 'accident_detection', label: '衝突事故検出', type: 'boolean', group: '機能' },
  { key: 'promotion', label: 'ProMotion', type: 'boolean', group: '機能' },
  { key: 'lidar', label: 'LiDAR', type: 'boolean', group: '機能' },
  { key: 'action_button', label: 'アクションボタン', type: 'boolean', group: '機能' },
  { key: 'camera_control', label: 'カメラコントロール', type: 'boolean', group: '機能' },
  { key: 'centerframe', label: 'センターフレーム', type: 'boolean', group: '機能' },
  // アクセサリ
  { key: 'accessory_case', label: 'ケース型番', type: 'text', group: 'アクセサリ' },
  { key: 'accessory_film', label: 'フィルム型番', type: 'text', group: 'アクセサリ' },
  { key: 'price', label: '価格情報 (JSON)', type: 'json', group: 'その他' },
]

// --------------------------------------------------
// iPad
// --------------------------------------------------

const IPAD_FIELDS: FieldDef[] = [
  ...BASE_FIELDS,
  { key: 'strage', label: 'ストレージ', type: 'text', group: '基本情報' },
  { key: 'color', label: 'カラー', type: 'text', group: '基本情報' },
  // ベンチマーク
  { key: 'score_single', label: 'Geekbench Single', type: 'number', group: 'ベンチマーク' },
  { key: 'score_multi', label: 'Geekbench Multi', type: 'number', group: 'ベンチマーク' },
  { key: 'score_metal', label: 'Geekbench Metal', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_cpu', label: 'AnTuTu CPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_gpu', label: 'AnTuTu GPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_mem', label: 'AnTuTu MEM', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_ux', label: 'AnTuTu UX', type: 'number', group: 'ベンチマーク' },
  { key: 'ram', label: 'RAM', type: 'text', group: 'ベンチマーク' },
  // ディスプレイ・筐体
  { key: 'size', label: 'サイズ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'display_type', label: 'ディスプレイ種類', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'speaker', label: 'スピーカー', type: 'text', group: 'ディスプレイ・筐体' },
  // 接続・その他
  { key: 'port', label: 'ポート', type: 'text', group: '接続・その他' },
  { key: 'certification', label: '認証', type: 'text', group: '接続・その他' },
  { key: 'sim', label: 'SIM', type: 'text', group: '接続・その他' },
  { key: 'front_camera', label: '前面カメラ', type: 'text', group: '接続・その他' },
  { key: 'in_camera', label: '背面カメラ', type: 'text', group: '接続・その他' },
  { key: 'last_ipados', label: '最終対応iPadOS', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'apple_intelligence', label: 'Apple Intelligence', type: 'boolean', group: '機能' },
  { key: 'center_frame', label: 'センターフレーム', type: 'boolean', group: '機能' },
  { key: 'promotion', label: 'ProMotion', type: 'boolean', group: '機能' },
  { key: 'lidar', label: 'LiDAR', type: 'boolean', group: '機能' },
  // アクセサリ
  { key: 'accessory_case', label: 'ケース型番', type: 'text', group: 'アクセサリ' },
  { key: 'accessory_film', label: 'フィルム型番', type: 'text', group: 'アクセサリ' },
]

// --------------------------------------------------
// MacBook
// --------------------------------------------------

const MACBOOK_FIELDS: FieldDef[] = [
  ...BASE_FIELDS,
  { key: 'shortname', label: '短縮名', type: 'text', group: '基本情報' },
  { key: 'strage', label: 'ストレージ', type: 'text', group: '基本情報' },
  { key: 'color', label: 'カラー', type: 'text', group: '基本情報' },
  // ベンチマーク
  { key: 'score_single', label: 'Geekbench Single', type: 'number', group: 'ベンチマーク' },
  { key: 'score_multi', label: 'Geekbench Multi', type: 'number', group: 'ベンチマーク' },
  { key: 'score_metal', label: 'Geekbench Metal', type: 'number', group: 'ベンチマーク' },
  { key: 'ram', label: 'RAM', type: 'text', group: 'ベンチマーク' },
  // ディスプレイ・筐体
  { key: 'size', label: 'サイズ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'luminance', label: '輝度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'port', label: 'ポート', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'camera', label: 'カメラ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'speaker', label: 'スピーカー', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'last_macos', label: '最終対応macOS', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'apple_intelligence', label: 'Apple Intelligence', type: 'boolean', group: '機能' },
  { key: 'hdmi', label: 'HDMI', type: 'boolean', group: '機能' },
  { key: 'slot', label: 'SDカードスロット', type: 'boolean', group: '機能' },
  { key: 'magsafe', label: 'MagSafe', type: 'boolean', group: '機能' },
  { key: 'promotion', label: 'ProMotion', type: 'boolean', group: '機能' },
  { key: 'fan', label: 'ファン', type: 'boolean', group: '機能' },
  { key: 'center_frame', label: 'センターフレーム', type: 'boolean', group: '機能' },
  // アクセサリ
  { key: 'accessory_case', label: 'ケース型番', type: 'text', group: 'アクセサリ' },
  { key: 'accessory_film', label: 'フィルム型番', type: 'text', group: 'アクセサリ' },
]

// --------------------------------------------------
// Apple Watch
// --------------------------------------------------

const WATCH_FIELDS: FieldDef[] = [
  ...BASE_FIELDS,
  { key: 'size', label: 'ケースサイズ', type: 'text', group: '基本情報' },
  { key: 'strage', label: 'ストレージ', type: 'text', group: '基本情報' },
  { key: 'material', label: '素材', type: 'text', group: '基本情報' },
  { key: 'water_resistance', label: '耐水性能', type: 'text', group: '基本情報' },
  { key: 'max_brightness', label: '最大輝度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'last_watchos', label: '最終対応watchOS', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'always_on_display', label: '常時表示', type: 'boolean', group: '機能' },
  { key: 'fast_charge', label: '急速充電', type: 'boolean', group: '機能' },
  { key: 'blood_oxygen', label: '血中酸素', type: 'boolean', group: '機能' },
  { key: 'cardiogram', label: '心電図', type: 'boolean', group: '機能' },
  { key: 'accident_detection', label: '衝突事故検出', type: 'boolean', group: '機能' },
  { key: 'fall_detection', label: '転倒検出', type: 'boolean', group: '機能' },
  { key: 'skin_temperature', label: '皮膚温度', type: 'boolean', group: '機能' },
  { key: 'japanese_input', label: '日本語入力', type: 'boolean', group: '機能' },
  { key: 'double_tap', label: 'ダブルタップ', type: 'boolean', group: '機能' },
  { key: 'sleep_tracking', label: '睡眠トラッキング', type: 'boolean', group: '機能' },
  { key: 'altimeter', label: '高度計', type: 'boolean', group: '機能' },
  { key: 'blood_pressure', label: '血圧測定', type: 'boolean', group: '機能' },
  { key: 'sleep_score', label: '睡眠スコア', type: 'boolean', group: '機能' },
  // アクセサリ
  { key: 'accessory_case', label: 'ケース型番', type: 'text', group: 'アクセサリ' },
  { key: 'accessory_film', label: 'フィルム型番', type: 'text', group: 'アクセサリ' },
]

// --------------------------------------------------
// AirPods（BaseProductModel を使わない独自構造）
// --------------------------------------------------

const AIRPODS_FIELDS: FieldDef[] = [
  { key: 'name', label: '製品名', type: 'text', required: true, group: '基本情報' },
  { key: 'slug', label: 'スラッグ', type: 'text', required: true, group: '基本情報' },
  { key: 'model', label: 'モデル番号', type: 'text', group: '基本情報' },
  { key: 'image', label: '画像ファイル名', type: 'text', group: '基本情報' },
  { key: 'date', label: '発売日', type: 'text', group: '基本情報' },
  { key: 'type', label: 'タイプ', type: 'text', placeholder: 'in-ear / over-ear', group: '基本情報' },
  { key: 'chip', label: 'チップ', type: 'text', group: '基本情報' },
  { key: 'battery_earphone', label: 'バッテリー(イヤホン)', type: 'text', group: '基本情報' },
  { key: 'battery_case', label: 'バッテリー(ケース)', type: 'text', group: '基本情報' },
  { key: 'port', label: 'ポート', type: 'text', group: '基本情報' },
  { key: 'fit', label: '装着方式', type: 'text', group: '基本情報' },
  { key: 'control', label: '操作方式', type: 'text', group: '基本情報' },
  { key: 'waterproof', label: '防水性能', type: 'text', group: '基本情報' },
  { key: 'official', label: 'Apple公式価格', type: 'text', group: '基本情報' },
  // 機能フラグ
  { key: 'spatial_audio', label: '空間オーディオ', type: 'boolean', group: '機能' },
  { key: 'magsafe', label: 'MagSafe', type: 'boolean', group: '機能' },
  { key: 'qi_charge', label: 'Qi充電', type: 'boolean', group: '機能' },
  { key: 'anc', label: 'ノイズキャンセリング', type: 'boolean', group: '機能' },
  { key: 'adaptive_audio', label: 'アダプティブオーディオ', type: 'boolean', group: '機能' },
  // その他
  { key: 'point', label: 'ポイント・特徴', type: 'textarea', group: 'その他' },
]

// --------------------------------------------------
// iPad アクセサリ（Apple Pencil / Magic Keyboard）
// --------------------------------------------------

const ACCESSORY_FIELDS: FieldDef[] = [
  { key: 'name', label: 'アクセサリ名', type: 'text', required: true, group: '基本情報' },
  { key: 'type', label: 'タイプ', type: 'select', required: true, options: [
    { value: 'pencil', label: 'Apple Pencil' },
    { value: 'keyboard', label: 'キーボード' },
  ], group: '基本情報' },
  { key: 'image', label: '画像ファイル名', type: 'text', group: '基本情報' },
  { key: 'model_number', label: '型番', type: 'text', placeholder: 'MK0C2J/A', group: '基本情報' },
  { key: 'release_date', label: '発売日', type: 'text', placeholder: '2018-11-07', group: '基本情報' },
  { key: 'display_order', label: '表示順', type: 'number', required: true, placeholder: '1, 2, 3...', group: '基本情報' },
  { key: 'iosys_url', label: 'イオシス URL', type: 'text', group: 'ショップURL' },
  { key: 'amazon_url', label: 'Amazon URL', type: 'text', group: 'ショップURL' },
  { key: 'mercari_url', label: 'メルカリ URL', type: 'text', group: 'ショップURL' },
]

// --------------------------------------------------
// カテゴリ一覧
// --------------------------------------------------

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'iphone',
    table: 'iphone_models',
    label: 'iPhone',
    icon: 'fa-mobile-screen',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: IPHONE_FIELDS,
    productType: 'iphone',
  },
  {
    key: 'ipad',
    table: 'ipad_models',
    label: 'iPad',
    icon: 'fa-tablet-screen-button',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: IPAD_FIELDS,
    productType: 'ipad',
  },
  {
    key: 'macbook',
    table: 'macbook_models',
    label: 'MacBook',
    icon: 'fa-laptop',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: MACBOOK_FIELDS,
    productType: 'macbook',
  },
  {
    key: 'watch',
    table: 'watch_models',
    label: 'Apple Watch',
    icon: 'fa-clock',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: WATCH_FIELDS,
    productType: 'watch',
  },
  {
    key: 'airpods',
    table: 'airpods_models',
    label: 'AirPods',
    icon: 'fa-headphones',
    listColumns: ['id', 'name', 'slug', 'date', 'chip'],
    fields: AIRPODS_FIELDS,
    productType: 'airpods',
  },
  {
    key: 'ipad-accessories',
    table: 'ipad_accessories',
    label: 'iPadアクセサリ',
    icon: 'fa-pen-nib',
    listColumns: ['id', 'name', 'type', 'display_order'],
    fields: ACCESSORY_FIELDS,
  },
]

export function getCategoryByKey(key: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.key === key)
}
