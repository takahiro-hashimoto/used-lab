export default function BasicSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="basic" aria-labelledby="heading-basic">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-basic">
          Apple Watchでできること【基本機能編】
        </h2>
        <p className="m-section-desc">
          日々の生活で役立つApple Watchの基本機能を紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 1. 文字盤のカスタマイズを楽しむ */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-face.jpg"
              alt="Apple Watchの文字盤カスタマイズ"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">文字盤のカスタマイズを楽しむ</h3>
              <p className="popular-card-desc">
                Apple Watchには50種類以上もの文字盤が用意されており、気分やシーンに合わせて自分好みのデザインを楽しむことができます。
              </p>
              <p className="popular-card-desc">
                文字盤の種類はOSがアップデートされるたびに追加されるため、新作の登場が毎年の楽しみの一つになっています。
              </p>
              <p className="popular-card-desc">
                通常の時計とは違い、いつまでも飽きが来ないのが大きな魅力と言えます。
              </p>
              <p className="popular-card-desc">
                なお、文字盤のデザインを最大限に楽しみたい場合は、<a href="/watch/apple-watch-always-lit/">常時点灯</a>に対応したApple Watchを購入するのがおすすめです。
              </p>
              <p className="popular-card-desc">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="https://support.apple.com/ja-jp/guide/watch/apde9218b440/watchos" target="_blank" rel="noopener">Apple Watchの文字盤と機能 – Apple サポート</a>
              </p>
            </div>
          </div>

          {/* 2. ベルト・ケースを交換する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-band.jpg"
              alt="Apple Watchのベルト交換"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ベルト・ケースを交換する</h3>
              <p className="popular-card-desc">
                Apple Watchは、ベルトやケースを自由に交換できるのも大きな魅力の一つです。
              </p>
              <p className="popular-card-desc">
                仕事やスポーツ、休日のTPOに応じて使い分ければ、文字盤のデザインとベルトを組み合わせることで全く別の時計のようにカスタマイズが可能です。
              </p>
              <p className="popular-card-desc">
                これにより、いつまでも飽きが来ずに楽しめるのがApple Watchの大きなメリットです。
              </p>
            </div>
          </div>

          {/* 3. 経路案内で目的地へ向かう */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-navigation.jpg"
              alt="Apple Watchで経路案内を使用する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">経路案内で目的地へ向かう</h3>
              <p className="popular-card-desc">
                Apple Watchは、iPhoneで目的地をセットしたり、Apple Watch越しにSiriに目的地を伝えたりすることで、経路案内を利用できます。
              </p>
              <p className="popular-card-desc">
                最大の特長は、曲がる場所などを絶妙なタイミングで手首への振動（触覚フィードバック）で知らせてくれる点です。これにより、iPhoneの画面を見続けなくても目的地を目指せるため、非常に安全かつ便利です。
              </p>
              <p className="popular-card-desc">
                旅行先や新規の取引先へ向かうときなどに非常に役立つ機能です。
              </p>
            </div>
          </div>

          {/* 4. 再生している音楽・動画のコントロールする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-music.jpg"
              alt="Apple Watchで音楽をコントロールする様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">再生している音楽・動画のコントロールする</h3>
              <p className="popular-card-desc">
                Apple Watchは、iPhoneで再生している音楽や動画の再生・停止・スキップなどを手元でコントロールできます。
              </p>
              <p className="popular-card-desc">
                混雑した電車の中やランニング中など、スマートフォンを取り出しにくい状況下でも、手元で瞬時にメディア操作ができるため非常に便利です。作業や運動を中断することなく、快適にコンテンツを楽しめます。
              </p>
            </div>
          </div>

          {/* 5. iPhoneの通知を確認する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-notification.jpg"
              alt="Apple Watchで通知を確認する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">iPhoneの通知を確認する</h3>
              <p className="popular-card-desc">
                Apple Watchは、iPhoneアプリからの各種通知を手元で確認することができます。
              </p>
              <p className="popular-card-desc">
                これにより、わざわざiPhoneを取り出さなくても通知の概要がチェックできるため、何気なくスマートフォンを開いて無駄な操作をしてしまうことがなくなります。通知の確認が効率化され、集中力を維持することに役立ちます。
              </p>
            </div>
          </div>

          {/* 6. LINEやショートメッセージの中身を確認する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-line.jpg"
              alt="Apple WatchでLINEを確認する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">LINEやショートメッセージの中身を確認する</h3>
              <p className="popular-card-desc">
                Apple Watchは、スマートフォンを開かなくてもLINEやメッセージの内容を確認することができます。
              </p>
              <p className="popular-card-desc">
                特筆すべきは、返信のバリエーションが豊富な点です。あらかじめ用意された定型文でワンタッチ返信ができるのはもちろん、<strong>精度の高い「音声入力」や、画面上での「フリック入力（日本語キーボード）」</strong>にも対応しています。
              </p>
              <p className="popular-card-desc">
                わざわざiPhoneを取り出すまでもない「了解！」「あとで連絡するね」といった簡単な返信なら、手首だけで完結できるため非常にスマートです。
              </p>
            </div>
          </div>

          {/* 7. 振動アラームが使える */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-alarm.jpg"
              alt="Apple Watchの振動アラーム"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">振動アラームが使える</h3>
              <p className="popular-card-desc">
                Apple Watchは、振動で時間を知らせてくれるアラーム機能を搭載しています。
              </p>
              <p className="popular-card-desc">
                オフィスや電車内での仮眠時など、スマートフォンでアラームを鳴らすのがためらわれる状況でも、Apple Watchの振動アラームなら音を出さずに起きることができます。
              </p>
              <p className="popular-card-desc">
                手首に直接振動が伝わるため非常に目覚めが良く、ヘビーユーズしている方が多い機能の一つです。
              </p>
            </div>
          </div>

          {/* 8. Siriでタイマーを起動する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-siri.jpg"
              alt="Apple WatchでSiriを使う様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">Siriでタイマーを起動する</h3>
              <p className="popular-card-desc">
                Apple Watchは、Siriを通じてさまざまなアプリを音声で操作することができます。
              </p>
              <p className="popular-card-desc">
                その中でも、特に便利なのがタイマーの起動です。Apple Watchのマイクを口元に近づけ、「タイマーを〇〇分にセット」と言うだけで、すぐに時間を測れます。
              </p>
              <p className="popular-card-desc">
                料理中など手が塞がっている状況で、非常に重宝する機能です。
              </p>
            </div>
          </div>

          {/* 9. 電話に出る・かける */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-call.jpg"
              alt="Apple Watchで電話する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">電話に出る・かける</h3>
              <p className="popular-card-desc">
                Apple Watchがあれば、iPhoneにかかってきた電話に出たり、Apple Watchから直接電話をかけたりすることができます。
              </p>
              <p className="popular-card-desc">
                特に、リビングなど離れた場所にスマートフォンを置いている際、わざわざ取りに行かなくても手元で着信に対応できるのは非常に便利です。家の中でスマートフォンを探す手間を省き、すぐに通話を開始できます。
              </p>
            </div>
          </div>

          {/* 10. iPhoneのカメラでリモート撮影する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-camera-remote.jpg"
              alt="Apple WatchでiPhoneカメラをリモート操作する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">iPhoneのカメラでリモート撮影する</h3>
              <p className="popular-card-desc">
                Apple Watchがあれば、iPhoneカメラのシャッター操作を遠隔で行うことが可能です。
              </p>
              <p className="popular-card-desc">
                アプリを立ち上げるとiPhoneのカメラが映している映像をリアルタイムで確認しながらシャッターを切れるので、アングル調整も完璧ですし、集合写真や全身の記念写真を誰にも頼まず簡単に撮影できます。
              </p>
              <p className="popular-card-desc">
                旅行やソロキャンプなどのシーンで、撮影の自由度を格段に高めてくれる便利な機能です。
              </p>
            </div>
          </div>

          {/* 11. トランシーバーアプリで会話する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-walkie-talkie.jpg"
              alt="Apple Watchのトランシーバー機能"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">トランシーバーアプリで会話する</h3>
              <p className="popular-card-desc">
                Apple Watchには、トランシーバー機能が搭載されており、距離が離れていても相互通話することが可能です。
              </p>
              <p className="popular-card-desc">
                距離が離れた場所にいる人と電話よりもラフにコミュニケーションを取ることができるのが魅力です。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  トランシーバーの利用条件
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>お互いがApple Watchを所有している</li>
                  <li>Apple WatchをWi-Fi接続中またはiPhoneとペアリング中</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                1階から2階にいる家族に用事を伝える時に大声を出したり、わざわざ電話する必要がなくなります。また、広大なキャンプ場やイベント会場などで友人とはぐれてしまったときなどにも活用できます。
              </p>
            </div>
          </div>

          {/* 12. 懐中電灯・フラッシュライトとして使う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-flashlight.jpg"
              alt="Apple Watchの懐中電灯機能"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">懐中電灯・フラッシュライトとして使う</h3>
              <p className="popular-card-desc">
                Apple Watchには、手元を照らすのに便利な3種類の懐中電灯（フラッシュライト）モードが搭載されています。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>白く点灯</p>
                  <p className="popular-card-desc">周囲の暗い場所や暗闇の道を照らす、手元作業、停電時の補助照明など、一般的な懐中電灯として活用できます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>白く点滅</p>
                  <p className="popular-card-desc">暗い時間帯のランニングやウォーキング時に、周囲に自分の存在を知らせるセーフティーライトとして活用し、事故を防ぎます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>赤く点灯</p>
                  <p className="popular-card-desc">夜間の暗所で、視界を極力妨げずに手元を見たい場合に使います（例：天体観測時、家族を起こしたくない時など）。</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                これらのモードは、コントロールセンターから簡単に切り替えが可能です。暗闇での安全確保から、夜間の作業まで、様々なシーンで役立ちます。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
