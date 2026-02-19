export interface IPhoneModel {
  id: number
  model: string
  slug: string
  show: number
  image: string | null
  date: string | null
  strage: string | null
  color: string | null
  cpu: string | null
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
  battery: string | null
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
  point: string | null
  advance: AdvanceData | null
  official: string | null
  accessory_case: string | null
  accessory_film: string | null
  price: Record<string, unknown> | null
}

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
  point: string | null
}

export interface ProductShopLink {
  product_type: string
  product_id: number
  shop_id: number
  url: string
}

export interface IPhonePriceLog {
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
  daione: 15,
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
