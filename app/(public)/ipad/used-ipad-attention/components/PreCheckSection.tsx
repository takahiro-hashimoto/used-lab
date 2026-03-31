import MediaCard from '@/app/components/MediaCard'

export default function PreCheckSection() {

  return (
    <section className="l-section" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古iPadの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古iPadには「購入後に変更できないポイント」が多数あります。</p>
        <p className="m-section-desc">以下の5つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. iPadOSサポート */}
        <MediaCard
          src="/images/ipad/ipad-pro-13-2.jpg"
          alt="iPadOSサポートのイメージ画像"
          title="iPadOSサポート切れのリスク―サポート残り2年未満なら購入を避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              iPadはAppleによるiPadOSサポートが終了すると、新機能が使えなくなるだけでなく、セキュリティ面でもリスクが高まります。また、アプリが非対応になり使えなくなるケースもあります。
            </p>
            <p>
              iPadはiPhoneよりもサポート期間が短い傾向にあります。特にiPad（無印）やiPad miniは発売から約5〜6年でサポートが終了するモデルもあるため、安さだけで選ぶと「あと1年しか使えない」ということも。
            </p>
            <p>
              「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/ipad/used-ipad-support">機種別iPadOSサポート期間一覧</a>
            </p>
          </div>
        </MediaCard>

        {/* 2. バッテリーの劣化状態 */}
        <MediaCard
          src="/images/ipad/ipad-air-6-11.jpg"
          alt="iPadバッテリー確認のイメージ"
          title="バッテリーの劣化状態―iPadはバッテリー交換費用が高い"
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
                      <th scope="col">交換先</th>
                      <th scope="col">費用</th>
                      <th scope="col">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Apple公式</td>
                      <td>16,800円〜</td>
                      <td>純正部品・保証あり</td>
                    </tr>
                    <tr>
                      <td>非正規店</td>
                      <td>8,000円〜15,000円</td>
                      <td>店舗により品質差あり</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古iPadのバッテリーは使用状況によって劣化度合いが大きく異なります。iPadはiPhoneと違い、「設定」画面からバッテリー最大容量を直接確認できません。ショップ側もバッテリー残量を掲載していないケースがほとんどです。
            </p>
            <p>
              そのため、状態ランクが低く使い古された端末は避けるのが無難です。ランクA〜B程度の端末を選ぶことで、バッテリーの極端な劣化を回避しやすくなります。
            </p>
            <p>
              <strong>iPadのバッテリー交換費用はiPhoneより高額</strong>（Apple公式で16,800円〜）のため、劣化した端末を安く買っても結果的に割高になることがあります。
            </p>
          </div>
        </MediaCard>

        {/* 3. セルラーモデルのネットワーク利用制限 */}
        <MediaCard
          src="/images/ipad/ipad-10.jpg"
          alt="iPadセルラーモデルのイメージ"
          title="セルラーモデルはネットワーク利用制限（赤ロム）に注意"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古のセルラーモデルiPadには、iPhoneと同様にネットワーク利用制限（赤ロム）のリスクがあります。前の所有者の分割払いが滞納されると、ある日突然通信ができなくなります。
            </p>
            <p>
              判定が「△」の端末は中古ショップでは安く買えますし、赤ロム保証があるショップもあります。ただし心配な場合は<strong>「◯」判定の端末を選びましょう。</strong>
            </p>
            <p>
              なお、Wi-Fiモデルにはネットワーク利用制限の問題はありません。外出先での通信が不要ならWi-Fiモデルを選ぶのも一つの手です。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/iphone/network-limit/">ネットワーク制限△の中古iPhone・iPadを買うメリット・デメリット</a>
            </p>
          </div>
        </MediaCard>

        {/* 4. Apple Pencil・キーボード対応 */}
        <MediaCard
          src="/images/ipad/ipad-air-7-11.jpg"
          alt="Apple Pencil対応のイメージ"
          title="Apple Pencil・キーボード対応―世代・モデルで互換性が異なる"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Apple Pencilやキーボードの対応状況はiPadのモデルごとに異なります。「Apple Pencilで絵を描きたい」「Magic Keyboardでノートパソコン代わりにしたい」という方は、購入前に必ず対応表を確認してください。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/ipad/apple-pencil-compare/">Apple Pencil機能比較&amp;モデル別対応表</a>
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/ipad/accessories-summary/">iPad用Magic Keyboard型番一覧</a>
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
