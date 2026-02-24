import type { AirPodsModel } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/airpods-helpers'

type Props = {
  model: AirPodsModel
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
      label: 'チップ',
      value: model.chip || '-',
      subtext: '搭載チップ',
      icon: 'fa-solid fa-microchip',
    },
    {
      label: '充電端子',
      value: model.port || '-',
      subtext: '充電ケースの接続端子',
      icon: 'fa-solid fa-plug',
    },
    {
      label: 'バッテリー（本体）',
      value: model.battery_earphone || '-',
      subtext: 'イヤホン単体の駆動時間',
      icon: 'fa-solid fa-battery-full',
    },
    {
      label: 'バッテリー（ケース込）',
      value: model.battery_case || '-',
      subtext: 'ケースでの充電を含む',
      icon: 'fa-solid fa-battery-half',
    },
    {
      label: '操作方法',
      value: model.control || '-',
      subtext: '再生/停止などの操作方式',
      icon: 'fa-solid fa-hand-pointer',
    },
  ]

  return (
    <section className="l-section" id="specs" aria-labelledby="heading-specs">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-specs">
          {model.name}（{model.model}）の基本スペック
        </h2>
        <p className="m-section-desc">
          {model.name}の主要スペックを一覧でまとめました。
        </p>

        {/* テキスト系スペック（6枚カード） */}
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

        {/* 詳細テーブル */}
        <div className="m-card m-card--shadow m-table-card">
          <table className="m-table">
            <caption className="visually-hidden">{model.name}（{model.model}）の詳細スペック一覧</caption>
            <thead>
              <tr>
                <th scope="col">項目</th>
                <th scope="col">仕様</th>
                <th scope="col">説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="fa-solid fa-ear-listen" aria-hidden="true"></i> 装着方式</td>
                <td>{model.fit || '-'}</td>
                <td>イヤーチップの種類</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-volume-xmark" aria-hidden="true"></i> ノイズキャンセリング</td>
                <td><BoolValue value={model.anc} /></td>
                <td>アクティブノイズキャンセリング対応</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-cube" aria-hidden="true"></i> 空間オーディオ</td>
                <td><BoolValue value={model.spatial_audio} /></td>
                <td>ダイナミックヘッドトラッキング対応</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> アダプティブオーディオ</td>
                <td><BoolValue value={model.adaptive_audio} /></td>
                <td>環境に応じてノイキャンと外部音を自動調整</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-magnet" aria-hidden="true"></i> MagSafe充電</td>
                <td><BoolValue value={model.magsafe} /></td>
                <td>MagSafe充電器での充電に対応</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-charging-station" aria-hidden="true"></i> Qi充電</td>
                <td><BoolValue value={model.qi_charge} /></td>
                <td>Qi規格のワイヤレス充電に対応</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-droplet" aria-hidden="true"></i> 防水性能</td>
                <td>{model.waterproof || <span className="m-spec-row__cross" aria-label="なし">&times;</span>}</td>
                <td>耐汗耐水性能の等級</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
