export default function SettingSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="setting" aria-labelledby="heading-setting">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-setting">
          ディスプレイ常時点灯オフの設定方法
        </h2>
        <p className="m-section-desc">
          Apple Watchの常時点灯はバッテリー消費が早くなってしまうのがデメリットとお伝えしました。<br />
          旅行中などでバッテリー消費を抑えたいといった場合は常時点灯をOFFにすることが可能なので、紹介しておきます。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* Apple Watchから設定を変える */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-setting-watch.jpg"
              alt="Apple Watch本体から常時点灯を設定する画面"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">Apple Watchから設定を変える</h3>
              <p className="popular-card-desc">
                Apple Watch本体から設定する場合は、下記3ステップを行います。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-gear" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  設定方法
                </p>
                <ol style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)' }}>
                  <li>設定画面を開き「<strong>画面表示と明るさ</strong>」をタップ</li>
                  <li>「<strong>常にON</strong>」を選択</li>
                  <li>「<strong>常にオン</strong>」の設定をOFFにする</li>
                </ol>
              </div>
            </div>
          </div>

          {/* iPhoneから設定を変える */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-setting-iphone.jpg"
              alt="iPhoneからApple Watchの常時点灯を設定する画面"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">iPhoneから設定を変える</h3>
              <p className="popular-card-desc">
                iPhoneから設定する場合は、Apple Watchのアプリを開き、下記3ステップを行います。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-gear" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  設定方法
                </p>
                <ol style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)' }}>
                  <li>Apple Watchで「<strong>設定App</strong>」を開く</li>
                  <li>「<strong>画面の表示と明るさ</strong>」を選択</li>
                  <li>「<strong>常にオン</strong>」をタップして設定をOFFにする</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
