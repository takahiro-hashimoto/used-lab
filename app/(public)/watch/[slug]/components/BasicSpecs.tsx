import type { WatchModel } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/watch-helpers'

type Props = {
  model: WatchModel
}

type SpecItem = {
  label: string
  value: string
  subtext: string
  icon: string
}

function BoolValue({ value }: { value: boolean }) {
  if (value) {
    return <span className="m-rating__icon m-rating__icon--good" aria-label="対応">&#9675;</span>
  }
  return <span className="m-spec-row__cross" aria-label="非対応">&times;</span>
}

export default function BasicSpecs({ model }: Props) {
  const releaseDate = formatReleaseDate(model.date)

  const specs: SpecItem[] = [
    {
      label: '発売日',
      value: releaseDate || '-',
      subtext: 'Appleによる発売日',
      icon: 'fa-solid fa-calendar',
    },
    {
      label: 'ケースサイズ',
      value: model.size || '-',
      subtext: '手首に応じた選択が可能',
      icon: 'fa-solid fa-ruler',
    },
    {
      label: 'チップセット',
      value: model.cpu || '-',
      subtext: '処理速度に関わるSoC',
      icon: 'fa-solid fa-microchip',
    },
    {
      label: 'ケース素材',
      value: model.material || '-',
      subtext: '耐久性と質感に関わる',
      icon: 'fa-solid fa-gem',
    },
    {
      label: 'ストレージ容量',
      value: model.strage || '-',
      subtext: '音楽やアプリの保存容量',
      icon: 'fa-solid fa-hard-drive',
    },
    {
      label: 'ディスプレイ輝度',
      value: model.max_brightness || '-',
      subtext: '屋外での視認性に関わる',
      icon: 'fa-solid fa-sun',
    },
  ]

  return (
    <section className="l-section" id="specs" aria-labelledby="heading-specs">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-specs">
          {model.model}の基本スペック
        </h2>
        <p className="m-section-desc">
          {model.model}の主要スペックを一覧でまとめました。
        </p>

        {/* テキスト系スペック */}
        <div className="l-grid l-grid--3col l-grid--gap-lg l-grid--mb-2xl">
          {specs.map((spec) => (
            <div key={spec.label} className="m-card m-card--sm m-stat-card">
              <p className="m-stat-card__label">
                <i className={spec.icon} aria-hidden="true"></i> {spec.label}
              </p>
              <p className="m-stat-card__value">{spec.value}</p>
              <p className="m-stat-card__note">{spec.subtext}</p>
            </div>
          ))}
        </div>

        {/* ブール系スペック */}
        <div className="m-card m-card--shadow m-table-card">
          <table className="m-table">
            <caption className="visually-hidden">{model.model}の機能対応一覧</caption>
            <thead>
              <tr>
                <th scope="col">機能</th>
                <th scope="col">対応</th>
                <th scope="col">説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="fa-solid fa-display" aria-hidden="true"></i> 常時表示ディスプレイ</td>
                <td><BoolValue value={model.always_on_display} /></td>
                <td>手首を上げなくても時刻を確認可能</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-battery-full" aria-hidden="true"></i> バッテリー持ち</td>
                <td>{model.battery || '-'}</td>
                <td>通常使用時のバッテリー駆動時間</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-bolt" aria-hidden="true"></i> 急速充電</td>
                <td><BoolValue value={model.fast_charge} /></td>
                <td>短時間で充電が可能</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-droplet" aria-hidden="true"></i> 耐水性能</td>
                <td>{model.water_resistance || '-'}</td>
                <td>プールやシャワーでの使用可否</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-lungs" aria-hidden="true"></i> 血中酸素濃度</td>
                <td><BoolValue value={model.blood_oxygen} /></td>
                <td>SpO2センサーで血中酸素を計測</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-heart-pulse" aria-hidden="true"></i> 心電図</td>
                <td><BoolValue value={model.cardiogram} /></td>
                <td>心房細動などの不整脈を検出</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-car-burst" aria-hidden="true"></i> 衝突事故検出</td>
                <td><BoolValue value={model.accident_detection} /></td>
                <td>交通事故時に自動で緊急通報</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-person-falling" aria-hidden="true"></i> 転倒検出</td>
                <td><BoolValue value={model.fall_detection} /></td>
                <td>転倒を検知し緊急通報を支援</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-temperature-half" aria-hidden="true"></i> 皮膚温センサー</td>
                <td><BoolValue value={model.skin_temperature} /></td>
                <td>手首の皮膚温度を計測</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-hand-pointer" aria-hidden="true"></i> ダブルタップ</td>
                <td><BoolValue value={model.double_tap} /></td>
                <td>指のジェスチャーで操作可能</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-keyboard" aria-hidden="true"></i> 日本語入力</td>
                <td><BoolValue value={model.japanese_input} /></td>
                <td>QWERTYキーボードで日本語入力</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-bed" aria-hidden="true"></i> 睡眠トラッキング</td>
                <td><BoolValue value={model.sleep_tracking} /></td>
                <td>睡眠の質を記録・分析</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-mountain" aria-hidden="true"></i> 高度計</td>
                <td><BoolValue value={model.altimeter} /></td>
                <td>リアルタイムで高度を計測</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-gauge-high" aria-hidden="true"></i> 血圧</td>
                <td><BoolValue value={model.blood_pressure} /></td>
                <td>高血圧の傾向を通知</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-star" aria-hidden="true"></i> 睡眠スコア</td>
                <td><BoolValue value={model.sleep_score} /></td>
                <td>睡眠の質をスコアで表示</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
