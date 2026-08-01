import Link from 'next/link'
import MediaCard from '@/app/components/MediaCard'

export default function PreCheckSection() {
  return (
    <section className="l-section" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古Samsung Galaxyの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古Galaxyには「順番を間違えると詰むポイント」があります。</p>
        <p className="m-section-desc">以下は購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. ネットワーク利用制限 */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-1.jpg"
          alt="IMEI確認のイメージ"
          title="ネットワーク制限（赤ロム）の状態を必ず確認する"
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
                    「設定」→「デバイス情報（端末情報）」→「ステータス情報」からIMEI番号をメモする
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
              ネットワーク利用制限とは、前の所有者の支払い状況によって端末の通信機能が制限される仕組みです。キャリア版（docomo・au・SoftBank・楽天）のGalaxyが対象で、制限がかかるとSIMを入れても通話・データ通信ができなくなります。
              端末そのものが使えなくなるリスクがあるため、最優先で確認してください。
            </p>
            <p>
              「△」は「将来×になる可能性がある状態」ですが、赤ロム永久保証付きの中古ショップで購入すれば、万が一×になっても交換・返金対応を受けられます。
            </p>
            <p>
              相場より安く購入できるため、コストを抑えたい方には有力な選択肢です。信頼できる購入先は<Link prefetch={false} href="/galaxy/galaxy-shop/">中古Galaxyのおすすめショップ比較</Link>で確認できます。
            </p>
          </div>
        </MediaCard>

        {/* 2. バッテリーの劣化状態 */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-5.jpg"
          alt="バッテリー状態を確認する様子"
          title="バッテリー状態が悪い端末は避ける"
          width={800}
          height={450}
          aside
          footer={
            <>
              <p className="caution-how-to__heading">確認方法</p>
              <ol className="caution-steps u-mb-lg">
                <li className="caution-steps__item">
                  <span className="caution-steps__num">1</span>
                  <span>「Samsung Members」アプリを開く</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">2</span>
                  <span>「診断（サポート）」→「バッテリー状態」をタップ</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">3</span>
                  <span>「良好／交換が必要」などの判定を確認</span>
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
                      <td>Samsung公式</td>
                      <td>8,800円〜</td>
                      <td>純正部品・保証あり（機種により変動）</td>
                    </tr>
                    <tr>
                      <td>非正規店</td>
                      <td>5,000円〜9,000円</td>
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
              中古Galaxyのバッテリーは使用状況によって劣化度合いが大きく異なります。iPhoneのような「最大容量◯%」表示がないため、Samsung Membersアプリの診断結果や、ショップのバッテリー検品表記で判断するのがポイントです。外装ランクが「美品」でもバッテリーが劣化していることがあります。
            </p>
            <p>
              <strong>バッテリー状態が「交換が必要」の端末は避けましょう。</strong>価格が安くても、購入後に交換費用がかかって割高になることがあります。折りたたみモデルは分解を伴うため交換費が高めです。
            </p>
          </div>
        </MediaCard>

        {/* 3. Androidアップデート（OS・セキュリティ更新）の残り */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-2.jpg"
          alt="Androidアップデートのイメージ画像"
          title="Androidアップデートの残りが短い端末は避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Galaxyはメーカー（Samsung）によるOS・セキュリティ更新が終了すると、新機能が使えなくなるだけでなく、セキュリティ面でもリスクが高まります。また、アプリが対応しなくなり使えなくなるケースもあります。
            </p>
            <p>
              「今使える」と「今後も使える」は別です。安さより<strong>「あと何年更新を受けられるか」で判断</strong>しましょう。<strong>Galaxy S24以降やFlip6 / Fold6はOS・セキュリティ更新が最大7年</strong>、S22 / S23世代はOS4回・セキュリティ5年、AシリーズはOS2〜4回・セキュリティ5年が目安です。
            </p>
            <p className="lead-link">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              <Link prefetch={false} href="/galaxy/used-galaxy-support/">機種別Androidアップデート期間の目安一覧</Link>
            </p>
          </div>
        </MediaCard>

        {/* 4. SIMロック・通信周り */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-3.jpg"
          alt="SIMカードのイメージ画像"
          title="SIMロック未解除の端末は避ける"
          width={800}
          height={450}
          aside
          footer={
            <>
              <h3 className="caution-how-to__heading">確認方法</h3>
              <ol className="caution-steps u-mb-lg">
                <li className="caution-steps__item">
                  <span className="caution-steps__num">1</span>
                  <span>他社SIMを挿す、または「設定」→「接続」→「SIMマネージャー」を開く</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">2</span>
                  <span>SIMロックの有無・対応バンドを確認</span>
                </li>
                <li className="caution-steps__item">
                  <span className="caution-steps__num">3</span>
                  <span>他社SIMで通話・データ通信ができればOK</span>
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
              2021年10月以降に発売された端末は原則SIMフリーですが、それ以前のキャリア版GalaxyはキャリアのSIMロックがかかっている場合があります。SIMロック端末は購入したキャリアの回線しか使えません。
            </p>
            <p>
              格安SIMへの乗り換えを考えているなら、SIMロック解除済み（SIMフリー）かどうかを必ず確認しましょう。国内版と海外版で対応バンドやおサイフケータイ（FeliCa）対応が異なる点にも注意が必要です。技適マークの有無も国内利用では重要なチェックポイントです。
            </p>
          </div>
        </MediaCard>

        {/* 5. 折りたたみ（Z）限定の注意点 */}
        <MediaCard
          src="/images/content/thumbnail/check-list.jpg"
          alt="折りたたみGalaxyのヒンジ・折り目イメージ"
          title="【折りたたみ限定】ヒンジ・画面折り目・保護フィルムを確認する"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Galaxy Z Flip / Z Foldなどの折りたたみモデルは、バー型にはない可動部と内側ディスプレイが弱点です。中古では以下を必ず確認しましょう。
            </p>
            <p>
              <strong>ヒンジの開閉のスムーズさ・ガタつき、画面中央の折り目部分のタッチ反応、内側の保護フィルムの浮きや剥がれ</strong>が主なチェックポイントです。内側フィルムは剥がすと故障につながるため、無理に剥がされていないかも見ておきましょう。
            </p>
            <p>
              また、初期の折りたたみは防塵性能がバー型ほど高くない（IPX8など防水のみ対応）世代もあります。砂ぼこりの多い環境での使用や、水濡れの扱いには注意が必要です。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
