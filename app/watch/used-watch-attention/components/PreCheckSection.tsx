import Image from 'next/image'

export default function PreCheckSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古Apple Watchの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">Apple Watchには「購入後に変更できないポイント」が多数あります。</p>
        <p className="m-section-desc">以下の5つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. watchOSサポート */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">watchOSサポート切れのリスク―サポート残り2年未満なら購入を避ける</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-10.jpg"
                  alt="watchOSサポートのイメージ画像"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                Apple WatchはwatchOSのサポートが終了すると、新機能が使えなくなるだけでなく、<strong>セキュリティ面でもリスクが高まります</strong>。また、アプリが非対応になり使えなくなるケースもあります。
              </p>
              <p>
                Apple WatchのwatchOSサポート期間は<strong>約5年</strong>で、iPhoneの約7年、iPadの約5〜6年と比べても短めです。特にSEシリーズや古いSeriesは発売から4年程度でサポートが終了する場合もあります。
              </p>
              <p>
                「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="/watch/used-watch-support">機種別watchOSサポート期間一覧</a>
              </p>
            </div>
          </div>
        </div>

        {/* 2. バッテリーの劣化状態 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">バッテリーの劣化状態―Apple Watchはバッテリーが小さく劣化の影響が大きい</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-ultra2.jpg"
                  alt="Apple Watchバッテリー確認のイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                Apple Watchはバッテリー容量が非常に小さく（通常モデルで300mAh前後）、<strong>わずかな劣化でも体感できるほど駆動時間が短くなります</strong>。新品でも「最大18時間」の駆動時間のため、劣化が進むと1日持たなくなることも。
              </p>
              <p>
                Apple Watchはバッテリー最大容量を「設定」→「バッテリー」→「バッテリーの状態」から確認できますが、<strong>中古ショップ側がバッテリー残量を掲載していないケースがほとんど</strong>です。そのため、状態ランクが低く使い古された端末は避けるのが無難です。
              </p>
              <p>
                <strong>Apple Watchのバッテリー交換費用は12,200円〜</strong>と本体価格に対して割高のため、劣化した端末を安く買っても結果的に損をする可能性があります。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">バッテリー交換費用の目安</h4>
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
                    <td>Apple公式（SE）</td>
                    <td>12,200円</td>
                    <td>純正部品・保証あり</td>
                  </tr>
                  <tr>
                    <td>Apple公式（Series）</td>
                    <td>15,800円</td>
                    <td>純正部品・保証あり</td>
                  </tr>
                  <tr>
                    <td>Apple公式（Ultra）</td>
                    <td>17,200円</td>
                    <td>純正部品・保証あり</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. アクティベーションロック（ペアリング解除） */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">アクティベーションロック（ペアリング解除漏れ）―解除されていないと使用不可</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-9.jpg"
                  alt="アクティベーションロックのイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                Apple Watchには<strong>アクティベーションロック</strong>という盗難防止機能があります。前の所有者がペアリング解除やApple IDのサインアウトを行わずに手放した場合、新しいiPhoneとペアリングできず使用できません。
              </p>
              <p>
                iPhoneと異なり、Apple Watchは<strong>画面が小さく初期設定時にロックに気づきにくい</strong>ため、特にフリマでの購入時に注意が必要です。ロックがかかっていた場合は前の所有者に解除を依頼する以外に方法がありません。
              </p>
              <p>
                中古ショップではアクティベーションロックの解除確認を行っている場合がほとんどですが、念のため<strong>購入後すぐにペアリングを試して確認</strong>しましょう。
              </p>
            </div>
          </div>
        </div>

        {/* 4. ケースサイズとバンド互換性 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">ケースサイズとバンド互換性―中古は試着できないまま購入することが多い</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-11.jpg"
                  alt="Apple Watchケースサイズのイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                新品ならApple Storeで試着してから購入できますが、中古はオンライン購入がほとんどのため<strong>サイズ感を確かめられないまま買ってしまう</strong>ケースが多いです。ケースサイズは40mm〜49mmまで多くのバリエーションがあり、一度購入すると変更できません。
              </p>
              <p>
                また、中古でバンド付きの商品を購入する場合、<strong>バンドの劣化（ゴムの変色・金属の傷・マグネットの弱まり）</strong>にも注意が必要です。バンドの交換費用も考慮した上で総額を計算しましょう。
              </p>
              <p>
                手持ちのバンドを流用したい場合は、同じ系統のサイズかどうかを事前に確認してください。<strong>Apple Watch Series 10以降は従来のバンド幅と異なる</strong>ため注意が必要です。
              </p>
            </div>
          </div>
        </div>

        {/* 5. GPSモデルとセルラーモデルの選択 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">GPSモデルとセルラーモデル―中古ではセルラー機能が使えない場合もある</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-ultra3.jpg"
                  alt="Apple Watchセルラーモデルのイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                中古でセルラーモデルを購入しても、<strong>自分の利用キャリアがウォッチプランに対応していなければセルラー機能は使えません</strong>。格安SIM（MVNO）ではウォッチプランに対応していないケースがほとんどです。
              </p>
              <p>
                セルラーモデルはGPSモデルより中古価格も高いため、セルラー機能を使わないなら<strong>割高な買い物になってしまいます</strong>。iPhoneを常に持ち歩く方はGPSモデルで十分です。
              </p>
              <p>
                セルラー機能が必要な場合は、購入前にキャリアの対応状況を確認し、<strong>別途ウォッチナンバー契約（月額385円〜550円）が必要</strong>であることも踏まえて検討しましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
