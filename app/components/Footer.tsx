import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-inner l-container">
          <div className="footer-brand">
            <Link href="/" className="m-logo">
              <span className="m-logo__text">ユーズドラボ</span>
            </Link>
            <p className="footer-tagline">中古Apple製品の「ちょうどいい」を見つけるメディア。豊富なデータで最適な商品がわかる。型落ちの中古Apple製品をお手頃にゲットしよう！</p>
            <div className="footer-social">
              <a href="https://twitter.com/takahiro_mono" aria-label="X (Twitter)" rel="noopener noreferrer">
                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/takahiro_mono" aria-label="Instagram" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com/@takahiro_mono" aria-label="YouTube" rel="noopener noreferrer">
                <i className="fa-brands fa-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="フッターナビゲーション">
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> 中古iPhone</p>
              <ul>
                <li><Link href="/iphone/">中古iPhoneの選び方ガイド</Link></li>
                <li><Link href="/iphone/recommend/">中古iPhoneおすすめ機種</Link></li>
                <li><Link href="/iphone/price-info/">中古iPhoneの相場価格</Link></li>
                <li><Link href="/iphone/iphone-spec-table/">iPhoneスペック比較表</Link></li>
                <li><Link href="/iphone/used-iphone-support/">iPhoneのサポート期間・寿命</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-tablet-screen-button" aria-hidden="true"></i> 中古iPad</p>
              <ul>
                <li><Link href="/ipad/">中古iPadの選び方ガイド</Link></li>
                <li><Link href="/ipad/recommend/">中古iPadおすすめ機種</Link></li>
                <li><Link href="/ipad/ipad-price-info/">中古iPadの相場価格</Link></li>
                <li><Link href="/ipad/ipad-spec-table/">iPadスペック比較表</Link></li>
                <li><Link href="/ipad/used-ipad-support/">iPadのサポート期間・寿命</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-laptop" aria-hidden="true"></i> 中古MacBook</p>
              <ul>
                <li><Link href="/macbook/">中古MacBookの選び方ガイド</Link></li>
                <li><Link href="/macbook/recommend/">中古MacBookおすすめ機種</Link></li>
                <li><Link href="/macbook/price-info/">中古MacBookの相場価格</Link></li>
                <li><Link href="/macbook/macbook-spec-table/">MacBookスペック比較表</Link></li>
                <li><Link href="/macbook/used-macbook-support/">MacBookのサポート期間</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-clock" aria-hidden="true"></i> 中古Apple Watch</p>
              <ul>
                <li><Link href="/watch/">中古Apple Watch選び方ガイド</Link></li>
                <li><Link href="/watch/recommend/">中古Apple Watchおすすめ機種</Link></li>
                <li><Link href="/watch/watch-price-info/">中古Apple Watchの相場価格</Link></li>
                <li><Link href="/watch/watch-spec-table/">Apple Watchスペック比較表</Link></li>
                <li><Link href="/watch/used-watch-support/">Apple Watchのサポート期間</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-headphones" aria-hidden="true"></i> 中古AirPods</p>
              <ul>
                <li><Link href="/airpods/">中古AirPodsの選び方ガイド</Link></li>
                <li><Link href="/airpods/recommend/">中古AirPodsおすすめ機種</Link></li>
                <li><Link href="/airpods/price-info/">中古AirPodsの相場価格</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> サイト情報</p>
              <ul>
                <li><Link href="/profile/">ユーズドラボについて</Link></li>
                <li><Link href="/contact/">お問い合わせ</Link></li>
                <li><Link href="/guidelines/">コンテンツ制作ポリシー</Link></li>
                <li><Link href="/privacy-policy/">プライバシーポリシー</Link></li>
                <li><Link href="/sitemap-page/">サイトマップ</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-inner l-container">
          <p className="copyright">&copy; 2024–{new Date().getFullYear()} ユーズドラボ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
