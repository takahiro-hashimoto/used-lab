import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { LifespanEntryWithModels, GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { IPadModel } from '@/lib/types'

const LIFESPAN_DATA: LifespanEntryWithModels[] = [
  {
    series: 'iPad Pro 2025モデル',
    releaseDate: '2025年10月発売',
    models: [
      { label: 'iPad Pro 11 第6世代', href: '/ipad/pro11-6' },
      { label: 'iPad Pro 13 第2世代', href: '/ipad/pro13-2' },
    ],
    osEnd: '2032年10月',
    repairEnd: '2034年10月',
  },
  {
    series: 'iPad Pro 2024モデル',
    releaseDate: '2024年5月発売',
    models: [
      { label: 'iPad Pro 11 第5世代', href: '/ipad/pro11-5' },
      { label: 'iPad Pro 13 第1世代', href: '/ipad/pro13-1' },
    ],
    osEnd: '2031年5月',
    repairEnd: '2033年5月',
  },
  {
    series: 'iPad Pro 2022モデル',
    releaseDate: '2022年10月発売',
    models: [
      { label: 'iPad Pro 11 第4世代', href: '/ipad/pro11-4' },
      { label: 'iPad Pro 12.9 第6世代', href: '/ipad/pro12-6' },
    ],
    osEnd: '2029年10月',
    repairEnd: '2031年10月',
  },
  {
    series: 'iPad Pro 2021モデル',
    releaseDate: '2021年5月発売',
    models: [
      { label: 'iPad Pro 11 第3世代', href: '/ipad/pro11-3' },
      { label: 'iPad Pro 12.9 第5世代', href: '/ipad/pro12-5' },
    ],
    osEnd: '2028年5月',
    repairEnd: '2030年5月',
  },
  {
    series: 'iPad Pro 2020モデル',
    releaseDate: '2020年3月発売',
    models: [
      { label: 'iPad Pro 11 第2世代', href: '/ipad/pro11-2' },
      { label: 'iPad Pro 12.9 第4世代', href: '/ipad/pro12-4' },
    ],
    osEnd: '2027年3月',
    repairEnd: '2029年3月',
  },
  {
    series: 'iPad Air 2025モデル',
    releaseDate: '2025年3月発売',
    models: [
      { label: 'iPad Air 11 第7世代', href: '/ipad/air-7-11' },
      { label: 'iPad Air 13 第7世代', href: '/ipad/air-7-13' },
    ],
    osEnd: '2032年3月',
    repairEnd: '2034年3月',
  },
  {
    series: 'iPad Air 2024モデル',
    releaseDate: '2024年5月発売',
    models: [
      { label: 'iPad Air 11 第6世代', href: '/ipad/air-6-11' },
      { label: 'iPad Air 13 第6世代', href: '/ipad/air-6-13' },
    ],
    osEnd: '2031年5月',
    repairEnd: '2033年5月',
  },
  {
    series: 'iPad Air 2022モデル',
    releaseDate: '2022年3月発売',
    models: [{ label: 'iPad Air 第5世代', href: '/ipad/air-5' }],
    osEnd: '2029年3月',
    repairEnd: '2031年3月',
  },
  {
    series: 'iPad Air 2020モデル',
    releaseDate: '2020年9月発売',
    models: [{ label: 'iPad Air 第4世代', href: '/ipad/air-4' }],
    osEnd: '2027年9月',
    repairEnd: '2029年9月',
  },
  {
    series: 'iPad 2025モデル',
    releaseDate: '2025年3月発売',
    models: [{ label: 'iPad 第11世代', href: '/ipad/normal-11' }],
    osEnd: '2032年3月',
    repairEnd: '2034年3月',
  },
  {
    series: 'iPad 2022モデル',
    releaseDate: '2022年10月発売',
    models: [{ label: 'iPad 第10世代', href: '/ipad/normal-10' }],
    osEnd: '2029年10月',
    repairEnd: '2031年10月',
  },
  {
    series: 'iPad 2021モデル',
    releaseDate: '2021年9月発売',
    models: [{ label: 'iPad 第9世代', href: '/ipad/normal-9' }],
    osEnd: '2028年9月',
    repairEnd: '2030年9月',
  },
  {
    series: 'iPad mini 2024モデル',
    releaseDate: '2024年10月発売',
    models: [{ label: 'iPad mini 第7世代', href: '/ipad/mini-7' }],
    osEnd: '2031年10月',
    repairEnd: '2033年10月',
  },
  {
    series: 'iPad mini 2021モデル',
    releaseDate: '2021年9月発売',
    models: [{ label: 'iPad mini 第6世代', href: '/ipad/mini-6' }],
    osEnd: '2028年9月',
    repairEnd: '2030年9月',
  },
  {
    series: 'iPad mini 2019モデル',
    releaseDate: '2019年3月発売',
    models: [{ label: 'iPad mini 第5世代', href: '/ipad/mini-5' }],
    osEnd: '2026年3月',
    repairEnd: '2028年3月',
  },
]

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'iPadOSのサポート期間について',
    label: 'iPadOSサポート終了のデメリット',
    intro:
      'iPhoneと同様に、iPadも発売から7年以上が経過するとiPadOSのアップデート対象外となる傾向があります。サポート対象外になったiPadを使い続けると下記のデメリットが出てくるため注意が必要です。',
    items: [
      {
        term: 'セキュリティリスクが高まる',
        description:
          'OSが更新できないと新たに発見された脆弱性に対応できず、不正アクセスやウイルス感染のリスクが高まります。',
      },
      {
        term: '新機能が利用できない',
        description:
          'Stage ManagerやApple Intelligence等、iPadOSアップデートで追加される新機能を利用できなくなります。',
      },
      {
        term: '一部のアプリが非対応になる',
        description:
          'App Storeのアプリは最新OSに合わせてアップデートされるため、古いOSでは動作しなくなるアプリが増えていきます。',
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
          '販売終了から5年以上7年未満が経過したiPadが対象。修理に必要なパーツがない場合にサポートが受けられなくなる。',
      },
      {
        term: 'オブソリート製品',
        description:
          '販売終了から7年以上が経ったiPadが対象。Appleの正規修理サポートを一切受けられなくなる。',
      },
    ],
  },
]

function extractSlug(href: string): string {
  return href.replace(/\/$/, '').split('/').pop() || ''
}

type Props = { models: IPadModel[] }

export default function IPadLifespanTable({ models }: Props) {
  const slugMap = new Map(models.map(m => [m.slug, m.last_ipados]))

  const data = LIFESPAN_DATA.map(entry => {
    const slugs = entry.models.map(m => extractSlug(m.href))
    const matched = slugs.filter(s => slugMap.has(s))
    const osEnded = matched.length > 0 && matched.every(s => slugMap.get(s) != null)
    return { ...entry, osEnded }
  })

  return (
    <LifespanTableBase
      data={data}
      sectionTitle="iPadのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間は発売から約7年、修理受付期間は販売終了から約9年を目安として算出した予測値です。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="iPad機種別サポート期間・寿命予想一覧"
      showModelsColumn
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
