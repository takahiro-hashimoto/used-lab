import Link from 'next/link'
import { PRODUCT_CATEGORIES, FOOTER_LINKS, UTILITY_FOOTER_LINKS } from '@/lib/routes'

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
            {PRODUCT_CATEGORIES.map((cat) => (
              <div className="footer-col" key={cat.id}>
                <p className="footer-heading">
                  <i className={`fa-solid ${cat.icon}`} aria-hidden="true"></i> 中古{cat.label}
                </p>
                <ul>
                  {(FOOTER_LINKS[cat.id] ?? []).map((link) => (
                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer-col">
              <p className="footer-heading"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> サイト情報</p>
              <ul>
                {UTILITY_FOOTER_LINKS.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
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
