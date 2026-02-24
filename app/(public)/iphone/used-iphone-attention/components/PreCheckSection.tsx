import Image from 'next/image'

export default function PreCheckSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古iPhoneの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古iPhoneには「順番を間違えると詰むポイント」があります。</p>
        <p className="m-section-desc">以下の4つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. ネットワーク利用制限 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">ネットワーク制限△の端末を買うのは慎重に。</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="IMEI確認のイメージ"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>
                ネットワーク利用制限とは、前の所有者の支払い状況によって端末の通信機能が制限される仕組みです。制限がかかると、SIMカードを入れても通話・データ通信ができなくなります。
                <strong>端末そのものが使えなくなるリスク</strong>があるため、最優先で確認してください。
              </p>
              <p>
                「△」は「今使える」ではなく「将来止まる可能性がある状態」です。購入後に「×」になっても自己責任になるケースが多く、「△」は安いですが、それは「リスクを買っている」ということを理解しましょう。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">確認方法</h4>
            <ol className="caution-steps">
              <li className="caution-steps__item">
                <span className="caution-steps__num">1</span>
                <span>
                  端末の「設定」→「一般」→「情報」から<strong>IMEI番号</strong>をメモする
                </span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">2</span>
                <span>購入キャリアの確認サイトでIMEIを入力</span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">3</span>
                <span>判定が「○」であることを確認（「△」「×」は避ける）</span>
              </li>
            </ol>

            <div className="m-callout m-callout--subtle caution-links-box">
              <p className="caution-links-box__heading">各キャリアの確認サイト</p>
              <ul className="caution-links-box__list">
                <li>
                  <a href="https://nw-restriction.nttdocomo.co.jp/top.php" target="_blank" rel="noopener noreferrer">
                    ドコモ ネットワーク利用制限確認 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://au-cs0.kddi.com/FtHome" target="_blank" rel="noopener noreferrer">
                    au ネットワーク利用制限確認 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://ct11.my.softbank.jp/WBF/icv" target="_blank" rel="noopener noreferrer">
                    ソフトバンク ネットワーク利用制限確認 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://network.mobile.rakuten.co.jp/restriction/" target="_blank" rel="noopener noreferrer">
                    楽天モバイル ネットワーク利用制限確認 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. バッテリーの劣化状態 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">バッテリーの劣化状態―最大容量80%未満なら購入を避ける</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="バッテリー容量を確認する様子"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>
                中古iPhoneのバッテリーは使用状況によって劣化度合いが大きく異なります。最大容量＝<strong>使用感と寿命を左右する最重要指標</strong>です。外装ランクが「美品」でもバッテリーが70%台ということもあります。
              </p>
              <p>
                <strong>80%以上を目安に選びましょう。</strong>80%未満の場合は価格が安くても、購入後に交換費用がかかって割高になることがあります。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">確認方法</h4>
            <ol className="caution-steps">
              <li className="caution-steps__item">
                <span className="caution-steps__num">1</span>
                <span>「設定」アプリを開く</span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">2</span>
                <span>「バッテリー」→「バッテリーの状態と充電」をタップ</span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">3</span>
                <span>「最大容量」の数値を確認</span>
              </li>
            </ol>

            <div className="price-table-wrap">
              <table className="m-table">
                <caption>バッテリー交換費用の目安</caption>
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
                    <td>11,200円〜</td>
                    <td>純正部品・保証あり</td>
                  </tr>
                  <tr>
                    <td>非正規店</td>
                    <td>5,000円〜8,000円</td>
                    <td>店舗により品質差あり</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. iOSサポート切れのリスク */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">iOSサポート切れのリスク―サポート残り2年未満なら購入を避ける</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="iOSサポートのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>
                iPhoneはAppleによるiOSサポートが終了すると、新機能が使えなくなるだけでなく、<strong>セキュリティ面でもリスクが高まります</strong>。また、アプリが対応しなくなり使えなくなるケースもあります。
              </p>
              <p>
                「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。発売から約7年がサポート終了の目安です。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="/iphone/used-iphone-support">機種別iOSサポート期間一覧</a>
              </p>
            </div>
          </div>
        </div>

        {/* 4. SIMロック・通信周り */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">SIMロック・通信周り―ロック解除できない端末は購入を避ける</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="SIMカードのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>
                2021年10月以降に発売された端末は原則SIMフリーですが、それ以前の端末はキャリアのSIMロックがかかっている場合があります。<strong>SIMロック端末は購入したキャリアの回線しか使えません。</strong>
              </p>
              <p>
                <strong>iPhone 13以前の端末はSIMロック残存の可能性あり。</strong>eSIMを使いたい場合は対応機種かどうかも確認が必要です。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">確認方法</h4>
            <ol className="caution-steps">
              <li className="caution-steps__item">
                <span className="caution-steps__num">1</span>
                <span>「設定」→「一般」→「情報」を開く</span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">2</span>
                <span>「SIMロック」の項目を確認</span>
              </li>
              <li className="caution-steps__item">
                <span className="caution-steps__num">3</span>
                <span>「SIMロックなし」と表示されていればOK</span>
              </li>
            </ol>

            <div className="m-callout m-callout--subtle caution-links-box">
              <p className="caution-links-box__heading">SIMロック解除の手続き先</p>
              <ul className="caution-links-box__list">
                <li>
                  <a href="https://www.nttdocomo.co.jp/support/unlock_simcard/" target="_blank" rel="noopener noreferrer">
                    ドコモ SIMロック解除 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.au.com/support/service/mobile/procedure/simcard/unlock/" target="_blank" rel="noopener noreferrer">
                    au SIMロック解除 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.softbank.jp/mobile/support/usim/unlock_procedure/" target="_blank" rel="noopener noreferrer">
                    ソフトバンク SIMロック解除 <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
