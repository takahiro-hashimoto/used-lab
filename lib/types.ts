export interface AdvanceData {
  all_models?: {
    description: string
    features: string[]
  }
  standard_only?: {
    description: string
    features: string[]
  }
  pro_only?: {
    description: string
    features: string[]
  }
}

/** 全製品共通のベースモデル */
export interface BaseProductModel {
  id: number
  model: string
  slug: string
  show: number
  image: string | null
  date: string | null
  cpu: string | null
  battery: string | null
  point: string | null
  advance: AdvanceData | null
  official: string | null
}

/** 標準3店舗(イオシス・ゲオ・じゃんぱら)の価格ログ */
export interface BasePriceLog {
  id: number
  logged_at: string
  model_id: number
  model_name: string | null
  storage: string | null
  iosys_min: number | null
  iosys_max: number | null
  geo_min: number | null
  geo_max: number | null
  janpara_min: number | null
  janpara_max: number | null
  // --- 以下は 2026-07-30 の取得分から記録。それ以前のログでは NULL ---
  /** 相場算出に使用した該当商品数（流通量の目安） */
  iosys_count?: number | null
  geo_count?: number | null
  janpara_count?: number | null
  /** 相場算出に使用した全商品の価格（昇順・円）。中央値・分布の算出に使う */
  iosys_prices?: number[] | null
  geo_prices?: number[] | null
  janpara_prices?: number[] | null
}

export interface IPhoneModel extends BaseProductModel {
  strage: string | null
  color: string | null
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  ram: string | null
  apple_intelligence: boolean
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  video: string | null
  streaming: string | null
  audio: string | null
  port: string | null
  certification: string | null
  sim: string | null
  front_camera: string | null
  image_sensor: string | null
  in_camera: string | null
  photography_style: boolean
  portrait_mode: boolean
  action_mode: boolean
  cinematic_mode: boolean
  macro_mode: boolean
  night_mode: boolean
  apple_proraw: boolean
  apple_prores: boolean
  magsafe: boolean
  dynamic_island: boolean
  accident_detection: boolean
  promotion: boolean
  lidar: boolean
  action_button: boolean
  camera_control: boolean
  centerframe: boolean
  accessory_case: string | null
  accessory_film: string | null
  price: Record<string, unknown> | null
  last_ios: string | null
}

/**
 * Google Pixel モデル（pixel_models テーブル）
 * iPhoneModel を Android/Tensor 向けに再設計したもの。
 * iOS 固有カラム（dynamic_island / magsafe / apple_intelligence 等）は持たず、
 * Pixel 固有（Tensor世代・FeliCa・消しゴムマジック等のAI機能・7年サポート）に置き換えている。
 */
export interface PixelModel extends BaseProductModel {
  // BaseProductModel: id, model, slug, show, image, date, cpu(=Tensorチップ名), battery(=mAh), point, advance, official
  strage: string | null
  color: string | null
  /** Tensor 世代（"G1"〜"G5"）。ベンチマークの世代比較に使用 */
  tensor_gen: string | null
  // ベンチマーク（Geekbench 6 / AnTuTu v11。Metal は Apple 専用のため持たない）
  score_single: number | null
  score_multi: number | null
  antutu_total: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  // スペック
  ram: string | null
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  /** リフレッシュレート "60Hz" / "120Hz (LTPO)" */
  refresh_rate: string | null
  port: string | null
  /** 防水防塵等級 "IP68" */
  water_resistance: string | null
  /** おサイフケータイ(FeliCa)対応 */
  felica: boolean
  sim: string | null
  // バッテリー / 充電
  /** Google公称の通常使用時間 "24時間" */
  battery_life: string | null
  /** スーパーバッテリーセーバー時の最大時間 "72時間" */
  battery_life_saver: string | null
  /** 有線充電 "27W" */
  wired_charging: string | null
  /** ワイヤレス充電 "21W (Pixel Stand) / Qi 12W" */
  wireless_charging: string | null
  /** バッテリーシェア（リバースワイヤレス充電） */
  reverse_charging: boolean
  // カメラ
  main_camera: string | null
  ultrawide_camera: string | null
  /** 望遠カメラ（非搭載なら null） */
  tele_camera: string | null
  front_camera: string | null
  /** 光学ズーム倍率 "5倍"（望遠なしは null） */
  optical_zoom: string | null
  // Pixel/AI 機能（スペック表のチェック用）
  magic_eraser: boolean
  best_take: boolean
  magic_editor: boolean
  night_sight: boolean
  real_tone: boolean
  face_unlock: boolean
  /** 温度センサー（Pixel 8 Pro〜） */
  temp_sensor: boolean
  /** 動画ブースト（Pixel 8 Pro〜） */
  video_boost: boolean
  accessory_case: string | null
  accessory_film: string | null
  price: Record<string, unknown> | null
  // サポート
  /** OS/セキュリティ更新の保証年数（Pixel 6〜7=3、Pixel 8以降=7） */
  update_years: number | null
  /** サポート終了予定 "YYYY-MM" */
  support_until: string | null
  /** サポート終了済みなら最終対応バージョン、現役なら NULL（現役判定の activeField） */
  last_android: string | null
}

