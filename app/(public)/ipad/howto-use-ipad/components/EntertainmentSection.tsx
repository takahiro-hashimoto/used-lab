export default function EntertainmentSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="entertainment" aria-labelledby="heading-entertainment">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-entertainment">
          iPadがあればできること【エンタメ編】
        </h2>
        <p className="m-section-desc">
          iPadの使用方法として、最も一般的でイメージされやすいのが「エンタメを楽しむ」という使い方ではないでしょうか？<br />
          ここでは、iPadならではのエンタメの楽しみ方を4つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 大画面で動画鑑賞を楽しむ */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/magextand-m-use-low-table.jpg"
              alt="iPadで動画鑑賞する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">大画面で動画鑑賞を楽しむ</h3>
              <p className="popular-card-desc">
                iPadは臨場感に溢れた映像コンテンツを楽しむのに最適なデバイスです。
              </p>
              <p className="popular-card-desc">
                スマホだと見落としがちな演者の細かい表情や演出効果も大画面のiPadならじっくり楽しむことができます。
              </p>
              <p className="popular-card-desc">
                さらにiPadでの動画鑑賞には楽な姿勢で動画を視聴しやすくなったり、目が疲れづらくなるメリットも。コンテンツを十二分に楽しめて体にも優しいなんて一石二鳥です。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのVODアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://amzn.to/3ChAoYt" rel="nofollow sponsored noopener" target="_blank">Amazonプライムビデオ</a></li>
                  <li><a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3283749&pid=888488282" rel="nofollow sponsored noopener" target="_blank">hulu</a></li>
                  <li><a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3283749&pid=888488283" rel="nofollow sponsored noopener" target="_blank">U-NEXT</a></li>
                  <li><a href="https://www.netflix.com/jp/" rel="nofollow noopener" target="_blank">Netflix</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. 電子書籍を読む */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-mini-6-reading.jpg"
              alt="iPadで電子書籍を読む様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">電子書籍を読む</h3>
              <p className="popular-card-desc">
                スマホでの読書は、画面の小ささゆえに拡大・縮小を繰り返す必要があり、どうしても視覚的なストレスが溜まりがちです。
              </p>
              <p className="popular-card-desc">
                また、電子書籍の醍醐味である「マーカー機能」も、スマホの画面サイズでは誤操作が起きやすく、集中力を削がれる原因にもなります。
              </p>
              <p className="popular-card-desc">
                その点、iPadなら本物の雑誌を広げるような感覚でコンテンツに没入できます。画面が広い分、ペンや指でのハイライト操作も驚くほどスムーズ。<strong>電子書籍を日常的に楽しむ習慣がある方にとって、iPadの導入は読書体験を劇的にアップデートする最良の投資</strong>になります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの電子書籍アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://amzn.to/3YmpriY" rel="nofollow sponsored noopener" target="_blank">Kindle</a></li>
                  <li><a href="https://px.a8.net/svt/ejp?a8mat=3BI37W+HV0XE+3ZNE+614CY" rel="nofollow sponsored noopener" target="_blank">楽天マガジン</a></li>
                  <li><a href="https://apps.apple.com/jp/app/i%E6%96%87%E5%BA%ABhd/id369111608" target="_blank" rel="noopener">i文庫HD</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. ゲームを楽しむ */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-gaming.jpg"
              alt="iPadでゲームを楽しむ様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ゲームを楽しむ</h3>
              <p className="popular-card-desc">
                繊細なグラフィックや美しい色彩を堪能したいなら、iPadの大画面は外せません。
              </p>
              <p className="popular-card-desc">
                例えば『三国志真戦』のような戦略シミュレーションでは、クオリティの高い戦闘シーンを大画面でよりダイナミックに楽しめます。また、オープンワールドのRPGでも、スマホの小さな画面では見落としがちな細かなテクスチャや美しいライティングを存分に味わうことが可能です。
              </p>
              <p className="popular-card-desc">
                複雑なUI（ボタン配置）に画面を占領されるストレスからも解放され、純粋にゲームの世界観に没入できる。<strong>iPhoneでのプレイに少しでも窮屈さを感じているなら、ぜひiPadでのゲーム体験を試してみてください。</strong>
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのゲームアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://genshin.hoyoverse.com/ja" rel="nofollow noopener" target="_blank">原神</a></li>
                  <li>三国志真戦</li>
                  <li><a href="https://apps.apple.com/jp/app/%E3%83%9E%E3%83%AA%E3%82%AA%E3%82%AB%E3%83%BC%E3%83%88-%E3%83%84%E3%82%A2%E3%83%BC/id1293634699" rel="nofollow noopener" target="_blank">マリオカートツアー</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. 地上波テレビを視聴する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/nasne-use-ipad-1.jpg"
              alt="iPad + nasneで地上波テレビを見る様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">地上波テレビを視聴する</h3>
              <p className="popular-card-desc">
                iPadはネットワークレコーダーを導入することで、テレビ視聴が可能になります。
              </p>
              <p className="popular-card-desc">
                家の中どこでもテレビを視聴できる環境はとても魅力的ですし、たまにしかテレビは見ないから所有したくないなんていう方にもうってつけ。
              </p>
              <p className="popular-card-desc">
                おすすめのネットワークレコーダーは<a href="https://amzn.to/3YmsyaI" rel="nofollow sponsored noopener" target="_blank"><strong>nasne</strong></a>というアイテム。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-satellite-dish" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  nasneのできること
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>iPhone、iPad、Macからテレビが見れる</li>
                  <li>番組録画ができる</li>
                  <li>録画した番組を家の外から視聴できる</li>
                  <li>アプリの動作も軽くて使いやすい</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                我が家でも大活躍しているアイテムなので、気になった方はぜひチェックしてみてください！
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
