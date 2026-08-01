import Link from 'next/link'
import type { FaqItem, CheckItem, FailurePattern, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'Pixel',
  productBenefit: <>中古Google Pixelを長く使いたい方におすすめです。</>,
  appleCarePrice: 'ー（対象外）',
  appleCareYears: 'ー',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古Google Pixelを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリでは赤ロム、バッテリー劣化、Googleアカウント・端末保護機能（FRP）の未解除などのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古Pixelを買う方は、赤ロム保証・初期不良保証のある中古スマホ専門店を選びましょう。
        </p>
      </>
    ),
  },
  {
    question: 'ネットワーク制限△は本当に使えなくなる？',
    answer: (
      <>
        <p>
          「△」は現時点では使えますが、将来「×」になるリスクがあります。前の所有者が分割払いを滞納したり、端末が盗難届けの対象になった場合に通信できなくなります。キャリア版（au／SoftBankなど）のPixelを中古で買う場合は特に注意が必要です。
        </p>
        <p>
          ただし、<strong>赤ロム永久保証付きの中古ショップで購入すれば、万が一×になっても交換・返金してもらえるためリスクはほぼありません。</strong>相場より安く買えるメリットもあるので、コストを抑えたい方は検討する価値があります。信頼できる購入先は<Link prefetch={false} href="/pixel/pixel-shop/">中古Pixelの購入先おすすめ比較</Link>で紹介しています。
        </p>
      </>
    ),
  },
  {
    question: 'バッテリーが劣化していないか心配。どこを見ればいい？',
    answer: (
      <>
        <p>
          Pixelはバッテリーの最大容量（％）をiPhoneのように明確に表示しませんが、Android 14以降の設定から<strong>充電サイクル数・製造日</strong>を確認できます。サイクル数が多い個体ほど劣化が進んでいます。
        </p>
        <p>
          発売から年数が経った個体や、体感で電池持ちが悪いものは避けましょう。劣化していると「本体価格＋バッテリー交換費用（Google正規修理で13,000円前後〜）」で総額を計算し、他の端末と比較するのがおすすめです。
        </p>
      </>
    ),
  },
  {
    question: 'Googleアカウントのロック（端末保護機能）がかかっていたらどうする？',
    answer: (
      <>
        <p>
          自分では解除できません。前の所有者のGoogleアカウントとパスワードが必要です。初期化しても端末保護機能（Factory Reset Protection＝FRP）が働き、そのアカウントでのログインを求められて先に進めなくなります。購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。
        </p>
        <p>
          フリマで購入した場合は出品者にアカウント削除・初期化を依頼する必要がありますが、連絡が取れなくなるケースも多いため、保証のある中古ショップでの購入をおすすめします。
        </p>
      </>
    ),
  },
  {
    question: '中古Google PixelでもGoogleの補償サービスに入れる？',
    answer: (
      <>
        <p>
          入れません。Googleの延長保証（Preferred Care）は「新品購入時」が加入条件のため、中古端末は対象外です。iPhoneのApple Care+と同じく、中古で買った端末はメーカー系の補償に後から加入できません。
        </p>
        <p>
          代わりに、中古端末でも加入できる「<a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMXFM+45VK+BW0YB&a8ejpredirect=https%3A%2F%2Fmobile-hoken.com%2Flp%2Ftakumi-wp%2F" rel="nofollow noopener" target="_blank"><strong>モバイル保険</strong></a>」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。
        </p>
      </>
    ),
  },
]

