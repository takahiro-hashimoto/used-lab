import Link from 'next/link'

type ModelLink = {
  name: string
  slug: string
}

const PRO_TIMELINE = [
  {
    date: '2025年10月',
    title: 'iPad Pro（M5）',
    filled: true,
    columns: [
      {
        category: '11インチ / 13インチ共通',
        models: [
          { name: 'iPad Pro 11 (M5)', slug: 'pro11-6' },
          { name: 'iPad Pro 13 (M5)', slug: 'pro13-2' },
        ] as ModelLink[],
        items: [
          'M5チップ搭載で総合パフォーマンスが大幅に向上',
          'C1X／N1チップを加え3つのチップを複合搭載',
          'AI処理性能が最大約3.5倍向上',
          'ストレージ読み書き速度が2倍に高速化',
          'Wi-Fi 7など最新ワイヤレス通信に対応',
          '最大60Wの急速充電に対応',
          '外部ディスプレイへの4K 120Hz出力に対応',
          'インカメラが横向きに配置変更',
        ],
      },
    ],
  },
  {
    date: '2024年5月',
    title: 'iPad Pro（M4）',
    filled: false,
    columns: [
      {
        category: '11インチ / 13インチ共通',
        models: [
          { name: 'iPad Pro 11 (M4)', slug: 'pro11-5' },
          { name: 'iPad Pro 13 (M4)', slug: 'pro13-1' },
        ] as ModelLink[],
        items: [
          'M4チップ搭載で大幅な性能向上',
          'Ultra Retina XDR（タンデムOLED）ディスプレイ採用',
          'Apple Pencil Pro対応',
          'Magic Keyboard対応（新デザイン）',
          'Apple Intelligence対応',
          '史上最薄のApple製品',
          '横向きフロントカメラ搭載',
          'Wi-Fi 6E + Bluetooth 5.3対応',
        ],
      },
    ],
  },
  {
    date: '2022年10月',
    title: 'iPad Pro（M2）',
    filled: true,
    columns: [
      {
        category: '11インチ / 12.9インチ共通',
        models: [
          { name: 'iPad Pro 11 (M2)', slug: 'pro11-4' },
          { name: 'iPad Pro 12.9 (M2)', slug: 'pro12-6' },
        ] as ModelLink[],
        items: [
          'M2チップ搭載',
          'Apple Pencilのホバー機能に対応',
          'Wi-Fi 6E対応',
          'ProRes撮影・編集に対応',
          'Smart HDR 4対応',
          'Bluetooth 5.3対応',
        ],
      },
    ],
  },
  {
    date: '2021年5月',
    title: 'iPad Pro（M1）',
    filled: false,
    columns: [
      {
        category: '11インチ / 12.9インチ共通',
        models: [
          { name: 'iPad Pro 11 (M1)', slug: 'pro11-3' },
          { name: 'iPad Pro 12.9 (M1)', slug: 'pro12-5' },
        ] as ModelLink[],
        items: [
          'M1チップ搭載でMacレベルの性能に',
          'Thunderbolt / USB 4対応',
          'センターフレーム対応',
          '5G対応（Cellularモデル）',
          '最大16GB RAM搭載',
          '12.9インチはミニLED搭載（Liquid Retina XDR）',
        ],
      },
    ],
  },
  {
    date: '2020年3月',
    title: 'iPad Pro（A12Z Bionic）',
    filled: true,
    columns: [
      {
        category: '11インチ / 12.9インチ共通',
        models: [
          { name: 'iPad Pro 11 (第2世代)', slug: 'pro11-2' },
          { name: 'iPad Pro 12.9 (第4世代)', slug: 'pro12-4' },
        ] as ModelLink[],
        items: [
          'A12Z Bionicチップ搭載',
          'LiDARスキャナを初搭載',
          'トラックパッド対応のMagic Keyboard対応',
          'Wi-Fi 6対応',
          'USB-C端子搭載',
        ],
      },
    ],
  },
]

const AIR_TIMELINE = [
  {
    date: '2025年3月',
    title: 'iPad Air（M3）',
    filled: true,
    columns: [
      {
        category: '11インチ / 13インチ共通',
        models: [
          { name: 'iPad Air 11 (M3)', slug: 'air-7-11' },
          { name: 'iPad Air 13 (M3)', slug: 'air-7-13' },
        ] as ModelLink[],
        items: [
          'M3チップ搭載で性能向上',
          'Apple Intelligence対応',
          '横向きフロントカメラ搭載',
          'Wi-Fi 7対応',
          'Bluetooth 5.3対応',
          'Magic Keyboard対応',
        ],
      },
    ],
  },
  {
    date: '2024年5月',
    title: 'iPad Air（M2）',
    filled: false,
    columns: [
      {
        category: '11インチ / 13インチ共通',
        models: [
          { name: 'iPad Air 11 (M2)', slug: 'air-6-11' },
          { name: 'iPad Air 13 (M2)', slug: 'air-6-13' },
        ] as ModelLink[],
        items: [
          'M2チップ搭載',
          '13インチモデルが初登場',
          '横向きフロントカメラ搭載',
          'Apple Pencil Pro対応',
          'Wi-Fi 6E対応',
        ],
      },
    ],
  },
  {
    date: '2022年3月',
    title: 'iPad Air（第5世代）',
    filled: true,
    columns: [
      {
        category: '',
        models: [
          { name: 'iPad Air (M1)', slug: 'air-5' },
        ] as ModelLink[],
        items: [
          'M1チップ搭載',
          '5G対応（Cellularモデル）',
          'センターフレーム対応',
          'USB-C端子搭載',
        ],
      },
    ],
  },
  {
    date: '2020年9月',
    title: 'iPad Air（第4世代）',
    filled: false,
    columns: [
      {
        category: '',
        models: [
          { name: 'iPad Air (第4世代)', slug: 'air-4' },
        ] as ModelLink[],
        items: [
          'A14 Bionicチップ搭載',
          'USB-C端子を初採用',
          'トップボタンにTouch ID搭載',
          'フルスクリーンデザインに刷新',
          'Apple Pencil（第2世代）対応',
          'Magic Keyboard対応',
          'ステレオスピーカー搭載',
        ],
      },
    ],
  },
]

