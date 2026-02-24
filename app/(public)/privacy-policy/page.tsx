import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/app/components/Breadcrumb'

const PAGE_TITLE = 'プライバシーポリシー・免責事項'
const PAGE_DESCRIPTION =
  'ユーズドラボにおけるプライバシーポリシー・免責事項についてご説明します。個人情報の取り扱い、Cookie、広告、著作権等について記載しています。'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/privacy-policy/',
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
  },
}

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: 'プライバシーポリシー・免責事項' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
      <Breadcrumb items={[{ label: 'プライバシーポリシー・免責事項' }]} />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">プライバシーポリシー・免責事項</h1>
            <p className="hero-description">
              ユーズドラボのプライバシーポリシー・免責事項をご紹介します。
            </p>
          </div>
        </div>
      </header>
      </div>

      {/* 本文 */}
      <section className="l-section l-section--bg-subtle">
        <div className="l-container">
          <div className="pp-body content-prose m-card m-card--shadow m-card--padded">

            {/* 個人情報の利用目的 */}
            <h2 className="content-heading">個人情報の利用目的について</h2>
            <p>当サイトは、取得したユーザー情報を以下に定める目的のために利用します。</p>
            <ul className="pp-list">
              <li>Webサービスの提供</li>
              <li>コンテンツ・サービス品質の改善</li>
              <li>トラフィック測定および行動測定</li>
              <li>広告の配信および成果測定</li>
              <li>当サイトに関するご案内</li>
              <li>お問い合わせへの対応</li>
              <li>違反事項への対応</li>
            </ul>
            <p>なお、取得したユーザー情報は上記目的のみに利用させていただくものであり、情報を提供いただいた際の目的以外では利用いたしません。</p>

            {/* 個人情報の第三者開示 */}
            <h2 className="content-heading">個人情報の第三者開示について</h2>
            <p>当サイトが取得したユーザー情報のうち個人情報は、以下に該当する場合を除いてユーザーの同意なく第三者に開示することはありません。</p>
            <ul className="pp-list">
              <li>外部サービスとの連携または、外部サービスを利用した認証にあたり、当該外部サービス運営会社にユーザー情報を提供する場合</li>
              <li>国の機関もしくは地方公共団体またはその委託者が法令の定める事務を遂行することに対して、当サイトが協力する必要がある場合</li>
              <li>その他法令で認められる場合</li>
            </ul>

            {/* Cookieの使用 */}
            <h2 className="content-heading">Cookieの使用について</h2>
            <p>当サイトでは、広告配信やアクセス解析のためにCookieを使用しています。</p>
            <p>Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。</p>
            <p>Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。</p>

            {/* 広告について */}
            <h2 className="content-heading">広告について</h2>
            <p>当サイトでは、第三者配信の広告サービス（Googleアドセンス、A8.net）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。</p>
            <p>クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。</p>
            <p>
              Cookieを無効にする方法やGoogleアドセンスに関する詳細は「<a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank" rel="noopener noreferrer">広告 – ポリシーと規約 – Google</a>」をご確認ください。
            </p>

            {/* アクセス解析ツール */}
            <h2 className="content-heading">アクセス解析ツールについて</h2>
            <p>当サイトでは、アクセス解析ツールGoogleアナリティクスを使用し、Cookieの情報からアクセスを収集、記録、分析しています。</p>
            <p>
              Googleアナリティクスの情報には、特定の個人を識別する情報は含まれず、<a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer">Google社のプライバシーポリシー</a>により管理されています。
            </p>
            <p>
              アクセス情報の収集は、Cookieを無効にすることで拒否することができます。Google社の情報収集の仕組みについては、<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。
            </p>

            {/* Amazonアソシエイト */}
            <h2 className="content-heading">Amazonアソシエイト・プログラムの参加者です</h2>
            <p>ユーズドラボは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>

            {/* 免責事項 */}
            <h2 className="content-heading">免責事項</h2>
            <p>当サイトは、掲載内容によって生じた損害に対する一切の責任を負いません。</p>
            <p>各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。</p>
            <p>また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。</p>

            {/* 著作権 */}
            <h2 className="content-heading">著作権</h2>
            <p>当サイトに掲載されている文章・画像の著作権は、運営者に帰属しています。</p>
            <p>法的に認められている引用の範囲を超えて、無断で転載することを禁止します。</p>

            {/* お問い合わせ */}
            <h2 className="content-heading">お問い合わせ</h2>
            <p>当サイトのプライバシーポリシーに関する、ご意見、ご質問、その他ユーザー情報の取り扱いに関するお問い合わせは、以下にご連絡ください。</p>
            <div className="pp-contact-link">
              <Link href="/contact/" className="about-media-link">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <span>お問い合わせ | ユーズドラボ</span>
              </Link>
            </div>

            {/* プライバシーポリシーの変更 */}
            <h2 className="content-heading">プライバシーポリシーの変更</h2>
            <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。</p>
            <p>なお、修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
            <ul className="pp-list pp-list--plain">
              <li>制定：2024年08月01日</li>
            </ul>

            <div className="pp-footer">
              <p>ユーズドラボ<br />運営責任者：タカヒロ</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