export interface PixelPriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
}

/**
 * Samsung Galaxy モデル（galaxy_models テーブル）
 * PixelModel と同じ Android 系設計をベースに、Galaxy 固有
 * （S/A/Zシリーズ・折りたたみのカバー画面・S Pen・Galaxy AI・microSD・日本版型番）を加えたもの。
 * cpu には日本版の実チップ（Snapdragon/Exynos/Dimensity）を格納する。
 */
export interface GalaxyModel extends BaseProductModel {
  // BaseProductModel: id, model, slug, show, image, date, cpu(=SoC名), battery(=mAh), point, advance, official
  strage: string | null
  color: string | null
  /** 'S' | 'A' | 'Z Flip' | 'Z Fold'（スペック表のフィルタ・シリーズ比較に使用） */
  series: string | null
  /** 日本版型番（例 "SC-51D / SCG19"） */
  model_number: string | null
  // ベンチマーク（Geekbench 6 / AnTuTu v11）
  score_single: number | null
  score_multi: number | null
  antutu_total: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  // スペック
  ram: string | null
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  refresh_rate: string | null
  /** 折りたたみのカバー(外側)画面。バー型は null */
  cover_display: string | null
  port: string | null
  water_resistance: string | null
  felica: boolean
  /** microSD 対応（Aシリーズ等で対応） */
  microsd: boolean
  sim: string | null
  // バッテリー / 充電
  battery_life: string | null
  battery_life_saver: string | null
  wired_charging: string | null
  wireless_charging: string | null
  /** Wireless PowerShare（リバースワイヤレス充電） */
  reverse_charging: boolean
  // カメラ
  main_camera: string | null
  ultrawide_camera: string | null
  tele_camera: string | null
  front_camera: string | null
  optical_zoom: string | null
  // Galaxy 機能（スペック表のチェック用）
  galaxy_ai: boolean
  circle_to_search: boolean
  object_eraser: boolean
  night_mode: boolean
  /** S Pen 対応（Ultra / Fold 等） */
  s_pen: boolean
  /** Samsung DeX 対応 */
  dex: boolean
  accessory_case: string | null
  accessory_film: string | null
  price: Record<string, unknown> | null
  // サポート
  update_years: number | null
  support_until: string | null
  last_android: string | null
}

export interface GalaxyPriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
}

// 新shopsテーブル用（shop_key付き）
export interface Shop {
  id: number
  shop_key: string
  shop: string
  image: string | null
  text: string | null
  price: string | null
  stock: string | null
  support: string | null
  extension: string | null
  extension_name: string | null
  extension_link: string | null
  photo: string | null
  battery: string | null
  block: string | null
  postage: string | null
  license: string | null
  url: string | null
  ipad_url: string | null
  watch_url: string | null
  macbook_url: string | null
  /** デスクトップMacの検索URL。NULL のショップは macbook_url を使う */
  mac_url: string | null
  airpods_url: string | null
  pixel_url: string | null
  galaxy_url: string | null
  point: string | null
}

export interface ProductShopLink {
  product_type: string
  product_id: number
  shop_id: number
  url: string
}

/** 追従CTA（StickyCta）の表示モード */
export type StickyCtaMode = 'normal' | 'special'

/** サイト共通設定（site_config テーブル・単一行 id=1） */
export interface SiteConfig {
  id: number
  sticky_cta_mode: StickyCtaMode
  special_cta_headline: string | null
  special_cta_label: string | null
  special_cta_url: string | null
  /** 特殊バナーの表示開始日時（ISO文字列 / NULL=制限なし） */
  special_start_at?: string | null
  /** 特殊バナーの表示終了日時（ISO文字列 / NULL=制限なし） */
  special_end_at?: string | null
  updated_at?: string
}

