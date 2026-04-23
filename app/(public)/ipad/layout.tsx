import StickyCta from "@/app/components/StickyCta"
import { StickyCtaProvider } from "@/app/components/StickyCtaContext"
import { getShops } from "@/lib/queries"

export default async function IpadLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let defaultUrl = '#'
  try {
    const shops = await getShops()
    const iosys = shops.find((s) => s.id === 1)
    defaultUrl = iosys?.ipad_url ?? iosys?.url ?? '#'
  } catch {
    // DB unavailable (build without env, etc.) — StickyCta renders with fallback
  }

  return (
    <StickyCtaProvider
      categoryUrls={ { ipad: defaultUrl } }
      defaultUrl={defaultUrl}
    >
      {children}
      <StickyCta />
    </StickyCtaProvider>
  )
}
