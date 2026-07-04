import type { Metadata } from 'next'
import { getAllIPadModelsIncludingEnded, getAllIPadAccessories, getAllIPadAccessoryCompatibility, getLatestIPadPriceLogsWithPricesForModels } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import SpecTable from '@/app/(public)/ipad/ipad-spec-table/components/SpecTable'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function IPadSpecTableEmbedPage() {
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const [allModels, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModelsIncludingEnded(),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  const latestPriceLogs = await getLatestIPadPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS)
  const avgPrices: Record<number, number | null> = {}
  for (const model of allModels) {
    const log = latestPriceLogs[model.id]
    if (!log) { avgPrices[model.id] = null; continue }
    const rec = log as unknown as Record<string, number | null>
    const mins: number[] = [], maxs: number[] = []
    for (const [minK, maxK] of [['iosys_min', 'iosys_max'], ['geo_min', 'geo_max'], ['janpara_min', 'janpara_max']] as [string, string][]) {
      const mn = rec[minK]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
      const mx = rec[maxK]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
    }
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '')?.avg ?? null
  }

  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    cpu: m.cpu,
    ram: m.ram,
    weight: m.weight,
    strage: m.strage,
    size: m.size,
    port: m.port,
    battery: m.battery,
    display: m.display,
    display_type: m.display_type,
    resolution: m.resolution,
    sim: m.sim,
    certification: m.certification,
    front_camera: m.front_camera,
    in_camera: m.in_camera,
    apple_intelligence: m.apple_intelligence,
    promotion: m.promotion,
    center_frame: m.center_frame,
    lidar: m.lidar,
    pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
    keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(m.id) || []),
    speaker: m.speaker,
    last_ipados: m.last_ipados,
  }))

  return (
    <div style={{ padding: '0 8px 16px' }}>
      <SpecTable models={serializedModels} shopLinks={[]} prices={avgPrices} embed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/ipad/ipad-spec-table/"
          target="_blank"
          rel="noopener noreferrer"
        >
          歴代iPadスペック比較表 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
