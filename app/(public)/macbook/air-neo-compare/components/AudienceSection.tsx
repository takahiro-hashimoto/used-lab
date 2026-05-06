import Image from 'next/image'

export default function AudienceSection() {
  return (
    <section className="l-section" id="audience" aria-labelledby="heading-audience">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-audience">
          大学生・社会人・プログラミング学習ならどっち？
        </h2>
        <p className="m-section-desc">
          使い方が近くても、必要なメモリ容量や外部ディスプレイ、USB-Cの拡張性で向くモデルは変わります
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <Image
                src="/images/content/photo/use-macbook.jpg"
                alt="大学生がMacBookを使ってレポート作成をするイメージ"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">大学生ならまずは新品Neoが有力</h3>
              <p className="media-card__desc">
                レポート作成、Web閲覧、オンライン授業、資料作成が中心なら、MacBook Neoでも十分こなせます。
                99,800円から新品で買えて、Apple IntelligenceやiPhone連係も使えるので、初めてのMacとしてはかなりわかりやすい選択肢です。
              </p>
              <p className="media-card__desc">
                ただし、卒論で大量のタブを開く、外部ディスプレイをよく使う、写真編集や動画編集にも広げたいなら、
                16GBメモリを選べるMacBook Airのほうが後悔しにくいです。
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <Image
                src="/images/content/thumbnail/macbook-image-03.webp"
                alt="社会人がMacBookで複数アプリを使って作業するイメージ"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">社会人はAirのほうが守備範囲が広い</h3>
              <p className="media-card__desc">
                資料作成、ZoomやMeet、複数アプリの同時利用、外部モニター接続まで含めると、MacBook Airのほうが扱いやすいです。
                Thunderbolt 4対応のUSB-Cポート、MagSafe 3、余裕のあるユニファイドメモリがあり、長く仕事用として使いやすい構成です。
              </p>
              <p className="media-card__desc">
                特に現行のMacBook Airは13インチと15インチがあり、512GB以上のストレージや24GB・32GBメモリも選べるため、
                「最初は軽作業中心だけど、あとから用途が広がるかも」という社会人に向いています。
              </p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded media-card--aside">
            <div className="media-card__img-wrap">
              <Image
                src="/images/content/photo/macbook-edit.webp"
                alt="MacBookでプログラミング学習をするイメージ"
                className="media-card__img"
                width={240}
                height={160}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">プログラミング学習なら基本はAirが安心</h3>
              <p className="media-card__desc">
                HTML/CSSや軽いJavaScript学習だけならNeoでも始められますが、開発を続けるほどメモリ8GB固定の制約が効いてきます。
                VS Code、ブラウザ、ローカル環境、Docker系ツール、複数タブを同時に使うなら、16GB以上のMacBook Airが安定です。
              </p>
              <p className="media-card__desc">
                また、外部ディスプレイや高速なSSD・ハブを使いやすいのもAirの強みです。
                iPhoneアプリ開発や長く学習を続ける前提なら、初期費用が少し高くてもAirを選ぶ価値があります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
