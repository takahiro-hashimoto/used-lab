type ModelLink = {
  name: string
  slug: string
}

const AIR_TIMELINE = [
  {
    date: '2025年3月',
    title: 'MacBook Air M4',
    filled: true,
    columns: [
      {
        category: '13インチ / 15インチ共通',
        models: [
          { name: 'MacBook Air 13インチ', slug: 'mba-13-2025' },
          { name: 'MacBook Air 15インチ', slug: 'mba-15-2025' },
        ] as ModelLink[],
        items: [
          'M4チップ搭載（10コアCPU / 10コアGPU）',
          'メモリが16GBに増量（ベースモデル）',
          'Apple Intelligenceに完全対応',
          'センターフレーム対応の12MPカメラ',
          'Thunderbolt 4ポート×2（USB-C）',
          'MagSafe 3充電対応',
          '最大2台の外部ディスプレイに対応（蓋を閉じた状態）',
        ],
      },
    ],
  },
  {
    date: '2024年3月',
    title: 'MacBook Air M3',
    filled: false,
    columns: [
      {
        category: '13インチ / 15インチ共通',
        models: [
          { name: 'MacBook Air 13インチ', slug: 'mba-13-2024' },
          { name: 'MacBook Air 15インチ', slug: 'mba-15-2024' },
        ] as ModelLink[],
        items: [
          'M3チップ搭載（8コアCPU / 10コアGPU）',
          'Wi-Fi 6Eに対応',
          '2台の外部ディスプレイに対応（蓋を閉じた状態）',
          'ダイナミックキャッシングでGPU性能が向上',
          'AV1デコード対応でストリーミング効率が向上',
        ],
      },
    ],
  },
  {
    date: '2023年6月',
    title: 'MacBook Air 15インチ M2',
    filled: true,
    columns: [
      {
        category: '',
        models: [
          { name: 'MacBook Air 15インチ', slug: 'mba-15-2023' },
        ] as ModelLink[],
        items: [
          '15.3インチの大画面モデルが初登場',
          '6スピーカーサウンドシステム搭載',
          'M2チップ搭載（8コアCPU / 10コアGPU）',
          '薄型軽量ながら大画面で作業性が向上',
        ],
      },
    ],
  },
  {
    date: '2022年7月',
    title: 'MacBook Air 13インチ M2',
    filled: false,
    columns: [
      {
        category: '',
        models: [
          { name: 'MacBook Air 13インチ', slug: 'mba-13-2022' },
        ] as ModelLink[],
        items: [
          'フルモデルチェンジでフラットデザインに刷新',
          'M2チップ搭載（8コアCPU / 8コアGPU）',
          'Liquid Retina 13.6インチディスプレイ採用',
          'MagSafe充電コネクタが復活',
          '1080p FaceTimeカメラに強化',
          '4スピーカーサウンドシステム搭載',
          'ノッチデザインを採用',
        ],
      },
    ],
  },
  {
    date: '2020年11月',
    title: 'MacBook Air 13インチ M1',
    filled: true,
    columns: [
      {
        category: '',
        models: [
          { name: 'MacBook Air 13インチ', slug: 'mba-13-2020' },
        ] as ModelLink[],
        items: [
          'Apple Silicon（M1チップ）を初搭載',
          'ファンレス設計で完全無音動作',
          'バッテリー駆動時間が最大18時間に大幅向上',
          'iPhoneやiPadのアプリが動作可能に',
          'Intel版と比べてCPU性能が約3.5倍向上',
        ],
      },
    ],
  },
]

