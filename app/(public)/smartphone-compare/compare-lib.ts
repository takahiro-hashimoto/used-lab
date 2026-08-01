import type { IPhoneModel, PixelModel, GalaxyModel } from '@/lib/types'
import { repPrice, antutuFromParts } from './lib'

/** 価格ログの最安3店舗（repPrice が参照する形） */
type PriceLike = { iosys_min: number | null; geo_min: number | null; janpara_min: number | null }

// ============================================================
// 2機種スペック比較ツール（DualCompareBase）用の横断モデル
// iPhone / Pixel / Galaxy を1つの共通形に落とし込む。
// 一覧表（lib.ts の NormalizedPhone）とは別物で、こちらは
// DualCompare の「機種=列 / スペック=行」マトリクス表示に必要な
// 生スペック文字列をそのまま持つ。無い項目は null 安全に扱う。
// ============================================================

/**
 * 3ブランドで id が重複するため、DualCompareBase の select value / find が
 * 衝突しないよう一意 id を付与する。復元不要（表示にしか使わない）。
 */
const ID_OFFSET = { iphone: 0, pixel: 100_000, galaxy: 200_000 } as const

export type CrossCompareModel = {
  // --- DualCompareModel 互換の必須フィールド ---
  id: number
  model: string
  slug: string
  /** DualCompareBase の imagePath フォールバックは使わないので常に null。表示は imageSrc が担う */
  image: string | null
  // --- per-model 表示制御（DualCompareBase が優先解決） ---
  imageSrc: string | null
  detailHref: string
  iosysUrl: string | null
  // --- 横断共通スペック（生値。無いブランドは null） ---
  size: string | null
  weight: string | null
  cpu: string | null
  ram: string | null
  strage: string | null
  color: string | null
  battery: string | null
  battery_life: string | null
  wired_charging: string | null
  wireless_charging: string | null
  reverse_charging: boolean
  display: string | null
  resolution: string | null
  refresh_rate: string | null
  water_resistance: string | null
  felica: boolean
  sim: string | null
  main_camera: string | null
  ultrawide_camera: string | null
  tele_camera: string | null
  optical_zoom: string | null
  front_camera: string | null
  date: string | null
  port: string | null
  /** サポート終了予定 "YYYY-MM"（iPhone は該当カラム無 → null） */
  support_until: string | null
  // --- 価格・ベンチマーク ---
  /** 代表中古価格（3店舗最安の非null最小）。相場が無ければ null */
  price: number | null
  antutuTotal: number | null
  scoreSingle: number | null
  scoreMulti: number | null
}

/** iPhone → CrossCompareModel。iPhone に無いフィールドは null / 既定値で埋める */
export function toCrossFromIPhones(
  models: IPhoneModel[],
  iosysMap: Record<number, string> = {},
  priceMap: Record<number, PriceLike> = {},
): CrossCompareModel[] {
  return models.map((m) => ({
    id: m.id + ID_OFFSET.iphone,
    model: m.model,
    slug: m.slug,
    image: null,
    imageSrc: m.image ? `/images/iphone/${m.image}` : null,
    detailHref: `/iphone/${m.slug}/`,
    iosysUrl: iosysMap[m.id] ?? null,
    size: m.size,
    weight: m.weight,
    cpu: m.cpu,
    ram: m.ram,
    strage: m.strage,
    color: m.color,
    battery: m.battery,
    battery_life: null, // iPhone は公称駆動時間カラム無
    wired_charging: null,
    wireless_charging: null,
    reverse_charging: false, // iPhone はリバース給電非対応
    display: m.display,
    resolution: m.resolution,
    refresh_rate: null, // iPhone は refresh_rate カラム無（ProMotion は promotion フラグ）
    water_resistance: null, // iPhone は water_resistance カラム無
    felica: true, // 日本版 iPhone は Apple Pay(FeliCa) 対応
    sim: m.sim,
    main_camera: m.image_sensor, // iPhone はメインセンサー情報を流用
    ultrawide_camera: null,
    tele_camera: null,
    optical_zoom: null,
    front_camera: m.front_camera,
    date: m.date,
    port: m.port,
    support_until: null,
    price: repPrice(priceMap[m.id]),
    antutuTotal: antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
    scoreSingle: m.score_single,
    scoreMulti: m.score_multi,
  }))
}

/** Pixel → CrossCompareModel */
export function toCrossFromPixels(
  models: PixelModel[],
  iosysMap: Record<number, string> = {},
  priceMap: Record<number, PriceLike> = {},
): CrossCompareModel[] {
  return models.map((m) => ({
    id: m.id + ID_OFFSET.pixel,
    model: m.model,
    slug: m.slug,
    image: null,
    imageSrc: m.image ? `/images/pixel/${m.image}` : null,
    detailHref: `/pixel/${m.slug}/`,
    iosysUrl: iosysMap[m.id] ?? null,
    size: m.size,
    weight: m.weight,
    cpu: m.cpu,
    ram: m.ram,
    strage: m.strage,
    color: m.color,
    battery: m.battery,
    battery_life: m.battery_life,
    wired_charging: m.wired_charging,
    wireless_charging: m.wireless_charging,
    reverse_charging: m.reverse_charging,
    display: m.display,
    resolution: m.resolution,
    refresh_rate: m.refresh_rate,
    water_resistance: m.water_resistance,
    felica: m.felica,
    sim: m.sim,
    main_camera: m.main_camera,
    ultrawide_camera: m.ultrawide_camera,
    tele_camera: m.tele_camera,
    optical_zoom: m.optical_zoom,
    front_camera: m.front_camera,
    date: m.date,
    port: m.port,
    support_until: m.support_until,
    price: repPrice(priceMap[m.id]),
    antutuTotal: m.antutu_total ?? antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
    scoreSingle: m.score_single,
    scoreMulti: m.score_multi,
  }))
}

/** Galaxy → CrossCompareModel */
export function toCrossFromGalaxies(
  models: GalaxyModel[],
  iosysMap: Record<number, string> = {},
  priceMap: Record<number, PriceLike> = {},
): CrossCompareModel[] {
  return models.map((m) => ({
    id: m.id + ID_OFFSET.galaxy,
    model: m.model,
    slug: m.slug,
    image: null,
    imageSrc: m.image ? `/images/galaxy/${m.image}` : null,
    detailHref: `/galaxy/${m.slug}/`,
    iosysUrl: iosysMap[m.id] ?? null,
    size: m.size,
    weight: m.weight,
    cpu: m.cpu,
    ram: m.ram,
    strage: m.strage,
    color: m.color,
    battery: m.battery,
    battery_life: m.battery_life,
    wired_charging: m.wired_charging,
    wireless_charging: m.wireless_charging,
    reverse_charging: m.reverse_charging,
    display: m.display,
    resolution: m.resolution,
    refresh_rate: m.refresh_rate,
    water_resistance: m.water_resistance,
    felica: m.felica,
    sim: m.sim,
    main_camera: m.main_camera,
    ultrawide_camera: m.ultrawide_camera,
    tele_camera: m.tele_camera,
    optical_zoom: m.optical_zoom,
    front_camera: m.front_camera,
    date: m.date,
    port: m.port,
    support_until: m.support_until,
    price: repPrice(priceMap[m.id]),
    antutuTotal: m.antutu_total ?? antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
    scoreSingle: m.score_single,
    scoreMulti: m.score_multi,
  }))
}
