import Link from 'next/link'
import type { FaqItem, CheckItem, FailurePattern, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'Samsung Galaxy',
  productBenefit: <>中古Samsung Galaxyを長く使いたい方におすすめです。</>,
  appleCarePrice: '990円〜',
  appleCareYears: '2年（延長可）',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古Galaxyを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリでは赤ロム、バッテリー劣化、Reactivation Lock（端末保護機能）未解除などのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古Galaxyを買う方は、赤ロム保証・初期不良保証のある中古スマホ専門店を選びましょう。<Link prefetch={false} href="/galaxy/galaxy-shop/">中古Galaxyのおすすめショップ比較</Link>も参考にしてみてください。
        </p>
      </>
    ),
  },
  {
    question: 'ネットワーク制限△は本当に使えなくなる？',
    answer: (
      <>
        <p>
          「△」は現時点では使えますが、将来「×」になるリスクがあります。前の所有者が分割払いを滞納したり、端末が盗難届けの対象になった場合に通信できなくなります。
        </p>
        <p>
          ただし、<strong>赤ロム永久保証付きの中古ショップで購入すれば、万が一×になっても交換・返金してもらえるためリスクはほぼありません。</strong>相場より安く買えるメリットもあるので、コストを抑えたい方は検討する価値があります。
        </p>
      </>
    ),
  },
  {
    question: 'Galaxyのバッテリー状態はどう確認する？',
    answer: (
      <>
        <p>
          GalaxyはiPhoneのような「最大容量◯%」表示がありません。<strong>Samsung Membersアプリの「診断」→「バッテリー状態」</strong>で「良好／交換が必要」といった判定を確認できます。
        </p>
        <p>
          中古で状態が不明な場合は、バッテリー状態を検品・表記しているショップを選ぶと安心です。劣化が進んだ個体は交換費用（Samsung公式で8,800円前後〜）がかかり割高になることがあります。
        </p>
      </>
    ),
  },
  {
    question: '端末保護機能（Reactivation Lock / FRP）がかかっていたらどうする？',
    answer: (
      <>
        <p>
          自分では解除できません。前の所有者のSamsungアカウントやGoogleアカウントとパスワードが必要です。初期化しても初回設定時に元の所有者のアカウント入力を求められ、先へ進めなくなります。
        </p>
        <p>
          購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。フリマでは出品者と連絡が取れなくなるケースも多いため、保証のある中古ショップでの購入をおすすめします。
        </p>
      </>
    ),
  },
  {
    question: '中古Galaxyでも入れる保険はある？',
    answer: (
      <>
        <p>
          あります。GalaxyはApple Care+のようなメーカー保証を中古で引き継げませんが、端末を問わず中古端末でも加入できる「<a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMXFM+45VK+BW0YB&a8ejpredirect=https%3A%2F%2Fmobile-hoken.com%2Flp%2Ftakumi-wp%2F" rel="nofollow noopener" target="_blank"><strong>モバイル保険</strong></a>」などのサービスを検討しましょう。
        </p>
        <p>
          月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。折りたたみモデル（Z Flip / Z Fold）のように修理費が高額になりやすい端末ほど加入メリットが大きくなります。
        </p>
      </>
    ),
  },
]

export const postCheckItems: CheckItem[] = [
  {
    icon: 'fa-solid fa-lock',
    heading: '端末保護機能（Reactivation Lock / FRP）【最重要】',
    text: (
      <>
        <p>
          初回設定時に前の所有者のSamsungアカウントやGoogleアカウントを求められたら要注意。<strong>Reactivation Lock（端末保護機能）やFactory Reset Protection（FRP）が残っている端末は使用できません。</strong>
        </p>
        <p>
          工場出荷状態（初期化済み）から自分のアカウントで問題なくセットアップできるかを確認しましょう。ロックがかかっていた場合はすぐにショップへ連絡してください。
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
          購入時に「◯」でも、届いた後に再度確認しましょう。「設定」→「デバイス情報（端末情報）」→「ステータス情報」からIMEIをメモし、各キャリアの確認サイトで入力すれば現在の状態がわかります。
        </p>
        <p>
          「△」や「×」になっていたら返品対象です。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-battery-half',
    heading: 'バッテリー状態',
    text: (
      <>
        <p>
          Samsung Membersアプリの「診断」→「バッテリー状態」で「良好／交換が必要」を確認。商品ページの記載と一致しているかをチェックしてください。
        </p>
        <p>
          記載より状態が悪い場合は、返品・交換の対象になる可能性があります。急速な残量減りや発熱がないかも合わせて確認しましょう。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-fingerprint',
    heading: '指紋認証 / 顔認証',
    text: (
      <>
        <p>
          画面内指紋センサーや顔認証が正常に動作するか確認。非正規のディスプレイ交換品では指紋センサーが反応しないことがあります。
        </p>
        <p>
          「設定」→「セキュリティおよびプライバシー」→「生体認証」から新規登録を試し、正常に認識されるかテストしてください。
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
          広角・超広角・望遠と各カメラで写真・動画を撮影し、フォーカス・手ブレ補正が正常に動くかを確認。Ultraは高倍率ズームの動作もチェックしましょう。
        </p>
        <p>
          動画再生でステレオスピーカーをテストし、音割れやノイズがないかもチェック。通話用スピーカー（受話口）も忘れずに。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-display',
    heading: '有機ELディスプレイの焼き付き・緑線',
    text: (
      <>
        <p>
          Galaxyの有機EL（AMOLED）は、長時間の使用で画面の焼き付きや、まれに緑色の縦線（グリーンライン）が出ることがあります。白一色・グレー一色を表示して残像やムラがないか確認しましょう。
        </p>
        <p>
          折りたたみモデルは中央の折り目部分のタッチ反応や、内側保護フィルムの浮き・剥がれも合わせてチェックしてください。
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
          外装ランクだけを見て購入し、バッテリー状態を確認しなかったパターン。「美品」でもバッテリーが劣化していることも。
        </p>
        <p>
          結局バッテリー交換費用がかかり、割高になってしまうケースが多いです。折りたたみは分解を伴い交換費が高めになりがちです。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-calendar-xmark',
    heading: 'アップデート期間を見ていなかった',
    text: (
      <>
        <p>
          古い機種を安く買ったものの、すぐにAndroidのOS・セキュリティ更新が終了したパターン。アプリが対応しなくなったり、セキュリティリスクが高まったりして、結局買い替えが必要に。
        </p>
        <p>
          <strong>「あと何年更新が受けられるか」</strong>を考えずに購入すると損をします。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-mobile-screen-button',
    heading: '折りたたみの状態を見落とした',
    text: (
      <>
        <p>
          Z Flip / Z Foldを安く買ったら、ヒンジのガタつきや画面折り目のタッチ不良、内側保護フィルムの剥がれがあったパターン。
        </p>
        <p>
          折りたたみは可動部と内側ディスプレイが弱点。開閉のスムーズさ・折り目の状態・防塵性能（IPX8世代など水濡れに注意）を必ず確認しましょう。
        </p>
      </>
    ),
  },
]
