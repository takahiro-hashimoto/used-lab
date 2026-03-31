import MediaCard from '@/app/components/MediaCard'

export default function PreCheckSection() {
  return (
    <section className="l-section" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古MacBookの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古MacBookには「購入後に変更できないポイント」が多数あります。</p>
        <p className="m-section-desc">以下の5つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. Apple Silicon vs Intel */}
        <MediaCard
          src="/images/macbook/mba-13-2025.jpg"
          alt="Apple Silicon MacBookのイメージ"
          title="Intel Macはサポート終了間近―中古で買うならApple Silicon（M1以降）を選ぶ"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古MacBook市場ではIntel搭載モデルが安く出回っていますが、Intel Macは2026年現在macOSサポートが終了済みまたは終了間近です。最後のIntel MacBook（2020年モデル）もサポート期限が迫っています。
            </p>
            <p>
              性能面でもM1チップでさえ多くのIntel Macを大幅に上回るため、価格が安いからとIntel Macを選ぶと、短命かつ低性能な端末を買うことになります。
            </p>
            <p>
              中古MacBookを選ぶ際は<strong>Apple Silicon（M1以降）搭載モデルを強くおすすめ</strong>します。予算が限られる場合でも、M1 MacBook Airなら手頃な価格で入手できます。
            </p>
          </div>
        </MediaCard>

        {/* 2. macOSサポート期間 */}
        <MediaCard
          src="/images/macbook/mbp-14-2024-nov.jpg"
          alt="macOSサポートのイメージ画像"
          title="macOSサポート切れのリスク―サポート残り2年未満なら購入を避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              MacBookはAppleによるmacOSサポートが終了すると、セキュリティアップデートが受けられなくなります。業務でMacBookを使う場合、サポート切れのOSはセキュリティポリシー上使用が禁止されるケースもあります。
            </p>
            <p>
              MacBookのmacOSサポート期間は約7年が目安です。ただし、Intel MacからApple Siliconへの移行期にあたるモデルはサポートが短くなる可能性もあります。
            </p>
            <p>
              「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/macbook/used-macbook-support">機種別macOSサポート期間一覧</a>
            </p>
          </div>
        </MediaCard>

        {/* 3. バッテリーの劣化状態 */}
        <MediaCard
          src="/images/macbook/mba-15-2024.jpg"
          alt="MacBookバッテリー確認のイメージ"
          title="バッテリーの劣化状態―MacBookのバッテリー交換費用は高額"
          width={800}
          height={450}
          aside
          footer={
            <>
              <h3 className="caution-how-to__heading">バッテリー交換費用の目安</h3>
              <div className="price-table-wrap">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th scope="col">モデル</th>
                      <th scope="col">Apple公式費用</th>
                      <th scope="col">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MacBook Air</td>
                      <td>21,800円</td>
                      <td>全サイズ共通</td>
                    </tr>
                    <tr>
                      <td>MacBook Pro 14インチ</td>
                      <td>29,800円</td>
                      <td>純正部品・保証あり</td>
                    </tr>
                    <tr>
                      <td>MacBook Pro 16インチ</td>
                      <td>37,800円</td>
                      <td>純正部品・保証あり</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古MacBookのバッテリーは使用状況によって劣化度合いが大きく異なります。MacBookでは「このMacについて」→「システムレポート」→「電源」からバッテリーの充放電回数と状態を確認できますが、中古ショップ側がこの情報を掲載していないケースが多いです。
            </p>
            <p>
              そのため、状態ランクが低く使い古された端末は避けるのが無難です。充放電回数が多い端末はバッテリー劣化が進んでいる可能性が高く、駆動時間が大幅に短くなります。
            </p>
            <p>
              MacBookの<strong>バッテリー交換費用はApple公式で21,800円〜37,800円</strong>と高額のため、劣化した端末を安く買っても結果的に割高になることがあります。
            </p>
          </div>
        </MediaCard>

        {/* 4. キーボード・トラックパッドの不具合 */}
        <MediaCard
          src="/images/macbook/mbp-14-2023-nov.jpg"
          alt="MacBookキーボードのイメージ"
          title="キーボード・トラックパッドの不具合―中古特有のリスクが高い箇所"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              MacBookのキーボードとトラックパッドは、中古では前の使用者の使い方が大きく影響する部品です。特に2016〜2019年のバタフライキーボード搭載モデルは、キーの反応不良・二重入力（チャタリング）が発生しやすいことで知られています。
            </p>
            <p>
              現行のMagic Keyboard搭載モデルでも、長期間の使用でキーの反応にムラが出たり、トラックパッドのクリック感が弱くなることがあります。中古品は外装がきれいでもキーボードの使用感は写真ではわかりません。
            </p>
            <p>
              MacBookのキーボード修理はトップケースごとの交換になるため<strong>修理費用が高額（数万円〜）</strong>です。購入後すぐに全キーの入力テストを行いましょう。
            </p>
          </div>
        </MediaCard>

        {/* 5. メモリ・ストレージの増設不可 */}
        <MediaCard
          src="/images/macbook/mbp-16-2024-nov.jpg"
          alt="MacBookスペック選びのイメージ"
          title="メモリ・ストレージは購入後に増設できない"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              MacBookはメモリ（RAM）とストレージ（SSD）が<strong>基板に直接はんだ付けされているため、購入後の増設・交換は不可能</strong>です。これはWindowsノートPCとの大きな違いで、中古MacBook選びでは最も注意すべきポイントの一つです。
            </p>
            <p>
              中古市場では8GB/256GBの最小構成モデルが最も多く出回り、価格も安いですが、用途によっては容量不足に陥ります。動画編集や開発作業なら16GB以上、大量のデータを扱うなら512GB以上を選びましょう。
            </p>
            <p>
              「安いから」と最小構成を選んでしまうと、足りなくなっても外付けSSDやクラウドで補うしかなく、MacBookの持ち味である快適さが損なわれます。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
