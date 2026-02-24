import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { LifespanEntryWithHref, GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { MacBookModel } from '@/lib/types'

const LIFESPAN_DATA: LifespanEntryWithHref[] = [
  { series: 'MBP 14/16インチ M4（2024）', href: '/macbook/mbp-14-2024-nov', releaseDate: '2024年11月発売', osEnd: '2031年11月', repairEnd: '2033年11月' },
  { series: 'MBP 14/16インチ M3 Pro/Max（2023）', href: '/macbook/mbp-14-2023-nov', releaseDate: '2023年11月発売', osEnd: '2030年11月', repairEnd: '2032年11月' },
  { series: 'MBP 14/16インチ M2 Pro/Max（2023）', href: '/macbook/mbp-14-2023', releaseDate: '2023年2月発売', osEnd: '2030年2月', repairEnd: '2032年2月' },
  { series: 'MBP 13インチ M2（2022）', href: '/macbook/mbp-13-2022', releaseDate: '2022年6月発売', osEnd: '2029年6月', repairEnd: '2031年6月' },
  { series: 'MBP 14/16インチ M1 Pro/Max（2021）', href: '/macbook/mbp-14-2021', releaseDate: '2021年10月発売', osEnd: '2028年10月', repairEnd: '2030年10月' },
  { series: 'MBP 13インチ M1（2020）', href: '/macbook/mbp-13-2020', releaseDate: '2020年11月発売', osEnd: '2027年11月', repairEnd: '2029年11月' },
  { series: 'MBA 13/15インチ M4（2025）', href: '/macbook/mba-13-2025', releaseDate: '2025年3月発売', osEnd: '2032年3月', repairEnd: '2034年3月' },
  { series: 'MBA 13/15インチ M3（2024）', href: '/macbook/mba-13-2024', releaseDate: '2024年3月発売', osEnd: '2031年3月', repairEnd: '2033年3月' },
  { series: 'MBA 15インチ M2（2023）', href: '/macbook/mba-15-2023', releaseDate: '2023年6月発売', osEnd: '2030年6月', repairEnd: '2032年6月' },
  { series: 'MBA 13インチ M2（2022）', href: '/macbook/mba-13-2022', releaseDate: '2022年7月発売', osEnd: '2029年7月', repairEnd: '2031年7月' },
  { series: 'MBA 13インチ M1（2020）', href: '/macbook/mba-13-2020', releaseDate: '2020年11月発売', osEnd: '2027年11月', repairEnd: '2029年11月' },
]

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'macOSのサポート期間について',
    label: 'macOSサポート終了のデメリット',
    intro:
      'MacBookはiPhoneと同様に、発売から約7年が経過するとmacOSのアップデート対象外になる傾向があります。特にIntelチップ搭載モデルはApple Siliconへの移行に伴い、サポート打ち切りが早まるケースがあります。',
    items: [
      {
        term: 'セキュリティリスクが高まる',
        description:
          'OSが更新できないと新たに発見された脆弱性に対応できず、不正アクセスやウイルス感染のリスクが高まります。',
      },
      {
        term: '新機能やアプリが利用できない',
        description:
          'Apple IntelligenceやStage Managerなど、macOSアップデートで追加される新機能が利用できなくなります。',
      },
      {
        term: '開発ツールが非対応になる',
        description:
          'Xcode等の開発ツールは最新macOSでの動作を前提としているため、プログラミング用途では特に影響が大きくなります。',
      },
    ],
  },
  {
    title: 'Appleストアの修理サポート期間について',
    label: '用語解説',
    intro:
      'Appleストアへバッテリー交換や画面修理を依頼する場合、端末が「ビンテージ製品」や「オブソリート製品」に該当していないことが条件になります。',
    items: [
      {
        term: 'ビンテージ製品',
        description:
          '販売終了から5年以上7年未満が経過したMacBookが対象。修理に必要なパーツがない場合にサポートが受けられなくなる。',
      },
      {
        term: 'オブソリート製品',
        description:
          '販売終了から7年以上が経ったMacBookが対象。Appleの正規修理サポートを一切受けられなくなる。',
      },
    ],
  },
]

function extractSlug(href: string): string {
  return href.replace(/\/$/, '').split('/').pop() || ''
}

type Props = { models: MacBookModel[] }

export default function MacBookLifespanTable({ models }: Props) {
  const slugMap = new Map(models.map(m => [m.slug, m.last_macos]))

  const data = LIFESPAN_DATA.map(entry => {
    const slug = extractSlug(entry.href)
    const lastOs = slugMap.get(slug)
    const osEnded = slugMap.has(slug) && lastOs != null
    return { ...entry, osEnded }
  })

  return (
    <LifespanTableBase
      data={data}
      sectionTitle="MacBookのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間は発売から約7年、修理受付期間は販売終了から約9年を目安として算出した予測値です。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="MacBook機種別サポート期間・寿命予想一覧"
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
