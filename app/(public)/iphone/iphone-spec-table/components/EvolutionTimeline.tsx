import Link from 'next/link'

type ModelLink = {
  name: string
  slug: string
}

const FLAGSHIP_TIMELINE = [
  {
    date: '2024年9月',
    title: 'iPhone 16 シリーズ',
    filled: true,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          '「カメラコントロール」ボタンを搭載',
          'Apple Intelligenceに対応',
          'アクションボタンを搭載',
          'Wi-Fi 7に対応',
          'MagSafe充電が最大25Wに高速化',
          '放熱性能が向上し動作が安定',
          '最小輝度1ニトに対応',
          'マクロ写真撮影に対応',
          '空間写真・ビデオ撮影に対応',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 16', slug: 'iphone16' },
          { name: 'iPhone 16 Plus', slug: 'iphone16plus' },
        ],
        items: ['A18チップ搭載', 'USB転送速度はUSB 2仕様（低速）'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 16 Pro', slug: 'iphone16pro' },
          { name: 'iPhone 16 Pro Max', slug: 'iphone16promax' },
        ],
        items: [
          '画面サイズが拡大しベゼルが最薄化',
          'A18 Proチップ搭載',
          '48MP超広角カメラ搭載',
          '5倍光学ズームを両モデルに搭載',
          '4K 120fpsの動画撮影に対応',
          'スタジオ品質のマイクで空間録音',
          'USB 3対応で高速データ転送',
        ],
      },
    ],
  },
  {
    date: '2023年9月',
    title: 'iPhone 15 シリーズ',
    filled: false,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          'USB-Cコネクタに変更（Lightning廃止）',
          'Dynamic Islandを採用',
          '48MPカメラ搭載で高画質化',
          '2倍の光学ズーム相当に対応',
          '写真のデフォルト保存サイズが24MPに向上',
          '撮影後にピント位置の変更が可能に',
          '「探す」機能の精度が向上',
          '丸みを帯びた持ちやすいデザイン',
          'Qi2ワイヤレス充電対応',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 15', slug: 'iphone15' },
          { name: 'iPhone 15 Plus', slug: 'iphone15plus' },
        ],
        items: ['A16 Bionicチップ搭載', 'USB転送速度はUSB 2仕様（低速）'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 15 Pro', slug: 'iphone15pro' },
          { name: 'iPhone 15 Pro Max', slug: 'iphone15promax' },
        ],
        items: [
          'A17 Proチップ搭載',
          'チタニウム素材採用で軽量化',
          'アクションボタンを搭載',
          'USB 3対応で高速データ転送',
          'Pro Maxのみ光学5倍ズーム搭載',
          '空間ビデオ撮影に対応',
          'Wi-Fi 6Eに対応',
        ],
      },
    ],
  },
  {
    date: '2022年9月',
    title: 'iPhone 14 シリーズ',
    filled: true,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          '衝突事故検出機能',
          '強力な手ぶれ補正（アクションモード）',
          'インカメラがオートフォーカス対応',
          '暗所撮影性能が向上',
          'シネマティックモードが4K対応',
          '衛星緊急SOS対応',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 14', slug: 'iphone14' },
          { name: 'iPhone 14 Plus', slug: 'iphone14plus' },
        ],
        items: ['A15 Bionic（5コアGPU）搭載', 'カメラセンサーが大型化'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 14 Pro', slug: 'iphone14pro' },
          { name: 'iPhone 14 Pro Max', slug: 'iphone14promax' },
        ],
        items: [
          'Dynamic Islandを初搭載',
          'A16 Bionicチップ搭載',
          '48MPメインカメラ搭載',
          '常時表示ディスプレイ対応',
          '2倍望遠に対応',
        ],
      },
    ],
  },
  {
    date: '2021年9月',
    title: 'iPhone 13 シリーズ',
    filled: false,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          'シネマティックモードを搭載',
          'フォトグラフスタイル対応',
          'バッテリー持続時間が大幅向上',
          'ストレージ容量が倍増（128GB〜）',
          'ノッチが小型化',
          'センサーシフト式手ぶれ補正を全モデルに搭載',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 13 mini', slug: 'iphone13mini' },
          { name: 'iPhone 13', slug: 'iphone13' },
        ],
        items: ['A15 Bionic（4コアGPU）搭載', 'デュアルカメラがセンサー大型化'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 13 Pro', slug: 'iphone13pro' },
          { name: 'iPhone 13 Pro Max', slug: 'iphone13promax' },
        ],
        items: [
          'A15 Bionic（5コアGPU）搭載',
          'ProMotion（120Hzリフレッシュレート）に対応',
          'マクロ撮影に対応',
          'ProResビデオ撮影に対応',
          '最大1TBストレージ',
        ],
      },
    ],
  },
  {
    date: '2020年10月',
    title: 'iPhone 12 シリーズ',
    filled: true,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          '5G通信に初対応',
          'MagSafeアクセサリに対応',
          '有機EL（OLED）ディスプレイを全モデルに搭載',
          'Ceramic Shieldで耐落下性能が4倍向上',
          'フラットエッジデザインに回帰',
          'ナイトモードが全カメラに対応',
          'Dolby Vision HDR撮影に対応',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 12 mini', slug: 'iphone12mini' },
          { name: 'iPhone 12', slug: 'iphone12' },
        ],
        items: ['A14 Bionicチップ搭載', 'miniサイズ（5.4インチ）が新登場'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 12 Pro', slug: 'iphone12pro' },
          { name: 'iPhone 12 Pro Max', slug: 'iphone12promax' },
        ],
        items: [
          'A14 Bionicチップ搭載',
          'LiDARスキャナ搭載',
          'Apple ProRAW対応',
          'Pro Maxのみセンサーシフト式手ぶれ補正',
        ],
      },
    ],
  },
  {
    date: '2019年9月',
    title: 'iPhone 11 シリーズ',
    filled: true,
    columns: [
      {
        category: '全モデル共通',
        models: [] as ModelLink[],
        items: [
          '超広角カメラを初搭載',
          'ナイトモードに初対応',
          '次世代のスマートHDR対応',
          'Wi-Fi 6に対応',
          'U1チップ搭載で空間認識に対応',
          'バッテリー持続時間が向上',
        ],
      },
      {
        category: '無印モデルのみ',
        models: [
          { name: 'iPhone 11', slug: 'iphone11' },
        ],
        items: ['A13 Bionicチップ搭載', 'Liquid Retina HDディスプレイ'],
      },
      {
        category: 'Proモデルのみ',
        models: [
          { name: 'iPhone 11 Pro', slug: 'iphone11pro' },
          { name: 'iPhone 11 Pro Max', slug: 'iphone11promax' },
        ],
        items: [
          'A13 Bionicチップ搭載',
          'トリプルカメラ（広角+超広角+望遠）',
          'Super Retina XDRディスプレイ',
          'Deep Fusionテクノロジー対応',
        ],
      },
    ],
  },
]

