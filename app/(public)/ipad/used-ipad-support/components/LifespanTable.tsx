import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { IPadModel } from '@/lib/types'
import { buildIPadLifespanData } from '@/lib/utils/ipad-helpers'

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

type Props = { models: IPadModel[] }

export default function IPadLifespanTable({ models }: Props) {
  const data = buildIPadLifespanData(models)

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
