export default function HealthSection() {
  return (
    <section className="l-section" id="health" aria-labelledby="heading-health">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-health">
          Apple Watchでできること【健康管理・ヘルスケア編】
        </h2>
        <p className="m-section-desc">
          Apple Watchは健康管理という点において、Apple Watchでしか実現できない機能が多数あります。<br />
          ここではApple Watchがあればできる健康管理周りの使い道を紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 13. フィットネスアプリで1日の活動量をチェック */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-fitness.jpg"
              alt="Apple Watchのアクティビティリング"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">フィットネスアプリで1日の活動量をチェック</h3>
              <p className="popular-card-desc">
                Apple Watchでの健康管理において最も活躍するのが、アクティビティリングです。
              </p>
              <p className="popular-card-desc">
                これは、以下の3つの活動目標を自動的に記録し、達成度をリングで視覚化します。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>ムーブ（赤）消費カロリー</p>
                  <p className="popular-card-desc">アクティブな活動による消費カロリー</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>エクササイズ（緑）運動時間</p>
                  <p className="popular-card-desc">早歩き以上の運動をした時間</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>スタンド（青）立ち時間</p>
                  <p className="popular-card-desc">1時間ごとに立ち上がった回数</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                この機能により、現在の消費カロリーや運動時間が一目瞭然になります。リングの進捗状況をチェックすることで、運動時間が少なかったら一駅歩いて帰宅、消費カロリーが少なかったら食事量をセーブといった調整がしやすくなります。
              </p>
            </div>
          </div>

          {/* 14. ワークアウトで運動の記録を取る */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-workout.jpg"
              alt="Apple Watchでワークアウトを記録する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ワークアウトで運動の記録を取る</h3>
              <p className="popular-card-desc">
                Apple Watchのワークアウト機能は、100種類以上のスポーツに対応し、活動量を正確に計測します。
              </p>
              <p className="popular-card-desc">
                ランニングを例にとると、運動時間や距離、消費カロリーといった基本情報に加え、平均心拍数やランニングの効率を示す詳細な指標（垂直振動など）まで自動で記録します。
              </p>
              <p className="popular-card-desc">
                これらの詳細な運動実績は、モチベーション維持やパフォーマンスの客観的な向上に役立つ、健康管理の核となる機能です。
              </p>
            </div>
          </div>

          {/* 15. 睡眠アプリで睡眠の質をチェック */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-sleep.jpg"
              alt="Apple Watchの睡眠トラッキング"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">睡眠アプリで睡眠の質をチェック</h3>
              <p className="popular-card-desc">
                Apple Watchを装着して寝るだけで、深い睡眠やレム睡眠といった「睡眠のステージ」を詳細に記録できます。より詳細な分析ができる「<a href="https://apps.apple.com/jp/app/autosleep-watch%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E7%9D%A1%E7%9C%A0%E3%82%92%E8%87%AA%E5%8B%95%E3%81%A7%E8%BF%BD%E8%B7%A1%E3%81%97%E3%81%BE%E3%81%99/id1164801111" target="_blank" rel="noopener">Auto Sleep</a>」というアプリもおすすめです。
              </p>
              <p className="popular-card-desc">
                また、最新のモデルでは<strong>「睡眠時無呼吸の兆候」を検知して通知してくれる機能</strong>も搭載されました。
              </p>
              <p className="popular-card-desc">
                「自分にとって最適な睡眠時間はどのくらいか」「体に異変はないか」を客観的な数値で把握できるため、日中のパフォーマンスを上げたい方には必須の機能と言えます。
              </p>
            </div>
          </div>

          {/* 16. 転倒検出 & 緊急通報機能で万が一に備える */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-fall-detection.jpg"
              alt="Apple Watchの転倒検出機能"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">転倒検出 &amp; 緊急通報機能で万が一に備える</h3>
              <p className="popular-card-desc">
                Apple Watchは、内蔵センサーにより着用者の激しい転倒を検知する機能を持っています。
              </p>
              <p className="popular-card-desc">
                転倒後、着用者から約1分間何の動作も確認されない場合、自動的に緊急通報サービスに連絡されます。同時に、登録された緊急連絡先には、着用者の位置情報と転倒した場所を添えたメッセージが送信されます。
              </p>
              <p className="popular-card-desc">
                これは、特に一人でいる時の万が一の事態に備え、命を守る保険として活用できる重要な安全機能です。
              </p>
            </div>
          </div>

          {/* 17. 血中酸素濃度を測定する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-blood-oxygen.jpg"
              alt="Apple Watchの血中酸素濃度測定"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">血中酸素濃度を測定する</h3>
              <p className="popular-card-desc">
                血液中に取り込まれている酸素のレベル（血中酸素飽和度：SpO2）を計測する血中酸素ウェルネス機能です。
              </p>
              <p className="popular-card-desc">
                これは、赤色光と赤外光を用いて動脈血中の酸素濃度を測定するもので、この数値が高いほど、全身に酸素が効率よく運ばれていることを示します。
              </p>
              <p className="popular-card-desc">
                特に、睡眠中や安静時の測定データは、呼吸器や循環器系の健康状態を把握する上での重要な指標となります。日常的に自身のウェルネス状態を把握し、健康維持に役立てるための先進的な機能です。
              </p>
            </div>
          </div>

          {/* 18. 電気心拍センサーで心拍数をチェック */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-heart-rate.jpg"
              alt="Apple Watchの心拍センサー"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">電気心拍センサーで心拍数をチェック</h3>
              <p className="popular-card-desc">
                Apple Watchに搭載されている電気心拍センサーは、単なる心拍数の記録に留まらない、重要な健康監視機能を提供します。
              </p>
              <p className="popular-card-desc">
                このセンサーは、ユーザーの心拍数を継続的に記録・監視し、安静時や活動中において異常な心拍の乱れや不規則なリズム（心房細動の兆候など）を検知すると、即座に通知で知らせてくれます。
              </p>
              <p className="popular-card-desc">
                これにより、自覚症状がない初期段階でも、体の異変に気づくことが可能です。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
