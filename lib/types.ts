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
  airpods_url: string | null
  point: string | null
}

export interface ProductShopLink {
  product_type: string
  product_id: number
  shop_id: number
  url: string
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
  accessory_case: string | null
  accessory_film: string | null
  last_macos: string | null
}

export interface MacBookPriceLog extends BasePriceLog {
  iosys_min_text: string | null
  iosys_max_text: string | null
  geo_min_text: string | null
  geo_max_text: string | null
  janpara_min_text: string | null
  janpara_max_text: string | null
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
}

// MVNO料金プラン
export interface MvnoPlan {
  id: number
  provider_slug: string
  plan_name: string
  data_capacity_gb: number | null
  is_unlimited: boolean
  monthly_price: number
  discounted_price: number | null
  discount_conditions: string | null
  call_included: string | null
  note: string | null
  is_recommended: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface MvnoProvider {
  id: number
  provider_name: string
  provider_slug: string
  official_url: string
  certified_program_name: string | null
  available_iphones: string | null
  used_device_note: string | null
  network_carriers: string | null
  sim_types: string | null
  min_monthly_fee: number | null
  min_monthly_fee_note: string | null
  warranty_days: number | null
  battery_guarantee_percent: number | null
  set_discount_available: boolean
  set_discount_note: string | null
  store_support: boolean
  online_only: boolean
  is_published: boolean
  display_order: number
  last_verified_at: string | null
  created_at: string
  updated_at: string
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
