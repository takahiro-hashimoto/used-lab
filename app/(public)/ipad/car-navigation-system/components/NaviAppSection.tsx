import Image from 'next/image'

export default function NaviAppSection() {
  return (
    <section className="l-section" id="navi-app" aria-labelledby="heading-navi-app">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-navi-app">
          おすすめカーナビアプリ比較
        </h2>
        <p className="m-section-desc">
          iPadで使える主要カーナビアプリの特徴を比較します。いずれも無料で利用可能です。
        </p>

        <div className="m-card m-card--shadow m-table-card u-mt-2xl">
          <table className="m-table">
            <thead>
              <tr>
                <th>項目</th>
                <th>Googleマップ</th>
                <th>Yahoo!カーナビ</th>
                <th>カーナビタイム</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ロゴ</strong></td>
                <td><Image src="/images/content/thumbnail/google-map.jpg" alt="Googleマップのロゴ" width={80} height={40} style={{ objectFit: 'contain', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-sm)' }} /></td>
                <td><Image src="/images/content/thumbnail/car-navi-app.png" alt="Yahoo!カーナビのロゴ" width={80} height={40} style={{ objectFit: 'contain', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-sm)' }} /></td>
                <td><Image src="/images/content/thumbnail/navitime.png" alt="カーナビタイムのロゴ" width={80} height={40} style={{ objectFit: 'contain', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-sm)' }} /></td>
              </tr>
              <tr>
                <td><strong>料金</strong></td>
                <td>無料</td>
                <td>無料</td>
                <td>月額600円（税込）</td>
              </tr>
              <tr>
                <td><strong>オフライン地図</strong></td>
                <td>対応</td>
                <td>非対応</td>
                <td>対応</td>
              </tr>
              <tr>
                <td><strong>渋滞情報</strong></td>
                <td>リアルタイム</td>
                <td>VICS + プローブ</td>
                <td>リアルタイム</td>
              </tr>
              <tr>
                <td><strong>音声案内</strong></td>
                <td>シンプル</td>
                <td>詳細（交差点名読み上げ）</td>
                <td>詳細</td>
              </tr>
              <tr>
                <td><strong>速度制限表示</strong></td>
                <td>一部対応</td>
                <td>対応</td>
                <td>対応</td>
              </tr>
              <tr>
                <td><strong>おすすめ度</strong></td>
                <td>★★★★★</td>
                <td>★★★★★</td>
                <td>★★★★☆</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="glossary-box m-card m-card--shadow u-mt-xl">
          <ol className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <a href="https://apps.apple.com/jp/app/google-maps/id585027354" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Googleマップ</a>
              </dt>
              <dd className="glossary-item-desc">
                世界中で利用されている定番の地図アプリ。リアルタイムの渋滞情報やルート提案の精度が高く、<strong>オフライン地図のダウンロードにも対応</strong>しているため、トンネル内や電波の弱い山間部でも地図が表示されます。ストリートビューで目的地周辺の雰囲気を事前に確認できるのも便利なポイントです。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <a href="https://apps.apple.com/jp/app/yahoo-カーナビ/id890808217" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Yahoo!カーナビ</a>
              </dt>
              <dd className="glossary-item-desc">
                日本の道路事情に特化したカーナビアプリ。<strong>交差点名の読み上げやレーン案内が詳細</strong>で、車載カーナビに近い案内体験が得られます。VICS情報とプローブデータを併用した渋滞予測も優秀。よく行く目的地の登録や音声操作にも対応しており、運転中の操作性に配慮された設計です。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <a href="https://apps.apple.com/jp/app/カーナビタイム/id368418498" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>カーナビタイム</a>
              </dt>
              <dd className="glossary-item-desc">
                月額600円（税込）の有料アプリですが、<strong>オフライン地図・詳細な音声案内・速度制限表示</strong>など車載カーナビに匹敵する機能を備えています。ルート検索の精度が高く、高速道路の料金表示やガソリンスタンド検索など、ドライブに便利な機能が充実。本格的にiPadをカーナビ化したい方におすすめです。
              </dd>
            </div>
          </ol>
        </div>
      </div>
    </section>
  )
}
