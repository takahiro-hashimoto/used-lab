import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="footer-main">
        <div className="footer-inner l-container">
          <div className="footer-brand">
            <Link href="/" className="m-logo">
              <span className="m-logo__text">ユーズドラボ</span>
            </Link>
            <p className="footer-tagline">中古デバイスの「ちょうどいい」を見つけるメディア</p>
            <div className="footer-social">
              <a href="#" aria-label="X (Twitter)" rel="noopener noreferrer">
                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="YouTube" rel="noopener noreferrer">
                <i className="fa-brands fa-youtube" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Instagram" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="フッターナビゲーション">
            <div className="footer-col">
              <h3 className="footer-heading">カテゴリ</h3>
              <ul>
                <li><Link href="/iphone">iPhone</Link></li>
                <li><Link href="/ipad">iPad</Link></li>
                <li><Link href="/mac">Mac</Link></li>
                <li><Link href="/apple-watch">Apple Watch</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-heading">人気記事</h3>
              <ul>
                <li><Link href="/iphone/se3">iPhone SE 中古ガイド</Link></li>
                <li><Link href="/iphone/15pro">iPhone 15 Pro</Link></li>
                <li><Link href="/iphone/14">iPhone 14</Link></li>
                <li><Link href="/iphone/13">iPhone 13</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-heading">サイト情報</h3>
              <ul>
                <li><Link href="/about">ユーズドラボについて</Link></li>
                <li><Link href="/contact">お問い合わせ</Link></li>
                <li><Link href="/privacy">プライバシーポリシー</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-inner l-container">
          <p className="copyright">&copy; {new Date().getFullYear()} ユーズドラボ All Rights Reserved.</p>
          <nav className="footer-bottom-nav" aria-label="法的情報">
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/terms">利用規約</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
