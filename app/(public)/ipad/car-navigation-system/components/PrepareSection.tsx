export default function PrepareSection() {
  return (
    <section className="l-section" id="prepare" aria-labelledby="heading-prepare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-prepare">
          iPadカーナビ化に必要なもの
        </h2>
        <p className="m-section-desc">
          iPadをカーナビとして使うために最低限揃えておきたいアイテムをまとめました。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/thumbnail/ipad-image-11.jpg"
                alt="iPad miniのセルラーモデル"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title"><a href="/ipad/recommend/">iPad本体（セルラーモデル）</a></h3>
              <p className="media-card__desc">
                カーナビとして使うなら<strong>GPS機能を搭載したセルラーモデルが必須</strong>です。Wi-FiモデルはGPS非搭載のため、正確な位置情報を取得できません。
              </p>
              <p className="media-card__desc">
                サイズは車内での取り回しを考えると<strong>iPad mini（8.3インチ）</strong>が最適。大きめの画面が良ければiPad Airも選択肢に入ります。中古なら1〜2世代前のモデルでもカーナビ用途には十分な性能があります。
              </p>
              <p className="lead-link" style={{ marginTop: 'var(--space-sm)' }}>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="/ipad/recommend/">おすすめの中古iPad5選び</a>
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/thumbnail/mount-holder.jpg"
                alt="車載ホルダーにiPadを設置した様子"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">車載ホルダー（タブレットマウント）</h3>
              <p className="media-card__desc">
                iPadを車内に固定するための車載ホルダーは必須アイテムです。吸盤・粘着ゲルタイプが取り付け位置の自由度が高くおすすめ。
              </p>
              <p className="media-card__desc">
                購入前に自分の車のダッシュボード周りを確認し、iPadのサイズに対応した製品を選びましょう。
              </p>
              <p className="lead-link" style={{ marginTop: 'var(--space-sm)' }}>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="https://amzn.to/4bFbYKv" target="_blank" rel="noopener noreferrer">AmazonでiPad対応の車載ホルダーを探す</a>
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/thumbnail/anker-charger.jpg"
                alt="シガーソケット充電器でiPadを充電"
                className="media-card__img"
                style={{ border: '1px solid var(--color-border-light)' }}
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">シガーソケット充電器</h3>
              <p className="media-card__desc">
                カーナビアプリはGPSと画面表示を常時使用するため、バッテリー消費が激しくなります。<strong>シガーソケットからUSB-C（またはLightning）で給電できる車載充電器</strong>を用意しましょう。
              </p>
              <p className="media-card__desc">
                出力20W以上の急速充電対応モデルなら、ナビを使いながらでもバッテリーが減りにくく安心です。
              </p>
              <p className="lead-link" style={{ marginTop: 'var(--space-sm)' }}>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="https://amzn.to/4tgOz8f" target="_blank" rel="noopener noreferrer">Amazonでシガーソケット充電器を探す</a>
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/thumbnail/car-navi-app.png"
                alt="iPadでカーナビアプリを操作する様子"
                className="media-card__img"
                style={{ border: '1px solid var(--color-border-light)' }}
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">カーナビアプリ</h3>
              <p className="media-card__desc">
                <strong>Googleマップ</strong>や<strong>Yahoo!カーナビ</strong>は無料で利用可能。インストールすればすぐにカーナビとして使い始められます。
              </p>
              <p className="media-card__desc">
                オフライン地図に対応したアプリを選べば、トンネル内や山間部など電波の届きにくい場所でも安心してナビを利用できます。
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/thumbnail/used-iphone-simlock.jpg"
                alt="iPadにSIMカードを挿入"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">SIMカード（格安SIM）</h3>
              <p className="media-card__desc">
                セルラーモデルで通信するにはSIMカードが必要です。カーナビ用途なら<strong>月1〜3GB程度のデータ専用プラン</strong>で十分。格安SIMなら月額数百円から運用できます。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
