import type { FaqItem, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'AirPods',
  productBenefit: <>中古AirPodsを長く使いたい方におすすめです。</>,
  appleCarePrice: '580円',
  appleCareYears: '2年',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古AirPodsを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではコピー品（偽物）、バッテリー劣化、アクティベーションロック未解除などのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古AirPodsを買う方は、検品体制と初期不良保証のある中古専門店を選びましょう。
        </p>
      </>
    ),
  },
  {
    question: '中古AirPodsのバッテリーはどのくらい持つ？',
    answer: (
      <>
        <p>
          使用期間や頻度によって大きく異なります。新品のAirPods Proで約6時間の連続再生が可能ですが、中古品はバッテリー劣化により再生時間が短くなっている場合があります。
        </p>
        <p>
          <strong>購入前に使用期間・使用頻度を確認し、ECサイトで購入する場合はランクの高い商品を選ぶのがおすすめです。</strong>
        </p>
      </>
    ),
  },
  {
    question: 'アクティベーションロックがかかっていたらどうする？',
    answer: (
      <>
        <p>
          自分では解除できません。前の所有者のApple IDとパスワードが必要です。購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。
        </p>
        <p>
          フリマで購入した場合は出品者に解除を依頼する必要がありますが、連絡が取れなくなるケースも多いため、保証のある中古ショップでの購入をおすすめします。
        </p>
      </>
    ),
  },
  {
    question: '中古AirPodsでもApple Care+に入れる？',
    answer: (
      <>
        <p>
          入れません。Apple Care+は「新品購入から30日以内」が加入条件のため、中古端末は対象外です。
        </p>
        <p>
          代わりに、中古端末でも加入できる「<a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMXFM+45VK+BW0YB&a8ejpredirect=https%3A%2F%2Fmobile-hoken.com%2Flp%2Ftakumi-wp%2F" rel="nofollow noopener" target="_blank"><strong>モバイル保険</strong></a>」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。
        </p>
      </>
    ),
  },
  {
    question: '中古AirPodsの偽物を見分ける方法は？',
    answer: (
      <>
        <p>
          シリアル番号を<a href="https://support.apple.com/ja-jp/HT204308" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>で検索するのが最も確実です。正規品であればシリアル番号が正しく認識されます。
        </p>
        <p>
          フリマで購入する場合は、出品者にシリアル番号を確認してから購入しましょう。信頼できる中古ECサイトで購入すれば、コピー品のリスクはほぼありません。
        </p>
      </>
    ),
  },
]

/** 保証期間比較テーブル用データ */
export const warrantyTableData = [
  { shop: 'eイヤホン', warranty: '30日間の商品保証' },
  { shop: 'イオシス', warranty: '未使用品：6ヶ月保証 / 中古 (A/B/Cランク)：3ヶ月保証' },
  { shop: 'リコレ（ビックカメラグループ）', warranty: '1か月の商品保証' },
  { shop: 'ゲオオンラインストア', warranty: '30日間の商品保証' },
  { shop: 'パソコン工房', warranty: 'なし～3ヶ月間（商品によって異なる）' },
  { shop: 'じゃんぱら', warranty: 'なし～1ヶ月間（商品によって異なる）' },
]
