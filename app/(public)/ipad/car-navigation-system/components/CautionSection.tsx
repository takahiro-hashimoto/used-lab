export default function CautionSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* ①セルラーモデルのiPadが必須 */}
      <div id="caution-cellular" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="iPadのセルラーモデル"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">①セルラーモデルのiPadが必須</h3>
          <p className="popular-card-desc">
            iPadには「セルラーモデル（GPS機能あり）」と「Wi-Fiモデル（GPS機能なし）」の2種類がありますが、<strong>カーナビ化するならGPS機能を搭載しているセルラーモデルが必須</strong>です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            GPS機能がないWi-FiモデルのiPadをWi-Fiルーターでネット接続してルート案内をした場合、現在位置が定まらなかったりして、経路案内を円滑に行うことができません。カーナビとして使うならデバイス本体にGPS機能を持ち合わせたセルラーモデルを利用しましょう。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            両モデルの違いは「<a href="/ipad/wifi-cellular/">iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？</a>」で詳しく解説しています。
          </p>
        </div>
      </div>

      {/* ②車載ホルダー選びは慎重に */}
      <div id="caution-holder" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">②車載ホルダー選びは慎重に</h3>
          <p className="popular-card-desc">
            iPadをカーナビとして使うには車載ホルダーが必須ですが、自家用車に合うアイテムを見つけるのは苦労するかもしれません。マウントの種類はさまざまなバリエーションがあり、どれもメリット・デメリットがあるうえ車との相性も考える必要があるためです。
          </p>
        </div>

        <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-md)' }}>
          <li>クリップタイプ（サンバイザーに挟んで使う）</li>
          <li>エアコン吹き出し口取付型</li>
          <li>吸盤・粘着ゲルタイプ</li>
          <li>CDスロット差し込みタイプ</li>
          <li>ドリンクホルダータイプ</li>
        </ul>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            たとえばエアコン吹き出し口取付型の車載ホルダーの場合、しっかり固定はできるものの下記のようなデメリットがあります。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>iPadを見やすい角度に調整するとエアコン吹出口が下を向いてしまう</li>
            <li>エアコンの風がタブレットに当たり続けてしまう</li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            車載ホルダーは<strong>吸盤・粘着ゲルタイプ</strong>のほうが取り付け位置の自由度が高く、車種を問わず使いやすいのでおすすめです。購入前にご自身の車のダッシュボード周りを確認してから選びましょう。
          </p>
        </div>
      </div>
    </div>
  )
}
