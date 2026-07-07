// 追従CTAの設定（サーバ/クライアント両方から import 可能な純モジュール）
// ※ 'use client' を付けないこと。付けるとサーバから toStickyCtaConfig() を
//    呼べなくなる（クライアント境界越えのエラー）。
import type { SiteConfig, StickyCtaMode } from '@/lib/types'

/** 追従CTAの設定（Supabase site_config 由来・クライアントに渡す最小セット） */
export interface StickyCtaConfig {
  /** DB上の設定値（期間判定は含まない） */
  mode: StickyCtaMode
  /** 期間判定込みで「今」特殊バナーを出すべきか（サーバ時刻で算出） */
  specialActive: boolean
  specialHeadline: string
  specialLabel: string
  specialUrl: string
  /** 特殊バナーの終了日時（ISO / NULL）。クライアントの自動復帰タイマー用。 */
  specialEndAt: string | null
}

export const DEFAULT_STICKY_CTA_CONFIG: StickyCtaConfig = {
  mode: 'normal',
  specialActive: false,
  specialHeadline: '',
  specialLabel: '',
  specialUrl: '#',
  specialEndAt: null,
}

/**
 * Supabase の SiteConfig → クライアント用 StickyCtaConfig に変換。
 * 期間内かどうか（specialActive）はサーバ時刻で判定する。
 * ※ この関数はサーバコンポーネント（各カテゴリの layout）からのみ呼ぶこと。
 */
export function toStickyCtaConfig(site: SiteConfig | null): StickyCtaConfig {
  if (!site) return DEFAULT_STICKY_CTA_CONFIG

  const mode: StickyCtaMode = site.sticky_cta_mode === 'special' ? 'special' : 'normal'
  const startAt = site.special_start_at ?? null
  const endAt = site.special_end_at ?? null

  const now = Date.now()
  const afterStart = !startAt || now >= new Date(startAt).getTime()
  const beforeEnd = !endAt || now <= new Date(endAt).getTime()
  const specialActive = mode === 'special' && afterStart && beforeEnd

  return {
    mode,
    specialActive,
    specialHeadline: site.special_cta_headline ?? '',
    specialLabel: site.special_cta_label ?? '',
    specialUrl: site.special_cta_url ?? '#',
    specialEndAt: endAt,
  }
}
