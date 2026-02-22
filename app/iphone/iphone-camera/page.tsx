import type { Metadata } from 'next'
import { getAllIPhoneModels, getAllProductShopLinksByType } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import CameraComparisonTable from './components/CameraComparisonTable'
import CameraFeatureCard from './components/CameraFeatureCard'
import FaqSection from '@/app/components/support/FaqSection'
import Image from 'next/image'

const PAGE_TITLE = 'iPhoneのカメラ性能の違いは何？歴代モデルの機能を比較'
const PAGE_DESCRIPTION =
  'iPhoneのカメラ性能を歴代モデルごとに徹底比較。画素数・レンズ構成・ナイトモード・シネマティックモードなど、世代ごとの違いと進化をわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/iphone/iphone-camera/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/iphone/iphone-camera/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

export default async function IPhoneCameraPage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone/' },
      { '@type': 'ListItem', position: 3, name: 'iPhoneカメラ性能比較' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: dateStr,
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    image_sensor: m.image_sensor,
    front_camera: m.front_camera,
    in_camera: m.in_camera,
    camera_control: m.camera_control,
    lidar: m.lidar,
    night_mode: m.night_mode,
    photography_style: m.photography_style,
    portrait_mode: m.portrait_mode,
    cinematic_mode: m.cinematic_mode,
    action_mode: m.action_mode,
    macro_mode: m.macro_mode,
    centerframe: m.centerframe,
    apple_proraw: m.apple_proraw,
    apple_prores: m.apple_prores,
  }))

  const serializedLinks = allShopLinks.map((l) => ({
    product_type: l.product_type,
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))

  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPhone完全ガイド', href: '/iphone' },
            { label: 'iPhoneカメラ性能比較' },
          ]}
        />

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                iPhoneのカメラ性能の違いは何？<br />歴代モデルの機能を比較
              </h1>
              <p className="hero-description" itemProp="description">
                画素数・レンズ構成・動画性能など、世代ごとの進化をわかりやすく解説
              </p>
              <div className="hero-actions">
                <a href="#camera-comparison" className="m-btn m-btn--hero-primary">
                  <i className="fa-regular fa-table" aria-hidden="true"></i>
                  <span>カメラスペック比較表を見る</span>
                </a>
                <a href="#camera-features" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-lightbulb" aria-hidden="true"></i>
                  <span>注目機能をチェック</span>
                </a>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
                <meta itemProp="datePublished" content={dateStr} />
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/iphone-camera.jpg"
                  alt="iPhoneカメラ性能比較イメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>
                毎年進化を遂げるiPhoneシリーズの中でも、ユーザーの関心が特に高いのが<strong>カメラ性能</strong>です。
                48MPセンサーや光学5倍ズーム、4K動画撮影など進化は目覚ましいですが「各モデルにどんな違いがあるのかわからない」という方も多いのではないでしょうか。
              </p>
              <p>
                本記事では、歴代iPhoneのカメラ性能を一覧で比較しつつ、アクションモード・LiDARスキャナ・マクロ撮影モードなどの各機能をわかりやすく解説します。
                型落ちの中古iPhoneでも十分なカメラ性能を持つモデルは多いので、あなたの撮影スタイルに最適な1台を見つける参考にしてみてください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/iphone">中古iPhone完全購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--2col toc-list">
              <li>
                <a href="#camera-comparison" className="toc-item">
                  カメラ性能 比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#camera-features" className="toc-item">
                  カメラ機能の解説 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#popular" className="toc-item">
                  人気の中古iPhone <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* セクション */}
        <div itemProp="articleBody">
          <CameraComparisonTable models={serializedModels} shopLinks={serializedLinks} />

          {/* カメラ機能解説 */}
          <section className="l-section" id="camera-features" aria-labelledby="heading-camera-features">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-camera-features">
                iPhoneのカメラ機能解説
              </h2>
              <p className="m-section-desc">
                比較表に登場する各カメラ機能について、特徴や対応モデルをわかりやすく解説します。
              </p>

              <CameraFeatureCard
                id="feature-lens"
                title="レンズの数"
                description={
                  <>
                    <p>iPhoneはモデルによって搭載されているレンズの数が下記のように違います。</p>
                    <p>
                      超広角レンズや望遠レンズがあると写真の幅が大きく広がります。特にProモデルの望遠レンズは<strong>光学3倍〜5倍ズーム</strong>に対応しており、遠くの被写体もくっきり撮影できます。
                    </p>
                    <p>
                      また、各レンズには<strong>光学式手ぶれ補正（OIS）</strong>が搭載されているため、手持ち撮影でもブレの少ない写真が撮れます。旅行先の風景やポートレート写真を綺麗に撮りたい場合はレンズの種類が多いモデルを選ぶのがおすすめです。
                    </p>
                  </>
                }
                detail={
                  <dl className="camera-feature-card__dl">
                    <dt>Proモデル</dt>
                    <dd>広角レンズ + 超広角レンズ + 望遠レンズ</dd>
                    <dt>無印モデル</dt>
                    <dd>広角レンズ + 超広角レンズ</dd>
                    <dt>廉価モデル（SE）</dt>
                    <dd>広角レンズ</dd>
                  </dl>
                }
                samples={[
                  { label: '超広角レンズ', src: '/images/content/iphone-lens-ultra-wide.jpg', alt: 'iPhoneの超広角レンズで撮影した風景写真' },
                  { label: '広角レンズ', src: '/images/content/iphone-lens-wide.jpg', alt: 'iPhoneの広角レンズで撮影した風景写真' },
                  { label: '望遠レンズ', src: '/images/content/iphone-lens-zoom.jpg', alt: 'iPhoneの望遠レンズで撮影した風景写真' },
                ]}
                samplesLayout="grid"
              />

              <CameraFeatureCard
                id="feature-sensor"
                title="イメージセンサーサイズ"
                description={
                  <>
                    <p>光を電気信号に変換して画像を作る<strong>カメラの心臓部ともいえるパーツのイメージセンサー</strong>。</p>
                    <p>新しい機種ほど大型のセンサーを搭載している傾向があり、iPhone 14 Pro以降のProモデルでは<strong>48MPの高解像度センサー</strong>が採用されています。センサーサイズが大きいことのメリットは下記の通り。</p>
                  </>
                }
                detail={
                  <dl className="camera-feature-card__dl">
                    <dt>光を多く取り込める</dt>
                    <dd>暗い場所でもノイズが少なく、明るい写真が撮れる</dd>
                    <dt>背景がぼけやすい</dt>
                    <dd>一眼レフのような自然なボケが表現しやすくなる</dd>
                    <dt>解像度が上がる</dt>
                    <dd>より細かいディテールを記録できる</dd>
                  </dl>
                }
                samples={[
                  { label: 'イメージセンサー', src: '/images/content/iphone-image.jpg', alt: 'iPhoneイメージセンサー 進化の変遷' },
                ]}
              />

              <CameraFeatureCard
                id="feature-camera-control"
                title="カメラコントロールボタン"
                description={
                  <>
                    <p>iPhone16シリーズで登場したカメラコントロールボタン。</p>
                    <p>ワンタッチでカメラアプリを立ち上げたり、シャッターを切ることができるようになる物理ボタンです。</p>
                    <p>シャッターチャンスを逃さずに写真を撮りたい方やインカメラを用いた自撮りをしやすくしたい方におすすめ。</p>
                  </>
                }
                supportedModels={{
                  title: 'カメラコントロール 対応機種一覧',
                  models: serializedModels.filter((m) => m.camera_control).map((m) => m.model),
                }}
              />

              <CameraFeatureCard
                id="feature-photography-style"
                title="フォトグラフスタイル"
                description={
                  <>
                    <p>iPhone 13以降のモデルに搭載されている<strong>写真撮影時のカスタムフィルター機能</strong>であるフォトグラフスタイル。</p>
                    <p>シャッターを切る前に自分好みの色味やコントラストに調整できるのが特徴。</p>
                    <p>iPhone16からはフィルターの数も増えてより細かな色味調整ができるようになっています。</p>
                  </>
                }
                detail={
                  <dl className="camera-feature-card__dl">
                    <dt>標準（Standard）</dt>
                    <dd>自然でバランスの良い色合い。iPhoneの基本の色調。</dd>
                    <dt>リッチコントラスト（Rich Contrast）</dt>
                    <dd>コントラストが強く、シャドウが深くなる。ドラマチックな印象に。</dd>
                    <dt>鮮やか（Vibrant）</dt>
                    <dd>明るくポップな色味。SNS映えしやすい。</dd>
                    <dt>暖かい（Warm）</dt>
                    <dd>黄みがかった柔らかいトーン。暖かみのある印象。</dd>
                    <dt>冷たい（Cool）</dt>
                    <dd>青みが強調され、クールでクリーンな雰囲気。</dd>
                  </dl>
                }
                supportedModels={{
                  title: 'フォトグラフスタイル 対応機種一覧',
                  models: serializedModels.filter((m) => m.photography_style).map((m) => m.model),
                }}
                samples={[
                  { label: 'フォトグラフスタイル作例', src: '/images/content/iphone-photograh-style.jpg', alt: 'iPhoneのフォトグラフスタイル撮影画面の比較' },
                ]}
              />

              <CameraFeatureCard
                id="feature-night-mode"
                title="ナイトモード"
                description={
                  <>
                    <p>長時間露光で綺麗に夜景撮影ができるようになるナイトモード。</p>
                    <p>下記はナイトモード搭載のiPhone14Proとナイトモード非搭載のiPhoneSE3で撮影した夜景写真の画質を比較したもの。</p>
                    <p>iPhone SE3の写真は<strong>明らかにノイズが多く、レンガのディテールも失われている</strong>ことがわかります。</p>
                    <p>また、夜景写真の綺麗さはカメラの<strong>イメージセンサーというパーツの大きさやF値</strong>に左右されます。同じナイトモード搭載のiPhoneでも最新型の方がより綺麗な写真が撮れると理解しておきましょう。</p>
                  </>
                }
                supportedModels={{
                  title: 'ナイトモード 対応機種一覧',
                  models: serializedModels.filter((m) => m.night_mode).map((m) => m.model),
                }}
                samples={[
                  { label: 'ナイトモード搭載', src: '/images/content/night-01.jpg', alt: 'ナイトモード搭載のiPhone14Proで撮影した写真' },
                  { label: 'ナイトモード非搭載', src: '/images/content/night-02.webp', alt: 'ナイトモード非搭載のiPhoneSE3で撮影した写真' },
                ]}
                samplesLayout="grid"
              />

              <CameraFeatureCard
                id="feature-macro"
                title="マクロ撮影モード"
                description={
                  <>
                    <p>わずか2cmの距離でもピントを合わせることが可能になるマクロ撮影モード。</p>
                    <p>花や食べ物などにグッと寄って撮影する場合にとても役立ちます。</p>
                    <p>こちらはiPhone14Proのマクロモードで撮影した観葉植物の写真。かなり近寄って撮っていますがくっきり葉脈まで捉えることができています。</p>
                    <p>しかしマクロ撮影モード非搭載のiPhoneSE3で撮影した写真はピントがあっていません。</p>
                  </>
                }
                supportedModels={{
                  title: 'マクロ撮影モード 対応機種一覧',
                  models: serializedModels.filter((m) => m.macro_mode).map((m) => m.model),
                }}
                samples={[
                  { label: 'マクロ撮影搭載', src: '/images/content/iphone-14-pro-macro-shot.webp', alt: 'マクロ撮影モード搭載のiPhone14Proで撮影した写真' },
                  { label: 'マクロ撮影非搭載', src: '/images/content/iphone-se-3-macro-shot.webp', alt: 'マクロ撮影モード非搭載のiPhoneSE3で撮影した写真' },
                ]}
                samplesLayout="grid"
              />

              <CameraFeatureCard
                id="feature-action-mode"
                title="アクションモード"
                description={
                  <>
                    <p>アクションモードは、手ブレを大幅に軽減できる動画撮影機能です。動きながらの撮影や、激しく動く被写体を追いかけるときに役立ちます。</p>
                    <p>ジンバルを用いて撮影したような滑らかな映像を手軽に撮ることができるので活躍するシーンがとても多いです。</p>
                    <p>下記はアクションモードと通常モードで撮影した場合の手ブレの違いを比較した動画の作例になります。</p>
                  </>
                }
                supportedModels={{
                  title: 'アクションモード 対応機種一覧',
                  models: serializedModels.filter((m) => m.action_mode).map((m) => m.model),
                }}
                samples={[
                  { label: '作例', src: 'aJUWwCyFbP4', alt: 'iPhone 14 Pro アクションモード vs iPhone 13 Pro 比較動画', type: 'youtube' },
                ]}
              />

              <CameraFeatureCard
                id="feature-cinematic-mode"
                title="シネマティックモード"
                description={
                  <>
                    <p>iPhone 13で初登場したシネマティックモード。iPhone 14 Pro以降では<strong>4K 30fps</strong>でのシネマティック撮影にも対応しています。</p>
                    <p>ピントを合わせた被写体の前後がボケて、名前の通り映画のような動画を撮ることができるようになるモードです。</p>
                    <p><strong>ポートレートモードの動画版</strong>と捉えてもらえるとわかりやすいかと思います。</p>
                    <p>YouTubeにはシネマティックモードをフル活用して作られたムービーの作例が多数上がっているのでそれらを参考にすると具体的なイメージがつきやすいでしょう。</p>
                  </>
                }
                supportedModels={{
                  title: 'シネマティックモード 対応機種一覧',
                  models: serializedModels.filter((m) => m.cinematic_mode).map((m) => m.model),
                }}
                samples={[
                  { label: '作例', src: 'bXhtfvZjt4c', alt: 'iPhone 16 Pro Max シネマティックビデオ 4K作例', type: 'youtube' },
                ]}
              />

              <CameraFeatureCard
                id="feature-centerframe"
                title="センターフレームフロントカメラ"
                description={
                  <>
                    <p>iPhone 17シリーズでは、全モデルに18MPの「センターフレーム対応フロントカメラ」を搭載しています。このカメラには正方形のイメージセンサーが採用されており、縦向きのままでも縦長・横長どちらのフレームでも撮影できるようになりました。</p>
                    <p>これまで横長のセルフィーを撮る際は、iPhoneを横向きにするとカメラ位置がずれて目線や顔が中央から外れてしまうことがありました。しかし、新しいセンターフレームカメラでは、縦向き・横向きどちらでも常に中央のアングルを保ったまま撮影が可能。タップ操作ひとつで縦横の切り替えもスムーズに行えます。</p>
                  </>
                }
                supportedModels={{
                  title: 'センターフレーム 対応機種一覧',
                  models: serializedModels.filter((m) => m.centerframe).map((m) => m.model),
                }}
                samples={[
                  { label: 'センターフレームカメラ', src: '/images/content/centerflame.webp', alt: 'iPhone 17のセンターフレームフロントカメラの縦向き・横向き撮影比較' },
                ]}
              />

              <CameraFeatureCard
                id="feature-lidar"
                title="LiDARスキャナ"
                description={
                  <>
                    <p>LiDARスキャナは、レーザー光の反射を利用して周囲の物体や空間までの<strong>正確な距離を瞬時に測定できるセンサー</strong>です。iPhone 12 Pro以降のProモデルに搭載されています。</p>
                    <p>もともとは自動運転車や測量などの分野で使われていた技術ですが、Appleがこれをスマートフォンに搭載したことで、手軽に高精度な空間認識が可能になりました。</p>
                    <p>LiDARスキャナを搭載することで得られるメリットは下記の通りです。</p>
                  </>
                }
                detail={
                  <dl className="camera-feature-card__dl">
                    <dt>3Dスキャン</dt>
                    <dd>部屋や建物を3Dモデル化できる</dd>
                    <dt>オートフォーカスの高速化</dt>
                    <dd>暗所でもピントが素早く正確に合う</dd>
                    <dt>AR体験の向上</dt>
                    <dd>仮想オブジェクトを現実世界に自然に配置できる</dd>
                  </dl>
                }
                supportedModels={{
                  title: 'LiDARスキャナ 対応機種一覧',
                  models: serializedModels.filter((m) => m.lidar).map((m) => m.model),
                }}
                samples={[
                  { label: '事例1', src: '1507686723396194304', alt: 'iPhone LiDARで部屋を3Dスキャンした事例', type: 'tweet' },
                  { label: '事例2', src: '1503644519249883136', alt: 'ホテルをiPhone LiDARでスキャンした事例', type: 'tweet' },
                  { label: '事例3', src: '1571689069876514816', alt: 'iPhone LiDARで3Dスキャンした事例', type: 'tweet' },
                ]}
                samplesLayout="grid"
              />

              <CameraFeatureCard
                id="feature-apple-proraw"
                title="Apple ProRaw"
                description={
                  <>
                    <p>RAWはカメラのイメージセンサーが捉えた光をデジタル化し、加工を施さずにほぼそのまま保持するデータ形式。</p>
                    <p>デジタル一眼レフカメラなどで活用されているファイル形式でiPhone12以降のProモデルで使用することができます。</p>
                    <p>ふだんの設定で撮影した写真データ（HEIF/JPEG）よりもデータが重くなるのが難点ですが、RAW現像アプリを利用して明るさや色味などをかなり柔軟に調整できるのがメリットになります。</p>
                    <p>一眼カメラで撮ったデータと同じようにRAW現像したい方におすすめの機能です。</p>
                  </>
                }
                supportedModels={{
                  title: 'Apple ProRAW 対応機種一覧',
                  models: serializedModels.filter((m) => m.apple_proraw).map((m) => m.model),
                }}
                samples={[
                  { label: '加工前', src: '/images/content/iPhone-apple-raw-before.jpg', alt: 'Apple ProRawで撮影した加工前の写真' },
                  { label: '加工後', src: '/images/content/iPhone-apple-raw-after.jpg', alt: 'RAW現像アプリで加工した後の写真' },
                ]}
                samplesLayout="grid"
              />

              <CameraFeatureCard
                id="feature-apple-prores"
                title="Apple ProRes"
                description={
                  <>
                    <p>Apple ProResは、もともと映像制作のプロが使用していた<strong>高品質なビデオコーデック（圧縮技術）</strong>です。iPhone 13 Pro以降のProモデルで撮影に対応しており、最大<strong>4K 60fps</strong>でのProRes収録が可能です。</p>
                    <p>通常の動画撮影（H.264/HEVC）と比べてファイルサイズは大きくなりますが、映像編集時の自由度が格段に高まるのが最大の特徴です。</p>
                    <p>YouTubeやショートムービーの制作など、撮影後に本格的な編集を行いたい方に向いている機能です。</p>
                  </>
                }
                detail={
                  <dl className="camera-feature-card__dl">
                    <dt>編集時の再生がスムーズ</dt>
                    <dd>編集ソフトでの処理負荷が低く、サクサク編集できる</dd>
                    <dt>色補正がしやすい</dt>
                    <dd>色情報が豊富なため、カラーグレーディングの幅が広い</dd>
                    <dt>画質劣化が少ない</dt>
                    <dd>複数回の編集・書き出しを経ても品質を維持できる</dd>
                  </dl>
                }
                supportedModels={{
                  title: 'Apple ProRes 対応機種一覧',
                  models: serializedModels.filter((m) => m.apple_prores).map((m) => m.model),
                }}
                samples={[
                  { label: '作例', src: 'vBSCCosHa2A', alt: 'iPhone 15 Pro ProRes LOG Film Emulation テスト映像', type: 'youtube' },
                ]}
              />

            </div>
          </section>
        </div>

        <section className="l-section l-section--bg-subtle" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">目的別に人気の中古iPhone</h2>
            <p className="m-section-desc">目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。</p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  alt="中古iPhoneおすすめ5選のイメージ画像"
                  loading="lazy"
                  width={400}
                  height={500}
                  className="popular-card-img"
                  src="/images/content/iphone-setting.webp"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPhoneおすすめ5選</p>
                <p className="popular-card-desc">カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。</p>
                <div>
                  <a className="m-btn m-btn--primary" href="/iphone/recommend">おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSection
          title="iPhoneのカメラに関するよくある質問"
          description="iPhoneのカメラ機能に関して、よく寄せられる疑問にお答えします。"
          items={[
            {
              question: '最新のiPhoneじゃなくても、良いカメラ性能のモデルはありますか？',
              answer: 'はい、最新モデルにこだわらなくても、優れたカメラ性能を持つiPhoneはたくさんあります。例えば、数世代前のモデルでも、多くのユーザーにとっては十分満足できる画質や機能を提供しています。重要なのは、あなたがどのような写真を撮りたいか、どのような機能を重視するかです。本記事の比較を参考に、ご自身のニーズに合ったモデルを見つけてみてください。',
            },
            {
              question: 'iPhoneの「Pro」と「無印」ではカメラにどんな違いがありますか？',
              answer: '「Pro」モデルには望遠レンズやProRAW、LiDARスキャナなどが搭載されており、写真・動画のクオリティにこだわる方に最適です。一方で「無印」は日常使いには十分な性能を持っています。',
            },
            {
              question: '子どもの運動会や旅行に向いているiPhoneモデルは？',
              answer: '動きの速いシーンや遠くの被写体をしっかり撮りたい場合は、望遠レンズと手ぶれ補正が強化された「iPhone 15 Pro」や「iPhone 15 Pro Max」がおすすめです。光学ズームで遠くの被写体もくっきり撮影でき、アクティビティ中でもブレの少ない写真が残せます。旅行での風景撮影も想定するなら、超広角レンズ搭載モデル（iPhone 11以降）が便利。広大な景色や建物を迫力ある構図で残せます。',
            },
            {
              question: 'SNS投稿に強いカメラはどのiPhone？',
              answer: 'SNSで写真や動画を映えさせたいなら、iPhone 13以降のモデルがおすすめです。特に「シネマティックモード」や「ポートレートモード」、「ナイトモード」など、表現力に優れた機能が揃っており、誰でも簡単にプロっぽい写真・動画が撮影できます。さらに、iPhone 14 Proや15 Proシリーズでは、より繊細な描写ができる48MPの高解像度センサーや被写体を立体的に写すLiDARスキャナを搭載。背景をぼかした印象的な写真や、暗所でもノイズの少ない美しい写真が撮れます。',
            },
          ]}
        />

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
