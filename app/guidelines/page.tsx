import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/app/components/Breadcrumb'

const PAGE_TITLE = 'コンテンツ制作・運営ポリシー'
const PAGE_DESCRIPTION =
  '当サイトでは中古Apple製品に関する情報を正確かつわかりやすくお届けすることを使命としています。コンテンツ制作フローや信頼性の担保についてご紹介します。'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/guidelines/',
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
  },
}

const WORKFLOW_STEPS = [
  {
    title: '情報収集',
    description:
      'メーカー公式サイト、公的機関の発表、通信キャリアの公式ページなど、一次情報を中心に収集します。',
  },
  {
    title: '内容整理・構成設計',
    description:
      '読者が求める情報をわかりやすく整理し、見出し構成や比較表など、視覚的にも理解しやすい形を設計します。',
  },
  {
    title: '執筆',
    description:
      '専門用語は必要に応じて補足を加え、初心者にも理解できる表現を心がけます。推測や不確定情報は避け、必ず根拠を提示します。',
  },
  {
    title: '検証・校正',
    description:
      '記載内容が最新かつ正確であるかを再確認し、誤字脱字や表現の統一を行います。',
  },
  {
    title: '公開・更新',
    description:
      '公開後も定期的に情報を見直し、仕様変更や価格改定などがあれば速やかに修正します。',
  },
]

const REFERENCE_GOVERNMENT: { name: string; href: string; description: string }[] = [
  {
    name: '総務省',
    href: 'https://www.soumu.go.jp/',
    description:
      '通信・電波・郵便事業を所管する中央省庁。iPhoneやiPadを含むスマートフォンの電波利用ルール、SIMロック解除、通信料金制度の策定など、Apple製品の利用環境にも大きく関わります。',
  },
  {
    name: '経済産業省',
    href: 'https://www.meti.go.jp/',
    description:
      '産業振興やIT政策を推進し、電子商取引の健全化を担当。Apple Japanの国内販売や、中古スマホ市場のルール整備にも影響を与えています。',
  },
  {
    name: '文部科学省',
    href: 'https://www.mext.go.jp/',
    description:
      '教育分野でのICT活用を推進し、GIGAスクール構想ではiPadやMacの導入事例も多数。教育現場でのApple製品活用にも関わります。',
  },
  {
    name: '消費者庁',
    href: 'https://www.caa.go.jp/',
    description:
      '消費者保護や取引の適正化を担当。中古iPhone購入時の品質表示や契約条件の明確化など、安心してApple製品を購入できる環境づくりを進めています。',
  },
  {
    name: '国民生活センター',
    href: 'http://www.kokusen.go.jp/',
    description:
      '全国から寄せられる相談をもとにトラブル事例や注意喚起を発信。中古iPhoneやMacの購入時に注意すべきポイントも紹介しています。',
  },
  {
    name: '日本経済団体連合会',
    href: 'https://www.keidanren.or.jp/',
    description:
      '大手企業・業界団体で構成される経済団体。Apple Japanも加盟し、日本のデジタル社会やスマートフォン産業の発展に向けた政策提言を行っています。',
  },
  {
    name: '新経済連盟',
    href: 'https://jane.or.jp/',
    description:
      'IT・ネット産業を中心に構成される経済団体。Apple製品を扱う企業やアクセサリーメーカーも多く加盟し、業界発展を支えています。',
  },
  {
    name: '政府広報オンライン',
    href: 'https://www.gov-online.go.jp/',
    description:
      '政府の最新施策をわかりやすく解説。iPhoneの料金引き下げや通信契約に関する制度変更など、Apple製品利用者に関連する情報も掲載。',
  },
  {
    name: '一般社団法人 電気通信事業者協会',
    href: 'https://www.tca.or.jp/',
    description:
      '携帯キャリアの業界団体。iPhoneの販売や通信サービスに関するガイドラインの策定、安全利用の啓発活動も行います。',
  },
  {
    name: '一般社団法人 全国携帯販売代理店協会',
    href: 'https://keitai.or.jp/',
    description:
      '携帯端末販売代理店の業界団体。Apple製品を含むスマホの適正販売や顧客対応品質向上を推進しています。',
  },
  {
    name: '携帯電話ポータルサイト（総務省）',
    href: 'https://www.soumu.go.jp/menu_seisaku/ictseisaku/keitai_portal/index.html',
    description:
      '携帯電話制度や料金、安全利用方法を解説する公式サイト。iPhoneやiPad利用者向けの最新情報も確認できます。',
  },
  {
    name: 'TELEC（テレコムエンジニアリングセンター）',
    href: 'https://www.telec.or.jp/',
    description:
      '日本国内で販売される無線機器の技術基準適合証明情報を提供。中古や海外版iPhoneの技適確認に必須。',
  },
  {
    name: 'Giteki Search（総務省）',
    href: 'https://www.tele.soumu.go.jp/giteki/SearchServlet',
    description:
      '技適番号から端末の認証情報を検索可能。輸入iPhoneやiPadの使用可否を確認する際に有用です。',
  },
  {
    name: '日本品質保証機構（JQA）',
    href: 'https://www.jqa.jp/',
    description:
      'PSEマークなど電気製品の安全認証情報を提供。中古Macや充電器の安全性確認に役立ちます。',
  },
  {
    name: '環境省 家電リサイクル関連情報',
    href: 'https://www.env.go.jp/recycle/',
    description:
      '不要になったApple製品の適正処理やリサイクル制度に関する一次情報を提供。',
  },
]

