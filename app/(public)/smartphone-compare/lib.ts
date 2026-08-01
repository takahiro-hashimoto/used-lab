import type {
  IPhoneModel,
  PixelModel,
  GalaxyModel,
  IPhonePriceLog,
  PixelPriceLog,
  GalaxyPriceLog,
} from '@/lib/types'
import { priceStatsOf } from '@/lib/utils/price-stats'

// ============================================================
// ブランド横断の正規化モデル
// iPhone / Pixel / Galaxy を1つの共通形に落とし込む。
// 各テーブルでフィールド名が異なる（antutu_total の有無、
// main_camera vs image_sensor、support_until vs last_ios 等）ため、
// ここで差異を吸収し、無い項目は null 安全に扱う。
// ============================================================

export type Brand = 'iphone' | 'pixel' | 'galaxy'

export type BrandMeta = {
  key: Brand
  label: string
  os: 'iOS' | 'Android'
  /** m-tag の識別アクセント（既存カラートークンを使用） */
  accent: string
  icon: string
}

export const BRAND_META: Record<Brand, BrandMeta> = {
  iphone: { key: 'iphone', label: 'iPhone', os: 'iOS', accent: '#2589d0', icon: 'fa-solid fa-mobile-screen-button' },
  pixel: { key: 'pixel', label: 'Pixel', os: 'Android', accent: '#34a853', icon: 'fa-solid fa-mobile-screen' },
  galaxy: { key: 'galaxy', label: 'Galaxy', os: 'Android', accent: '#7b5cff', icon: 'fa-solid fa-mobile-screen' },
}

export type NormalizedPhone = {
  brand: Brand
  brandLabel: string
  slug: string
  name: string
  /** 代表中古価格（3店舗最安の非null最小）。null は除外対象 */
  price: number
  antutuTotal: number | null
  scoreSingle: number | null
  scoreMulti: number | null
  mainCamera: string | null
  battery: string | null
  batteryMah: number | null
  supportUntil: string | null
  felica: boolean | null
  os: 'iOS' | 'Android'
  chip: string | null
  /** 機種画像の絶対パス。未格納（主にAndroid）は null → プレースホルダ表示 */
  imageSrc: string | null
  /** 発売日の生値（"YYYY/M" 等）。表示時に整形 */
  releaseDate: string | null
  display: string | null
  /** 重量（"172g" 等） */
  weight: string | null
  /** カメラ構成（シングル / デュアル / トリプル） */
  cameraLabel: string | null
  /** 充電ポート表記（USB-C / Lightning） */
  portLabel: string | null
  /** イオシスの機種別アフィリエイトリンク（無ければ null） */
  iosysUrl: string | null
  detailHref: string
}

// ------------------------------------------------------------
// 価格帯バケット
// ------------------------------------------------------------

export type PriceBucket = {
  key: string
  label: string
  hint: string
  min: number
  max: number
}

// 3万円刻みで5分割。中古スマホの実勢価格は3万円ごとに狙える型が入れ替わるため、
// 帯ごとに「その予算で何が買えるか」が読者にとって意味を持つ粒度にしている。
export const PRICE_BUCKETS: PriceBucket[] = [
  { key: 'b1', label: '3万円以下', hint: 'とにかく安く1台', min: 0, max: 29999 },
  { key: 'b2', label: '3〜6万円台', hint: 'ミドルレンジの主戦場', min: 30000, max: 59999 },
  { key: 'b3', label: '6〜9万円台', hint: '型落ちハイエンドが狙える', min: 60000, max: 89999 },
  { key: 'b4', label: '9〜12万円台', hint: '現行ハイエンド', min: 90000, max: 119999 },
  { key: 'b5', label: '12万円以上', hint: '最新フラッグシップ', min: 120000, max: Infinity },
]

export function bucketForPrice(price: number): PriceBucket | null {
  return PRICE_BUCKETS.find((b) => price >= b.min && price <= b.max) ?? null
}

// ------------------------------------------------------------
// フォーマッタ / パーサ
// ------------------------------------------------------------

