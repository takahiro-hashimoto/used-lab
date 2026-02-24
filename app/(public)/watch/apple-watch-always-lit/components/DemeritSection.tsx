export default function DemeritSection() {
  const batteryData = [
    { time: '6:00', on: '100%', off: '100%' },
    { time: '8:00', on: '90%', off: '95%' },
    { time: '10:00', on: '83%', off: '90%' },
    { time: '12:00', on: '78%', off: '85%' },
    { time: '14:00', on: '70%', off: '79%' },
    { time: '16:00', on: '64%', off: '72%' },
    { time: '18:00', on: '52%', off: '66%' },
    { time: '20:00', on: '45%', off: '60%' },
    { time: '22:00', on: '38%', off: '53%' },
    { time: '0:00', on: '29%', off: '48%' },
  ]

  return (
    <section className="l-section" id="demerit" aria-labelledby="heading-demerit">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-demerit">
          ディスプレイ常時点灯のデメリット
        </h2>
        <p className="m-section-desc">
          ディスプレイ常時点灯のデメリットを2つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 電池持ちが悪くなる */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-battery-drain.jpg"
              alt="Apple Watchのバッテリー残量が減っている様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">電池持ちが悪くなる</h3>
              <p className="popular-card-desc">
                Apple Watchをディスプレイ常時点灯ありで使用すると、<strong>体感できるレベルでバッテリーの減りが早くなります。</strong>
              </p>
              <p className="popular-card-desc">
                本記事の執筆にあたり、下記の条件でバッテリーの減りがどれくらい違うか検証してみました。
              </p>

              {/* 検証環境 */}
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-flask" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  検証環境
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>検証端末：Apple Watch Series 7（GPSモデル）& Apple Watch Series 4（GPSモデル）</li>
                  <li>壁紙：インフォグラフ</li>
                  <li>朝6時に100%の状態からスタートし、2時間おきにバッテリー残量（%）を計測</li>
                </ul>
              </div>

              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                結果は以下の通り。
              </p>
              <p className="popular-card-desc">
                丸一日常時点灯オンで過ごした場合と常時点灯オフで過ごした場合を比べると、<strong>後者のほうが1.6倍も電池が長持ち</strong>しました。
              </p>

              {/* バッテリー比較テーブル */}
              <div style={{ overflowX: 'auto', marginTop: 'var(--space-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
                      <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '2px solid var(--color-border-light)', fontWeight: 700 }}>時刻</th>
                      <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '2px solid var(--color-border-light)', fontWeight: 700, color: 'var(--color-primary)' }}>常時点灯 オン</th>
                      <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '2px solid var(--color-border-light)', fontWeight: 700, color: 'var(--color-text-secondary)' }}>常時点灯 オフ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batteryData.map((row, i) => (
                      <tr key={row.time} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' }}>
                        <td style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '1px solid var(--color-border-light)', fontWeight: 600 }}>{row.time}</td>
                        <td style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '1px solid var(--color-border-light)', color: 'var(--color-primary)' }}>{row.on}</td>
                        <td style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', borderBottom: '1px solid var(--color-border-light)', color: 'var(--color-text-secondary)' }}>{row.off}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* グラフ画像 */}
              <figure style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                <img
                  src="/images/content/always-lit-battery-chart.jpg"
                  alt="常時点灯オン・オフのバッテリー残量推移グラフ"
                  width={600}
                  height={350}
                  loading="lazy"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }}
                />
                <figcaption style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-xs)' }}>
                  上記の表をグラフにするとこんな感じ。バッテリー残量が減っていくごとに差が大きく開いていったことがわかります。
                </figcaption>
              </figure>

              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                ただし常時点灯あり・なしに関わらず、Apple Watchは<strong>毎日充電する必要がある</strong>ことに変わりはありません。
              </p>
              <p className="popular-card-desc">
                そう考えると、バッテリーの減りはそこまで気にしなくても良いかも知れません。
              </p>
            </div>
          </div>

          {/* 2. 映画を見に行ったときにシアターモード切り替えが必須 */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/always-lit-theater-mode.jpg"
              alt="Apple Watchのシアターモード設定画面"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">映画を見に行ったときにシアターモード切り替えが必須</h3>
              <p className="popular-card-desc">
                常時点灯ありのApple Watchを身に着けて映画館に行った際は、<strong>シアターモードへの切り替えが必要</strong>です。
              </p>
              <p className="popular-card-desc">
                常時点灯していると周りの方に迷惑をかけるためです。
              </p>
              <p className="popular-card-desc">
                5秒ぐらいの設定なので大きなデメリットではありませんが、念のためデメリットの一つとしてあげておきます。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
