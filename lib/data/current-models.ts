// ============================================================
// 現行機種（サイト全体で「最新」として参照する唯一の定義）
// ============================================================
// 中古サイトの記事は「型落ち機種を現行機種と比べる」構成が中心のため、
// 現行機種の情報がコード内の各所に散らばると、新機種が出るたびに
// 直し漏れが発生する（実際に Apple Watch Series 10 / MacBook Pro 2024 が
// 数世代ぶん古いまま残っていた）。
//
// 【原則】「最新の◯◯」「現行の◯◯」と書きたくなったら、
//         文字列を直接書かずに必ずこのファイルの値を参照する。
//
// 【更新するとき】
//   新機種が発売されたら、このファイルの該当カテゴリを更新する。
//   更新漏れは `npm run check:content`（build 時に自動実行）が検知する。
//   latestReleaseDate を更新する前に、必ず本文側の比較記述
//   （lib/data/*-recommend.ts の description）を見直すこと。
//   世代の数え方（「3世代ぶんの差」など）は自動追従できないため、
//   人が読み直す必要がある。

export type CurrentModel = {
  /** DB 上の slug。実在チェックに使う */
  slug: string
  /** 本文表示用の名称。DB の model 名と表記が異なることがあるため別に持つ */
  name: string
  /** チップ名。「現行の◯◯が積む△△」と書くために使う */
  chip: string
  /** Geekbench score_multi。買い時判定の性能比の分母。DB 実値と一致すること */
  score: number | null
  /** 新品価格（税込）。DB に列がないため手動管理 */
  newPrice: number
  /** 何年使う前提で年単価を出すか */
  lifespanYears: number
}

export type CategoryBasis = {
  /** そのカテゴリで比較の基準にする現行機種 */
  basis: CurrentModel
  /**
   * レビュー時点で DB にあった最新の発売日（YYYY-MM-DD）。
   * DB にこれより新しい機種が入ると新機種発売とみなし、チェックが落ちる。
   */
  latestReleaseDate: string
  /** 最後に本文の比較記述を見直した日（YYYY-MM-DD） */
  reviewedAt: string
  /** そのカテゴリで比較記述を持つファイル。チェック失敗時に見直し先として案内する */
  reviewTargets: string[]
}

const RECOMMEND = (category: string) => `lib/data/${category}-recommend.ts`

export const CURRENT_MODELS = {
  iphone: {
    // 標準モデルを基準にする。e シリーズは廉価ラインなので基準にしない
    basis: { slug: '17normal', name: 'iPhone 17', chip: 'A19', score: 9143, newPrice: 129800, lifespanYears: 5 },
    latestReleaseDate: '2026-03-11',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('iphone'), 'lib/utils/iphone-helpers.ts'],
  },
  ipad: {
    basis: { slug: 'pro13-2', name: 'iPad Pro 13 第2世代', chip: 'M5', score: 15306, newPrice: 218800, lifespanYears: 5 },
    latestReleaseDate: '2026-03-11',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('ipad'), 'lib/utils/ipad-helpers.ts'],
  },
  macbook: {
    basis: { slug: 'mbp-14-2026', name: 'MacBook Pro 14インチ（2026）', chip: 'M5 Pro / M5 Max', score: 25411, newPrice: 248800, lifespanYears: 7 },
    latestReleaseDate: '2026-03-11',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('macbook'), 'lib/utils/macbook-helpers.ts', 'lib/data/macbook-shop.ts'],
  },
  watch: {
    // watch_models にベンチマーク列がないため score は null（性能比は年数ベースで算出）
    basis: { slug: 'series11', name: 'Apple Watch Series 11', chip: 'S10 SiP', score: null, newPrice: 59800, lifespanYears: 5 },
    latestReleaseDate: '2025-09-19',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('watch'), 'lib/utils/watch-helpers.ts'],
  },
  airpods: {
    basis: { slug: 'airpods-pro-3', name: 'AirPods Pro 3', chip: 'H2チップ', score: null, newPrice: 39800, lifespanYears: 5 },
    latestReleaseDate: '2026-04-01',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('airpods')],
  },
  pixel: {
    basis: { slug: 'pixel-10', name: 'Google Pixel 10', chip: 'Google Tensor G5', score: 6449, newPrice: 128900, lifespanYears: 7 },
    latestReleaseDate: '2025-10-09',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('pixel'), 'app/(public)/pixel/benchmark/components/ChipGenerationCompare.tsx'],
  },
  galaxy: {
    basis: { slug: 'galaxy-s26', name: 'Samsung Galaxy S26', chip: 'Snapdragon 8 Elite Gen 5 for Galaxy', score: 11738, newPrice: 145800, lifespanYears: 7 },
    latestReleaseDate: '2026-08-07',
    reviewedAt: '2026-08-06',
    reviewTargets: [RECOMMEND('galaxy')],
  },
} satisfies Record<string, CategoryBasis>

export type CurrentModelCategory = keyof typeof CURRENT_MODELS

/**
 * Ultra はプレミアムラインで Series と価格帯がまったく違う。
 * 同じ土俵で比べると Ultra が常に「新品より高い」と判定されてしまうため、
 * Ultra 系だけは Ultra の現行機を比較対象にする。
 */
export const CURRENT_WATCH_ULTRA: CurrentModel = {
  slug: 'ultra3',
  name: 'Apple Watch Ultra 3',
  chip: 'S10 SiP',
  score: null,
  newPrice: 128800,
  lifespanYears: 5,
}

/** 新品を lifespanYears 年使った場合の年単価 */
export function annualCostOf(model: CurrentModel): number {
  return Math.round(model.newPrice / model.lifespanYears)
}
