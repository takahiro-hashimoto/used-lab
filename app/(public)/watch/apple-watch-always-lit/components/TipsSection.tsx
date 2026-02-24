export default function TipsSection() {
  return (
    <section className="l-section" id="tips" aria-labelledby="heading-tips">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-tips">
          Apple Watch SEで常時点灯に近づける裏ワザ
        </h2>
        <p className="m-section-desc">
          Apple Watch SEなどの常時点灯なしモデルはしっかり手首をあげないと画面が表示しないのがデメリットです。<br />
          ただし、常時点灯なしのモデルでもちょっとした裏技を駆使すれば、常時点灯ありモデルの使用感に近づくことができます。<br />
          ここではちょっとした裏技を2つ紹介したいと思います。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. AssistiveTouchを使う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-assistive-touch.jpg"
              alt="Apple WatchのAssistiveTouch設定画面"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">AssistiveTouchを使う</h3>
              <p className="popular-card-desc">
                watchOS 8から使える「<strong>AssistiveTouch（アシスティブタッチ）</strong>」を使うと、手や指の動きだけでApple Watchを操作できるようになります。
              </p>
              <p className="popular-card-desc">
                たとえば、「人差し指と親指を1回つまむ」「2回つまむ」といった簡単な動きで、画面をタッチしなくてもアプリを開いたり選んだりできます。
              </p>
              <p className="popular-card-desc">
                この機能を使えば、手首を上げなくてもApple Watchをスムーズに使えるので、<strong>常時点灯に近い使い方も可能</strong>になります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-gear" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  設定方法
                </p>
                <ol style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)' }}>
                  <li>Apple Watchで「<strong>設定App</strong>」を開く</li>
                  <li>「<strong>アクセシビリティ</strong>」→「<strong>AssistiveTouch</strong>」をタップ</li>
                  <li>「<strong>AssistiveTouch</strong>」をタップしてオンに切り替える</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 2. 少しだけ長く点灯させる */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-extend-wake.jpg"
              alt="Apple Watchのスリープ解除時間設定画面"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">少しだけ長く点灯させる</h3>
              <p className="popular-card-desc">
                Apple Watch SEで設定できる点灯時間は、<strong>15秒間と70秒間</strong>のどちらかになります。
              </p>
              <p className="popular-card-desc">
                これを70秒間に設定すれば、頻繁に時計を見るようなタイミングで画面が表示されるタイムラグを感じずに済みます。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-gear" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  設定方法
                </p>
                <ol style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)' }}>
                  <li>iPhoneのホーム画面にある「<strong>Watchアプリ</strong>」を開く</li>
                  <li>「<strong>一般</strong>」→「<strong>画面をスリープ解除</strong>」をタップ</li>
                  <li>「<strong>70秒間スリープ解除</strong>」にチェックを入れる</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
