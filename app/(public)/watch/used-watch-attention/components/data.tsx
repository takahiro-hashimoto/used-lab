import type { FaqItem, CheckItem, FailurePattern, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'Apple Watch',
  productBenefit: <>中古Apple Watchを長く使いたい方におすすめです。Apple Watchは画面が小さいものの衝撃を受けやすい位置にあるため、保険に入っておくと安心です。</>,
  appleCarePrice: '380円〜1,180円',
  appleCareYears: '2年（延長可）',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古Apple Watchを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではアクティベーションロック未解除、バッテリー劣化の詐称、ケースの傷の見落としなどのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古Apple Watchを買う方は、初期不良保証のある中古専門店を選びましょう。
        </p>
      </>
    ),
  },
  {
    question: 'GPSモデルとセルラーモデルどちらがいい？',
    answer: (
      <>
        <p>
          iPhoneを常に持ち歩くならGPSモデルで十分です。iPhoneなしで通話やメッセージを使いたい場合はセルラーモデルを選びましょう。
        </p>
        <p>
          ただし、セルラーモデルはキャリアのウォッチナンバー契約（月額385円〜）が別途必要です。格安SIM（MVNO）ではウォッチプランに対応していないケースがほとんどのため、利用キャリアの対応状況を事前に確認してください。詳しくは「<a href="/watch/gps-cellular-compare/">GPSモデルとセルラーモデルの違い比較</a>」で解説しています。
        </p>
      </>
    ),
  },
  {
    question: '中古Apple WatchでもApple Care+に入れる？',
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
    question: 'watchOSのサポートが切れるとどうなる？',
    answer: (
      <>
        <p>
          watchOSのサポートが終了すると、新しいwatchOSへのアップデートができなくなります。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。
        </p>
        <p>
          また、アプリ側が最新OSを必須条件にすると、対応アプリが徐々に減っていきます。Apple Watchはサポート期間が約5年と短いため、中古を選ぶ際はサポート残り期間を重視しましょう。
        </p>
      </>
    ),
  },
  {
    question: 'Apple Watchのサイズが違ってもバンドは使いまわせる？',
    answer: (
      <>
        <p>
          同じ系統のサイズであれば使いまわせます。38mm/40mm/41mm系と42mm/44mm/45mm/46mm系でそれぞれ互換性があり、世代をまたいでバンドを共有できます。
        </p>
        <p>
          ただし、Apple Watch Series 10以降は新しいバンド幅が導入されており、旧バンドとの互換性に制限がある場合があります。また、Ultraシリーズは49mmの専用バンドが必要です。購入前にバンドの対応サイズを確認しておきましょう。
        </p>
      </>
    ),
  },
]

export const postCheckItems: CheckItem[] = [
  {
    icon: 'fa-solid fa-link',
    heading: 'iPhoneとのペアリング【最重要】',
    text: (
      <>
        <p>
          Apple Watchの電源を入れ、iPhoneのWatchアプリからペアリングを試みましょう。アクティベーションロックが残っている場合、ここで発覚します。
        </p>
        <p>
          正常にペアリングできない場合はすぐにショップへ連絡してください。
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
          ペアリング後、Apple Watchの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認しましょう。
        </p>
        <p>
          80%を大きく下回っている場合は駆動時間が短く、実用に支障が出る可能性があります。
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
          Apple Watchの画面は小さいため、<strong>タッチの反応が悪い箇所がないか</strong>を端から端までスワイプして確認しましょう。
        </p>
        <p>
          常時表示ディスプレイ対応モデルは、手首を下ろした状態でも正常に表示されるかチェックしてください。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    heading: '心拍センサー・ヘルスケア機能',
    text: (
      <>
        <p>
          背面の心拍センサーが正常に動作するか、「心拍数」アプリで計測を試してください。
        </p>
        <p>
          血中酸素・心電図機能がある機種は、それらのセットアップも確認しましょう。センサー部分の汚れや傷がある場合は精度に影響します。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-volume-high',
    heading: 'スピーカー・マイク',
    text: (
      <>
        <p>
          Siriに話しかけてマイクの認識とスピーカーの音質を確認しましょう。
        </p>
        <p>
          Apple Watchは防水構造のため、内部に水が侵入するとスピーカーの音がこもることがあります。通話機能も実際にテストするとより確実です。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-gear',
    heading: 'Digital Crown・サイドボタン',
    text: (
      <>
        <p>
          Digital Crown（リューズ）の回転がスムーズか、押し込み・回転の両方が正常に動作するかを確認。
        </p>
        <p>
          サイドボタンもクリック感があるかチェックしましょう。砂やホコリが詰まって動作が鈍くなっているケースがあります。
        </p>
      </>
    ),
  },
]

export const failurePatterns: FailurePattern[] = [
  {
    icon: 'fa-solid fa-calendar-xmark',
    heading: 'サポート期間を確認しなかった',
    text: (
      <>
        <p>
          古い機種を安く買ったものの、すぐにwatchOSサポートが終了したパターン。
        </p>
        <p>
          Apple Watchのサポート期間は約5年と<strong>iPhoneより短い</strong>ため、「まだ使えるだろう」という感覚で買うと失敗しやすいです。アプリが非対応になると時計としてしか使えなくなります。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-battery-quarter',
    heading: 'バッテリー劣化を軽視した',
    text: (
      <>
        <p>
          外装がきれいだからと安心して購入したが、バッテリーが大幅に劣化していたパターン。
        </p>
        <p>
          Apple Watchは元々の駆動時間が「最大18時間」と短いため、<strong>バッテリーが80%に劣化すると半日しか持たない</strong>ことも。交換費用も12,200円〜と割高です。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-lock',
    heading: 'ペアリングできない端末を買った',
    text: (
      <>
        <p>
          フリマで安く購入したが、アクティベーションロックが解除されておらず使えなかったパターン。
        </p>
        <p>
          Apple Watchは出品写真だけではロック状態を確認できません。出品者と連絡が取れなくなると解除の手段がなく、完全に使えない端末を買ったことになります。
        </p>
      </>
    ),
  },
  {
    icon: 'fa-solid fa-yen-sign',
    heading: '相場を知らずに割高で買った',
    text: (
      <>
        <p>
          中古相場を調べずに買ったら、新品との価格差がほとんどなかったというパターン。
        </p>
        <p>
          Apple Watch SEなど元値が安いモデルは中古でも値崩れしにくく、差額が数千円しかないことも。新品の保証やバッテリーの安心感を考えると損をしてしまいます。
        </p>
      </>
    ),
  },
]
