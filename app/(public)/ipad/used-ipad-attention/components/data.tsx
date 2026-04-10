import Link from 'next/link'
import type { FaqItem, CheckItem, FailurePattern, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'iPad',
  productBenefit: <>中古iPadを長く使いたい方におすすめです。iPadは画面が大きく割れやすいため、保険の価値はiPhone以上とも言えます。</>,
  appleCarePrice: '580円〜1,580円',
  appleCareYears: '2年（延長可）',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古iPadを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではバッテリー劣化の詐称、アクティベーションロック未解除、付属品の動作不良などのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古iPadを買う方は、初期不良保証のある中古専門店を選びましょう。
        </p>
      </>
    ),
  },
  {
    question: 'Wi-Fiモデルとセルラーモデルどちらがいい？',
    answer: (
      <>
        <p>
          自宅やオフィスなどWi-Fi環境がある場所での使用がメインならWi-Fiモデルで十分です。外出先でも単体で通信したい場合はセルラーモデルを選びましょう。
        </p>
        <p>
          ただし、セルラーモデルはSIMカードの契約が別途必要です。中古の場合はSIMロックの有無やネットワーク利用制限の確認も必要になります。詳しくは「<Link href="/ipad/wifi-cellular/">Wi-FiモデルとCellularモデルの違い</Link>」で解説しています。
        </p>
      </>
    ),
  },
  {
    question: '中古iPadでもApple Care+に入れる？',
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
    question: '中古iPadの「赤ロム」って何？',
    answer: (
      <>
        <p>
          「赤ロム」とは、ネットワーク利用制限がかかり通信ができなくなった端末のことです。セルラーモデルのiPadで、前の所有者が分割払いを滞納した場合などに発生します。
        </p>
        <p>
          赤ロムになるとSIMカードを挿しても通信できません。Wi-Fiは引き続き使えますが、セルラーモデルとしての価値は大きく下がります。中古ショップではネットワーク利用制限の判定（◯/△/×）を確認でき、赤ロム保証を設けている店舗もあります。
        </p>
      </>
    ),
  },
  {
    question: 'iPadOSのサポートが切れるとどうなる？',
    answer: (
      <>
        <p>
          iPadOSのサポートが終了すると、新しいiPadOSへのアップデートができなくなります。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。
        </p>
        <p>
          また、アプリ側が最新OSを必須条件にすると、対応アプリが徐々に減っていきます。すぐに使えなくなるわけではありませんが、時間の経過とともに不便さが増していくため、中古iPadを選ぶ際はサポート残り期間を重視しましょう。
        </p>
      </>
    ),
  },
]

export const postCheckItems: CheckItem[] = [
  {
    icon: 'fa-solid fa-lock',
    heading: 'アクティベーションロック【最重要】',
    text: (
      <>
        <p>
          初期設定時に前の所有者のApple IDを求められたら要注意。<strong>ロック未解除の端末は使用不可。</strong>
        </p>
        <p>
          「iPadを探す」がオフか確認し、ロックがあればすぐショップへ連絡。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-display',
    heading: 'ディスプレイの状態',
    text: (
      <>
        <p>
          白・黒・赤の画面を表示し、ドット抜け・色ムラ・焼き付きを確認。
        </p>
        <p>
          iPad Proの有機EL（タンデムOLED）モデルは焼き付きに特に注意。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-fingerprint',
    heading: 'Touch ID / Face ID',
    text: (
      <>
        <p>
          「設定」→「Touch IDとパスコード」（またはFace ID）から新規登録を試し、正常に認識されるか確認。
        </p>
        <p>
          非正規修理品では動作しない場合あり。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-plug',
    heading: '充電ポート（Lightning / USB-C）',
    text: (
      <>
        <p>
          ケーブルを挿して正常に充電されるか確認。接触不良で途切れる端末もあり。
        </p>
        <p>
          USB-Cモデルは外部ディスプレイ出力もテスト推奨。
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
          前面・背面カメラのフォーカスを確認。スピーカーは動画再生で音割れ・左右差をチェック。
        </p>
        <p>
          4スピーカーモデルは全方向の音出しを確認。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-pen-nib',
    heading: 'Apple Pencil接続（該当者のみ）',
    text: (
      <>
        <p>
          ペアリングと充電が正常か確認。第2世代・Proはマグネット吸着の強さもチェック。
        </p>
        <p>
          筆圧感知や反応の遅延もテスト。
        </p>
      </>
    ),
  },
]

export const failurePatterns: FailurePattern[] = [
  {
    icon: 'fa-solid fa-pen-ruler',
    heading: 'Apple Pencilが使えなかった',
    text: (
      <>
        <p>
          手持ちのApple Pencilに非対応だったパターン。<strong>Apple Pencilは世代ごとに対応モデルが異なります。</strong>
        </p>
        <p>
          購入前に必ず対応表を確認。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-hard-drive',
    heading: 'ストレージが足りなかった',
    text: (
      <>
        <p>
          安さで32GBを選び、アプリ数個で容量不足に。iPadはSDカード増設不可のため<strong>容量不足は致命的。</strong>
        </p>
        <p>
          動画・ゲーム用途なら最低64GB、クリエイティブなら128GB以上を。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-clock-rotate-left',
    heading: 'すぐにiPadOSサポートが切れた',
    text: (
      <>
        <p>
          古いモデルを安く買い、すぐにiPadOSサポートが終了。アプリが使えなくなり買い替えに。
        </p>
        <p>
          <strong>「あと何年使えるか」</strong>を必ず確認。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-wifi',
    heading: 'Wi-Fiモデルで外出先で使えなかった',
    text: (
      <>
        <p>
          カフェや移動中にネット接続できず不便だったパターン。テザリングで対処可能だが手間がかかる。
        </p>
        <p>
          外出利用が多い方はセルラーモデルを検討。
        </p>
      </>
    ),
  },
]
