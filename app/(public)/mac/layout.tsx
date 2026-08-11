import type { Metadata } from "next"
import StickyCta from "@/app/components/StickyCta"
import { StickyCtaProvider } from "@/app/components/StickyCtaContext"
import { toStickyCtaConfig } from "@/app/components/sticky-cta-config"
import { getShops, getSiteConfig } from "@/lib/queries"
import { PUBLISH_MAC_CATEGORY } from "@/lib/data/feature-flags"

/**
 * 非公開のあいだは noindex を付ける。
 *
 * feature-flags はナビ・サイトマップ・llms.txt から導線を消すだけなので、
 * URL を直接叩かれた場合や外部から参照された場合にインデックスされうる。
 * 配下のページは robots を自前で指定していないため、ここの指定が全ページに効く。
 * 公開時は PUBLISH_MAC_CATEGORY を true にすれば自動的に外れる。
 */
export const metadata: Metadata = PUBLISH_MAC_CATEGORY
  ? {}
  : { robots: { index: false, follow: false } }

export default async function MacLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let defaultUrl = '#'
  let config = toStickyCtaConfig(null)
  try {
    const [shops, site] = await Promise.all([getShops(), getSiteConfig()])
    const iosys = shops.find((s) => s.id === 1)
    // mac_url は各ショップで未設定のことがあるので macbook_url にフォールバックする
    defaultUrl = iosys?.mac_url ?? iosys?.macbook_url ?? iosys?.url ?? '#'
    config = toStickyCtaConfig(site)
  } catch {
    // DB unavailable (build without env, etc.) — StickyCta renders with fallback
  }

  return (
    <StickyCtaProvider
      categoryUrls={ { mac: defaultUrl } }
      defaultUrl={defaultUrl}
      config={config}
    >
      {children}
      <StickyCta />
    </StickyCtaProvider>
  )
}