export const postCheckItems: CheckItem[] = [
  {
    icon: 'fa-solid fa-lock',
    heading: 'Googleアカウント・端末保護機能（FRP）【最重要】',
    text: (
      <>
        <p>
          初期設定時に前の所有者のGoogleアカウントでのログインを求められたら要注意。<strong>端末保護機能（FRP）が解除されていない端末は、初期化しても使用できません。</strong>
        </p>
        <p>
          出荷時状態（工場出荷リセット済み）で、前の所有者のアカウントが残っていないか確認しましょう。ロックがかかっていた場合はすぐにショップへ連絡してください。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-signal',
    heading: 'ネットワーク制限の再確認',
    text: (
      <>
        <p>
          キャリア版を購入時に「◯」でも、届いた後に再度確認しましょう。「設定」→「デバイス情報」からIMEIをメモし、各キャリアの確認サイトで入力すれば現在の状態がわかります。
        </p>
        <p>
          「△」や「×」になっていたら返品対象です。SIMフリー版（Google Store版）は対象外です。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-battery-half',
    heading: 'バッテリーの状態',
    text: (
      <>
        <p>
          「設定」→「バッテリー」から、Android 14以降は充電サイクル数・製造日を確認できます。商品ページの記載や発売時期と比べて極端に劣化していないかチェックしてください。
        </p>
        <p>
          満充電にしても消耗が異常に早い場合や、膨張の兆候（背面の浮き）がある場合は、返品・交換の対象になる可能性があります。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-fingerprint',
    heading: '指紋認証・顔認証（Face Unlock）',
    text: (
      <>
        <p>
          生体認証が正常に動作するか確認。非正規修理品（特に画面交換品）では画面内指紋センサーや顔認証が動作しないことがあります。
        </p>
        <p>
          「設定」→「セキュリティとプライバシー」→「指紋・顔認証」から新規登録を試し、正常に認識されるかテストしてください。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-camera',
    heading: 'カメラ・スピーカー',
    text: (
      <>
        <p>
          前面・背面カメラで写真・動画を撮影し、フォーカス・手ブレ補正が正常に動くかを確認。望遠搭載モデルはズーム動作もチェックしましょう。
        </p>
        <p>
          動画再生でスピーカーをテストし、音割れやノイズがないかもチェックしましょう。通話用スピーカー（受話口）も忘れずに。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-wallet',
    heading: 'おサイフケータイ（FeliCa）',
    text: (
      <>
        <p>
          モバイルSuicaやiD／QUICPayを使いたい方は、おサイフケータイ（FeliCa）が動作するか確認しましょう。国内版のPixel 6以降はFeliCa対応ですが、<strong>海外版は非対応</strong>のことがあります。
        </p>
        <p>
          NFC／FeliCaの読み取りが反応しない場合は、海外版だったり故障している可能性があります。
        </p>
      </>
    ),
  },
]

export const failurePatterns: FailurePattern[] = [
  {
    icon: 'fa-solid fa-yen-sign',
    heading: '価格だけで決めた',
    text: (
      <>
        <p>
          「安いから」という理由だけで購入し、届いてから赤ロムやバッテリー劣化に気づくパターン。
        </p>
        <p>
          安さには必ず理由があります。相場より極端に安い端末は、何かしらのリスクを抱えている可能性が高いです。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-battery-quarter',
    heading: 'バッテリーを軽視した',
    text: (
      <>
        <p>
          外装ランクだけを見て購入し、バッテリーの状態を確認しなかったパターン。「美品」でも発売から年数が経ち充電サイクルが多い個体は、電池持ちが悪いことも。
        </p>
        <p>
          結局バッテリー交換費用がかかり、割高になってしまうケースが多いです。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-calendar-xmark',
    heading: 'サポート期間を見ていなかった',
    text: (
      <>
        <p>
          古い機種を安く買ったものの、すぐにAndroidのアップデート保証が終了したパターン。セキュリティ更新が止まったり最新機能が使えなくなったりして、結局買い替えが必要に。
        </p>
        <p>
          <strong>「あと何年アップデートされるか」</strong>を考えずに購入すると損をします。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-globe',
    heading: '海外版・技適なしを買ってしまった',
    text: (
      <>
        <p>
          相場より安い海外版を買ったら、技適マークがなく国内で電波を出すと違法になる、おサイフケータイ（FeliCa）が使えない、といった落とし穴にはまるパターン。
        </p>
        <p>
          国内正規版（技適あり・FeliCa対応）かどうかは購入前に必ず確認しましょう。
        </p>
      </>
    ),
  },
]
