import MediaCard from '@/app/components/MediaCard'

export default function PreCheckSection() {
  return (
    <section className="l-section" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古Apple Watchの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">Apple Watchには「購入後に変更できないポイント」が多数あります。</p>
        <p className="m-section-desc">以下の5つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. watchOSサポート */}
        <MediaCard
          src="/images/content/thumbnail/watch-image-08.webp"
          alt="watchOSサポートのイメージ画像"
          title="watchOSサポート期間の確認"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Apple WatchはwatchOSのサポートが終了すると、新機能が使えなくなるだけでなく、セキュリティ面でもリスクが高まります。また、アプリが非対応になり使えなくなるケースもあります。
            </p>
            <p>
              Apple WatchのwatchOSサポート期間は約5年で、iPhoneの約7年、iPadの約5〜6年と比べても短めです。特にSEシリーズや古いSeriesは発売から4年程度でサポートが終了する場合もあります。
            </p>
            <p>
              「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/watch/used-watch-support">機種別watchOSサポート期間一覧</a>
            </p>
          </div>
        </MediaCard>

        {/* 2. バッテリーの劣化状態 */}
        <MediaCard
          src="/images/content/thumbnail/watch-charge.jpg"
          alt="Apple Watchバッテリー確認のイメージ"
          title="バッテリーの劣化状態"
          width={800}
          height={450}
          aside
          footer={
            <>
              <p className="caution-how-to__heading">バッテリー交換費用の目安</p>
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
            </>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Apple Watchはバッテリー容量が非常に小さく（通常モデルで300mAh前後）、わずかな劣化でも体感できるほど駆動時間が短くなります。新品でも「最大18時間」の駆動時間のため、劣化が進むと1日持たなくなることも。
            </p>
            <p>
              Apple Watchはバッテリー最大容量を「設定」→「バッテリー」→「バッテリーの状態」から確認できますが、中古ショップ側がバッテリー残量を掲載していないケースがほとんどです。そのため、状態ランクが低く使い古された端末は避けるのが無難です。
            </p>
            <p>
              <strong>Apple Watchのバッテリー交換費用は12,200円〜</strong>と本体価格に対して割高のため、劣化した端末を安く買っても結果的に損をする可能性があります。
            </p>
          </div>
        </MediaCard>

        {/* 3. アクティベーションロック（ペアリング解除） */}
        <MediaCard
          src="/images/content/thumbnail/activate-lock.png"
          alt="アクティベーションロックのイメージ"
          title="アクティベーションロックの確認"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Apple Watchにはアクティベーションロックという盗難防止機能があります。前の所有者がペアリング解除やApple IDのサインアウトを行わずに手放した場合、新しいiPhoneとペアリングできず使用できません。
            </p>
            <p>
              iPhoneと異なり、Apple Watchは画面が小さく初期設定時にロックに気づきにくいため、特にフリマでの購入時に注意が必要です。ロックがかかっていた場合は前の所有者に解除を依頼する以外に方法がありません。
            </p>
            <p>
              中古ショップではアクティベーションロックの解除確認を行っている場合がほとんどですが、念のため購入後すぐにペアリングを試して確認しましょう。
            </p>
          </div>
        </MediaCard>

        {/* 4. ケースサイズとバンド互換性 */}
        <MediaCard
          src="/images/content/thumbnail/watch-image-11.jpg"
          alt="Apple Watchケースサイズのイメージ"
          title="ケースサイズとバンドの互換性"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              新品ならApple Storeで試着してから購入できますが、中古はオンライン購入がほとんどのためサイズ感を確かめられないまま買ってしまうケースが多いです。ケースサイズは40mm〜49mmまで多くのバリエーションがあり、一度購入すると変更できません。
            </p>
            <p>
              また、中古でバンド付きの商品を購入する場合、バンドの劣化（ゴムの変色・金属の傷・マグネットの弱まり）にも注意が必要です。バンドの交換費用も考慮した上で総額を計算しましょう。
            </p>
            <p>
              手持ちのバンドを流用したい場合は、同じ系統のサイズかどうかを事前に確認してください。
            </p>
          </div>
        </MediaCard>

        {/* 5. GPSモデルとセルラーモデルの選択 */}
        <MediaCard
          src="/images/content/thumbnail/watch-image-10.jpg"
          alt="Apple Watchセルラーモデルのイメージ"
          title="GPSモデルとセルラーモデルの違い"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古でセルラーモデルを購入しても、自分の利用キャリアがウォッチプランに対応していなければセルラー機能は使えません。格安SIM（MVNO）ではウォッチプランに対応していないケースがほとんどです。
            </p>
            <p>
              セルラーモデルはGPSモデルより中古価格も高いため、セルラー機能を使わないなら割高な買い物になってしまいます。iPhoneを常に持ち歩く方はGPSモデルで十分です。
            </p>
            <p>
              セルラー機能が必要な場合は、購入前にキャリアの対応状況を確認し、別途ウォッチナンバー契約（月額385円〜550円）が必要であることも踏まえて検討しましょう。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <a href="/watch/gps-cellular-compare/">GPSモデルとセルラーモデルの違い比較</a>
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
