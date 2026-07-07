import StickyCta from "@/app/components/StickyCta"
import { StickyCtaProvider } from "@/app/components/StickyCtaContext"
import { toStickyCtaConfig } from "@/app/components/sticky-cta-config"
import { getShops, getSiteConfig } from "@/lib/queries"

export default async function IphoneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let defaultUrl = '#'
  let config = toStickyCtaConfig(null)
  try {
    const [shops, site] = await Promise.all([getShops(), getSiteConfig()])
    const iosys = shops.find((s) => s.id === 1)
    defaultUrl = iosys?.url ?? '#'
    config = toStickyCtaConfig(site)
  } catch {
    // DB unavailable (build without env, etc.) — StickyCta renders with fallback
  }

  return (
    <StickyCtaProvider
      categoryUrls={ { iphone: defaultUrl } }
      defaultUrl={defaultUrl}
      config={config}
    >
      {children}
      <StickyCta />
    </StickyCtaProvider>
  )
}
