export default function SettingSection() {
  return (
    <section className="l-section" id="setting" aria-labelledby="heading-setting">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-setting">
          ディスプレイ常時点灯オフの設定方法
        </h2>
        <p className="m-section-desc">
          バッテリー消費を抑えたいときは、常時点灯をOFFに切り替えることも可能です。<br />
          設定はApple Watch本体・iPhoneどちらからでも簡単に変更できます。
        </p>

        <div className="l-grid l-grid--2col" style={{ gap: 'var(--space-xl)' }}>

          {/* Apple Watchから設定を変える */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__body">
              <h3 className="media-card__title">Apple Watchから設定を変える</h3>
              <p className="media-card__desc">
                Apple Watch本体から設定する場合は、下記3ステップを行います。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-gear" aria-hidden="true"></i>
                  設定方法
                </p>
                <ol className="info-card__list">
                  <li>設定画面を開き「<strong>画面表示と明るさ</strong>」をタップ</li>
                  <li>「<strong>常にオン</strong>」を選択</li>
                  <li>「<strong>常にオン</strong>」の設定をOFFにする</li>
                </ol>
              </div>
            </div>
          </div>

          {/* iPhoneから設定を変える */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__body">
              <h3 className="media-card__title">iPhoneから設定を変える</h3>
              <p className="media-card__desc">
                iPhoneから設定する場合は、Apple Watchのアプリを開き、下記3ステップを行います。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-gear" aria-hidden="true"></i>
                  設定方法
                </p>
                <ol className="info-card__list">
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