export interface FallbackShop {
  shop_id: number
  url: string
  shopName: string
}

export interface IPhonePriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
}

// shop_key → shop_id マッピング
export const SHOP_KEY_TO_ID: Record<string, number> = {
  iosys: 1,
  nicosma: 2,
  geo: 3,
  recore: 4,
  prodig: 5,
  janpara: 6,
  amazon: 7,
  rakuten: 8,
  yahoo: 9,
  apple: 10,
  mercari: 11,
  rakuma: 12,
  mmoba: 13,
  carrier: 14,
  daione: 15,
  eearphone: 16,
}

export interface IPadModel extends BaseProductModel {
  strage: string | null
  color: string | null
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
  ram: string | null
  apple_intelligence: boolean
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  port: string | null
  certification: string | null
  sim: string | null
  front_camera: string | null
  in_camera: string | null
  center_frame: boolean
  promotion: boolean
  lidar: boolean
  speaker: string | null
  pencil?: string | null   // ipad_accessoriesテーブルから導出（DBカラム廃止済み）
  keyboard?: string | null // ipad_accessoriesテーブルから導出（DBカラム廃止済み）
  display_type: string | null
  accessory_case: string | null
  accessory_film: string | null
  last_ipados: string | null
}

/** iPad アクセサリマスタ */
export interface IPadAccessory {
  id: number
  name: string
  type: 'pencil' | 'keyboard'
  image: string | null
  model_number: string | null
  release_date: string | null
  iosys_url: string | null
  amazon_url: string | null
  mercari_url: string | null
  display_order: number
}

/** iPad アクセサリ対応関係 */
export interface IPadAccessoryCompatibility {
  id: number
  ipad_model_id: number
  accessory_id: number
}

export interface IPadPriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
}

export interface WatchModel extends BaseProductModel {
  size: string | null
  strage: string | null
  material: string | null
  water_resistance: string | null
  always_on_display: boolean
  fast_charge: boolean
  blood_oxygen: boolean
  cardiogram: boolean
  accident_detection: boolean
  fall_detection: boolean
  skin_temperature: boolean
  japanese_input: boolean
  double_tap: boolean
  sleep_tracking: boolean
  altimeter: boolean
  blood_pressure: boolean
  sleep_score: boolean
  max_brightness: string | null
  accessory_case: string | null
  accessory_film: string | null
  last_watchos: string | null
}

export interface WatchPriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
}

export interface MacBookModel extends BaseProductModel {
  shortname: string | null
  strage: string | null
  color: string | null
  apple_intelligence: boolean
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
  ram: string | null
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  luminance: string | null
  port: string | null
  hdmi: boolean
  slot: boolean
  magsafe: boolean
  camera: string | null
  speaker: string | null
  promotion: boolean
  fan: boolean
  center_frame: boolean
  external_display: string | null
  accessory_case: string | null
  accessory_film: string | null
  last_macos: string | null
  benchmarks: Record<string, { single: number; multi: number; metal: number }> | null
}

/**
 * デスクトップMac（iMac / Mac mini / Mac Studio）。
 *
 * BaseProductModel を継承しないのは battery を持たないため（AirPodsModel と同じ判断）。
 * MacBookModel とテーブルを分けている理由は sql/mac_setup_all.sql の冒頭を参照。
 */
export interface MacModel {
  id: number
  model: string
  shortname: string | null
  slug: string
  show: number
  image: string | null
  date: string | null
  device_type: MacDeviceType
  strage: string | null
  ram: string | null
  color: string | null
  cpu: string | null
  gpu: string | null
  apple_intelligence: boolean
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
  benchmarks: Record<string, { single: number; multi: number; metal: number }> | null
  /** ディスプレイ内蔵か。iMac と mini/Studio を分ける最大の比較軸 */
  display_builtin: boolean
  display: string | null
  resolution: string | null
  luminance: string | null
  /** ポートの全文。個別機種ページのスペック表で使う */
  port: string | null
  // ポートは「種類ごとに何基あるか」だけを持つ。前面/背面は比較に使わないので持たない
  /** Thunderbolt の本数。例 '3基' */
  thunderbolt: string | null
  /** Thunderbolt の規格。例 'Thunderbolt 5' */
  thunderbolt_gen: string | null
  /** Thunderbolt 以外の USB-C の本数。null は非搭載 */
  usb_c: string | null
  /** USB-A の本数。null は非搭載（iMac 全世代と Mac mini 2024） */
  usb_a: string | null
  /** 3.5mm ヘッドフォンジャックの有無 */
  headphone: boolean
  hdmi: boolean
  /** SDXCカードスロット */
  slot: boolean
  ethernet: string | null
  external_display: string | null
  camera: string | null
  speaker: string | null
  /** Magic Keyboard / Mouse 等の同梱物。mini との実質価格差の説明に使う */
  included_accessories: string | null
  size: string | null
  last_macos: string | null
  point: string | null
  advance: AdvanceData | null
  official: string | null
}

