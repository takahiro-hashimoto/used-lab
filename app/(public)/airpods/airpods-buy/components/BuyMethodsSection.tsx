import Link from 'next/link'

export default function BuyMethodsSection() {
  return (
    <section id="comparison" className="l-section">
      <style>{`.buy-method-card a:not(.buy-method-cta){color:var(--color-primary)}.buy-method-cta-group{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--space-sm);margin-top:var(--space-lg)}.buy-method-cta-group .buy-method-cta{margin:0}`}</style>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg">AirPodsを安く買う7つの方法
        </h2>
        <p className="m-section-desc">
          Apple公式・ECモール・中古ショップなど、AirPodsを購入できるルートは多彩。
        </p>
        <p className="m-section-desc">
          それぞれの価格・保証・ポイント還元を比較して、自分に合った買い方を見つけましょう。
        </p>

        <div className="l-grid l-grid--1col" style={{ gap: 'var(--space-xl)' }}>
          {/* ── 1. Appleギフトカード × 楽天リーベイツ ── */}
          <div id="gift-rebates" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-cheap-apple.jpg" alt="AirPodsを安く買う方法！ポイント二重取り編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                    <img src="/images/content/photo/watch-buy/apple-giftcard-buy-1024x576.jpg" alt="楽天市場でAppleギフトカードを購入" className="m-timeline__img" width={1024} height={576} loading="lazy" />
                    <p>Apple製品をお得に買うための第一歩は、楽天市場で「<a href="https://hb.afl.rakuten.co.jp/hgc/2b438bef.163112e7.2b438bf0.c161de07/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcomputer%2Fitunes%2F&amp;link_type=text&amp;ut=eyJwYWdlIjoidXJsIiwidHlwZSI6InRleHQiLCJjb2wiOjF9" target="_blank" rel="nofollow noreferrer noopener">Appleギフトカード</a>」を購入することです。</p>
                    <p>他でも買えますが、楽天を使う最大のメリットはポイント還元率。SPU（スーパーポイントアップ）や買いまわりイベントを組み合わせることで、驚くほどポイントが貯まります。</p>
                    <p>カードは1,500円から50,000円まで、1円単位で指定可能。Apple製品はもちろん、サブスクの支払いにも使えます。</p>
                    <p>ただし、購入時には下記のような制約もあります。狙っているデバイスがあるなら、計画的に準備を進めましょう。</p>
                    <ul className="buy-method-card__list u-mt-md">
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
                    <img src="/images/content/photo/watch-buy/c167fb3e3db0bc7458bee73310400259-1024x576.jpg" alt="AppleギフトカードをApple IDに登録" className="m-timeline__img" width={1024} height={576} loading="lazy" />
                    <p>楽天市場でAppleギフトカードを購入すると、数分後にメールが届きます。</p>
                    <p>送られてきたコードをタップして案内に従って操作していけば、ギフトカードの購入金額がApple IDの残高に追加されます。</p>
                  </div>
                </div>

                <div className="m-timeline__item">
                  <div className="m-timeline__number">3</div>
                  <div className="m-timeline__content">
                    <h4>楽天リーベイツを経由してAppleストアで買い物</h4>
                    <img src="/images/content/photo/watch-buy/rakuten-reabayts-1024x576.jpg" alt="楽天リーベイツを経由してAppleストアで買い物" className="m-timeline__img" width={1024} height={576} loading="lazy" />
                    <p>あとはネットショップまとめサイトの<a href="https://www.rebates.jp/referrer?referrerid=ksDHCQqoohw%3D" target="_blank" rel="noreferrer noopener nofollow">楽天リーベイツ</a>を経由してApple公式ストアへ進み、チャージしたAppleギフトで買い物をするだけ。</p>
                    <p>このフローを挟むことで、下記のような還元率でポイントをゲットできます。</p>
                    <ul className="buy-method-card__list u-mt-md">
                      <li>通常時期：1〜2％</li>
                      <li>楽天スーパーセール実施時期：3〜5%</li>
                    </ul>
                    <p className="u-mt-sm">発売して間もないアイテムは対象外になるデメリットもありますが、多くの商品がポイント還元の対象なので、こちらも忘れずに実施しましょう！</p>
                  </div>
                </div>
              </div>
              <div className="buy-method-cta-group">
                <a href="https://www.rebates.jp/referrer?referrerid=ksDHCQqoohw%3D" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 楽天リーベイツを見る
                </a>
                <a href="https://hb.afl.rakuten.co.jp/hgc/2b438bef.163112e7.2b438bf0.c161de07/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcomputer%2Fitunes%2F&amp;link_type=text&amp;ut=eyJwYWdlIjoidXJsIiwidHlwZSI6InRleHQiLCJjb2wiOjF9" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-gift" aria-hidden="true"></i> Appleギフトカードを購入
                </a>
              </div>
            </div>
          </div>

          {/* ── 2. Amazonで買う ── */}
          <div id="amazon" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-amazon.jpg" alt="AirPodsを安く買う方法！Amazon編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                <p>AmazonでAirPodsを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>ポイント還元が受けられたり、AirPodsがセール対象になるのに加えて、正規代理店ならではのメリットがいくつもあるのが特徴です。</p>
                <p>2022年まではAmazonチャージによるポイント還元でポイントの二重取りができたのですが、それが実践できなくなったデメリットがとても大きい…。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> Amazonのメリット</p>
                  <ul>
                    <li>Amazonポイントが1%以上付与される</li>
                    <li>セール時に割引価格でAirPodsが購入できる</li>
                    <li>整備済み品を購入できる</li>
                    <li>Apple Care+に加入できる</li>
                    <li>公式サイトと定価が同じ</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> Amazonのデメリット</p>
                  <ul>
                    <li>Amazonチャージによるポイント還元は2022年で廃止</li>
                  </ul>
                </div>
              </div>

              {/* Amazonのセールについて */}
              <div className="buy-method-card__sub">
                <h4>Amazonのセールについて</h4>
                <div className="buy-method-card__text">
                  <p>Amazonでは年に4回ほど大きなセールが実施されており、AirPodsシリーズが頻繁にセール対象品として登場します。</p>
                  <p>また、大型セール以外にも月末に実施されるタイムセール祭が行われており、ここでもAirPodsがセール対象になる場合があるので要チェックです。</p>
                </div>
                <div className="m-card m-table-card u-mt-md">
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
                  <p>AmazonはApple製品の正規代理店なので、セール価格で買い物ができたりポイントが付与される以外にも「整備済みのAirPods」が買えるメリットがあります。</p>
                  <p>整備済みの型落ちモデルは在庫数に波がありますが、お目当てのアイテムがぐっと安く購入できる場合があるので是非チェックしてみて下さい。</p>
                </div>
                <a href="https://amzn.to/4vu4emA" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-brands fa-amazon" aria-hidden="true"></i> AmazonでAirPodsを購入する
                </a>
              </div>
            </div>
          </div>

          {/* ── 6. 中古ショップで買う ── */}
          <div id="used" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-cheap-used-ec.jpg" alt="AirPodsを安く買う方法！中古ショップ編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                <p>新品にこだわらないなら中古AirPodsを購入するというのも1つの選択肢です。</p>
                <p>中古であれば確実に安くAirPodsを購入することができますし、最新モデルは自分にとってオーバースペックという場合に型落ち品を柔軟に選べるのも良い点です。</p>
              </div>

              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> AirPodsを中古で買うメリット</p>
                  <ul>
                    <li>購入費用を大幅に抑えられる</li>
                    <li>型落ち品を柔軟に選べる</li>
                    <li>メルカリ等個人売買より商品状態が正確</li>
                    <li>購入後の保証がある</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> AirPodsを中古で買うデメリット</p>
                  <ul>
                    <li>バッテリーの劣化に要注意（AirPodsのバッテリーは消耗品。中古品は充電持ちが著しく低下している場合がある）</li>
                    <li>希望カラー・モデルが在庫切れの場合がある</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__text">
                <p>中古AirPodsはバッテリー残量・充電サイクル数を必ず確認しましょう。AirPodsのバッテリーは消耗品で、使用時間によって充電持ちが著しく低下している場合があります。</p>
                <p>購入後の保証が付いているショップを選ぶことが重要です。当サイトの購入ガイドでおすすめショップやモデル別の価格比較をチェックしてみてください。</p>
              </div>
              <Link href="/airpods/" className="buy-method-cta">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 中古AirPods購入ガイドを見る
              </Link>
            </div>
          </div>

          {/* ── 3. 楽天市場で買う ── */}
          <div id="rakuten" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-cheap-rakuten.jpg" alt="AirPodsを安く買う方法！楽天市場編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                <p>楽天市場でAirPodsを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>楽天経済圏に属している方はポイントアップイベント時の還元率に期待が持てます。</p>
                <p>ただし楽天市場に出品されているAirPodsは正規代理店以外の出品もあるため、定価よりも価格が高い場合があり、公式サイトとの比較が必須です。</p>
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
                    <li>楽天経済圏でない方は恩恵が受けづらい</li>
                    <li>楽天市場のAirPodsは正規代理店以外の出品もあるため公式との価格比較が必須</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__sub">
                <h4>楽天市場の主なセール開催時期について</h4>
                <div className="buy-method-card__text">
                  <p>楽天市場はセールの回数が非常に多く、月の3分の1は何かしらのイベントが実施されている状況です。</p>
                  <p>毎年恒例で行われている主要なセールは以下の通り。</p>
                </div>
                <div className="m-card m-table-card u-mt-md">
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
                <div className="buy-method-card__text u-mt-md">
                  <p>AirPodsが直接値引きになるケースは少ないですが、セール時にはポイント還元率もアップするので、活かさない手はありません。</p>
                  <p>おすすめは年に4回実施される楽天スーパーセール。ショップ買い周りでポイント還元率が最大42倍になるので、欲しい物のまとめ買いで実質購入金額をぐっと抑えましょう。</p>
                </div>
                <a href="https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2Fairpods%2F&amp;link_type=hybrid_url&amp;ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> 楽天市場でAirPodsを購入する
                </a>
              </div>
            </div>
          </div>

          {/* ── 4. ヤフーショッピングで買う ── */}
          <div id="yahoo" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-cheap-yahoo.jpg" alt="AirPodsを安く買う方法！ヤフーショッピング編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                <p>ヤフーショッピングでAirPodsを購入する方法は下記のようなメリット・デメリットがあります。</p>
                <p>Yahoo!経済圏に属している方はポイントアップイベント時の還元率に期待が持てます。</p>
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
                    <li>Apple Care+には加入できない</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__sub">
                <h4>Yahoo!ショッピングの主なセール開催時期について</h4>
                <div className="buy-method-card__text">
                  <p>頻繁にセールやポイントアップイベントが開催されているのが魅力のYahoo!ショッピング。</p>
                  <p>毎年恒例で行われている主要なセールは以下の通り。</p>
                </div>
                <div className="m-card m-table-card u-mt-md">
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
                <div className="buy-method-card__text u-mt-md">
                  <p>AirPodsが直接値引きになるケースは少ないですが、セール時にはポイント還元率もアップするので、活かさない手はありません。</p>
                  <p>おすすめは超PayPay祭。ショップ買い周りでポイント還元率が最大22.5％になるので、欲しい物のまとめ買いで実質購入金額をぐっと抑えましょう。</p>
                </div>
                <a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3676517&amp;pid=889103170&amp;vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3Dairpods" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> ヤフーショッピングでAirPodsを見る
                </a>
              </div>
            </div>
          </div>

          {/* ── 5. 家電量販店ECサイトで買う ── */}
          <div id="electronics" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-cheap-kaden.jpg" alt="AirPodsを安く買う方法！家電量販店編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                    <li>独自のポイント還元がある</li>
                    <li>割引セール対象になる場合がある</li>
                    <li>Apple Care+に加入できる</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> 家電量販店ECサイトのデメリット</p>
                  <ul>
                    <li>ポイント還元率は1%程度と他ルートより劣る</li>
                  </ul>
                </div>
              </div>

              <div className="buy-method-card__text">
                <p>安心して購入できるという観点は家電量販店ECサイトはとても魅力的な購入先でありますが、ポイント還元率は1%程度のみの場合がほとんどで他のルートに比べるとやや劣る印象です。</p>
                <p>AirPodsを安く買おうと思うとあまり積極的に選ぶほどのメリットはないため、他の方法も検討してみましょう。</p>
              </div>
              <a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3726980&amp;pid=891872675&amp;vc_url=https%3A%2F%2Fwww.yamada-denkiweb.com%2Fsearch%2FApple%2520AirPods%2F" className="buy-method-cta" target="_blank" rel="nofollow noopener noreferrer">
                <i className="fa-solid fa-store" aria-hidden="true"></i> ヤマダ電機でAirPodsを見る
              </a>
            </div>
          </div>

          {/* ── 7. コストコで買う ── */}
          <div id="costco" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/airpods-costco.jpg" alt="AirPodsを安く買う方法！コストコ編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
            <div className="buy-method-card__body">
              <h3 className="buy-method-card__title">コストコで買う</h3>
              <div className="buy-method-card__rating">
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お手軽度:</span>
                  <span className="buy-method-card__rating-stars">★★★☆☆</span>
                </span>
                <span className="buy-method-card__rating-item">
                  <span className="buy-method-card__rating-label">お得度:</span>
                  <span className="buy-method-card__rating-stars">★★★☆☆</span>
                </span>
              </div>
              <div className="buy-method-card__text">
                <p>コストコ会員の方は、コストコの販売価格もチェックする価値があります。時期によってはAirPodsが定価より<strong>3,000〜6,000円ほど安く</strong>購入できる場合があります。</p>
                <p>ただしコストコは年会費が4,840円（税込）かかります。現時点でコストコ会員の方のみお得に購入できる方法と考えてください。</p>
              </div>
              <div className="merit-demerit">
                <div className="merit-box">
                  <p className="merit-box__title"><i className="fa-regular fa-circle-check" aria-hidden="true"></i> コストコのメリット</p>
                  <ul>
                    <li>定価より3,000〜6,000円安く買えることがある</li>
                    <li>まとめ買いや他の購入と合わせてお得になりやすい</li>
                  </ul>
                </div>
                <div className="demerit-box">
                  <p className="demerit-box__title"><i className="fa-regular fa-circle-xmark" aria-hidden="true"></i> コストコのデメリット</p>
                  <ul>
                    <li>年会費4,840円が必要（会員でない方には恩恵なし）</li>
                    <li>取り扱いモデルが限られる</li>
                    <li>Apple Care+には加入できない</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── 8. Appleストアで買う ── */}
          <div id="apple-store" className="m-card m-card--shadow buy-method-card">
            <img src="/images/content/photo/airpods-buy/apple-store.jpg" alt="AirPodsを安く買う方法！Appleストア編" className="buy-method-card__img" width={1024} height={569} loading="lazy" />
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
                  <p>Apple公式ストアでは「認定整備済製品」を割引価格で購入できます。これはAppleが自社の品質基準で再整備・検品したうえで販売しているものです。</p>
                  <p>在庫は不安定で希望のAirPodsに出会えるかは運次第ですが、新品同様の品質が割安で手に入るので、購入前に一度<a href="https://www.apple.com/jp/shop/refurbished" target="_blank" rel="nofollow noopener noreferrer">Apple整備済製品ストア</a>をチェックしてみる価値があります。</p>
                </div>
              </div>

              {/* 金利0%ローン */}
              <div className="buy-method-card__sub">
                <h4>金利0%のショッピングローンが組める</h4>
                <div className="buy-method-card__text">
                  <p>Appleストアでは<a href="https://www.apple.com/jp/shop/browse/financing" target="_blank" rel="nofollow noopener noreferrer">金利0%のショッピングローン</a>が利用できます。クレジットカードの分割払いとは違い金利手数料が一切かからないので、一括購入と総支払額が変わらないのもポイントです。</p>
                </div>
              </div>

              {/* 学生割引なし注意書き */}
              <div className="buy-method-card__sub">
                <h4>※AirPodsには学生割引がない</h4>
                <div className="buy-method-card__text">
                  <p>Apple Watch・iPhone・MacBook・iPadには学生・教職員向けの割引ストアが用意されていますが、<strong>AirPodsは学生割引の対象外</strong>です。学割目当てでAppleストアを検討している場合はご注意ください。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