const PRO_TIMELINE = [
  {
    date: '2024年11月',
    title: 'MacBook Pro M4シリーズ',
    filled: true,
    columns: [
      {
        category: '14インチ / 16インチ共通',
        models: [
          { name: 'MacBook Pro 14インチ', slug: 'mbp-14-2024-nov' },
          { name: 'MacBook Pro 16インチ', slug: 'mbp-16-2024-nov' },
        ] as ModelLink[],
        items: [
          'M4 / M4 Pro / M4 Maxチップ搭載',
          'メモリが全モデル最低16GB〜に増量',
          'Apple Intelligence対応',
          'Thunderbolt 5ポート搭載（M4 Pro / Max）',
          'ナノテクスチャディスプレイオプション追加',
          'センターフレーム対応の12MPカメラ',
        ],
      },
    ],
  },
  {
    date: '2023年11月',
    title: 'MacBook Pro M3シリーズ',
    filled: false,
    columns: [
      {
        category: '14インチ / 16インチ共通',
        models: [
          { name: 'MacBook Pro 14インチ M3', slug: 'mbp-14-2023-nov' },
          { name: 'MacBook Pro 16インチ M3 Pro', slug: 'mbp-16-2023-nov' },
        ] as ModelLink[],
        items: [
          'M3 / M3 Pro / M3 Maxチップ搭載',
          '3nmプロセス採用でさらに省電力に',
          'ダイナミックキャッシングでGPU性能向上',
          'ハードウェアアクセラレーテッドレイトレーシング対応',
          'Wi-Fi 6Eに対応',
          'スペースブラックカラーが新登場',
        ],
      },
    ],
  },
  {
    date: '2023年2月',
    title: 'MacBook Pro M2 Pro / M2 Max',
    filled: true,
    columns: [
      {
        category: '14インチ / 16インチ共通',
        models: [
          { name: 'MacBook Pro 14インチ M2 Pro', slug: 'mbp-14-2023' },
          { name: 'MacBook Pro 16インチ M2 Pro', slug: 'mbp-16-2023' },
        ] as ModelLink[],
        items: [
          'M2 Pro / M2 Maxチップ搭載',
          'Wi-Fi 6Eに対応',
          'HDMI 2.1で8K出力に対応',
          'Bluetooth 5.3に対応',
          'バッテリー駆動時間がさらに向上',
        ],
      },
    ],
  },
  {
    date: '2022年6月',
    title: 'MacBook Pro 13インチ M2',
    filled: false,
    columns: [
      {
        category: '',
        models: [
          { name: 'MacBook Pro 13インチ', slug: 'mbp-13-2022' },
        ] as ModelLink[],
        items: [
          'M2チップ搭載',
          'Touch Bar搭載の最後のモデル',
          'バッテリー駆動時間が最大20時間に',
          'ProRes対応のメディアエンジン搭載',
        ],
      },
    ],
  },
  {
    date: '2021年10月',
    title: 'MacBook Pro M1 Pro / M1 Max',
    filled: true,
    columns: [
      {
        category: '14インチ / 16インチ共通',
        models: [
          { name: 'MacBook Pro 14インチ', slug: 'mbp-14-2021' },
          { name: 'MacBook Pro 16インチ', slug: 'mbp-16-2021' },
        ] as ModelLink[],
        items: [
          'M1 Pro / M1 Maxチップ搭載',
          'フルモデルチェンジでノッチデザイン採用',
          'Liquid Retina XDRディスプレイ（ProMotion 120Hz対応）',
          'MagSafe充電コネクタが復活',
          'SDカードスロットとHDMIポートが復活',
          '1080p FaceTimeカメラに強化',
          '6スピーカーサウンドシステム搭載',
          'バッテリー駆動時間が最大21時間に',
        ],
      },
    ],
  },
  {
    date: '2020年11月',
    title: 'MacBook Pro 13インチ M1',
    filled: false,
    columns: [
      {
        category: '',
        models: [
          { name: 'MacBook Pro 13インチ', slug: 'mbp-13-2020' },
        ] as ModelLink[],
        items: [
          'Apple Silicon（M1チップ）を初搭載',
          'Intel版と比べてCPU性能が約2.8倍向上',
          'バッテリー駆動時間が最大20時間に大幅向上',
          'iPhoneやiPadのアプリが動作可能に',
          'ファンは搭載だが静音性が大幅に向上',
        ],
      },
    ],
  },
]

export default function EvolutionTimeline() {
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代MacBookの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代MacBookの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* MacBook Air */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-2xl, 32px)' }}>
          MacBook Air シリーズの進化した点
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
                        <a href={`/macbook/${m.slug}`}>{m.name}</a>
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

        {/* MacBook Pro */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          MacBook Pro シリーズの進化した点
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
                        <a href={`/macbook/${m.slug}`}>{m.name}</a>
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
      </div>
    </section>
  )
}