/** "YYYY-MM" → "〜2031年8月" */
export function formatSupportUntilYm(s: string | null): string | null {
  if (!s) return null
  const [y, m] = s.split('-')
  if (!y) return null
  return m ? `〜${y}年${parseInt(m, 10)}月` : `〜${y}年`
}

/** iPhone は support_until を持たないため発売年+6年で概算（last_ios があれば終了） */
export function estimateIphoneSupport(date: string | null, lastIos: string | null): string | null {
  if (lastIos !== null) return 'サポート終了'
  if (!date) return null
  const year = parseInt(date.split('/')[0], 10)
  if (isNaN(year)) return null
  return `${year + 6}年頃まで`
}

/** "4900mAh" / "4,900 mAh" → 4900 */
export function parseMah(battery: string | null): number | null {
  if (!battery) return null
  const m = battery.replace(/,/g, '').match(/(\d{3,5})\s*mah/i)
  if (m) return parseInt(m[1], 10)
  const n = battery.replace(/,/g, '').match(/(\d{3,5})/)
  return n ? parseInt(n[1], 10) : null
}

/**
 * 代表価格は実勢相場（販売中商品の中央値）。
 * 最安値だと1点限りの特価に引っ張られ、他ページと違う相場を示してしまう。
 * 価格配列の記録がない過去ログだけ従来どおり最安値にフォールバックする。
 */
export function repPrice(log: {
  iosys_min: number | null
  geo_min: number | null
  janpara_min: number | null
  iosys_prices?: number[] | null
  geo_prices?: number[] | null
  janpara_prices?: number[] | null
} | undefined): number | null {
  if (!log) return null
  const median = priceStatsOf(log)?.median
  if (median != null) return median
  const raw = [log.iosys_min, log.geo_min, log.janpara_min]
  const nums = raw
    .map((v) => (v == null ? NaN : Number(v)))
    .filter((v) => Number.isFinite(v) && v > 0)
  return nums.length > 0 ? Math.min(...nums) : null
}

export function antutuFromParts(cpu: number | null, gpu: number | null, mem: number | null, ux: number | null): number | null {
  if (cpu == null || gpu == null || mem == null || ux == null) return null
  return cpu + gpu + mem + ux
}

/** 充電ポート表記を統一（iphone/price-info の portLabel と同挙動） */
function portLabelOf(port: string | null): string | null {
  if (!port) return null
  if (/usb/i.test(port)) return 'USB-C'
  if (/lightning/i.test(port)) return 'Lightning'
  return port
}

/** iPhone: in_camera 文言からカメラ構成を判定（getCameraLabel と同基準） */
function iphoneCameraLabel(inCamera: string | null): string | null {
  if (!inCamera) return null
  if (inCamera.includes('望遠')) return 'トリプル'
  if (inCamera.includes('超広角')) return 'デュアル'
  return 'シングル'
}

/** Android: 背面カメラ本数からカメラ構成を判定 */
function androidCameraLabel(main: string | null, ultra: string | null, tele: string | null): string | null {
  const n = [main, ultra, tele].filter(Boolean).length
  if (n >= 3) return 'トリプル'
  if (n === 2) return 'デュアル'
  if (n === 1) return 'シングル'
  return null
}

/** カード表示用に画面表記をサイズのみへ（"6.2インチ Dynamic AMOLED 2X" → "6.2インチ"）。折返しを防ぎ高さを揃える */
function screenSize(display: string | null): string | null {
  if (!display) return null
  const m = display.match(/[\d.]+\s*インチ/)
  return m ? m[0].replace(/\s+/g, '') : display
}

// ------------------------------------------------------------
// 各ブランド → NormalizedPhone[]（価格が無いモデルは除外）
// ------------------------------------------------------------

