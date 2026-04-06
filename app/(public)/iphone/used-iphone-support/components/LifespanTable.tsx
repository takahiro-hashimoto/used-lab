import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { IPhoneModel } from '@/lib/types'
import { buildIPhoneLifespanData } from '@/lib/utils/iphone-helpers'

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: 'iOSのサポート期間について',
    label: 'iOSサポート終了のデメリット',
    intro:
      '発売から7年以上が経過しているiPhoneはサポート終了となり、最新iOSへのアップデートができなくなるのが過去の傾向。iOSサポート対象外になったiPhoneを使い続けると下記のデメリットが出てくるのが注意点です。',
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

type Props = { models: IPhoneModel[] }

export default function IPhoneLifespanTable({ models }: Props) {
  const data = buildIPhoneLifespanData(models)

  return (
    <LifespanTableBase
      data={data}
      sectionTitle="iPhoneのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、機種別のiOSサポート期間予測をまとめました。実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="iPhone機種別サポート期間・寿命予想一覧"
      showModelsColumn
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