const REFERENCE_CARRIERS: { name: string; href: string; description: string }[] = [
  {
    name: 'Apple',
    href: 'https://www.apple.com/jp/',
    description:
      'iPhone、iPad、Macなどの自社開発製品を提供する世界的テクノロジー企業。日本では直営Apple Storeや公式オンラインストアを通じて最新モデルや整備済製品を販売しています。',
  },
  {
    name: 'NTTドコモ',
    href: 'https://www.docomo.ne.jp/',
    description:
      '国内最大級の通信キャリア。最新iPhoneの取り扱いや5G対応、AppleCare+加入にも対応し、幅広い料金プランを提供しています。',
  },
  {
    name: 'KDDI',
    href: 'https://www.kddi.com/',
    description:
      'auブランドでiPhoneを販売。安定した通信網と家族割やセット割引が充実し、長期利用にも適したサービスを展開しています。',
  },
  {
    name: 'ソフトバンク',
    href: 'https://www.softbank.jp/',
    description:
      '国内でいち早くiPhoneの取り扱いを開始したキャリア。高速通信と豊富なキャンペーンで多くのAppleユーザーに選ばれています。',
  },
  {
    name: '楽天モバイル',
    href: 'https://network.mobile.rakuten.co.jp/',
    description:
      '低価格プランやeSIM対応が特徴の新興キャリア。iPhoneユーザー向けのデータ無制限プランや端末割引キャンペーンも実施しています。',
  },
  {
    name: 'イオシス',
    href: 'https://iosys.co.jp/',
    description:
      '中古iPhoneやiPadの品揃えが豊富で、価格も業界屈指の安さ。保証付きで初心者でも安心して購入できます。',
  },
  {
    name: 'にこスマ',
    href: 'https://www.nicosuma.com/',
    description:
      '厳選された中古iPhoneを動作保証付きで販売。全品クリーニング済みで、ランク表示による状態確認も可能です。',
  },
  {
    name: 'ゲオオンラインストア',
    href: 'https://geo-online.co.jp/',
    description:
      '全国展開のゲオが運営するECサイト。中古iPhoneからアクセサリーまで幅広く取り扱っています。',
  },
  {
    name: 'じゃんぱら',
    href: 'https://www.janpara.co.jp/',
    description:
      'Apple製品を含むスマホ・PCの中古販売や買取に強い専門店。オンラインと店舗の両方で取引可能です。',
  },
  {
    name: 'ハピネスネット',
    href: 'https://happinessnet.co.jp/',
    description:
      '中古iPhoneやスマホ関連アクセサリーを販売するECサイト。法人向け大量購入や端末セット販売にも対応しています。',
  },
  {
    name: 'GSMArena',
    href: 'https://www.gsmarena.com/',
    description:
      'iPhoneを含むスマートフォン全モデルの仕様・発売日を収録する国際的データベース。比較機能も充実しています。',
  },
  {
    name: '価格.com',
    href: 'https://kakaku.com/',
    description:
      '新品・中古を問わず製品価格の推移や市場相場を確認可能。販売店ごとの価格比較も容易です。',
  },
  {
    name: 'iFixit',
    href: 'https://www.ifixit.com/',
    description:
      'Apple製品を含む電子機器の分解手順や修理部品情報を公開。修理可否やパーツ入手性の判断に役立ちます。',
  },
  {
    name: 'FCC（米国連邦通信委員会）',
    href: 'https://www.fcc.gov/',
    description:
      '米国モデルのiPhoneやiPadの無線認証情報を検索可能。海外版端末の仕様確認に有効です。',
  },
  {
    name: 'Geekbench',
    href: 'https://browser.geekbench.com/',
    description:
      'iPhone・iPad・Macなどの性能ベンチマークを提供する公式データベース。モデル別の性能比較や世代間の性能差を一次情報として確認できます。',
  },
]

function ReferenceList({
  items,
}: {
  items: { name: string; href: string; description: string }[]
}) {
  return (
    <div className="gl-ref-list">
      {items.map((item) => (
        <div key={item.href} className="about-media-item m-card m-card--padded m-card--sm">
          <p className="about-media-desc">{item.description}</p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="about-media-link"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            <span>{item.name}</span>
          </a>
        </div>
      ))}
    </div>
  )
}

