import FaqSectionBase from '@/app/components/support/FaqSection'
import type { FaqItem } from '@/app/components/support/FaqSection'

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'iPadの寿命は一般的にどのくらいですか？',
    answer:
      'iPadの寿命は約7年が一つの目安です。iPadOSのアップデートは発売から約6〜7年間提供される傾向があり、アップデート終了後はセキュリティリスクが高まります。Appleでは販売終了から7年以上の製品を「オブソリート製品」と定義しており、修理サポートが受けられなくなります。',
  },
  {
    question: 'iPadOSのサポートが終了したiPadは使い続けても大丈夫？',
    answer:
      '使用自体は可能ですが、メイン端末としての利用はおすすめしません。iPadOSのサポートが終了するとセキュリティアップデートが届かなくなり、不正アクセスやウイルス感染のリスクが高まります。動画視聴専用やサブ端末としてWi-Fi環境で使うなど、用途を限定するのがベターです。',
  },
  {
    question: 'iPadのバッテリー最大容量は確認できる？',
    answer:
      'iPadにはiPhoneのような「バッテリーの状態」画面がないため、設定アプリから最大容量を直接確認することはできません。充電の持ち時間が購入時より明らかに短くなったと感じた場合は、バッテリーが劣化している可能性が高いです。Apple StoreやApple正規サービスプロバイダに依頼すれば、診断ツールで正確な状態を確認できます。',
  },
]

export default function IPadFaqSection() {
  return (
    <FaqSectionBase
      title="iPadの寿命に関するよくある質問"
      description="iPadの寿命やサポートに関して、よく寄せられる質問をまとめました。"
      items={FAQ_ITEMS}
    />
  )
}
