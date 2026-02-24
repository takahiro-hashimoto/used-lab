export default function RecommendSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* GPSモデルがおすすめな人 */}
      <div id="recommend-gps" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/apple-watch-image.jpg"
          alt="GPSモデルがおすすめな人"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">GPSモデルがおすすめな人</h3>
          <p className="popular-card-desc">
            GPSモデルはiPhoneとBluetooth接続して使うのが基本スタイルです。セルラーモデルのような通信契約が不要で、<strong>ランニングコストがかからない</strong>のが大きな魅力。初めてApple Watchを購入する方にはコスパの面でこちらがおすすめです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>Apple Watch単体での通信機能に魅力を感じなかった</li>
            <li><strong>なるべく安くApple Watchを購入したい</strong></li>
            <li>ランニングコストはかけたくない</li>
            <li>iPhoneの通信キャリアが格安SIMである</li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            なお、GPSモデルでもWi-Fi環境があればLINE通知やSiriの利用、Apple Musicの同期済み再生などは可能です。
          </p>
        </div>
      </div>

      {/* セルラーモデルがおすすめな人 */}
      <div id="recommend-cellular" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/watch/watch-10.jpg"
          alt="セルラーモデルがおすすめな人"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">セルラーモデルがおすすめな人</h3>
          <p className="popular-card-desc">
            セルラーモデルはiPhoneとの通信契約オプションを結ぶことで、<strong>Apple Watch単体で通話やデータ通信が可能</strong>になります。iPhoneから独立して使いたい方や、非常時の備えとして通信機能を持たせたい方におすすめです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li><strong>iPhoneなしでランニングや外出をしたい</strong></li>
            <li>iPhoneのバッテリーが切れても連絡を取りたい</li>
            <li>災害時や緊急時に備えて通信手段を確保したい</li>
            <li>ステンレスやチタニウムなどの高級素材モデルが欲しい</li>
            <li>ファミリー共有で子どもにApple Watchを持たせたい</li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            なお、月額385〜550円の通信オプション（ワンナンバーサービスやナンバーシェアなど）への加入が必要です。
          </p>
        </div>
      </div>
    </div>
  )
}
