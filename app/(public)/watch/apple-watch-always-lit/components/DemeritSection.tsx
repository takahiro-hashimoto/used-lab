import ContentImage from '../../../../components/ContentImage'
export default function DemeritSection() {
  const batteryData = [
    { time: '6:00', on: 100, off: 100 },
    { time: '8:00', on: 90, off: 95 },
    { time: '10:00', on: 83, off: 90 },
    { time: '12:00', on: 78, off: 85 },
    { time: '14:00', on: 70, off: 79 },
    { time: '16:00', on: 64, off: 72 },
    { time: '18:00', on: 52, off: 66 },
    { time: '20:00', on: 45, off: 60 },
    { time: '22:00', on: 38, off: 53 },
    { time: '0:00', on: 29, off: 48 },
  ]

  return (
    <section className="l-section" id="demerit" aria-labelledby="heading-demerit">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-demerit">
          ディスプレイ常時点灯の3つのデメリット
        </h2>
        <p className="m-section-desc">
          ディスプレイ常時点灯のデメリットを3つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 電池持ちが悪くなる */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/use-macbook.jpg"
                alt="Apple Watchのバッテリー消費イメージ"
                className="media-card__img"
                width={800}
                height={450}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">電池持ちが悪くなる</h3>
              <p className="media-card__desc">
                Apple Watchをディスプレイ常時点灯ありで使用すると、<strong>体感できるレベルでバッテリーの減りが早くなります。</strong>
              </p>
              <p className="media-card__desc">
                本記事の執筆にあたり、下記の条件でバッテリーの減りがどれくらい違うか検証してみました。
              </p>
              <p className="media-card__desc">
                結果は以下の通り。
              </p>
              <p className="media-card__desc">
                丸一日常時点灯オンで過ごした場合と常時点灯オフで過ごした場合を比べると、深夜0時の時点で<strong>バッテリー残量に約19%の差</strong>がつきました。
              </p>

              {/* バッテリー比較テーブル */}
              <div className="m-card m-table-card u-mb-xl">
                <div className="m-table-scroll">
                  <table className="m-table">
                    <thead>
                      <tr>
                        <th>時刻</th>
                        <th>常時点灯 オン</th>
                        <th>常時点灯 オフ</th>
                        <th>差</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batteryData.map((row) => (
                        <tr key={row.time}>
                          <td>{row.time}</td>
                          <td>{row.on}%</td>
                          <td>{row.off}%</td>
                          <td>{row.off - row.on === 0 ? '±0%' : `+${row.off - row.on}%`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="media-card__desc">
                ただし常時点灯あり・なしに関わらず、Apple Watchは<strong>毎日充電する必要がある</strong>ことに変わりはありません。
              </p>
              <p className="media-card__desc">
                就寝前に充電する習慣さえあれば、日中のバッテリー切れを心配する必要はほぼないでしょう。
              </p>
              <p className="media-card__desc">
                実際に筆者も常時点灯オンで毎日使っていますが、朝6時〜夜22時まで使っても<strong>バッテリーが切れたことは一度もありません。</strong>
              </p>

              {/* 検証環境 */}
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-flask" aria-hidden="true"></i>
                  検証環境
                </p>
                <ul className="info-card__list">
                  <li>検証端末：Apple Watch Series 7（GPSモデル）で常時点灯オン・オフをそれぞれ1日ずつ計測</li>
                  <li>壁紙：インフォグラフ</li>
                  <li>朝6時に100%の状態からスタートし、2時間おきにバッテリー残量（%）を計測</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. 映画を見に行ったときにシアターモード切り替えが必須 */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/apple-watch-alarm.jpg"
                alt="映画館でのApple Watch使用イメージ"
                className="media-card__img"
                width={800}
                height={450}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">映画を見に行ったときにシアターモード切り替えが必須</h3>
              <p className="media-card__desc">
                常時点灯ありのApple Watchを身に着けて映画館に行った際は、<strong>シアターモードへの切り替えが必要</strong>です。
              </p>
              <p className="media-card__desc">
                画面が常に光っていると、暗い館内で周囲の方の迷惑になってしまいます。
              </p>
              <p className="media-card__desc">
                切り替え自体は5秒ほどで完了するため大きなデメリットではありませんが、覚えておきたいポイントです。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-gear" aria-hidden="true"></i>
                  シアターモードの切り替え方
                </p>
                <ol className="info-card__list">
                  <li>Apple Watchの画面を下から上にスワイプして<strong>コントロールセンター</strong>を開く</li>
                  <li><strong>マスクのアイコン</strong>（シアターモード）をタップしてオンにする</li>
                  <li>映画が終わったら同じ手順でオフに戻す</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 3. 有機ELディスプレイの焼き付きリスク */}
          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__img-wrap">
              <ContentImage
                src="/images/content/photo/apple-watch-face.jpg"
                alt="Apple Watchの文字盤（常時点灯時）"
                className="media-card__img"
                width={800}
                height={450}
                loading="lazy"
              />
            </div>
            <div className="media-card__body">
              <h3 className="media-card__title">有機ELディスプレイの焼き付きリスク</h3>
              <p className="media-card__desc">
                Apple Watchの画面は<strong>有機EL（OLED）</strong>製です。同じ画像を長時間映し続けると、残像がうっすら残る「焼き付き」が起きることがあり、常時点灯ではそのリスクがやや高まります。
              </p>
              <p className="media-card__desc">
                ただしAppleは<strong>待機中の明るさを自動で下げる</strong>・<strong>秒針などを非表示にする</strong>といった対策を行っており、筆者も数年間常時点灯で使っていますが<strong>焼き付きは一度も発生していません。</strong>
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                  焼き付きを防ぐポイント
                </p>
                <ul className="info-card__list">
                  <li>文字盤（ウォッチフェイス）を定期的に変更する</li>
                  <li>画面の明るさを必要以上に上げない</li>
                  <li>使わない時間帯はシアターモードを活用する</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
