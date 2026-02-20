import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { LifespanEntryWithModels, GlossaryGroup } from '@/app/components/support/LifespanTable'

const LIFESPAN_DATA: LifespanEntryWithModels[] = [
  {
    series: 'iPhone 17シリーズ',
    releaseDate: '2025年9月発売',
    models: [
      { label: 'iPhone 17', href: '/iphone/17normal' },
      { label: 'iPhone 17 Pro', href: '/iphone/17pro' },
      { label: 'iPhone 17 Pro Max', href: '/iphone/17promax' },
      { label: 'iPhone Air', href: '/iphone/air' },
    ],
    osEnd: '2032年9月',
    repairEnd: '2034年9月',
  },
  {
    series: 'iPhone 16eシリーズ',
    releaseDate: '2025年2月発売',
    models: [{ label: 'iPhone 16e', href: '/iphone/16e-se' }],
    osEnd: '2032年2月',
    repairEnd: '2034年2月',
  },
  {
    series: 'iPhone 16シリーズ',
    releaseDate: '2024年9月発売',
    models: [
      { label: 'iPhone 16', href: '/iphone/16normal' },
      { label: 'iPhone 16 Plus', href: '/iphone/16plus' },
      { label: 'iPhone 16 Pro', href: '/iphone/16pro' },
      { label: 'iPhone 16 Pro Max', href: '/iphone/16promax' },
    ],
    osEnd: '2031年9月',
    repairEnd: '2033年9月',
  },
  {
    series: 'iPhone 15シリーズ',
    releaseDate: '2023年9月発売',
    models: [
      { label: 'iPhone 15', href: '/iphone/15normal' },
      { label: 'iPhone 15 Plus', href: '/iphone/15plus' },
      { label: 'iPhone 15 Pro', href: '/iphone/15pro' },
      { label: 'iPhone 15 Pro Max', href: '/iphone/15promax' },
    ],
    osEnd: '2030年9月',
    repairEnd: '2032年9月',
  },
  {
    series: 'iPhone 14シリーズ',
    releaseDate: '2022年9月発売',
    models: [
      { label: 'iPhone 14', href: '/iphone/14normal' },
      { label: 'iPhone 14 Plus', href: '/iphone/14plus' },
      { label: 'iPhone 14 Pro', href: '/iphone/14pro' },
      { label: 'iPhone 14 Pro Max', href: '/iphone/14promax' },
    ],
    osEnd: '2029年9月',
    repairEnd: '2031年9月',
  },
  {
    series: 'iPhone SE（第3世代）',
    releaseDate: '2022年3月発売',
    models: [{ label: 'iPhone SE 第3世代', href: '/iphone/se3' }],
    osEnd: '2029年3月',
    repairEnd: '2031年3月',
  },
  {
    series: 'iPhone 13シリーズ',
    releaseDate: '2021年9月発売',
    models: [
      { label: 'iPhone 13', href: '/iphone/13normal' },
      { label: 'iPhone 13 mini', href: '/iphone/13mini' },
      { label: 'iPhone 13 Pro', href: '/iphone/13pro' },
      { label: 'iPhone 13 Pro Max', href: '/iphone/13promax' },
    ],
    osEnd: '2028年9月',
    repairEnd: '2030年9月',
  },
  {
    series: 'iPhone 12シリーズ',
    releaseDate: '2020年11月発売',
    models: [
      { label: 'iPhone 12', href: '/iphone/12normal' },
      { label: 'iPhone 12 mini', href: '/iphone/12mini' },
      { label: 'iPhone 12 Pro', href: '/iphone/12pro' },
      { label: 'iPhone 12 Pro Max', href: '/iphone/12promax' },
    ],
    osEnd: '2027年11月',
    repairEnd: '2029年11月',
  },
  {
    series: 'iPhone SE（第2世代）',
    releaseDate: '2020年4月発売',
    models: [{ label: 'iPhone SE 第2世代', href: '/iphone/se2' }],
    osEnd: '2027年4月',
    repairEnd: '2029年4月',
  },
  {
    series: 'iPhone 11シリーズ',
    releaseDate: '2019年9月発売',
    models: [
      { label: 'iPhone 11', href: '/iphone/11normal' },
      { label: 'iPhone 11 Pro', href: '/iphone/11pro' },
      { label: 'iPhone 11 Pro Max', href: '/iphone/11promax' },
    ],
    osEnd: '2026年9月',
    repairEnd: '2028年9月',
  },
]

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'iOSのサポート期間について',
    label: 'iOSサポート終了のデメリット',
    intro:
      '前述した通り、発売から7年以上が経過しているiPhoneはサポート終了となり、最新iOSへのアップデートができなくなるのが過去の傾向。iOSサポート対象外になったiPhoneを使い続けると下記のデメリットが出てくるのが注意点です。',
    items: [
      {
        term: '進化したウィルスや不正行為に対応出来ない',
        description:
          'OSが更新できないと新しい脆弱性が発見されても、Appleからセキュリティアップデートが提供されなくなるため、iPhoneがハッキングや不正アクセスのリスクにさらされる可能性が高くなります。',
      },
      {
        term: 'アップデートにより追加された新機能が使えない',
        description:
          'AppleはiPhoneの利便性を高める新機能をiOSアップデートのタイミングで提供していますが、サポートが終了すると新機能を試すことができなくなります。',
      },
      {
        term: '一部のアプリが機能しなくなる',
        description:
          'App Storeで配信されているアプリは最新iOSが公開されるとそれに合わせてバージョンアップを図ります。そのため、古いOSではアプリが動かなかったり不具合が起きる場合が出てきます。',
      },
    ],
  },
  {
    title: 'Appleストアの修理サポート期間について',
    label: '用語解説',
    intro:
      'Appleストアへバッテリー交換や画面ひび割れの修理を依頼する場合、所有する端末が「ビンテージ製品」や「オブソリート製品」に該当していないことが条件になります。これらに該当していると修理を依頼できないので、注意しましょう。',
    items: [
      {
        term: 'ビンテージ製品',
        description:
          '販売終了から5年以上7年未満が経過したiPhoneが対象。修理に必要なパーツがない場合に修理サポートが受けられなくなる。',
      },
      {
        term: 'オブソリート製品',
        description:
          '販売終了から7年以上が経ったiPhoneが対象。Appleの正規修理サポートを受けることが一切できなくなる。',
      },
    ],
  },
]

export default function IPhoneLifespanTable() {
  return (
    <LifespanTableBase
      sectionTitle="iPhoneのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間は発売から約7年、修理受付期間は販売終了から約9年を目安として算出した予測値です。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="iPhone機種別サポート期間・寿命予想一覧"
      data={LIFESPAN_DATA}
      showModelsColumn
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
