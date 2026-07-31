// ============================================
// 価格分布の統計
// ============================================
// price_logs の *_prices（取得した全商品の価格・昇順）から、
// min/max だけでは出せない指標を算出する。
//
// *_prices は 2026-07-31 以降のログにしか入っていない（過去分はNULL）。
// 参照側は必ず null を許容し、無いときは該当の表示を出さないこと。

/** 中央値。偶数個なら中央2つの平均 */
function medianOf(sorted: number[]): number {
  const n = sorted.length
  const mid = n >> 1
  return n % 2 === 1 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

/**
 * 分位点（0〜1）。線形補間ではなく最近傍を採る。
 * 価格は離散値であり、実在しない価格を提示しないため。
 */
function quantileOf(sorted: number[], q: number): number {
  if (sorted.length === 1) return sorted[0]
  const idx = Math.round(q * (sorted.length - 1))
  return sorted[idx]
}

export type PriceHistogramBucket = {
  from: number
  /** この価格未満（上限は含まない） */
  to: number
  count: number
  /** 最も件数が多い価格帯か */
  isPeak: boolean
}

export type PriceHistogram = {
  buckets: PriceHistogramBucket[]
  /** 表示レンジより下の外れ値の件数 */
  below: number
  /** 表示レンジより上の外れ値の件数 */
  above: number
  /** 価格帯の刻み幅 */
  width: number
  /** 棒の長さを出すための最大件数 */
  maxCount: number
}

export type PriceStats = {
  /** 対象件数 */
  count: number
  min: number
  max: number
  median: number
  /** 第1四分位（安いほうから25%） */
  q1: number
  /** 第3四分位 */
  q3: number
  /**
   * 外れ値を除いた現実的な最安値（下位10%点）。
   * 1件だけ極端に安い個体があっても相場の下限として提示しない。
   */
  realisticMin: number
  /** 最も商品が集中している価格帯と、その件数 */
  densestBand: { from: number; to: number; count: number } | null
  /** 価格分布のヒストグラム。件数が少なすぎる場合は null */
  histogram: PriceHistogram | null
}

/** ヒストグラムの刻み幅の候補。中途半端な幅だと読み取りにくいため決め打ちの階段にする */
const HISTOGRAM_STEPS = [500, 1_000, 2_000, 2_500, 5_000, 10_000, 20_000, 25_000, 50_000, 100_000]

/**
 * 価格分布のヒストグラムを組み立てる。
 *
 * 全範囲を等分すると、極端に安い1点のせいで大半のバケットが空になる。
 * 5〜95パーセンタイルを表示レンジとし、その外側は「〜未満 / 〜超」として件数だけ示す。
 */
function buildHistogram(sorted: number[], targetBuckets = 7): PriceHistogram | null {
  if (sorted.length < 10) return null // 少なすぎると分布として意味をなさない

  const at = (p: number) => sorted[Math.round(p * (sorted.length - 1))]
  const lo = at(0.05)
  const hi = at(0.95)
  if (hi <= lo) return null // 全て同一価格。棒グラフにしても情報がない

  const width = HISTOGRAM_STEPS.find((w) => w >= (hi - lo) / targetBuckets) ?? 200_000
  const start = Math.floor(lo / width) * width
  const end = Math.ceil(hi / width) * width

  const buckets: PriceHistogramBucket[] = []
  for (let from = start; from < end; from += width) {
    buckets.push({ from, to: from + width, count: 0, isPeak: false })
  }

  let below = 0
  let above = 0
  for (const p of sorted) {
    if (p < start) { below++; continue }
    if (p >= end) { above++; continue }
    buckets[Math.floor((p - start) / width)].count++
  }

  const maxCount = Math.max(...buckets.map((b) => b.count))
  if (maxCount === 0) return null
  for (const b of buckets) b.isPeak = b.count === maxCount

  return { buckets, below, above, width, maxCount }
}

// ============================================
// 在庫インサイト
// ============================================
// 件数（*_count）は価格だけでは伝えられない購入判断材料になる。
// 「発売間もないので中古がまだ少ない」「サポート終了間近で在庫が枯れてきた」は、
// 価格推移を見ているだけでは分からない。
//
// 件数の増減トレンドは複数日の履歴が必要だが、記録開始は 2026-07-30 のため
// 当面は水準（絶対値）のみで判定する。履歴が貯まったら trend を足す。

export type InventoryInsight = {
  /** 表示する本文 */
  text: string
  /** 取り扱いが確認できない状態か（CTAの出し方を変えるなどに使う） */
  isOutOfStock: boolean
}

/** 発売からの経過月数。date は "2021年9月" のような表記も許容する */
function monthsSinceRelease(releaseDate: string | null, now: Date): number | null {
  if (!releaseDate) return null
  const m = String(releaseDate).match(/(\d{4})\D+(\d{1,2})/)
  if (!m) return null
  const released = new Date(Number(m[1]), Number(m[2]) - 1, 1)
  if (Number.isNaN(released.getTime())) return null
  return (now.getFullYear() - released.getFullYear()) * 12 + (now.getMonth() - released.getMonth())
}

/**
 * 流通量から購入判断に使える一文を組み立てる。
 *
 * @param totalCount  対象ショップ合計の該当商品数。null なら記録がない（＝表示しない）
 * @param releaseDate 発売日。新しい機種の「まだ少ない」判定に使う
 * @param now         判定基準日（テスト用に注入する）
 */
export function buildInventoryInsight(
  totalCount: number | null | undefined,
  releaseDate: string | null,
  now: Date
): InventoryInsight | null {
  if (totalCount == null) return null

  const months = monthsSinceRelease(releaseDate, now)
  const isNew = months != null && months <= 12

  if (totalCount === 0) {
    return {
      text: isNew
        ? '発売から間もないため、中古市場にはまだ在庫が出回っていません。新品での購入を検討するか、流通が始まるまで待つ必要があります。'
        : '現在、集計対象のショップでは在庫が確認できませんでした。生産終了から時間が経ち、中古市場からも姿を消しつつある機種です。入手できるタイミングは限られます。',
      isOutOfStock: true,
    }
  }

  if (totalCount <= 5) {
    return {
      text: isNew
        ? `中古の流通はまだ${totalCount}件と少なく、発売から間もないことがうかがえます。選択肢が限られるため、状態や色にこだわると見つけにくい時期です。`
        : `在庫は${totalCount}件と少なく、入手しづらくなっています。狙っている場合は、見つけた時点で早めに判断することをおすすめします。`,
      isOutOfStock: false,
    }
  }

  if (totalCount <= 20) {
    return {
      text: isNew
        ? `中古の流通は${totalCount}件です。発売から日が浅く、これから徐々に増えていくと見込まれます。急がないのであれば、選択肢が増えるのを待つのも手です。`
        : `在庫は${totalCount}件で、選択肢はやや限られます。条件に合う個体が見つかったら押さえておきたい水準です。`,
      isOutOfStock: false,
    }
  }

  if (totalCount >= 100) {
    return {
      text: `${totalCount}件と流通量が非常に多く、ショップ間の価格競争が起きやすい状況です。急いで決めず、複数のショップを比較すると条件の良い個体を見つけやすくなります。`,
      isOutOfStock: false,
    }
  }

  return {
    text: `在庫は${totalCount}件あり、状態や色を選べるだけの選択肢があります。価格だけでなく、バッテリー状態や付属品もあわせて比較するとよいでしょう。`,
    isOutOfStock: false,
  }
}

/** 価格帯の刻み幅。相場の規模に応じて丸めの粒度を変える */
function bandWidthFor(median: number): number {
  if (median < 20_000) return 1_000
  if (median < 50_000) return 2_000
  if (median < 100_000) return 5_000
  return 10_000
}

/**
 * 複数ショップの価格配列をまとめて統計を出す。
 *
 * @param priceArrays ショップごとの価格配列（null / undefined は「記録なし」として無視）
 * @param minSamples  これ未満なら統計を出さない。少数サンプルの中央値は相場として信頼できない
 */
export function calculatePriceStats(
  priceArrays: (number[] | null | undefined)[],
  minSamples = 5
): PriceStats | null {
  const all: number[] = []
  for (const arr of priceArrays) {
    if (!arr) continue
    for (const p of arr) {
      // 0円・負値は異常データ。混ざると中央値も分位点も壊れる
      if (typeof p === 'number' && p > 0) all.push(p)
    }
  }
  if (all.length < minSamples) return null

  const sorted = all.sort((a, b) => a - b)
  const median = medianOf(sorted)

  return {
    count: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median,
    q1: quantileOf(sorted, 0.25),
    q3: quantileOf(sorted, 0.75),
    realisticMin: quantileOf(sorted, 0.1),
    densestBand: findDensestBand(sorted, bandWidthFor(median)),
    histogram: buildHistogram(sorted),
  }
}

/**
 * 最も商品が集中している価格帯を求める。
 * 「¥45,000〜47,000に27件」のように、選択肢の多い価格帯を提示するために使う。
 */
function findDensestBand(
  sorted: number[],
  width: number
): { from: number; to: number; count: number } | null {
  if (sorted.length === 0) return null

  const bands = new Map<number, number>()
  for (const p of sorted) {
    const key = Math.floor(p / width) * width
    bands.set(key, (bands.get(key) ?? 0) + 1)
  }

  let bestFrom = 0
  let bestCount = -1
  for (const [from, count] of bands) {
    // 同数なら安いほうの価格帯を採る（買い手にとって有用なため）
    if (count > bestCount || (count === bestCount && from < bestFrom)) {
      bestCount = count
      bestFrom = from
    }
  }
  // 1つの価格帯に偏りがない（全て1件ずつ等）場合は提示しない
  if (bestCount < 2) return null
  return { from: bestFrom, to: bestFrom + width, count: bestCount }
}

/**
 * ヒストグラムから読み取れる内容を文章にする。
 *
 * 分布図だけでは「どの帯が厚いか」を目で追う必要があるため、
 * 最も件数の多い価格帯とその占有率を1行で言語化する。
 * 詳細ページと相場一覧の両方で同じ文面を使う。
 */
export function buildSnapshotReport(stats: PriceStats | null | undefined): string[] {
  if (!stats?.densestBand) return []
  const yen = (n: number) => `¥${Math.round(n).toLocaleString()}`
  const { from, to, count } = stats.densestBand
  const share = Math.round((count / stats.count) * 100)
  return [
    `価格帯としては${yen(from)}〜${yen(to)}がもっとも厚く、全体の約${share}%がこの範囲に集まっています。`,
  ]
}

/**
 * 価格ログから実勢相場の統計を出す。
 *
 * 価格配列のカラム名はカテゴリごとに違う（AirPods は eearphone_prices、
 * MacBook は matched_prices）。呼び出し側が毎回カラム名を並べていると
 * カテゴリを増やすたびに書き漏らすので、`*_prices` で終わるキーを総なめする。
 *
 * @param logs 価格ログ1行、または同じ日の複数行（容量違いなど）
 */
export function priceStatsOf(
  logs: unknown | unknown[] | null | undefined
): PriceStats | null {
  const rows = (Array.isArray(logs) ? logs : [logs]).filter((r): r is object => r != null && typeof r === 'object')
  const arrays: (number[] | null)[] = []
  for (const row of rows) {
    for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
      if (key.endsWith('_prices') && Array.isArray(value)) arrays.push(value as number[])
    }
  }
  return calculatePriceStats(arrays)
}

/** 実勢相場（中央値）だけが欲しいときの糖衣。サンプル不足なら null */
export function marketMedian(logs: unknown | unknown[] | null | undefined): number | null {
  return priceStatsOf(logs)?.median ?? null
}

/**
 * 一覧表向けの実勢相場。100円単位に丸めて桁を揃える。
 *
 * 価格配列の記録がない過去ログ（2026-07-30 より前）だけ、
 * 呼び出し側が渡した最安値へフォールバックする。
 *
 * @param fallbackMins 旧ログ用の各ショップ最安値。中央値が出れば使われない
 */
export function roundedMarketPrice(
  log: unknown | null | undefined,
  fallbackMins: (number | null | undefined)[] = []
): number | null {
  const round100 = (v: number) => Math.round(v / 100) * 100
  const median = marketMedian(log)
  if (median != null) return round100(median)

  const mins = fallbackMins.filter((v): v is number => v != null && v > 0)
  if (mins.length === 0) return null
  return round100(mins.reduce((a, b) => a + b, 0) / mins.length)
}
