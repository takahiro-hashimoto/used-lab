import Link from 'next/link'
import MediaCard from '@/app/components/MediaCard'

export default function PreCheckSection() {
  return (
    <section className="l-section" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古Google Pixelの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古Pixelには「順番を間違えると詰むポイント」があります。</p>
        <p className="m-section-desc">以下の4つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. ネットワーク利用制限 */}
        <MediaCard
          src="/images/pixel-article/google-pixel0.jpg"
          alt="IMEI確認のイメージ"
          title="ネットワーク制限の状態を必ず確認する（キャリア版）"
          width={800}
          height={450}
          aside
          imgStyle={{ border: '1px solid var(--color-border, #e0e0e0)', borderRadius: '8px' }}
          footer={
            <>
              <h3 className="caution-how-to__heading">確認方法</h3>
              <ol className="caution-steps u-mb-lg">
                <li className="caution-steps__item">
                  <span className="caution-steps__num">1</span>
                  <span>
                    端末の「設定」→「デバイス情報」からIMEI番号をメモする
                  </span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">2</span>
                  <span>購入キャリアの確認サイトでIMEIを入力</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">3</span>
                  <span>判定が「○」または「△」であることを確認（「×」は避ける）</span>
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
            </>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              ネットワーク利用制限とは、前の所有者の支払い状況によって端末の通信機能が制限される仕組みです。制限がかかると、SIMカードを入れても通話・データ通信ができなくなります。
              端末そのものが使えなくなるリスクがあるため、キャリア版（au／SoftBankなど）のPixelを買う場合は最優先で確認してください。
            </p>
            <p>
              「△」は「将来×になる可能性がある状態」ですが、赤ロム永久保証付きの中古ショップで購入すれば、万が一×になっても交換・返金対応を受けられます。Google Store版（SIMフリー）はこの制限の対象外です。
            </p>
            <p>
              相場より安く購入できるため、コストを抑えたい方には有力な選択肢です。保証のある購入先は<Link prefetch={false} href="/pixel/pixel-shop/">中古Pixelの購入先おすすめ比較</Link>でまとめています。
            </p>
          </div>
        </MediaCard>

        {/* 2. バッテリーの劣化状態 */}
        <MediaCard
          src="/images/pixel-article/google-pixel5.jpg"
          alt="バッテリー容量を確認する様子"
          title="バッテリーの劣化が進んだ個体は避ける"
          width={800}
          height={450}
          aside
          footer={
            <>
              <p className="caution-how-to__heading">確認方法</p>
              <ol className="caution-steps u-mb-lg">
                <li className="caution-steps__item">
                  <span className="caution-steps__num">1</span>
                  <span>「設定」アプリを開く</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">2</span>
                  <span>「バッテリー」をタップ（Android 14以降）</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">3</span>
                  <span>「充電サイクル数」「製造日」を確認</span>
                </li>
              </ol>

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
                      <td>Google正規修理</td>
                      <td>13,000円前後〜</td>
                      <td>uBreakiFix（Asurion）／純正部品</td>
                    </tr>
                    <tr>
                      <td>非正規店</td>
                      <td>5,000円〜10,000円</td>
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
              中古Pixelのバッテリーは使用状況によって劣化度合いが大きく異なります。PixelはiPhoneのように最大容量（％）を明示しませんが、充電サイクル数や製造日が劣化の目安になります。外装ランクが「美品」でも発売から年数が経った個体は電池持ちが悪いことがあります。
            </p>
            <p>
              <strong>充電サイクルが少なく、発売から年数の浅い個体を選びましょう。</strong>劣化が進んだ端末は価格が安くても、購入後に交換費用がかかって割高になることがあります。
            </p>
          </div>
        </MediaCard>

        {/* 3. Androidアップデート切れのリスク */}
        <MediaCard
          src="/images/pixel-article/google-pixel2.jpg"
          alt="Androidアップデートのイメージ画像"
          title="Androidアップデート残り2年未満なら避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              PixelはGoogleによるOS・セキュリティ更新（Androidアップデート）が終了すると、新機能が使えなくなるだけでなく、セキュリティ面でもリスクが高まります。また、アプリが対応しなくなり使えなくなるケースもあります。
            </p>
            <p>
              「今使える」と「今後も使える」は別です。安さより<strong>「あと何年アップデートされるか」で判断</strong>しましょう。Pixel 8以降は発売から7年、Pixel 6／7世代はセキュリティ更新5年が保証の目安です。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <Link prefetch={false} href="/pixel/used-pixel-support/">機種別Androidアップデート期間一覧</Link>
            </p>
          </div>
        </MediaCard>

        {/* 4. SIMロック・技適・通信周り */}
        <MediaCard
          src="/images/pixel-article/google-pixel1.jpg"
          alt="SIMカードのイメージ画像"
          title="SIMロック未解除・技適なしの端末は避ける"
          width={800}
          height={450}
          aside
          footer={
            <>
              <h3 className="caution-how-to__heading">確認方法</h3>
              <ol className="caution-steps u-mb-lg">
                <li className="caution-steps__item">
                  <span className="caution-steps__num">1</span>
                  <span>「設定」→「セキュリティとプライバシー」→「SIMロックの状態」を開く</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">2</span>
                  <span>他社SIMを挿して通信・通話できるか確認</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">3</span>
                  <span>「設定」→「デバイス情報」→「規制ラベル」で技適マークの有無を確認</span>
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
            </>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Google Store版のPixelは元々SIMフリーですが、キャリアで販売されたPixelはSIMロックがかかっている場合があります。SIMロック端末は購入したキャリアの回線しか使えず、格安SIMへの乗り換えができません。
            </p>
            <p>
              あわせて注意したいのが<strong>技適マーク</strong>です。相場より極端に安い端末は技適のない海外版のことがあり、国内で電波を出すと電波法違反になります。海外版はおサイフケータイ（FeliCa）非対応の場合も多いため、国内正規版かどうかを必ず確認しましょう。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