export default function GuidelinesPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: 'コンテンツ制作・運営ポリシー' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb items={[{ label: 'コンテンツ制作・運営ポリシー' }]} />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">コンテンツ制作・運営ポリシー</h1>
            <p className="hero-description">
              信頼できる情報をお届けするために
            </p>
          </div>
        </div>
      </header>

      {/* イントロ */}
      <section className="l-section">
        <div className="l-container">
          <p className="m-section-desc">
            当サイトでは、中古Apple製品に関する情報を正確かつわかりやすくお届けすることを使命としています。
          </p>
          <p className="m-section-desc">
            読者が安心して参考にできるよう、掲載内容はすべて一次情報を基に構成し、明確な根拠を伴った解説を徹底しています。
          </p>
          <p className="m-section-desc">
            また、制作フローや更新体制を明文化することで、記事の品質と鮮度を保ち、常に信頼できる情報源であり続けることを目指しています。
          </p>
          <p className="m-section-desc">
            本ページでは、当サイトが大切にしているコンテンツ制作ポリシーについてご紹介します。
          </p>
        </div>
      </section>

      {/* ユーズドラボについて */}
      <section className="l-section l-section--bg-subtle">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>{' '}
            ユーズドラボについて
          </h2>

          <div className="m-card m-card--shadow m-card--padded content-prose">
            <p>
              ユーズドラボは記事執筆から写真の撮影まで全て1人で行なっている個人メディアです。
            </p>
            <p>
              2015年より更新している「<a href="https://digital-style.jp/" target="_blank" rel="noopener noreferrer">ガジェットレビューブログ・デジスタ</a>」の姉妹サイトとして2024年8月に開設しました。
            </p>
            <p>
              ガジェットレビューブログの運営で得た知見を生かして「買い物の参考になる情報をわかりやすく発信すること」をモットーに中古Apple製品関連の情報を発信しています。
            </p>
            <div className="gl-about-link">
              <Link href="/about/" className="about-media-link">
                <i className="fa-solid fa-user" aria-hidden="true"></i>
                <span>運営者情報 | ユーズドラボ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* コンテンツ制作フロー */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-list-check" aria-hidden="true"></i>{' '}
            コンテンツ制作フロー
          </h2>
          <p className="m-section-desc">
            当サイトでは下記のフローでレビュー記事を作成しております。
          </p>

          <div className="gl-steps">
            {WORKFLOW_STEPS.map((step, index) => (
              <div key={index} className="gl-step">
                <div className="gl-step-number">
                  <span className="gl-step-badge">STEP</span>
                  <span className="gl-step-num">{index + 1}</span>
                </div>
                <div className="gl-step-content">
                  <h3 className="gl-step-title">{step.title}</h3>
                  <p className="gl-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 信頼性の担保について */}
      <section className="l-section l-section--bg-subtle">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>{' '}
            信頼性の担保について
          </h2>

          <div className="m-card m-card--shadow m-card--padded content-prose">
            <p>
              当サイトでは、掲載するすべての情報について正確性と信頼性を最優先としています。
            </p>
            <p>
              製品仕様や価格、サービス内容などの情報は、必ず一次情報であるメーカー公式サイトや公的機関の発表資料を確認し、必要に応じて複数の信頼できる情報源と照合しています。
            </p>
            <p>
              特にApple製品や中古iPhoneに関する記事では、総務省や経済産業省などの公的機関、通信キャリアの公式発表、Apple公式サポートページなどを参照し、誤解を招く恐れのある推測や不確定情報は掲載しません。
            </p>
            <p>
              また、情報の鮮度を保つために定期的な更新を行い、読者が安心して参考にできるコンテンツ提供を心がけています。
            </p>
          </div>
        </div>
      </section>

      {/* 記事作成の際の参考情報サイト */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-book-open" aria-hidden="true"></i>{' '}
            記事作成の際の参考情報サイト
          </h2>
          <p className="m-section-desc">
            公開中の記事は、下記の情報源・公式サイトを参考にしつつ執筆しております。
          </p>

          <div className="gl-ref-section">
            <h3 className="content-heading content-heading--with-icon">
              <i className="fa-solid fa-landmark" aria-hidden="true"></i>
              公的機関の情報
            </h3>
            <ReferenceList items={REFERENCE_GOVERNMENT} />
          </div>

          <div className="gl-ref-section">
            <h3 className="content-heading content-heading--with-icon">
              <i className="fa-solid fa-store" aria-hidden="true"></i>
              通信キャリア・ECサイト
            </h3>
            <ReferenceList items={REFERENCE_CARRIERS} />
          </div>
        </div>
      </section>
    </main>
  )
}
