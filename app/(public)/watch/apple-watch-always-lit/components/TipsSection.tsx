export default function TipsSection() {
  return (
    <section className="l-section" id="tips" aria-labelledby="heading-tips">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-tips">
          Apple Watch SEで常時点灯に近づける裏ワザ
        </h2>
        <p className="m-section-desc">
          常時点灯なしのApple Watchでも、ちょっとした設定の工夫で常時点灯に近い使い勝手を実現できます。<br />
          ここでは簡単にできる裏技を2つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. AssistiveTouchを使う */}
          <div className="m-card m-card--shadow m-card--padded">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/869--vIUIv4?si=RL38mAlk0N9pjxFa"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">AssistiveTouchを使う</h3>
              <p className="media-card__desc">
                watchOS 8から使える「<strong>AssistiveTouch（アシスティブタッチ）</strong>」を使うと、手や指の動きだけでApple Watchを操作できるようになります。
              </p>
              <p className="media-card__desc">
                たとえば、「人差し指と親指を1回つまむ」「2回つまむ」といった簡単な動きで、画面をタッチしなくてもアプリを開いたり選んだりできます。
              </p>
              <p className="media-card__desc">
                この機能を使えば、手首を上げなくてもApple Watchをスムーズに使えるので、<strong>常時点灯に近い使い方も可能</strong>になります。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-gear" aria-hidden="true"></i>
                  設定方法
                </p>
                <ol className="media-card__list">
                  <li>Apple Watchで「<strong>設定App</strong>」を開く</li>
                  <li>「<strong>アクセシビリティ</strong>」→「<strong>AssistiveTouch</strong>」をタップ</li>
                  <li>「<strong>AssistiveTouch</strong>」をタップしてオンに切り替える</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 2. 少しだけ長く点灯させる */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <img
                src="/images/content/photo/mens-leather-belt-02.webp"
                alt="Apple Watchのスリープ解除時間設定画面"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">少しだけ長く点灯させる</h3>
              <p className="media-card__desc">
                Apple Watch SEで設定できる点灯時間は、<strong>15秒間と70秒間</strong>のどちらかになります。
              </p>
              <p className="media-card__desc">
                これを70秒間に設定すれば、頻繁に時計を見るようなタイミングで画面が表示されるタイムラグを感じずに済みます。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-gear" aria-hidden="true"></i>
                  設定方法
                </p>
                <ol className="media-card__list">
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
