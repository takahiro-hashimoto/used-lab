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
          初めて中古iPadを買う方は、<strong>初期不良保証のある中古専門店</strong>を選びましょう。
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
          ただし、セルラーモデルはSIMカードの契約が別途必要です。中古の場合は<strong>SIMロックの有無やネットワーク利用制限の確認</strong>も必要になります。
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
          「赤ロム」とは、<strong>ネットワーク利用制限がかかり通信ができなくなった端末</strong>のことです。セルラーモデルのiPadで、前の所有者が分割払いを滞納した場合などに発生します。
        </p>
        <p>
          赤ロムになるとSIMカードを挿しても通信できません。Wi-Fiは引き続き使えますが、セルラーモデルとしての価値は大きく下がります。中古ショップでは<strong>ネットワーク利用制限の判定（◯/△/×）</strong>を確認でき、赤ロム保証を設けている店舗もあります。
        </p>
      </>
    ),
  },
  {
    question: 'iPadOSのサポートが切れるとどうなる？',
    answer: (
      <>
        <p>
          iPadOSのサポートが終了すると、<strong>新しいiPadOSへのアップデートができなくなります</strong>。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。
        </p>
        <p>
          また、アプリ側が最新OSを必須条件にすると、<strong>対応アプリが徐々に減っていきます</strong>。すぐに使えなくなるわけではありませんが、時間の経過とともに不便さが増していくため、中古iPadを選ぶ際はサポート残り期間を重視しましょう。
        </p>
      </>
    ),
  },
]

export const postCheckItems: CheckItem[] = [
  {
    heading: 'アクティベーションロック【最重要】',
    text: (
      <p>
        初期設定時に前の所有者のApple IDを求められたら要注意。<strong>アクティベーションロックが解除されていない端末は使用できません。</strong>「iPadを探す」がオフになっているか確認しましょう。ロックがかかっていた場合はすぐにショップへ連絡してください。
      </p>
    ),
  },
  {
    heading: 'ディスプレイの状態',
    text: (
      <p>
        iPadは画面が大きいため、<strong>ドット抜け・色ムラ・焼き付き</strong>が目立ちやすいです。白い画面・黒い画面・赤い画面を表示させて確認しましょう。特にiPad Proの有機EL（タンデムOLED）モデルは焼き付きに注意が必要です。
      </p>
    ),
  },
  {
    heading: 'Touch ID / Face ID',
    text: (
      <p>
        生体認証が正常に動作するか確認。<strong>非正規修理品では動作しないことがあります。</strong>「設定」→「Touch IDとパスコード」（またはFace ID）から新規登録を試し、正常に認識されるかテストしてください。
      </p>
    ),
  },
  {
    heading: '充電ポート（Lightning / USB-C）',
    text: (
      <p>
        充電ケーブルを挿して<strong>正常に充電されるか</strong>を確認。接触不良で充電が途切れる端末もあります。USB-Cモデルの場合は、外部ディスプレイ出力やデータ転送もテストしましょう。
      </p>
    ),
  },
  {
    heading: 'カメラ・スピーカー',
    text: (
      <p>
        前面・背面カメラで写真を撮影し、<strong>フォーカスが正常か</strong>を確認。スピーカーは動画再生でテストし、音割れ・音量の左右差がないかチェックしましょう。iPadは4スピーカーモデルもあるため、全方向から音が出るか確認してください。
      </p>
    ),
  },
  {
    heading: 'Apple Pencil接続（該当者のみ）',
    text: (
      <p>
        Apple Pencilを使う予定の方は、<strong>ペアリングと充電が正常にできるか</strong>を確認。第2世代やProの場合はマグネット吸着が弱くなっていないかもチェック。反応の遅延や筆圧感知のテストも行いましょう。
      </p>
    ),
  },
]

export const failurePatterns: FailurePattern[] = [
  {
    heading: 'Apple Pencilが使えなかった',
    text: (
      <p>
        「iPadでイラストを描きたい」と思って中古iPadを買ったものの、手持ちのApple Pencilに非対応だったパターン。<strong>Apple Pencilは世代ごとに対応モデルが違います。</strong>購入前に必ず対応表を確認しましょう。
      </p>
    ),
  },
  {
    heading: 'ストレージが足りなかった',
    text: (
      <p>
        安いからと32GBモデルを購入し、アプリを数個入れただけで容量がいっぱいに。iPadはSDカードで増設できないため、<strong>容量不足は致命的</strong>です。動画やゲームを楽しむなら最低64GB、クリエイティブ用途なら128GB以上が必要です。
      </p>
    ),
  },
  {
    heading: 'すぐにiPadOSサポートが切れた',
    text: (
      <p>
        古いモデルを安く買ったものの、購入後すぐにiPadOSのサポートが終了したパターン。アプリが使えなくなったり、セキュリティリスクが高まったりして結局買い替えが必要に。<strong>「あと何年使えるか」</strong>を考えずに購入すると損をします。
      </p>
    ),
  },
  {
    heading: 'Wi-Fiモデルで外出先で使えなかった',
    text: (
      <p>
        安いWi-Fiモデルを買ったが、カフェや移動中にネット接続できず不便だったパターン。テザリングで対処は可能ですが、<strong>毎回スマホと接続する手間</strong>がかかります。外出利用が多い方はセルラーモデルを検討しましょう。
      </p>
    ),
  },
]