const SE_TIMELINE = [
  {
    date: '2025年2月',
    title: 'iPhone 16e',
    slug: 'iphone16e',
    filled: true,
    items: [
      'A18チップ搭載',
      'Apple Intelligenceに対応',
      '6.1インチ有機ELディスプレイ採用',
      'ホームボタン廃止、Face IDへ移行',
      'USB-Cコネクタ採用',
      '48MPカメラと2倍光学相当ズーム',
      'ナイトモード・シネマティックモード対応',
      'アクションボタンを搭載',
      'バッテリー持ちが大幅に向上',
      '防水性能がIP68に向上',
      '最小ストレージが128GBに増加',
    ],
  },
  {
    date: '2022年3月',
    title: 'iPhone SE 第3世代',
    slug: 'iphonese3',
    filled: false,
    items: [
      'A15 Bionic搭載（iPhone 13シリーズと同チップ）',
      '5G通信にSEシリーズとして初対応',
      'スマートHDR 4、Deep Fusion、フォトグラフスタイルに対応',
      'ホームボタン搭載およびTouch IDによる指紋認証',
      'シングルカメラ（広角のみ）',
      'eSIMとnano-SIMによるデュアルSIMに対応',
    ],
  },
  {
    date: '2020年4月',
    title: 'iPhone SE 第2世代',
    slug: 'iphonese2',
    filled: true,
    items: [
      'A13 Bionic搭載（iPhone 11シリーズと同じチップで処理性能が大幅向上）',
      '4.7インチRetina HDディスプレイ（iPhone 8の筐体を継承）',
      'ホームボタン搭載およびTouch ID（第2世代）による指紋認証',
      'シングルカメラでのポートレートモード対応（※人物のみ認識可能）',
      '次世代スマートHDR（写真の明暗差を自動調整）',
      'IP67等級の防水防塵性能（水深1メートルで最大30分間）',
      'Qiワイヤレス充電と高速充電（18W以上）に対応',
      'eSIMとnano-SIMによるデュアルSIMに対応',
      'Wi-Fi 6（802.11ax）に対応',
      'ステレオ録音に対応',
      '3D Touchが廃止され「触覚タッチ（Haptic Touch）」を採用',
      'FeliCa対応（予備電力機能付きエクスプレスカード対応）',
    ],
  },
]

export default function EvolutionTimeline() {
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代iPhoneの主な進化点（時系列順）
        </h2>
        <p className="m-section-desc">歴代iPhoneの主に進化したポイントを時系列順に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-2xl, 32px)' }}>
          フラッグシップモデルの進化した点
        </h3>

        <div className="evolution-timeline">
          {FLAGSHIP_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">{item.title}</h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--3col l-grid--gap-lg evolution-item__details">
                    {item.columns.map((col) => (
                      <div key={col.category} className="evolution-item__col">
                        <p className="evolution-item__category">{col.category}</p>
                        {col.models.length > 0 && (
                          <div className="evolution-item__model-links">
                            {col.models.map((m) => (
                              <Link key={m.slug} href={`/iphone/${m.slug}`} className="evolution-item__model-link">
                                {m.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        <ul className="evolution-item__list">
                          {col.items.map((li, i) => (
                            <li key={i}>{li}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          廉価モデル（SEシリーズ）の進化した点
        </h3>

        <div className="evolution-timeline">
          {SE_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/iphone/${item.slug}`}>{item.title}</Link>
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--2col l-grid--gap-lg">
                    <div className="evolution-item__col">
                      <ul className="evolution-item__list">
                        {item.items.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