const MINI_TIMELINE = [
  {
    date: '2024年10月',
    title: 'iPad mini（A17 Pro）',
    filled: true,
    models: [{ name: 'iPad mini (A17 Pro)', slug: 'mini-7' }] as ModelLink[],
    items: [
      'A17 Proチップ搭載',
      'Apple Intelligence対応',
      'Apple Pencil Pro対応',
      'Wi-Fi 6E対応',
      'Bluetooth 5.3対応',
      'USB-C（USB 3対応で高速転送）',
    ],
  },
  {
    date: '2021年9月',
    title: 'iPad mini（第6世代）',
    filled: false,
    models: [{ name: 'iPad mini (第6世代)', slug: 'mini-6' }] as ModelLink[],
    items: [
      'A15 Bionicチップ搭載',
      'フルスクリーンデザインに刷新',
      'USB-C端子を初採用',
      'トップボタンにTouch ID搭載',
      'Apple Pencil（第2世代）対応',
      'センターフレーム対応',
      '5G対応（Cellularモデル）',
      'ステレオスピーカー搭載',
    ],
  },
]

const STANDARD_TIMELINE = [
  {
    date: '2025年3月',
    title: 'iPad（第11世代）',
    filled: true,
    models: [{ name: 'iPad (第11世代)', slug: 'normal-11' }] as ModelLink[],
    items: [
      'A16 Bionicチップ搭載',
      'Apple Intelligence対応',
      'Apple Pencil Pro対応',
      '横向きフロントカメラ搭載',
      'Wi-Fi 6E対応',
    ],
  },
  {
    date: '2022年10月',
    title: 'iPad（第10世代）',
    filled: false,
    models: [{ name: 'iPad (第10世代)', slug: 'normal-10' }] as ModelLink[],
    items: [
      'A14 Bionicチップ搭載',
      'フルスクリーンデザインに刷新',
      'USB-C端子を初採用',
      'トップボタンにTouch ID搭載',
      '横向きフロントカメラ搭載',
      '5G対応（Cellularモデル）',
    ],
  },
  {
    date: '2021年9月',
    title: 'iPad（第9世代）',
    filled: true,
    models: [{ name: 'iPad (第9世代)', slug: 'normal-9' }] as ModelLink[],
    items: [
      'A13 Bionicチップ搭載',
      'センターフレーム対応',
      'True Toneディスプレイ搭載',
      'ストレージが64GBに増加',
      'Lightning端子・ホームボタン搭載の最終モデル',
    ],
  },
]

export default function EvolutionTimeline() {
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代iPadの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代iPadの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* iPad Pro */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-2xl, 32px)' }}>
          iPad Pro シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {PRO_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    {item.columns[0].models.map((m, i) => (
                      <span key={m.slug}>
                        {i > 0 && ' / '}
                        <Link href={`/ipad/${m.slug}`}>{m.name}</Link>
                      </span>
                    ))}
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--2col l-grid--gap-lg">
                    <div className="evolution-item__col">
                      <ul className="evolution-item__list">
                        {item.columns[0].items.map((li, i) => (
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

        {/* iPad Air */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          iPad Air シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {AIR_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    {item.columns[0].models.map((m, i) => (
                      <span key={m.slug}>
                        {i > 0 && ' / '}
                        <Link href={`/ipad/${m.slug}`}>{m.name}</Link>
                      </span>
                    ))}
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--2col l-grid--gap-lg">
                    <div className="evolution-item__col">
                      <ul className="evolution-item__list">
                        {item.columns[0].items.map((li, i) => (
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

        {/* iPad mini */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          iPad mini シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {MINI_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/ipad/${item.models[0].slug}`}>{item.title}</Link>
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--2col l-grid--gap-lg">
                    <div className="evolution-item__col">
                      {item.models.length > 1 && (
                        <div className="evolution-item__model-links">
                          {item.models.map((m) => (
                            <Link key={m.slug} href={`/ipad/${m.slug}`} className="evolution-item__model-link">
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      )}
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

        {/* iPad（無印） */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          iPad（無印）シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {STANDARD_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/ipad/${item.models[0].slug}`}>{item.title}</Link>
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--2col l-grid--gap-lg">
                    <div className="evolution-item__col">
                      {item.models.length > 1 && (
                        <div className="evolution-item__model-links">
                          {item.models.map((m) => (
                            <Link key={m.slug} href={`/ipad/${m.slug}`} className="evolution-item__model-link">
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      )}
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
