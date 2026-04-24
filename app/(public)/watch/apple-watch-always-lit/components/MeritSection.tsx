import ContentImage from '../../../../components/ContentImage'
export default function MeritSection() {
  return (
    <section className="l-section" id="merit" aria-labelledby="heading-merit">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
          ディスプレイ常時点灯の3つのメリット
        </h2>
        <p className="m-section-desc">
          Apple Watchを常時点灯できるメリットを3つに分けて紹介。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 腕をあげなくても画面の確認ができる */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/nomad-stratos-band0008.jpg"
                alt="Apple Watchを腕を上げずにちらっと確認する様子"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">腕をあげなくても画面の確認ができる</h3>
              <p className="media-card__desc">
                常時点灯機能がないApple Watchの場合、しっかり腕を持ち上げ手首をひねる動作をしないと画面が点灯しません。
              </p>
              <p className="media-card__desc">
                これが意外と不便に感じることが多くあります。例えば下記のようなシーン。
              </p>
              <ul className="u-mb-md media-card__list">
                <li>電車でつり革に手をかけた状態で時計を見たい</li>
                <li>会議中に来た通知をこそっと確認したい</li>
                <li>会話を楽しんでいる最中さっと時刻を確認したい</li>
                <li>買い物袋をぶら下げていて、手を動かせないけど時計が見たい</li>
              </ul>
              <p className="media-card__desc">
                シーンを問わず、ぱっとApple Watchの画面を確認したいときがよくある方は<strong>常時点灯ありモデル</strong>がおすすめです。
              </p>
            </div>
          </div>

          {/* 2. ファッション性が高くなる */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/apple-watch-always-lit-1.webp"
                alt="Apple Watchをファッションとして身に着けている様子"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">ファッション性が高くなる</h3>
              <p className="media-card__desc">
                時計は時刻を確認するだけでなく、ファッションアイテムとしても重要な存在です。実は一日のうち、自分で時計を見る回数よりも人から見られている回数のほうが多いかもしれません。
              </p>
              <p className="media-card__desc">
                常時点灯モデルであれば常に文字盤が表示されるため、腕元のアクセントとして機能します。ファッション性も重視したい方には<strong>常時点灯ディスプレイのApple Watch</strong>がおすすめです。
              </p>
              <dl className="glossary-box m-card u-mt-sm">
                <div className="glossary-item">
                  <dt className="glossary-item-title">常時点灯あり</dt>
                  <dd className="glossary-item-desc">常に画面が表示されるのでファッションの一部として機能する</dd>
                </div>
                <div className="glossary-item">
                  <dt className="glossary-item-title">常時点灯なし</dt>
                  <dd className="glossary-item-desc">基本画面が真っ暗なのでファッション性はイマイチ</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* 3. 時計を見たときのエフェクトが心地よい */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/applew-watch-always-lit-compare.gif"
                alt="Apple Watchの常時点灯で輝度が切り替わるエフェクト"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">時計を見たときのエフェクトが心地よい</h3>
              <p className="media-card__desc">
                常時点灯のApple Watchは常に画面が見えているとはいえ、通常は画面の輝度が下がり、控えめに点灯されている状態です。
              </p>
              <p className="media-card__desc">
                そのため、手を持ち上げたときには輝度が低い状態から高い状態へふわっと切り替わります。この切り替えのエフェクトが非常に心地よく、日常のちょっとした満足感につながります。
              </p>
              <dl className="glossary-box m-card u-mt-sm">
                <div className="glossary-item">
                  <dt className="glossary-item-title">常時点灯あり</dt>
                  <dd className="glossary-item-desc">ふわっと明るく画面が切り替わる</dd>
                </div>
                <div className="glossary-item">
                  <dt className="glossary-item-title">常時点灯なし</dt>
                  <dd className="glossary-item-desc">真っ暗な画面から一気に画面が明るくなる</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
