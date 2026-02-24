export default function MeritSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="merit" aria-labelledby="heading-merit">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
          ディスプレイ常時点灯のメリット
        </h2>
        <p className="m-section-desc">
          Apple Watchを常時点灯できるメリットを3つに分けて紹介。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 腕をあげなくても画面の確認ができる */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-glance-check.jpg"
              alt="Apple Watchを腕を上げずにちらっと確認する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">腕をあげなくても画面の確認ができる</h3>
              <p className="popular-card-desc">
                常時点灯機能がないApple Watchの場合、しっかり腕を持ち上げ手首をひねる動作をしないと画面が点灯しません。
              </p>
              <p className="popular-card-desc">
                これが意外と不便に感じることが多くあります。例えば下記のようなシーン。
              </p>
              <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginBottom: 'var(--space-md)' }}>
                <li>電車でつり革に手をかけた状態で時計を見たい</li>
                <li>会議中に来た通知をこそっと確認したい</li>
                <li>会話を楽しんでいる最中さっと時刻を確認したい</li>
                <li>買い物袋をぶら下げていて、手を動かせないけど時計が見たい</li>
              </ul>
              <p className="popular-card-desc">
                シーンを問わず、ぱっとApple Watchの画面を確認したいときがよくある方は<strong>常時点灯ありモデル</strong>がおすすめです。
              </p>
            </div>
          </div>

          {/* 2. ファッション性が高くなる */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-fashion-wrist.jpg"
              alt="Apple Watchをファッションとして身に着けている様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ファッション性が高くなる</h3>
              <p className="popular-card-desc">
                時計は時刻を確認する以外にもファッションアイテムとしても利用されますよね。
              </p>
              <p className="popular-card-desc">
                一日のうち自分で時計を見る機会よりも人に見られている数のほうが多いんじゃないかなと思います。
              </p>
              <p className="popular-card-desc">
                ファッション性という軸で常時点灯ありなしを比較すると下記のような違いがあります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>
                    <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: 'var(--color-primary)', marginRight: 'var(--space-xs)' }}></i>
                    常時点灯あり
                  </p>
                  <p className="popular-card-desc">常に画面が表示されるのでファッションの一部として機能する</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true" style={{ color: 'var(--color-text-tertiary)', marginRight: 'var(--space-xs)' }}></i>
                    常時点灯なし
                  </p>
                  <p className="popular-card-desc">基本画面が真っ暗なのでファッション性はイマイチ</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                時計を機能的な価値だけでなく、ファッションとしても楽しみたいなら、<strong>常時点灯ディスプレイのApple Watch</strong>がおすすめです。
              </p>
            </div>
          </div>

          {/* 3. 時計を見たときのエフェクトが心地よい */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-wrist-raise-effect.jpg"
              alt="Apple Watchの常時点灯で輝度が切り替わるエフェクト"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">時計を見たときのエフェクトが心地よい</h3>
              <p className="popular-card-desc">
                常時点灯のApple Watchは常に画面が見えているとはいえ、通常は画面の輝度が下がり、控えめに点灯されている状態になります。
              </p>
              <p className="popular-card-desc">
                なので、手を持ち上げたときには輝度が低い状態から高い状態に切り替わるのですが、このときのエフェクトがなんとも心地よいです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>
                    <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: 'var(--color-primary)', marginRight: 'var(--space-xs)' }}></i>
                    常時点灯あり
                  </p>
                  <p className="popular-card-desc">ふわっと明るく画面が切り替わる</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true" style={{ color: 'var(--color-text-tertiary)', marginRight: 'var(--space-xs)' }}></i>
                    常時点灯なし
                  </p>
                  <p className="popular-card-desc">真っ暗な画面から一気に画面が明るくなる</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
