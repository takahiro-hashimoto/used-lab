import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { MacBookModel } from '@/lib/types'
import { buildMacBookLifespanData } from '@/lib/utils/macbook-helpers'

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'macOSのサポート期間について',
    label: 'macOSサポート終了のデメリット',
    intro:
      'MacBookはiPhoneと同様に、発売から約7年が経過するとmacOSのアップデート対象外になる傾向があります。なお、古いOSのMacBookを使い続けた場合のデメリットは下記の通りです。',
    items: [
      {
        term: 'セキュリティリスクが高まる',
        description:
          'OSが更新できないと新しい脆弱性が発見されても、Appleからセキュリティアップデートが提供されなくなるため、MacBookがハッキングや不正アクセスのリスクにさらされる可能性が高くなります。',
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
      'Appleストアへバッテリー交換や画面修理を依頼する場合、端末が「ビンテージ製品」や「オブソリート製品」に該当していないことが条件になります。修理サポート対象外になった端末は安心して使用できないので、こちらも買い替えのタイミングと言えます。',
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

type Props = { models: MacBookModel[] }

export default function MacBookLifespanTable({ models }: Props) {
  const data = buildMacBookLifespanData(models)

  return (
    <LifespanTableBase
      data={data}
      sectionTitle="MacBookのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間と修理受付期間の目安を紹介します。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="MacBook機種別サポート期間・寿命予想一覧"
      showModelsColumn
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
