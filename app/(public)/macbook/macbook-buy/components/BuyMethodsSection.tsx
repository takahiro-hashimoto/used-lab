export default function BuyMethodsSection() {
  return (
    <section id="comparison" className="l-section l-section--bg-subtle">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg">
MacBookを安く買う7つの方法
        </h2>
        <p className="m-section-desc">
          Apple公式・ECモール・中古ショップなど、MacBookを購入できるルートは多彩。
        </p>
        <p className="m-section-desc">
          それぞれの価格・保証・ポイント還元を比較して、自分に合った買い方を見つけましょう。
        </p>

        <div className="l-grid l-grid--1col" style={{ gap: 'var(--space-xl)' }}>
          {/* ── 1. Appleギフトカード × 楽天リーベイツ ── */}
          <div id="gift-rebates" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-01-1024x569.jpg"
              alt="MacBookを安く買う方法！ポイント二重取り編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">Appleギフトカード × 楽天リーベイツ</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★☆☆☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★★★</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>最初に紹介するのはとても面倒だけど、ポイント二重取りが実現できてかなりお得にApple製品を購入できるようになる方法。</p>
                <p>ステップは以下の3つ。注意点もあるので1つずつ詳しく解説していきます。</p>
              </div>

              {/* ステップ */}
              <div className="m-timeline">
                <div className="m-timeline__item">
                  <div className="m-timeline__number">1</div>
                  <div className="m-timeline__content">
                    <h4>楽天市場でAppleギフトカードを購入</h4>
                    <img
                      src="https://used-lab.jp/wp-content/uploads/2025/07/apple-giftcard-buy-1024x576.jpg"
                      alt="楽天市場でAppleギフトカードを購入"
                      className="m-timeline__img"
                      width={1024}
                      height={576}
                      loading="lazy"
                    />
                    <p>Apple製品をお得に買うための第一歩は、楽天市場で「Appleギフトカード」を購入することです。</p>
                    <p>他でも買えますが、楽天を使う最大のメリットはポイント還元率。SPU（スーパーポイントアップ）や買いまわりイベントを組み合わせることで、驚くほどポイントが貯まります。</p>
                    <p>カードは1,500円から50,000円まで、1円単位で指定可能。Apple製品はもちろん、サブスクの支払いにも使えます。</p>
                    <p>上記は「楽天SPU6倍」と「5と0のつく日」に購入した際の画面です。これだけで4,500円分のポイント還元。実質的な割引額として考えるとかなり大きいですよね。</p>
                    <p>ただし、購入時には下記のような制約もあります。狙っているデバイスがあるなら、計画的に準備を進めましょう。</p>
                    <ul className="buy-method-card__list" style={{ marginTop: 'var(--space-md)' }}>
                      <li>初回購入〜45日：1万円まで</li>
                      <li>46日〜：1万円以上も購入可能</li>
                      <li>一度購入すると15日ほど制限があるので月に買えるのは2回まで</li>
                    </ul>
                  </div>
                </div>

                <div className="m-timeline__item">
                  <div className="m-timeline__number">2</div>
                  <div className="m-timeline__content">
                    <h4>AppleギフトカードをApple IDに登録</h4>
                    <img
                      src="https://used-lab.jp/wp-content/uploads/2025/07/c167fb3e3db0bc7458bee73310400259-1024x576.jpg"
                      alt="AppleギフトカードをApple IDに登録"
                      className="m-timeline__img"
                      width={1024}
                      height={576}
                      loading="lazy"
                    />
                    <p>楽天市場でAppleギフトカードを購入すると、数分後にメールが届きます。</p>
                    <p>送られてきたコードをタップして案内に従って操作していけば、ギフトカードの購入金額がApple IDの残高に追加されます。</p>
                  </div>
                </div>

                <div className="m-timeline__item">
                  <div className="m-timeline__number">3</div>
                  <div className="m-timeline__content">
                    <h4>楽天リーベイツを経由してAppleストアで買い物</h4>
                    <img
                      src="https://used-lab.jp/wp-content/uploads/2025/07/rakuten-reabayts-1024x576.jpg"
                      alt="楽天リーベイツを経由してAppleストアで買い物"
                      className="m-timeline__img"
                      width={1024}
                      height={576}
                      loading="lazy"
                    />
                    <p>あとはネットショップまとめサイトの楽天リーベイツを経由してApple公式ストアへ進み、チャージしたAppleギフトで買い物をするだけ。</p>
                    <p>このフローを挟むことで、下記のような還元率でポイントをゲットできます。</p>
                    <ul className="buy-method-card__list" style={{ marginTop: 'var(--space-md)' }}>
                      <li>通常時期：1〜2％</li>
                      <li>楽天スーパーセール実施時期：3〜5%</li>
                    </ul>
                    <p style={{ marginTop: 'var(--space-sm)' }}>発売して間もないアイテムは対象外になるデメリットもありますが、多くの商品がポイント還元の対象なので、こちらも忘れずに実施しましょう！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Amazonで買う ── */}
          <div id="amazon" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-02-1024x569.jpg"
              alt="MacBookを安く買う方法！Amazon編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">Amazonで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>AmazonでMacBookを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>ポイント還元が受けられたり、MacBookがセール対象になるのに加えて、正規代理店ならではのメリットがいくつもあるのが特徴です。</p>
                <p>2022年まではAmazonチャージによるポイント還元でポイントの二重取りができたのですが、それが実践できなくなったデメリットがとても大きい…。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> Amazonのメリット</p>
                  <ul>
                    <li>Amazonポイントが1%以上付与される</li>
                    <li>セール時に割引価格でMacBookが購入できる</li>
                    <li>整備済み品を購入できる</li>
                    <li>購入時にAppleケア+に加入するか選べる</li>
                    <li>公式サイトと定価が同じなので安心して買い物できる</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> Amazonのデメリット</p>
                  <ul>
                    <li>Amazonチャージによるポイント還元は2022年までで廃止</li>
                    <li>希望スペック（ストレージ容量、CPUなど）の商品がない可能性がある</li>
                  </ul>
                </div>
              </div>

              {/* Amazonのセールについて */}
              <div className="buy-method-card__sub">
                <h4>Amazonのセールについて</h4>
                <div className="buy-method-card__text">
                  <p>Amazonでは年に4回ほど大きなセールが実施されており、MacBookシリーズが頻繁にセール対象品として登場します。</p>
                  <p>また、大型セール以外にも月末に実施されるタイムセール祭が行われており、ここでもMacBookがセール対象になる場合があるので要チェックです。</p>
                </div>
                <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="m-table-scroll">
                    <table className="m-table m-table--center">
                      <thead>
                        <tr><th>時期</th><th>セール名</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>1月</td><td>初売り</td></tr>
                        <tr><td>3月</td><td>新生活セール</td></tr>
                        <tr><td>7月</td><td>プライムデー</td></tr>
                        <tr><td>11月</td><td>ブラックフライデー</td></tr>
                        <tr><td>毎月月末</td><td>タイムセール祭</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 整備済み型落ちモデル */}
              <div className="buy-method-card__sub">
                <h4>整備済み型落ちモデルが熱い！</h4>
                <div className="buy-method-card__text">
                  <p>AmazonはApple製品の正規代理店なので、セール価格で買い物ができたりポイントが付与される以外にも「整備済みのMacBook」が買えるメリットがあります。</p>
                  <p>整備済みの型落ちモデルは在庫数に波がありますが、お目当てのアイテムがぐっと安く購入できる場合があるので是非チェックしてみて下さい。</p>
                </div>
                <a href="https://amzn.to/44x2u0l" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-brands fa-amazon" aria-hidden="true"></i> AmazonでMacBookを購入する
                </a>
              </div>
            </div>
          </div>

          {/* ── 3. 楽天市場で買う ── */}
          <div id="rakuten" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-03-1024x569.jpg"
              alt="MacBookを安く買う方法！楽天市場編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">楽天市場で買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>楽天市場でMacBookを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>楽天経済圏に属している方はポイントアップイベント時の還元率に期待が持てます。</p>
                <p>ただし楽天市場に出品されているMacBookは正規代理店の製品ではないので、定価よりも価格が高い場合があり、公式サイトとの比較が必須です。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> 楽天市場のメリット</p>
                  <ul>
                    <li>楽天SPU＆ポイントアップキャンペーン利用で1〜14倍のポイント還元</li>
                    <li>楽天スーパーセール時のショップ買い周りで最大42倍のポイント還元</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> 楽天市場のデメリット</p>
                  <ul>
                    <li>定価より高い価格で出品している店舗もある</li>
                    <li>楽天経済圏でない方は恩恵が受けづらい</li>
                    <li>希望スペック（ストレージ容量、CPUなど）の商品がない可能性がある</li>
                    <li>購入後に自分でApple Care+加入の手続きが必要</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__sub">
                <h4>楽天市場の主なセール開催時期について</h4>
                <div className="buy-method-card__text">
                  <p>楽天市場はセールの回数が非常に多く、月の3分の1は何かしらのイベントが実施されている状況です。</p>
                  <p>毎年恒例で行われている主要なセールは以下の通り。</p>
                </div>
                <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="m-table-scroll">
                    <table className="m-table">
                      <thead>
                        <tr><th>キャンペーン名</th><th>内容</th><th>開催頻度</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><strong>お買い物マラソン</strong></td><td>複数店舗で買い回るとポイントがどんどんアップ</td><td>月1〜2回程度</td></tr>
                        <tr><td><strong>スーパーセール</strong></td><td>年4回の大型セール。買い回りでポイントアップも</td><td>3月・6月・9月・12月</td></tr>
                        <tr><td><strong>超ポイントバック祭</strong></td><td>購入金額が多いほどポイントがアップ</td><td>年2回ほど</td></tr>
                        <tr><td><strong>ブラックフライデー</strong></td><td>毎年11月開催のビッグセール</td><td>年1回（11月）</td></tr>
                        <tr><td><strong>大感謝祭</strong></td><td>1年の締めくくりに開催される年末セール</td><td>年1回（12月）</td></tr>
                        <tr><td><strong>5と0のつく日</strong></td><td>楽天カードでの支払いでポイントアップ</td><td>毎月5日・10日・15日・20日・25日・30日</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="buy-method-card__text" style={{ marginTop: 'var(--space-md)' }}>
                  <p>MacBookが直接値引きになるケースは少ないですが、セール時にはポイント還元率もアップするので、活かさない手はありません。</p>
                  <p>おすすめは年に4回実施される楽天スーパーセール。ショップ買い周りでポイント還元率が最大42倍になるので、欲しい物のまとめ買いで実質購入金額をぐっと抑えましょう。</p>
                </div>
                <a href="https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2Fmacbook%2F564895%2F%3Fl-id%3Dpc_header_search_suggest&amp;link_type=text&amp;ut=eyJwYWdlIjoidXJsIiwidHlwZSI6InRleHQiLCJjb2wiOjF9" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> 楽天市場でMacBookを購入する
                </a>
              </div>
            </div>
          </div>

          {/* ── 4. ヤフーショッピングで買う ── */}
          <div id="yahoo" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-04-1024x569.jpg"
              alt="MacBookを安く買う方法！ヤフーショッピング編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">ヤフーショッピングで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>ヤフーショッピングでMacBookを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>ヤフー経済圏に属している方はポイントアップイベント時の還元率に期待が持てます。</p>
                <p>ただしヤフーショッピングに出品されているMacBookは正規代理店の製品ではないので、定価よりも価格が高い場合があり、公式サイトとの比較が必須です。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> ヤフーショッピングのメリット</p>
                  <ul>
                    <li>Yahoo!お買い物リレー活用で最大11%安くなる</li>
                    <li>ポイントアップイベントで高ポイント還元が受けられる</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> ヤフーショッピングのデメリット</p>
                  <ul>
                    <li>定価より高い価格で出品している店舗もある</li>
                    <li>Yahoo!経済圏でない方は恩恵が受けづらい</li>
                    <li>希望スペック（ストレージ容量、CPUなど）の商品がない可能性がある</li>
                    <li>購入後に自分でApple Care+加入の手続きが必要</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__sub">
                <h4>Yahoo!ショッピングの主なセール開催時期について</h4>
                <div className="buy-method-card__text">
                  <p>頻繁にセールやポイントアップイベントが開催されているのが魅力のYahoo!ショッピング。</p>
                  <p>毎年恒例で行われている主要なセールは以下の通り。</p>
                </div>
                <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="m-table-scroll">
                    <table className="m-table">
                      <thead>
                        <tr><th>キャンペーン名</th><th>内容</th><th>開催頻度</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><strong>5のつく日キャンペーン</strong></td><td>5・15・25日はポイントがいつもよりお得に</td><td>毎月3回</td></tr>
                        <tr><td><strong>お買い物リレー</strong></td><td>複数のストアで買い物するほどポイントアップ</td><td>月1回ほど</td></tr>
                        <tr><td><strong>ゾロ目の日クーポン争奪戦</strong></td><td>毎月11日と22日は限定クーポンを配布</td><td>毎月11日・22日</td></tr>
                        <tr><td><strong>超PayPay祭</strong></td><td>PayPay決済で還元率アップの大型イベント</td><td>年1回</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="buy-method-card__text" style={{ marginTop: 'var(--space-md)' }}>
                  <p>MacBookが直接値引きになるケースは少ないですが、セール時にはポイント還元率もアップするので、活かさない手はありません。</p>
                  <p>おすすめは超PayPay祭。ショップ買い周りでポイント還元率が最大22.5％になるので、欲しい物のまとめ買いで実質購入金額をぐっと抑えましょう。</p>
                </div>
                <a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3676517&amp;pid=889103170&amp;vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3Dmacbook" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> ヤフーショッピングでMacBookを購入
                </a>
              </div>
            </div>
          </div>

          {/* ── 5. 家電量販店ECサイトで買う ── */}
          <div id="electronics" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-05-1024x569.jpg"
              alt="MacBookを安く買う方法！家電量販店編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">家電量販店ECサイトで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★☆☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>ビックカメラやヤマダ電機はAmazonと同じようにAppleと販売契約を結んでいる正規代理店。</p>
                <p>こちらもApple公式サイトで購入するのに比べると複数のメリットがあります。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> 家電量販店ECサイトのメリット</p>
                  <ul>
                    <li>各ECサイトごとに独自のポイント還元がある</li>
                    <li>割引セールの対象商品になる場合がある</li>
                    <li>Apple Care+に加入できる</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> 家電量販店ECサイトのデメリット</p>
                  <ul>
                    <li>希望スペック（ストレージ容量、CPUなど）の商品がない可能性がある</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__text">
                <p>安心して購入できるという観点は家電量販店ECサイトはとても魅力的な購入先でありますが、ポイント還元率は1%のみの場合がほとんどで他のルートに比べるとやや劣る印象です。</p>
                <p>MacBookを安く買おうと思うとあまり魅力的な条件ではないため、他の方法を検討したほうがよいでしょう。</p>
              </div>
              <a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3726980&amp;pid=891872675&amp;vc_url=https%3A%2F%2Fwww.yamada-denkiweb.com%2Fsearch%3Fq%3Dmacbook" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                <i className="fa-solid fa-store" aria-hidden="true"></i> ヤマダ電機で購入する
              </a>
            </div>
          </div>

          {/* ── 6. 中古ショップで買う ── */}
          <div id="used" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-06-1024x569.jpg"
              alt="MacBookを安く買う方法！中古ショップ編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">中古ショップで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★★☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>新品にこだわらないなら中古MacBookを購入するというのも1つの選択肢です。</p>
                <p>中古であれば確実に安くMacBookを購入することができますし、最新モデルは自分にとってオーバースペックという場合に型落ち品を柔軟に選べるのも良い点です。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> MacBookを中古で買うメリット</p>
                  <ul>
                    <li>中古なのでぐっと購入費用が抑えられる</li>
                    <li>型落ち品を柔軟に選べる</li>
                    <li>メルカリやラクマで個人から買うより商品の状態が正確</li>
                    <li>購入後の保証があって安心</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> MacBookを中古で買うデメリット</p>
                  <ul>
                    <li>希望スペック（ストレージ容量、CPUなど）の商品がない可能性がある</li>
                    <li>Apple Careには加入できない</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__text">
                <p>中古MacBookは購入先によって保証内容や価格が大きく異なります。失敗しないためにも、当サイトの購入ガイドでおすすめショップやモデル別の価格比較をチェックしてみてください。</p>
              </div>
              <a href="/macbook/" className="buy-method-cta">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 中古MacBook購入ガイドを見る
              </a>
            </div>
          </div>

          {/* ── 7. Appleストアで買う ── */}
          <div id="apple-store" className="m-card m-card--shadow buy-method-card">
            <img
              src="https://used-lab.jp/wp-content/uploads/2025/07/macbook-sale-07-1024x569.jpg"
              alt="MacBookを安く買う方法！Appleストア編"
              className="buy-method-card__img"
              width={1024}
              height={569}
              loading="lazy"
            />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">Appleストアで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★★★</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★☆☆☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>Appleストアで普通に買い物をするだけでは、ポイント還元も値引きも一切ないため確実に損をします。Appleストアを利用するなら、必ず「<a href="#gift-rebates">Appleギフトカード × 楽天リーベイツでポイント2重取り</a>」の方法を組み合わせましょう。</p>
                <p>ただし、Appleストアには他の購入先にはない独自の利点もあります。</p>
              </div>

              {/* 認定整備済製品 */}
              <div className="buy-method-card__sub">
                <h4>認定整備済製品が購入できる</h4>
                <div className="buy-method-card__text">
                  <p>Apple公式ストアでは「認定整備済製品」を最大15%OFFで購入できます。これは展示品や初期不良で返品された製品を、Appleが自社の品質基準で再整備・検品したうえで販売しているものです。</p>
                  <p>在庫は不安定で希望のMacBookに出会えるかは運次第ですが、新品同様の品質が割安で手に入るので、購入前に一度<a href="https://www.apple.com/jp/shop/refurbished/mac" target="_blank" rel="nofollow noopener noreferrer">Apple整備済製品ストア</a>をチェックしてみる価値があります。</p>
                </div>
              </div>

              {/* 金利0%ローン */}
              <div className="buy-method-card__sub">
                <h4>金利0%のショッピングローンが組める</h4>
                <div className="buy-method-card__text">
                  <p>Appleストアでは<a href="https://www.apple.com/jp/shop/browse/financing" target="_blank" rel="nofollow noopener noreferrer">金利0%・最大24回払いのショッピングローン</a>が利用できます。高価で手が出しづらいMacBook ProやMacBook Airの上位モデルでも、月々の負担を抑えて購入できるのは大きなメリットです。</p>
                  <p>クレジットカードの分割払いとは違い金利手数料が一切かからないので、一括購入と総支払額が変わらないのもポイントです。</p>
                </div>
              </div>

              {/* 教職員向け割引 */}
              <div className="buy-method-card__sub">
                <h4>学生・教職員向け割引がある</h4>
                <div className="buy-method-card__text">
                  <p>大学・高等専門学校・専門学校の学生や教職員であれば、MacBookを約10%OFFで購入できる<a href="https://www.apple.com/jp-edu/store" target="_blank" rel="nofollow noopener noreferrer">学生・教職員向けストア</a>が利用できます。対象者は限られますが、条件に当てはまるならぜひ活用しましょう。</p>
                  <p>入学前の方やPTA役員も対象になるので、自分が該当するか一度確認してみるのがおすすめです。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
