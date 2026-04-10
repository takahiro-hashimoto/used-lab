type EvolutionStep = {
  title: string
  slug: string
  image: string
  features: string[]
}

const AIR_STEPS: EvolutionStep[] = [
  {
    title: 'M3→M4の進化ポイント',
    slug: 'mba-13-2025',
    image: '/images/macbook/mba-15-2025.jpg',
    features: [
      'CPU性能が18%向上',
      'Neural Engine強化によりAI処理が向上（大規模なデータ解析や推論タスクがより迅速に行える）',
      '画面を開いた状態で外部ディスプレイ2台接続が可能になった',
      '12MPセンターフレームカメラを搭載',
      '新色スカイブルーの登場',
      'Thunderbolt4を搭載',
    ],
  },
  {
    title: 'M2→M3の進化ポイント',
    slug: 'mba-13-2024',
    image: '/images/macbook/mba-13-2024.jpg',
    features: [
      'CPU性能23%向上',
      'Dynamic Cachingにより3Dデザインや3Dゲームの処理性能がアップ',
      'クラムシェルモード時に2つの外部ディスプレイ接続に対応',
      'ミッドナイトに酸化皮膜シール採用',
      'Wi-Fi6E対応で通信速度が最大2倍に',
    ],
  },
  {
    title: 'M1→M2の進化ポイント',
    slug: 'mba-13-2022',
    image: '/images/macbook/mba-13-2022.jpg',
    features: [
      'CPU性能が13%向上',
      'フラットデザインを採用し、見た目が大幅刷新',
      'ベゼル（画面の縁）が薄くなりディスプレイサイズがアップ',
      'カメラが720pから1080pに高解像度化',
      'MagSafe充電が復活',
    ],
  },
]

const PRO_STEPS: EvolutionStep[] = [
  {
    title: 'M3→M4の進化ポイント',
    slug: 'mbp-14-2024-nov',
    image: '/images/macbook/mbp-16-2024-nov.jpg',
    features: [
      'CPU性能が43%向上（MAXモデルの場合）',
      'Neural Engine強化によりAI処理が向上（大規模なデータ解析や推論タスクがより迅速に行える）',
      'Thunderbolt5を搭載（M4 Pro/Max）',
      '12MPセンターフレームカメラを搭載',
      'Nano-textureディスプレイで反射低減',
      '全モデルで低電力/高出力モードに対応',
    ],
  },
  {
    title: 'M2→M3の進化ポイント',
    slug: 'mbp-14-2023-nov',
    image: '/images/macbook/mbp-14-2023-nov.jpg',
    features: [
      'Proモデルで21%、Maxモデルで5%のCPU性能向上',
      'Dynamic Cachingにより3Dデザインや3Dゲームの処理性能がアップ',
      'M3 Pro/Maxにスペースブラック登場',
      'M3 Maxのみ低電力/高出力モードに対応',
    ],
  },
  {
    title: 'M1→M2の進化ポイント',
    slug: 'mbp-13-2022',
    image: '/images/macbook/mbp-13-2022.jpg',
    features: [
      'Maxモデルで最大15%のCPU性能向上を実現',
      'Wi-Fi 6E対応で通信速度が最大2倍に',
      'HDMI2.1対応で高解像度出力を強化',
      '16インチM2 Maxのみ低電力/高出力モードに対応',
    ],
  },
]

function TimelineSection({ heading, steps }: { heading: string; steps: EvolutionStep[] }) {
  return (
    <>
      <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
        {heading}
      </h3>
      <div className="evolution-timeline">
        {steps.map((step, idx) => (
          <div key={step.slug} className="evolution-item">
            <div className={`evolution-item__marker${idx % 2 === 0 ? ' evolution-item__marker--filled' : ''}`} />
            <div className="evolution-item__content">
              <div className="evolution-item__header">
                <h4 className="evolution-item__title">
                  {step.title}
                </h4>
              </div>
              <div className="evolution-item__body evolution-item__col">
                <ul className="evolution-item__list">
                  {step.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function EvolutionTimeline() {
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代MacBookの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代MacBookの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        <TimelineSection heading="歴代MacBook Air Mシリーズの進化した点" steps={AIR_STEPS}  />
        <TimelineSection heading="歴代MacBook Pro Mシリーズの進化した点" steps={PRO_STEPS}  />
      </div>
    </section>
  )
}
