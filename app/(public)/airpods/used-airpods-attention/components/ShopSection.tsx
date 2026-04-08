import { getShops } from '@/lib/queries'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import VendorCardGrid from '@/app/components/VendorCardGrid'

export default async function ShopSection() {
  const shops = await getShops()
  const vendorCards = buildVendorCardsFromShops(shops, 'airpods_url', '中古AirPodsの在庫を見る', {
    exclude: ['rakuma'],
    priorityOrder: ['iosys', 'eearphone'],
  })

  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古AirPodsを買うのにおすすめのECサイト
        </h2>
        <p className="m-section-desc">
          中古AirPods販売店の比較情報。保証内容、価格、在庫の豊富さなど、
        </p>
        <p className="m-section-desc">
          各ショップの特徴を一覧表で整理しました。
        </p>

        <VendorCardGrid cards={vendorCards} />
      </div>
    </section>
  )
}
