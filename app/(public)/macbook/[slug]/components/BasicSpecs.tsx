import type { MacBookModel } from '@/lib/types'
import { formatReleaseDate, getEfficiencyRating } from '@/lib/utils/macbook-helpers'

type Props = {
  model: MacBookModel
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
  const efficiency = getEfficiencyRating(model.cpu)

  const specs: SpecItem[] = [
    {
      label: '発売日',
      value: releaseDate || '-',
      subtext: 'Appleによる発売日',
      icon: 'fa-solid fa-calendar',
    },
    {
      label: 'ディスプレイ',
      value: model.display || '-',
      subtext: 'ディスプレイの種類',
      icon: 'fa-solid fa-display',
    },
    {
      label: '輝度',
      value: model.luminance || '-',
      subtext: '画面の明るさ',
      icon: 'fa-solid fa-sun',
    },
    {
      label: '重さ',
      value: model.weight || '-',
      subtext: '本体の重量',
      icon: 'fa-solid fa-weight-hanging',
    },
    {
      label: 'CPU',
      value: model.cpu || '-',
      subtext: '搭載チップ',
      icon: 'fa-solid fa-microchip',
    },
    {
      label: '電力効率',
      value: efficiency,
      subtext: 'チップ世代から推定',
      icon: 'fa-solid fa-leaf',
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
            <caption className="visually-hidden">{model.model}の詳細スペック一覧</caption>
            <thead>
              <tr>
                <th scope="col">項目</th>
                <th scope="col">仕様</th>
                <th scope="col">説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="fa-solid fa-display" aria-hidden="true"></i> ProMotion</td>
                <td><BoolValue value={model.promotion} /></td>
                <td>最大120Hzの可変リフレッシュレート</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-memory" aria-hidden="true"></i> メモリ</td>
                <td>{model.ram || '-'}</td>
                <td>搭載メモリ容量（ユニファイドメモリ）</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-hard-drive" aria-hidden="true"></i> ストレージ</td>
                <td>{model.strage || '-'}</td>
                <td>内蔵SSD容量</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-battery-full" aria-hidden="true"></i> バッテリー</td>
                <td>{model.battery || '-'}</td>
                <td>Web閲覧時の持続時間目安</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-plug" aria-hidden="true"></i> インターフェイス</td>
                <td>{model.port || '-'}</td>
                <td>外部接続端子の種類</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-sd-card" aria-hidden="true"></i> SDカードスロット</td>
                <td><BoolValue value={model.slot} /></td>
                <td>SDXCカードスロットの有無</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-tv" aria-hidden="true"></i> HDMIポート</td>
                <td><BoolValue value={model.hdmi} /></td>
                <td>外部ディスプレイとの直接接続</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-volume-high" aria-hidden="true"></i> オーディオ</td>
                <td>{model.speaker || '-'}</td>
                <td>搭載スピーカーの仕様</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-camera" aria-hidden="true"></i> センターフレーム</td>
                <td><BoolValue value={model.center_frame} /></td>
                <td>ビデオ通話で自動追尾するカメラ機能</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-fan" aria-hidden="true"></i> 冷却ファン</td>
                <td><BoolValue value={model.fan} /></td>
                <td>アクティブ冷却で高負荷時の性能を維持</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-charging-station" aria-hidden="true"></i> MagSafe充電</td>
                <td><BoolValue value={model.magsafe} /></td>
                <td>磁気接続による急速充電</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-video" aria-hidden="true"></i> カメラ</td>
                <td>{model.camera || '-'}</td>
                <td>内蔵カメラの解像度</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-expand" aria-hidden="true"></i> 解像度</td>
                <td>{model.resolution || '-'}</td>
                <td>ディスプレイの画素数</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
