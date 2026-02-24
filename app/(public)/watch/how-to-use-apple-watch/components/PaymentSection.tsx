export default function PaymentSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="payment" aria-labelledby="heading-payment">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-payment">
          Apple Watchでできること【決済編】
        </h2>
        <p className="m-section-desc">
          Apple Watchがあれば日々の買い物や外出時の移動を簡単に済ますことができるようになります。<br />
          ここでは決済周りでアップルウォッチができることを3つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 19. Suicaの改札を通る */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-suica.jpg"
              alt="Apple WatchでSuicaを使う様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">Suicaの改札を通る</h3>
              <p className="popular-card-desc">
                Apple WatchはFeliCaチップを搭載しているため、Suicaや各種電子決済（Apple Pay）を利用できます。
              </p>
              <p className="popular-card-desc">
                レジでの支払いや改札を通るたびにスマートフォンを取り出す手間が一切不要になるのは、非常に大きな利便性です。一度この手軽さを体験すると、もう元には戻れません。
              </p>
              <p className="popular-card-desc">
                ちなみに、改札を通る際はわざわざ画面側をパネルにかざす必要はありません。自然な角度で手首をかざすだけでしっかりと認証されるため、無理に手首をひねる動作も不要です。
              </p>
            </div>
          </div>

          {/* 20. 電子決済をする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-payment.jpg"
              alt="Apple Watchで電子決済する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">電子決済をする</h3>
              <p className="popular-card-desc">
                Apple Watchは、Suicaに加えて、下記のような複数の主要な電子決済サービスに対応しています。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  対応している電子決済サービス
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>iD</li>
                  <li>QUICPay</li>
                  <li>WAON</li>
                  <li>nanaco</li>
                  <li>Visaのタッチ決済</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                これらを活用することで、コンビニなどのちょっとした買い物をスマートフォンを出さずにスピーディーに行うことができ、非常に便利です。
              </p>
              <p className="popular-card-desc">
                また、レジの決済端末は左側にあることが多いため、Apple Watchを左腕に身に付けていればスムーズにかざして決済を完了できます。
              </p>
            </div>
          </div>

          {/* 21. PayPayや楽天ペイのQRコード決済を行う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/apple-watch-qr-payment.jpg"
              alt="Apple WatchでQRコード決済をする様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">PayPayや楽天ペイのQRコード決済を行う</h3>
              <p className="popular-card-desc">
                Apple Watchは、SuicaやiDといった非接触型決済だけでなく、PayPayや楽天ペイなどのQRコード決済にも対応しています。
              </p>
              <p className="popular-card-desc">
                Apple Watchで専用アプリを立ち上げ、表示されたバーコード（またはQRコード）をレジで読み取ってもらうだけで、スピーディーに会計を済ませることができます。
              </p>
              <p className="popular-card-desc">
                カバンからiPhoneを探したり、ロックを解除してアプリを開くといった手間がなくなるこの決済体験は、一度慣れると手放せないほど快適です。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