export type MacDeviceType = 'imac' | 'mac-mini' | 'mac-studio'

/** mac_price_logs。MacBookPriceLog と同一スキーマ（全ショップ横断 min1..max5） */
export type MacPriceLog = MacBookPriceLog

export interface MacBookPriceLog {
  id: number
  logged_at: string
  model_id: number
  model_name: string | null
  storage: string | null
  min1_price: number | null
  min1_item_name: string | null
  min1_shop_name: string | null
  min2_price: number | null
  min2_item_name: string | null
  min2_shop_name: string | null
  min3_price: number | null
  min3_item_name: string | null
  min3_shop_name: string | null
  min4_price: number | null
  min4_item_name: string | null
  min4_shop_name: string | null
  min5_price: number | null
  min5_item_name: string | null
  min5_shop_name: string | null
  max1_price: number | null
  max1_item_name: string | null
  max1_shop_name: string | null
  max2_price: number | null
  max2_item_name: string | null
  max2_shop_name: string | null
  max3_price: number | null
  max3_item_name: string | null
  max3_shop_name: string | null
  max4_price: number | null
  max4_item_name: string | null
  max4_shop_name: string | null
  max5_price: number | null
  max5_item_name: string | null
  max5_shop_name: string | null
  // --- 以下は 2026-07-30 の取得分から記録。それ以前のログでは NULL ---
  /** 相場算出に使用した該当商品数（全ショップ横断） */
  matched_count?: number | null
  /** 相場算出に使用した全商品の価格（昇順・円、全ショップ横断） */
  matched_prices?: number[] | null
}

export interface AirPodsModel {
  id: number
  name: string
  slug: string
  model: string | null
  show: number
  image: string | null
  date: string | null
  type: string | null
  chip: string | null
  battery_earphone: string | null
  battery_case: string | null
  port: string | null
  fit: string | null
  control: string | null
  spatial_audio: boolean
  magsafe: boolean
  qi_charge: boolean
  waterproof: string | null
  anc: boolean
  adaptive_audio: boolean
  point: string | null
  official: string | null
}

export interface AirPodsPriceLog {
  id: number
  logged_at: string
  model_id: number
  model_name: string | null
  iosys_min: number | null
  iosys_max: number | null
  janpara_min: number | null
  janpara_max: number | null
  eearphone_min: number | null
  eearphone_max: number | null
  // --- 以下は 2026-07-30 の取得分から記録。それ以前のログでは NULL ---
  iosys_count?: number | null
  janpara_count?: number | null
  eearphone_count?: number | null
  iosys_prices?: number[] | null
  janpara_prices?: number[] | null
  eearphone_prices?: number[] | null
}



// IPhoneShop（後方互換用）
export interface IPhoneShop {
  id: number
  shop: string
  image: string | null
  text: string | null
  price: string | null
  stock: string | null
  support: string | null
  extension: string | null
  extension_name: string | null
  extension_link: string | null
  photo: string | null
  battery: string | null
  block: string | null
  postage: string | null
  license: string | null
  url: string | null
  point: string | null
}

// ショップキーとショップIDのマッピング（後方互換用）
export const SHOP_KEY_MAP: Record<string, number> = {
  link_iosys: 1,
  link_nicosma: 2,
  link_geo: 3,
  link_recore: 4,
  link_prodig: 5,
  link_janpara: 6,
  link_amazon: 7,
  link_rakuten: 8,
  link_yahoo: 9,
  link_apple: 10,
  link_mercari: 11,
  link_rakuma: 12,
  link_mmoba: 13,
}

/** レビュー記事リンク（iPad / iPhone 共通） */
export interface ProductReview {
  id: number
  model_slug: string
  url: string
  site_name: string
  title: string
}
