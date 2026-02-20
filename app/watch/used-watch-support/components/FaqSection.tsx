import FaqSectionBase from '@/app/components/support/FaqSection'
import type { FaqItem } from '@/app/components/support/FaqSection'

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Apple Watchの寿命は一般的にどのくらいですか？',
    answer:
      'Apple Watchの寿命は、一般的に発売から5年〜6年程度が目安とされています。これは、最新のwatchOSアップデートが提供される期間と、Appleによる修理サポート（部品供給）の期間に基づいています。特に、販売終了から5年が過ぎ「ビンテージ製品」に指定されると、故障時に修理ができなくなるリスクが高まるため、買い替えを検討する大きなタイミングとなります。',
  },
  {
    question: 'watchOSのサポートが終了したApple Watchは使い続けても大丈夫？',
    answer:
      '時計としての使用や通知の受け取りなどは可能ですが、安全性と利便性の面でリスクがあります。最新のアプリがインストールできなくなるだけでなく、iPhoneを最新のiOSにアップデートした際に「ペアリングが解除される」「同期が不安定になる」といった連携トラブルが起きやすくなります。また、SuicaやPayPayなどの決済アプリや、LINEの通知機能が正しく動作しなくなるケースもあるため、日常的に活用している方は注意が必要です。',
  },
  {
    question: 'バッテリーが劣化してきたら買い替えた方がいい？',
    answer:
      '「1日充電が持たなくなった」「朝100%でも夕方には切れる」といった症状は、バッテリー寿命のサインです。Apple Watchは本体が小さいため、バッテリーの劣化が利便性に直結します。Apple公式サイトでの「バッテリーサービス（交換）」の料金と、新しいモデル（または高年式の中古品）の価格を比較して判断するのがポイントです。発売から5年以上経っているモデルであれば、修理よりも最新のセンサーを搭載したモデルへの買い替えの方が満足度は高いでしょう。',
  },
]

export default function WatchFaqSection() {
  return (
    <FaqSectionBase
      title="Apple Watchの寿命に関するよくある質問"
      description="Apple Watchの寿命やサポートに関して、よく寄せられる質問をまとめました。"
      items={FAQ_ITEMS}
    />
  )
}
