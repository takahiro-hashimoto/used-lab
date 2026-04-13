import { getShops } from '@/lib/queries'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import VendorCardGrid from '@/app/components/VendorCardGrid'

export default async function ShopSection() {
  const shops = await getShops()
  const vendorCards = buildVendorCardsFromShops(shops, 'airpods_url', '中古AirPodsの在庫を見る', {
    exclude: ['rakuma'],
    priorityOrder: ['iosys', 'eearphone'],
  }).map((card) => ({ ...card, specs: card.specs.filter((s) => s.label !== 'バッテリー保証' && s.label !== '赤ロム保証') }))

  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古AirPodsを買うのにおすすめのECサイト
        </h2>
        <p className="m-section-desc">
          保証内容や価格、在庫の豊富さなど、中古AirPods販売店の特徴を一覧表で比較しました。
        </p>

        <VendorCardGrid cards={vendorCards} />
      </div>
    </section>
  )
}
