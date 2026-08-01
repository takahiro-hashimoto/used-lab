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
  { key: 'score_single', label: 'Geekbench Single（代表値）', type: 'number', group: 'ベンチマーク' },
  { key: 'score_multi', label: 'Geekbench Multi（代表値）', type: 'number', group: 'ベンチマーク' },
  { key: 'score_metal', label: 'Geekbench Metal（代表値）', type: 'number', group: 'ベンチマーク' },
  { key: 'benchmarks', label: 'チップ別ベンチマーク (JSON)', type: 'json', placeholder: '{"M2 Pro":{"single":2656,"multi":14456,"metal":78225}}', group: 'ベンチマーク' },
  { key: 'ram', label: 'RAM', type: 'text', group: 'ベンチマーク' },
  // ディスプレイ・筐体
  { key: 'size', label: 'サイズ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'luminance', label: '輝度', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'external_display', label: '外部ディスプレイ', type: 'text', group: 'ディスプレイ・筐体' },
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
  { key: 'sleep_tracking', label: '睡眠時無呼吸の通知', type: 'boolean', group: '機能' },
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
// Android 共通（BASE_FIELDS は official が「Apple公式価格」なので別に持つ）
// --------------------------------------------------

const ANDROID_BASE_FIELDS: FieldDef[] = [
  { key: 'model', label: 'モデル名', type: 'text', required: true, group: '基本情報' },
  { key: 'slug', label: 'スラッグ', type: 'text', required: true, placeholder: 'e.g. galaxy-s25-ultra', group: '基本情報' },
  { key: 'image', label: '画像ファイル名', type: 'text', placeholder: 'model-name.webp', group: '基本情報' },
  { key: 'date', label: '発売日', type: 'text', placeholder: '2025/2/14', group: '基本情報' },
  { key: 'cpu', label: 'SoC', type: 'text', placeholder: 'Snapdragon 8 Elite for Galaxy', group: '基本情報' },
  { key: 'battery', label: 'バッテリー容量', type: 'text', placeholder: '5000mAh', group: '基本情報' },
  { key: 'strage', label: 'ストレージ', type: 'text', placeholder: '256GB / 512GB', group: '基本情報' },
  { key: 'color', label: 'カラー', type: 'text', group: '基本情報' },
  { key: 'official', label: '公式価格', type: 'text', group: '基本情報' },
  { key: 'price', label: '価格', type: 'text', group: '基本情報' },
]

// AnTuTu は total = cpu + gpu + mem + ux を必ず維持すること（内訳バーの表示が壊れる）
const ANDROID_BENCH_FIELDS: FieldDef[] = [
  { key: 'score_single', label: 'Geekbench Single', type: 'number', group: 'ベンチマーク' },
  { key: 'score_multi', label: 'Geekbench Multi', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_total', label: 'AnTuTu 合計 ※CPU+GPU+MEM+UX と一致させること', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_cpu', label: 'AnTuTu CPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_gpu', label: 'AnTuTu GPU', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_mem', label: 'AnTuTu MEM', type: 'number', group: 'ベンチマーク' },
  { key: 'antutu_ux', label: 'AnTuTu UX', type: 'number', group: 'ベンチマーク' },
  { key: 'ram', label: 'RAM', type: 'text', placeholder: '12GB', group: 'ベンチマーク' },
]

const ANDROID_CAMERA_FIELDS: FieldDef[] = [
  { key: 'main_camera', label: 'メインカメラ', type: 'text', placeholder: '50MP (広角)', group: 'カメラ' },
  { key: 'ultrawide_camera', label: '超広角カメラ', type: 'text', group: 'カメラ' },
  { key: 'tele_camera', label: '望遠カメラ', type: 'text', group: 'カメラ' },
  { key: 'front_camera', label: 'フロントカメラ', type: 'text', group: 'カメラ' },
  { key: 'optical_zoom', label: '光学ズーム', type: 'text', placeholder: '5倍(光学)', group: 'カメラ' },
]

const ANDROID_CHARGE_FIELDS: FieldDef[] = [
  { key: 'battery_life', label: '電池持ち', type: 'text', placeholder: '24時間以上', group: '充電・バッテリー' },
  { key: 'battery_life_saver', label: '省電力モード時', type: 'text', placeholder: '最大100時間', group: '充電・バッテリー' },
  { key: 'wired_charging', label: '有線充電', type: 'text', placeholder: '45W', group: '充電・バッテリー' },
  { key: 'wireless_charging', label: 'ワイヤレス充電', type: 'text', placeholder: '15W (Qi)', group: '充電・バッテリー' },
  { key: 'reverse_charging', label: 'リバース充電', type: 'boolean', group: '充電・バッテリー' },
]

const ANDROID_ACCESSORY_FIELDS: FieldDef[] = [
  { key: 'accessory_case', label: 'ケース型番', type: 'text', group: 'アクセサリ' },
  { key: 'accessory_film', label: 'フィルム型番', type: 'text', group: 'アクセサリ' },
  { key: 'point', label: 'ポイント・特徴', type: 'textarea', group: 'その他' },
  { key: 'advance', label: '進化ポイント (JSON)', type: 'json', group: 'その他' },
]

// --------------------------------------------------
// Google Pixel
// --------------------------------------------------

const PIXEL_FIELDS: FieldDef[] = [
  ...ANDROID_BASE_FIELDS,
  {
    key: 'tensor_gen', label: 'Tensor世代', type: 'select', group: '基本情報',
    options: ['G1', 'G2', 'G3', 'G4', 'G5'].map((v) => ({ value: v, label: v })),
  },
  ...ANDROID_BENCH_FIELDS,
  { key: 'size', label: '本体サイズ', type: 'text', placeholder: '152.8 × 72.0 × 8.5mm', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', placeholder: '198g', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', placeholder: '6.3インチ OLED', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', placeholder: '2,424 x 1,080', group: 'ディスプレイ・筐体' },
  { key: 'refresh_rate', label: 'リフレッシュレート', type: 'text', placeholder: '120Hz', group: 'ディスプレイ・筐体' },
  { key: 'water_resistance', label: '防水防塵', type: 'text', placeholder: 'IP68', group: 'ディスプレイ・筐体' },
  ...ANDROID_CAMERA_FIELDS,
  ...ANDROID_CHARGE_FIELDS,
  { key: 'port', label: '端子', type: 'text', placeholder: 'USB-C', group: '接続・その他' },
  { key: 'sim', label: 'SIM', type: 'text', placeholder: 'nanoSIM / eSIM', group: '接続・その他' },
  { key: 'felica', label: 'おサイフケータイ', type: 'boolean', group: '接続・その他' },
  { key: 'update_years', label: 'アップデート保証年数', type: 'number', group: '接続・その他' },
  { key: 'support_until', label: 'サポート期限', type: 'text', placeholder: '2031-08', group: '接続・その他' },
  { key: 'last_android', label: '最終対応Android', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'magic_eraser', label: '消しゴムマジック', type: 'boolean', group: '機能' },
  { key: 'best_take', label: 'ベストテイク', type: 'boolean', group: '機能' },
  { key: 'magic_editor', label: '編集マジック', type: 'boolean', group: '機能' },
  { key: 'night_sight', label: '夜景モード', type: 'boolean', group: '機能' },
  { key: 'real_tone', label: 'リアルトーン', type: 'boolean', group: '機能' },
  { key: 'face_unlock', label: '顔認証', type: 'boolean', group: '機能' },
  { key: 'temp_sensor', label: '温度センサー', type: 'boolean', group: '機能' },
  { key: 'video_boost', label: '動画ブースト', type: 'boolean', group: '機能' },
  ...ANDROID_ACCESSORY_FIELDS,
]

// --------------------------------------------------
// Samsung Galaxy
// --------------------------------------------------

const GALAXY_FIELDS: FieldDef[] = [
  ...ANDROID_BASE_FIELDS,
  {
    key: 'series', label: 'シリーズ', type: 'select', group: '基本情報',
    options: ['S', 'A', 'Z Flip', 'Z Fold'].map((v) => ({ value: v, label: v })),
  },
  { key: 'model_number', label: '日本版型番', type: 'text', placeholder: 'SC-51F / SCG31', group: '基本情報' },
  ...ANDROID_BENCH_FIELDS,
  { key: 'size', label: '本体サイズ', type: 'text', placeholder: '163 × 78 × 8.2mm', group: 'ディスプレイ・筐体' },
  { key: 'weight', label: '重量', type: 'text', placeholder: '218g', group: 'ディスプレイ・筐体' },
  { key: 'display', label: 'ディスプレイ', type: 'text', placeholder: '6.9インチ Dynamic AMOLED 2X', group: 'ディスプレイ・筐体' },
  { key: 'resolution', label: '解像度', type: 'text', placeholder: '3,120 x 1,440', group: 'ディスプレイ・筐体' },
  { key: 'refresh_rate', label: 'リフレッシュレート', type: 'text', placeholder: '120Hz (LTPO)', group: 'ディスプレイ・筐体' },
  { key: 'cover_display', label: 'カバーディスプレイ（折りたたみ）', type: 'text', group: 'ディスプレイ・筐体' },
  { key: 'water_resistance', label: '防水防塵', type: 'text', placeholder: 'IP68', group: 'ディスプレイ・筐体' },
  ...ANDROID_CAMERA_FIELDS,
  ...ANDROID_CHARGE_FIELDS,
  { key: 'port', label: '端子', type: 'text', placeholder: 'USB-C', group: '接続・その他' },
  { key: 'sim', label: 'SIM', type: 'text', placeholder: 'nanoSIM / eSIM', group: '接続・その他' },
  { key: 'felica', label: 'おサイフケータイ', type: 'boolean', group: '接続・その他' },
  { key: 'microsd', label: 'microSD', type: 'boolean', group: '接続・その他' },
  { key: 'update_years', label: 'アップデート保証年数', type: 'number', group: '接続・その他' },
  { key: 'support_until', label: 'サポート期限', type: 'text', placeholder: '2032-02', group: '接続・その他' },
  { key: 'last_android', label: '最終対応Android', type: 'text', group: '接続・その他' },
  // 機能フラグ
  { key: 'galaxy_ai', label: 'Galaxy AI', type: 'boolean', group: '機能' },
  { key: 'circle_to_search', label: 'かこって検索', type: 'boolean', group: '機能' },
  { key: 'object_eraser', label: 'オブジェクト消去', type: 'boolean', group: '機能' },
  { key: 'night_mode', label: 'ナイトモード', type: 'boolean', group: '機能' },
  { key: 's_pen', label: 'S Pen対応', type: 'boolean', group: '機能' },
  { key: 'dex', label: 'Samsung DeX', type: 'boolean', group: '機能' },
  ...ANDROID_ACCESSORY_FIELDS,
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
    key: 'pixel',
    table: 'pixel_models',
    label: 'Google Pixel',
    icon: 'fa-mobile-screen',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: PIXEL_FIELDS,
    productType: 'pixel',
  },
  {
    key: 'galaxy',
    table: 'galaxy_models',
    label: 'Samsung Galaxy',
    icon: 'fa-mobile-screen',
    listColumns: ['id', 'model', 'slug', 'date', 'cpu'],
    fields: GALAXY_FIELDS,
    productType: 'galaxy',
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

// カテゴリごとに管理画面で表示するショップID
// ID対応: 1=iosys 2=nicosma 3=geo 4=recore 5=prodig 6=janpara 7=amazon
//         8=rakuten 9=yahoo 10=apple 11=mercari 12=rakuma 13=mmoba 14=carrier
//         15=daione 16=eearphone
export const CATEGORY_SHOP_IDS: Record<string, number[]> = {
  iphone:  [1, 2, 3, 4, 6, 7, 8, 9, 11, 13, 14],
  // Pixel / Galaxy は shops.pixel_url / galaxy_url を持つ7店舗のみ
  pixel:   [1, 2, 3, 4, 6, 8, 9],
  galaxy:  [1, 2, 3, 4, 6, 8, 9],
  ipad:    [1, 2, 3, 4, 6, 7, 8, 9, 11, 13, 14],
  macbook: [1, 3, 4, 6, 7, 8, 9, 13],
  watch:   [1, 2, 3, 4, 6, 7, 8, 9, 11, 13, 14],
  airpods: [1, 3, 6, 7, 9, 11, 16],
}