export function normalizeIPhones(
  models: IPhoneModel[],
  priceMap: Record<number, IPhonePriceLog>,
  iosysMap: Record<number, string> = {},
): NormalizedPhone[] {
  const out: NormalizedPhone[] = []
  for (const m of models) {
    const price = repPrice(priceMap[m.id])
    if (price == null) continue
    out.push({
      brand: 'iphone',
      brandLabel: BRAND_META.iphone.label,
      slug: m.slug,
      name: m.model,
      price,
      antutuTotal: antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
      scoreSingle: m.score_single,
      scoreMulti: m.score_multi,
      mainCamera: m.image_sensor,
      battery: m.battery,
      batteryMah: parseMah(m.battery),
      supportUntil: estimateIphoneSupport(m.date, m.last_ios),
      // 日本で販売された iPhone は Apple Pay(FeliCa/Suica)に対応
      felica: true,
      os: 'iOS',
      chip: m.cpu,
      imageSrc: m.image ? `/images/iphone/${m.image}` : null,
      releaseDate: m.date,
      display: screenSize(m.display),
      weight: m.weight,
      cameraLabel: iphoneCameraLabel(m.in_camera),
      portLabel: portLabelOf(m.port),
      iosysUrl: iosysMap[m.id] ?? null,
      detailHref: `/iphone/${m.slug}/`,
    })
  }
  return out
}

export function normalizePixels(
  models: PixelModel[],
  priceMap: Record<number, PixelPriceLog>,
  iosysMap: Record<number, string> = {},
): NormalizedPhone[] {
  const out: NormalizedPhone[] = []
  for (const m of models) {
    const price = repPrice(priceMap[m.id])
    if (price == null) continue
    out.push({
      brand: 'pixel',
      brandLabel: BRAND_META.pixel.label,
      slug: m.slug,
      name: m.model,
      price,
      antutuTotal: m.antutu_total ?? antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
      scoreSingle: m.score_single,
      scoreMulti: m.score_multi,
      mainCamera: m.main_camera,
      battery: m.battery,
      batteryMah: parseMah(m.battery),
      supportUntil: formatSupportUntilYm(m.support_until),
      felica: m.felica,
      os: 'Android',
      chip: m.cpu,
      imageSrc: m.image ? `/images/pixel/${m.image}` : null,
      releaseDate: m.date,
      display: screenSize(m.display),
      weight: m.weight,
      cameraLabel: androidCameraLabel(m.main_camera, m.ultrawide_camera, m.tele_camera),
      portLabel: portLabelOf(m.port),
      iosysUrl: iosysMap[m.id] ?? null,
      detailHref: `/pixel/${m.slug}/`,
    })
  }
  return out
}

export function normalizeGalaxies(
  models: GalaxyModel[],
  priceMap: Record<number, GalaxyPriceLog>,
  iosysMap: Record<number, string> = {},
): NormalizedPhone[] {
  const out: NormalizedPhone[] = []
  for (const m of models) {
    const price = repPrice(priceMap[m.id])
    if (price == null) continue
    out.push({
      brand: 'galaxy',
      brandLabel: BRAND_META.galaxy.label,
      slug: m.slug,
      name: m.model,
      price,
      antutuTotal: m.antutu_total ?? antutuFromParts(m.antutu_cpu, m.antutu_gpu, m.antutu_mem, m.antutu_ux),
      scoreSingle: m.score_single,
      scoreMulti: m.score_multi,
      mainCamera: m.main_camera,
      battery: m.battery,
      batteryMah: parseMah(m.battery),
      supportUntil: formatSupportUntilYm(m.support_until),
      felica: m.felica,
      os: 'Android',
      chip: m.cpu,
      imageSrc: m.image ? `/images/galaxy/${m.image}` : null,
      releaseDate: m.date,
      display: screenSize(m.display),
      weight: m.weight,
      cameraLabel: androidCameraLabel(m.main_camera, m.ultrawide_camera, m.tele_camera),
      portLabel: portLabelOf(m.port),
      iosysUrl: iosysMap[m.id] ?? null,
      // 折りたたみ判定に使う series は Galaxy 固有。detailHref のみ共通化
      detailHref: `/galaxy/${m.slug}/`,
    })
  }
  return out
}

