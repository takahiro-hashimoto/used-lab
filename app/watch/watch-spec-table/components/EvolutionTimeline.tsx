import Link from 'next/link'

type ModelLink = {
  name: string
  slug: string
}

const SERIES_TIMELINE = [
  {
    date: '2025年9月',
    title: 'Apple Watch 11',
    filled: true,
    models: [{ name: 'Apple Watch 11', slug: 'series11' }] as ModelLink[],
    items: [
      'ガラス強度が向上',
      '5G通信に対応',
      '血圧センサーで高血圧を通知',
      '最大24時間続くバッテリー',
    ],
  },
  {
    date: '2024年9月',
    title: 'Apple Watch 10',
    filled: false,
    models: [{ name: 'Apple Watch 10', slug: 'series10' }] as ModelLink[],
    items: [
      '筐体サイズが42/46mmに拡大、画面表示領域も約10%アップ',
      '本体が9.7mm厚と薄型化、重量も約10%軽量化',
      '新型LTPO OLEDディスプレイで視野角性能が向上',
      '充電速度がさらに高速化、0→80%が約30分に短縮',
      'チタン合金ケースに刷新',
    ],
  },
  {
    date: '2023年9月',
    title: 'Apple Watch 9',
    filled: true,
    models: [{ name: 'Apple Watch 9', slug: 'series9' }] as ModelLink[],
    items: [
      '新SoC「S9」搭載、Neural EngineによるAI処理性能が2倍に向上',
      'ダブルタップ（指先ジェスチャー）操作が可能に',
      'ディスプレイ輝度が最大2,000ニトに向上',
      'Siriがオンデバイス処理対応により高速化',
      'ストレージが64GBに倍増',
    ],
  },
  {
    date: '2022年9月',
    title: 'Apple Watch 8',
    filled: false,
    models: [{ name: 'Apple Watch 8', slug: 'series8' }] as ModelLink[],
    items: [
      '皮膚温センサーを搭載、月経周期の把握・排卵推定が可能に',
      '自動車衝突検出機能を追加',
      'セルラーモデルが国際ローミング対応に',
      '低電力モードで最大36時間駆動が可能に',
    ],
  },
  {
    date: '2021年10月',
    title: 'Apple Watch 7',
    filled: true,
    models: [{ name: 'Apple Watch 7', slug: 'series7' }] as ModelLink[],
    items: [
      'ディスプレイがさらに大型化、シリーズ6比で約20%拡大',
      'ケースサイズが41/45mmに拡大',
      'IP6X防塵性能を初取得＋前面ガラスが50%厚く',
      'USB-Cによる急速充電対応',
      '日本語QWERTYキーボード入力対応',
    ],
  },
  {
    date: '2020年9月',
    title: 'Apple Watch 6',
    filled: false,
    models: [{ name: 'Apple Watch 6', slug: 'series6' }] as ModelLink[],
    items: [
      '新SoC「S6」搭載で処理速度が約20%向上',
      '血中酸素濃度（SpO2）センサーを新搭載',
      '常時計測の高度計を追加',
      '常時表示ディスプレイの明るさが2.5倍に向上',
    ],
  },
  {
    date: '2019年9月',
    title: 'Apple Watch 5',
    filled: true,
    models: [{ name: 'Apple Watch 5', slug: 'series5' }] as ModelLink[],
    items: [
      '常時表示のRetinaディスプレイを初搭載',
      'コンパス（磁気センサー）を新搭載',
      '内部ストレージが32GBに倍増',
      '新素材「チタニウムケース」が登場',
    ],
  },
  {
    date: '2018年9月',
    title: 'Apple Watch 4',
    filled: false,
    models: [{ name: 'Apple Watch 4', slug: 'series4' }] as ModelLink[],
    items: [
      'ケースサイズが40/44mmに拡大、画面表示領域が約30%アップ',
      'S4チップ搭載で前世代の2倍の処理性能',
      '初の心電図（ECG）対応',
      '転倒検出機能を新搭載',
    ],
  },
]

const SE_TIMELINE = [
  {
    date: '2025年9月',
    title: 'Apple Watch SE3',
    filled: true,
    models: [{ name: 'Apple Watch SE3', slug: 'se3-2' }] as ModelLink[],
    items: [
      'S10チップ搭載で高速化・省電力化',
      'Always-On Display（常時表示）に対応',
      'Ion-Xガラス採用でひび割れ耐性が4倍に向上',
      '睡眠スコア、手首温度センサーなど健康機能を強化',
      'ダブルタップジェスチャーに対応',
    ],
  },
  {
    date: '2022年9月',
    title: 'Apple Watch SE2',
    filled: false,
    models: [{ name: 'Apple Watch SE2', slug: 'se2-2' }] as ModelLink[],
    items: [
      'S8チップ搭載で処理性能が向上',
      'Crash Detection（交通事故検出）機能を追加',
      'Bluetoothなど通信性能を改善',
      'アプリ起動が速く、動作が滑らかに',
    ],
  },
  {
    date: '2020年9月',
    title: 'Apple Watch SE',
    filled: true,
    models: [{ name: 'Apple Watch SE', slug: 'se' }] as ModelLink[],
    items: [
      '初代の低価格エントリーモデル',
      '基本的なフィットネス・健康機能を搭載',
      '防水性能は50m',
    ],
  },
]

const ULTRA_TIMELINE = [
  {
    date: '2025年9月',
    title: 'Apple Watch Ultra3',
    filled: true,
    models: [{ name: 'Apple Watch Ultra3', slug: 'ultra3' }] as ModelLink[],
    items: [
      'ベゼルが薄くなり、より大きな表示領域',
      'バッテリー駆動時間が改善（最大72時間）',
      '衛星通信によるSOSに対応',
      '血圧（高血圧）検出アラート機能を追加',
      '睡眠スコアや健康・ウェルネス機能が強化',
    ],
  },
  {
    date: '2023年9月',
    title: 'Apple Watch Ultra2',
    filled: false,
    models: [{ name: 'Apple Watch Ultra2', slug: 'ultra2' }] as ModelLink[],
    items: [
      '最大輝度が3,000ニトに向上',
      'S9チップ搭載で処理性能と電力効率がアップ',
      'チタンブラックなど新色が追加',
      'ダブルタップジェスチャーに対応',
    ],
  },
  {
    date: '2022年9月',
    title: 'Apple Watch Ultra',
    filled: true,
    models: [{ name: 'Apple Watch Ultra', slug: 'ultra' }] as ModelLink[],
    items: [
      '49mmチタンケースでタフな設計',
      '高輝度ディスプレイ（2,000ニト）で屋外でも視認性良好',
      '100m耐水性能',
      'アクションボタン搭載',
      '長時間バッテリー（最大36時間）',
    ],
  },
]

export default function EvolutionTimeline() {
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代Apple Watchの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代Apple Watchの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* Series */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-2xl, 32px)' }}>
          Apple Watch Series の進化した点
        </h3>

        <div className="evolution-timeline">
          {SERIES_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/watch/${item.models[0].slug}`}>{item.title}</Link>
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

        {/* SE */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          Apple Watch SE シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {SE_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/watch/${item.models[0].slug}`}>{item.title}</Link>
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

        {/* Ultra */}
        <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left', marginTop: 'var(--space-3xl, 48px)' }}>
          Apple Watch Ultra シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {ULTRA_TIMELINE.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/watch/${item.models[0].slug}`}>{item.title}</Link>
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
