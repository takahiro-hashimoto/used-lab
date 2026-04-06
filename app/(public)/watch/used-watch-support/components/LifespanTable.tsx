import LifespanTableBase from '@/app/components/support/LifespanTable'
import type { GlossaryGroup } from '@/app/components/support/LifespanTable'
import type { WatchModel } from '@/lib/types'
import { buildWatchLifespanData } from '@/lib/utils/watch-helpers'

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

type Props = { models: WatchModel[] }

export default function WatchLifespanTable({ models }: Props) {
  const data = buildWatchLifespanData(models)

  return (
    <LifespanTableBase
      data={data}
      sectionTitle="Apple Watchのサポート期間一覧（寿命予想）"
      sectionDescription={
        <>
          過去の傾向をもとに、OSサポート期間は発売から約5年、修理受付期間は販売終了から約7年を目安として算出した予測値です。
          <br />
          実際の期間はAppleの公式発表をご確認ください。
        </>
      }
      tableCaption="Apple Watch機種別サポート期間・寿命予想一覧"
      glossaryGroups={GLOSSARY_GROUPS}
    />
  )
}
