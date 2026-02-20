import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { LifespanEntryWithHref, GlossaryGroup } from '@/app/components/support/LifespanTable'

const LIFESPAN_DATA: LifespanEntryWithHref[] = [
  { series: 'Apple Watch Series 11', href: '/watch/series11', releaseDate: '2025年9月発売', osEnd: '2030年9月', repairEnd: '2032年9月' },
  { series: 'Apple Watch Ultra 3', href: '/watch/ultra3', releaseDate: '2025年9月発売', osEnd: '2030年9月', repairEnd: '2032年9月' },
  { series: 'Apple Watch SE 3', href: '/watch/se3-2', releaseDate: '2025年9月発売', osEnd: '2030年9月', repairEnd: '2032年9月' },
  { series: 'Apple Watch Series 10', href: '/watch/series10', releaseDate: '2024年9月発売', osEnd: '2029年9月', repairEnd: '2031年9月' },
  { series: 'Apple Watch Ultra 2', href: '/watch/ultra2', releaseDate: '2023年9月発売', osEnd: '2028年9月', repairEnd: '2030年9月' },
  { series: 'Apple Watch Series 9', href: '/watch/series9', releaseDate: '2023年9月発売', osEnd: '2028年9月', repairEnd: '2030年9月' },
  { series: 'Apple Watch Ultra', href: '/watch/ultra', releaseDate: '2022年9月発売', osEnd: '2027年9月', repairEnd: '2029年9月' },
  { series: 'Apple Watch Series 8', href: '/watch/series8', releaseDate: '2022年9月発売', osEnd: '2027年9月', repairEnd: '2029年9月' },
  { series: 'Apple Watch SE（第2世代）', href: '/watch/se2-2', releaseDate: '2022年9月発売', osEnd: '2027年9月', repairEnd: '2029年9月' },
  { series: 'Apple Watch Series 7', href: '/watch/series7', releaseDate: '2021年10月発売', osEnd: '2026年10月', repairEnd: '2028年10月' },
  { series: 'Apple Watch Series 6', href: '/watch/series6', releaseDate: '2020年9月発売', osEnd: '2025年9月', repairEnd: '2027年9月' },
  { series: 'Apple Watch SE（第1世代）', href: '/watch/se', releaseDate: '2020年9月発売', osEnd: '2025年9月', repairEnd: '2027年9月' },
  { series: 'Apple Watch Series 5', href: '/watch/series5', releaseDate: '2019年9月発売', osEnd: '2024年9月', repairEnd: '2026年9月' },
  { series: 'Apple Watch Series 4', href: '/watch/series4', releaseDate: '2018年9月発売', osEnd: '2023年9月', repairEnd: '2025年9月' },
]

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'watchOSのサポート期間について',
    label: 'watchOSサポート終了のデメリット',
    intro:
      'Apple WatchはiPhoneと比べるとOSサポート期間が短く、発売から約5年でwatchOSのアップデート対象外になる傾向があります。サポート対象外になったApple Watchを使い続けると下記のデメリットが出てくるため注意が必要です。',
    items: [
      {
        term: 'セキュリティリスクが高まる',
        description:
          'OSが更新できないと新たに発見された脆弱性に対応できず、不正アクセスやデータ漏洩のリスクが高まります。',
      },
      {
        term: '新しいヘルスケア機能が利用できない',
        description:
          'watchOSのアップデートで追加される新しい健康管理機能やフィットネス機能が利用できなくなります。',
      },
      {
        term: '一部のアプリが非対応になる',
        description:
          'App Storeのアプリは最新OSに合わせてアップデートされるため、古いOSではアプリが動作しなくなるケースが増えていきます。',
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
          '販売終了から5年以上7年未満が経過したApple Watchが対象。修理に必要なパーツがない場合にサポートが受けられなくなる。',
      },
      {
        term: 'オブソリート製品',
        description:
          '販売終了から7年以上が経ったApple Watchが対象。Appleの正規修理サポートを一切受けられなくなる。',
      },
    ],
  },
]

export default function WatchLifespanTable() {
  return (
    <LifespanTableBase
      sectionTitle="Apple Watchのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間は発売から約5年、修理受付期間は販売終了から約7年を目安として算出した予測値です。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="Apple Watch機種別サポート期間・寿命予想一覧"
      data={LIFESPAN_DATA}
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
