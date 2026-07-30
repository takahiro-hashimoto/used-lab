import type { SimilarPriceItem } from '@/app/components/model/SimilarPriceModels'
import { formatReleaseDate } from './shared-helpers'

// ============================================================
// 「同じ予算で狙える他のモデル」の算出
//
// iPhone / Pixel / Galaxy を横断し、基準機種の中古相場に近いモデルを返す。
// 価格は毎日更新されるため、提示される組み合わせも日々変わる。
// 各 [slug] ページで同じロジックを書かないよう共通化している。
// ============================================================

/** 3ショップ（イオシス・ゲオ・じゃんぱら）の最安列を持つ価格ログ行 */
type PriceLogLike = {
  iosys_min?: unknown
  geo_min?: unknown
  janpara_min?: unknown
} | undefined

type ModelLike = {
  id: number
  slug: string
  model: string
  cpu: string | null
  /** DBの image カラム（ファイル名のみ）。未登録なら null */
  image?: string | null
  /** "6.9インチ Dynamic AMOLED 2X" のような文字列。インチ部分だけ抜き出して使う */
  display?: string | null
  /** "227g" */
  weight?: string | null
  /** "2024/9/20"（DBは TEXT の YYYY/M/D） */
  date?: string | null
}

/**
 * display カラムから画面サイズだけを取り出す。
 * display はパネル種別まで含む長い文字列なので、カードにはインチだけ出す。
 */
function extractScreenInch(display: string | null | undefined): string | null {
  if (!display) return null
  const m = display.match(/([\d.]+)\s*インチ/)
  return m ? `${m[1]}インチ` : null
}

/** product_shop_links の1行（必要な列だけ） */
type ShopLinkLike = {
  product_id: number
  shop_id: number
  url: string
}

/** イオシスの shop_id */
const IOSYS_SHOP_ID = 1

export type BrandInput = {
  /** URL のプレフィックス（/iphone/xxx/ の iphone 部分） */
  brand: 'iphone' | 'pixel' | 'galaxy'
  /** カード上に出すブランド名。同一ブランド内の比較では表示しない */
  brandLabel: string
  models: ModelLike[]
  /** model.id → 最新価格ログ */
  prices: Record<number, PriceLogLike>
  /** このブランドの product_shop_links 全件。イオシスへの直リンク抽出に使う */
  shopLinks?: ShopLinkLike[]
}

/** 3ショップ最安の非null最小を代表価格とする */
export function representativePrice(log: PriceLogLike): number | null {
  if (!log) return null
  const nums = [log.iosys_min, log.geo_min, log.janpara_min]
    .map((v) => (v == null ? NaN : Number(v)))
    .filter((v) => Number.isFinite(v) && v > 0)
  return nums.length > 0 ? Math.min(...nums) : null
}

/**
 * 基準機種に価格が近いモデルを、ブランド横断で抽出する。
 *
 * @param current 基準機種（ブランドとID）
 * @param inputs  比較対象のブランド群
 * @param opts.tolerance 基準価格からの許容差（比率）。既定 0.25 = ±25%
 * @param opts.limit     最大件数。既定 3
 * @param opts.perBrandMax 1ブランドあたりの最大件数。既定 2（1ブランドで埋まるのを防ぐ）
 */
export function buildSimilarPriceItems(
  current: { brand: BrandInput['brand']; id: number },
  inputs: BrandInput[],
  opts?: { tolerance?: number; limit?: number; perBrandMax?: number },
): { basePrice: number | null; items: SimilarPriceItem[] } {
  const tolerance = opts?.tolerance ?? 0.25
  const limit = opts?.limit ?? 3
  const perBrandMax = opts?.perBrandMax ?? 2

  const self = inputs.find((i) => i.brand === current.brand)
  const basePrice = self ? representativePrice(self.prices[current.id]) : null
  if (basePrice == null) return { basePrice: null, items: [] }

  const candidates = inputs.flatMap((input) =>
    input.models
      .filter((m) => !(input.brand === current.brand && m.id === current.id))
      .map((m) => ({ input, m, price: representativePrice(input.prices[m.id]) }))
      .filter((x): x is { input: BrandInput; m: ModelLike; price: number } => x.price != null)
      .filter((x) => Math.abs(x.price - basePrice) / basePrice <= tolerance),
  )

  // 価格が近い順。ただし1ブランドで枠を独占しないよう上限を設ける
  const perBrandCount: Record<string, number> = {}
  const items: SimilarPriceItem[] = []
  for (const c of candidates.sort(
    (a, b) => Math.abs(a.price - basePrice) - Math.abs(b.price - basePrice),
  )) {
    if (items.length >= limit) break
    const n = perBrandCount[c.input.brand] ?? 0
    if (n >= perBrandMax) continue
    perBrandCount[c.input.brand] = n + 1
    items.push({
      slug: c.m.slug,
      name: c.m.model,
      price: c.price,
      href: `/${c.input.brand}/${c.m.slug}/`,
      // 画像は /images/{brand}/{ファイル名}。未登録の機種は null にしてプレースホルダー表示
      imageSrc: c.m.image ? `/images/${c.input.brand}/${c.m.image}` : null,
      cpu: c.m.cpu,
      screenInch: extractScreenInch(c.m.display),
      weight: c.m.weight ?? null,
      // formatReleaseDate は未登録時に空文字を返すので null に寄せる
      releaseLabel: formatReleaseDate(c.m.date ?? null) || null,
      // 個別ページが未登録の機種はボタンを出さない（イオシストップに送らない）
      iosysUrl:
        c.input.shopLinks?.find(
          (l) => l.product_id === c.m.id && l.shop_id === IOSYS_SHOP_ID,
        )?.url ?? null,
      // 他ブランドのみラベルを出す（同ブランドは自明なので省略）
      brandLabel: c.input.brand === current.brand ? null : c.input.brandLabel,
    })
  }

  return { basePrice, items }
}
