export default function AppleEcoSection() {
  return (
    <section className="l-section" id="apple-eco" aria-labelledby="heading-apple-eco">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-apple-eco">
          Apple Watchでできること【Apple製品連携編】
        </h2>
        <p className="m-section-desc">
          Apple Watchはその他Apple製品との連携も長けているのが特徴です。<br />
          ここではApple Watchがあればできる代表的なApple製品連携を4つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 22. 遠隔でiPhoneを鳴らして捜索（iPhoneを探す） */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-find-iphone.jpg"
              alt="Apple WatchでiPhoneを探す"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">遠隔でiPhoneを鳴らして捜索（iPhoneを探す）</h3>
              <p className="popular-card-desc">
                日常生活で、ふと手元にiPhoneが見当たらなくなり、「あれ、どこに置いたっけ？」となるシーンは少なくありません。
              </p>
              <p className="popular-card-desc">
                そんな時に便利なのが、Apple Watchの<strong>「iPhoneを探す」機能です。Apple Watchのコントロールセンターからスマホマークをタップすれば、iPhoneを遠隔で大音量で鳴らす</strong>ことができます。
              </p>
              <p className="popular-card-desc">
                これにより、自宅内やカバンの中など、効率よくiPhoneを捜索し、すぐに見つけ出すことが可能です。
              </p>
            </div>
          </div>

          {/* 23. 置き忘れ防止通知 */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-airtag.jpg"
              alt="Apple WatchとAirTagの連携"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">置き忘れ防止通知</h3>
              <p className="popular-card-desc">
                Apple Watchは、「探す」機能で管理されているデバイス（iPhoneなど）や、AirTagのついた貴重品が手元から離れた時に、すぐに通知を受け取ることができます。
              </p>
              <p className="popular-card-desc">
                この機能により、貴重品の置き忘れにいち早く気がつくことができるため、紛失防止に非常に効果的です。
              </p>
              <p className="popular-card-desc">
                大切なものをどこかに忘れてしまうという心配を減らすことができます。
              </p>
            </div>
          </div>

          {/* 24. iPhoneのロック画面を解除する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-unlock-iphone.jpg"
              alt="Apple WatchでiPhoneのロックを解除する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">iPhoneのロック画面を解除する</h3>
              <p className="popular-card-desc">
                iPhoneのFace ID（顔認証）は非常に優秀ですが、フルフェイスのヘルメットを被っていたり、サングラスをしていて認証が通りにくい場面も稀にあります。
              </p>
              <p className="popular-card-desc">
                そんな時、Apple Watchを身につけていれば、顔認証をスキップして自動でiPhoneのロックを解除することが可能です。
              </p>
              <p className="popular-card-desc">
                認証に失敗してパスコードを入力する手間が省けるため、あらゆるシーンでストレスなくiPhoneを使い始めることができます。
              </p>
            </div>
          </div>

          {/* 25. MacBookのロックを解除する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-unlock-macbook.jpg"
              alt="Apple WatchでMacBookのロックを解除する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">MacBookのロックを解除する</h3>
              <p className="popular-card-desc">
                MacBookのロック解除は、パスワードやTouch IDが一般的ですが、Apple Watchがあれば作業再開が格段にスピーディーになります。
              </p>
              <p className="popular-card-desc">
                Apple Watchを身につけてMacBookに近づくだけで、自動でロックが解除されるため、認証の手間が一切不要です。
              </p>
              <p className="popular-card-desc">
                特に、MacBookを外部モニター接続（クラムシェルモード）で使う方にとって、この機能は非常に役立ちます。MacBookに近づいた際にApple Watchが軽く振動し、解錠を知らせてくれる心地よい感覚も魅力の一つです。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
