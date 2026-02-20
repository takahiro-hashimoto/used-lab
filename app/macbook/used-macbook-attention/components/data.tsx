import type { FaqItem, CheckItem, FailurePattern, InsuranceProps } from '@/app/components/attention/types'

export const insuranceData: InsuranceProps = {
  productName: 'MacBook',
  productBenefit: <>MacBookはディスプレイ修理だけで数万円かかるため、保険に入っておくと万が一の際に大きな出費を防げます。</>,
  appleCarePrice: '480円〜1,580円',
  appleCareYears: '3年（延長可）',
}

export const faqItems: FaqItem[] = [
  {
    question: 'フリマで中古MacBookを買っても大丈夫？',
    answer: (
      <>
        <p>
          リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではバッテリー劣化の詐称、アクティベーションロック未解除、キーボード不具合の隠蔽などのトラブルが起きやすく、保証もありません。
        </p>
        <p>
          初めて中古MacBookを買う方は、<strong>初期不良保証のある中古専門店</strong>を選びましょう。
        </p>
      </>
    ),
  },
  {
    question: 'Intel MacとApple Silicon Mac、中古で買うならどっち？',
    answer: (
      <>
        <p>
          2026年現在、中古で購入するなら<strong>Apple Silicon（M1以降）搭載モデルを強くおすすめ</strong>します。Intel Macはmacのサポートが終了済みまたは間近のモデルが多く、性能面でもApple Siliconに大きく劣ります。
        </p>
        <p>
          Intel Macは価格が安いですが、<strong>サポート期間の短さを考えるとコスパは良くありません</strong>。予算が限られる場合でも、M1 MacBook Airなら手頃な価格で入手できます。
        </p>
      </>
    ),
  },
  {
    question: '中古MacBookでもApple Care+に入れる？',
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
    question: 'macOSのサポートが切れるとどうなる？',
    answer: (
      <>
        <p>
          macOSのサポートが終了すると、<strong>新しいmacOSへのアップデートができなくなります</strong>。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。
        </p>
        <p>
          また、新しいmacOSを必要とするアプリ（Xcodeの最新版、Final Cut Proなど）が使えなくなります。MacBookのサポート期間は<strong>約7年が目安</strong>ですが、中古で購入する場合はサポート残り期間を重視しましょう。
        </p>
      </>
    ),
  },
  {
    question: '中古MacBookのバッテリーは交換できる？',
    answer: (
      <>
        <p>
          Apple公式で交換可能です。費用はMacBook Airで21,800円、MacBook Proで29,800円〜37,800円です。
        </p>
        <p>
          ただし、MacBookのバッテリーはユーザー自身で交換できない構造のため、<strong>Apple StoreまたはApple正規サービスプロバイダに依頼</strong>する必要があります。交換費用を含めた総額で他の中古品や整備済製品と比較しましょう。
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
        初期設定時に前の所有者のApple IDを求められたら要注意。<strong>アクティベーションロックが解除されていないMacBookは使用できません。</strong>「Macを探す」がオフになっているか確認しましょう。ロックがかかっていた場合はすぐにショップへ連絡してください。
      </p>
    ),
  },
  {
    heading: 'バッテリーの充放電回数',
    text: (
      <p>
        Appleメニュー →「このMacについて」→「詳細情報」→「システムレポート」→「電源」から<strong>充放電回数と状態を確認</strong>しましょう。MacBookのバッテリーは1,000回の充放電で最大容量80%を維持するよう設計されています。回数が多い場合は劣化が進んでいる可能性があります。
      </p>
    ),
  },
  {
    heading: 'キーボード全キーテスト',
    text: (
      <p>
        テキストエディタを開き、<strong>全てのキーが正常に反応するか確認</strong>しましょう。特にスペースバー、Shift、Returnキーは使用頻度が高く不具合が出やすい箇所です。キーの沈み具合にムラがないか、チャタリング（二重入力）が起きていないかもチェックしてください。
      </p>
    ),
  },
  {
    heading: 'ディスプレイの状態',
    text: (
      <p>
        白い画面・黒い画面を表示させて<strong>ドット抜け・色ムラ・輝度ムラ</strong>がないか確認しましょう。MacBookの一部モデルではディスプレイコーティングの剥がれ（ステインゲート問題）が発生することがあります。画面を開閉して<strong>ヒンジの緩みがないか</strong>もチェックしてください。
      </p>
    ),
  },
  {
    heading: 'ポート・充電',
    text: (
      <p>
        USB-C / Thunderboltポート全てにケーブルを挿して<strong>充電・データ転送が正常に動作するか</strong>確認。MagSafe搭載モデルはマグネット吸着が弱くなっていないかもチェック。HDMIポートやSDカードスロットがあるモデルは、それらの動作テストも行いましょう。
      </p>
    ),
  },
  {
    heading: 'スピーカー・マイク・カメラ',
    text: (
      <p>
        音楽を再生してスピーカーの<strong>音割れ・左右のバランス</strong>を確認。FaceTimeやPhoto Boothでカメラとマイクをテストしましょう。MacBookのスピーカー修理はトップケース交換になることが多く高額なため、購入直後のチェックが重要です。
      </p>
    ),
  },
]

export const failurePatterns: FailurePattern[] = [
  {
    heading: '安さに惹かれてIntel Macを買った',
    text: (
      <p>
        「MacBookが3万円台で買える」と飛びついたら、Intel搭載の旧モデルで<strong>macOSサポートが終了済みだった</strong>パターン。セキュリティリスクが高く、新しいアプリも動かないため、結局買い替えが必要に。安くても使える期間が短ければコスパは良くありません。
      </p>
    ),
  },
  {
    heading: '最小構成を買って容量不足に',
    text: (
      <p>
        安さ重視で8GB/256GBの最小構成を購入したが、<strong>メモリ不足で動作が重く、ストレージもすぐにいっぱい</strong>になったパターン。MacBookは購入後にメモリ・ストレージの増設ができないため、足りなくなっても対処法は外付けSSDかクラウドしかありません。
      </p>
    ),
  },
  {
    heading: 'バッテリー交換で割高になった',
    text: (
      <p>
        状態ランクは良かったがバッテリーが大幅に劣化していたパターン。<strong>外装の美品ランクとバッテリーの状態は比例しません。</strong>結局Apple公式で交換（21,800円〜）が必要になり、新品や整備済製品を買った方が安かったという結果に。
      </p>
    ),
  },
  {
    heading: '整備済製品の存在を知らなかった',
    text: (
      <p>
        中古ショップで購入した後に、<strong>Apple認定整備済製品の方が安かった</strong>と気づくパターン。整備済製品は新品同様のバッテリー・外装で1年保証付き。中古を検討する前にまず整備済製品の在庫をチェックする習慣をつけましょう。
      </p>
    ),
  },
]