// ------------------------------------------------------------
// 派生ユーティリティ
// ------------------------------------------------------------

export function yen(n: number): string {
  return `¥${n.toLocaleString()}`
}

/** antutuTotal 降順（null は末尾）。同点は価格昇順 */
export function byPerf(a: NormalizedPhone, b: NormalizedPhone): number {
  const av = a.antutuTotal ?? -1
  const bv = b.antutuTotal ?? -1
  if (av !== bv) return bv - av
  return a.price - b.price
}

/** 配列から antutuTotal 最大のモデルを返す */
export function topByAntutu(list: NormalizedPhone[]): NormalizedPhone | null {
  const withScore = list.filter((p) => p.antutuTotal != null)
  if (withScore.length === 0) return null
  return withScore.reduce((best, p) => ((p.antutuTotal ?? 0) > (best.antutuTotal ?? 0) ? p : best))
}

// ------------------------------------------------------------
// 用途別のおすすめ判定
// ------------------------------------------------------------
// 冒頭の「結論」と用途別セクションの両方から参照するため、
// 判定ロジックはここに一本化する（表示側で二重に実装しない）。

export type UseCaseKey =
  | 'camera'
  | 'game'
  | 'battery'
  | 'longUse'
  | 'fold'
  | 'compact'

export type UseCasePicks = Record<UseCaseKey, NormalizedPhone | null>

/** "〜2031年8月" 等から西暦を取り出す。取れなければ 0 */
function supportYear(p: NormalizedPhone): number {
  if (!p.supportUntil) return 0
  const m = p.supportUntil.match(/(\d{4})/)
  return m ? parseInt(m[1], 10) : 0
}

function maxBy<T>(list: T[], score: (t: T) => number): T | null {
  if (list.length === 0) return null
  return list.reduce((best, cur) => (score(cur) > score(best) ? cur : best))
}

export function buildUseCasePicks(phones: NormalizedPhone[]): UseCasePicks {
  const pixels = phones.filter((p) => p.brand === 'pixel')
  const galaxies = phones.filter((p) => p.brand === 'galaxy')

  const game = topByAntutu(phones)

  return {
    // カメラは AI 補正に強い Pixel を優先し、無ければ Galaxy → 全体
    camera: topByAntutu(pixels) ?? topByAntutu(galaxies) ?? game,
    game,
    battery: maxBy(phones.filter((p) => p.batteryMah != null), (p) => p.batteryMah ?? 0),
    longUse: maxBy(phones.filter((p) => supportYear(p) > 0), supportYear),
    fold:
      topByAntutu(galaxies.filter((p) => /z\s*(flip|fold)|フリップ|フォールド|flip|fold/i.test(p.name))) ??
      galaxies.find((p) => /z\s*(flip|fold)|flip|fold/i.test(p.name)) ??
      null,
    compact:
      phones.filter((p) => /mini|flip|se\b|コンパクト/i.test(p.name)).sort((a, b) => a.price - b.price)[0] ?? null,
  }
}

// ------------------------------------------------------------
// 価格帯内ランキング
// ------------------------------------------------------------
// 「その価格帯の中で」の相対評価。帯が変われば同じ機種でも評価が変わるため、
// 固定の長所短所ではなく、毎回 peers（同じ帯の機種）と比べて生成する。
// 相場が動いて帯をまたげば、評価も自動で切り替わる。

export type RankedPhone = {
  phone: NormalizedPhone
  /** 1 始まり */
  rank: number
}

/**
 * 価格帯内のランキングを生成する。
 * 並びは「その予算で買える最高性能」を知りたい読者に合わせて AnTuTu 総合の降順。
 * コスパ（価格あたり性能）が最良の1台は pros で別途明示する。
 */
export function buildBucketRanking(inBucket: NormalizedPhone[], limit: number): RankedPhone[] {
  return inBucket
    .filter((p) => p.price > 0)
    .sort(byPerf)
    .slice(0, limit)
    .map((phone, i) => ({ phone, rank: i + 1 }))
}
