const rows = [
  { label: 'チップ', e16: 'A18', e17: 'A19' },
  { label: 'モバイル通信モデム', e16: 'Qualcomm製', e17: 'Apple C1X（自社設計）' },
  { label: 'ディスプレイ', e16: '6.1インチ OLED（60Hz）', e17: '6.1インチ OLED（60Hz）' },
  { label: '解像度', e16: '2,556 x 1,179（460ppi）', e17: '2,532 x 1,170（460ppi）' },
  { label: 'リフレッシュレート', e16: '60Hz', e17: '60Hz' },
  { label: 'メインカメラ', e16: '48MP Fusion（ƒ/1.6）', e17: '48MP Fusion（ƒ/1.6）' },
  { label: '望遠', e16: '2倍望遠（12MP）', e17: '2倍望遠（12MP）' },
  { label: 'フロントカメラ', e16: '12MP（ƒ/1.9）', e17: '12MP TrueDepth（ƒ/1.9）' },
  { label: 'ストレージ', e16: '128GB / 256GB / 512GB', e17: '256GB / 512GB' },
  { label: 'バッテリー', e16: 'ビデオ再生：最大26時間', e17: 'ビデオ再生：最大26時間' },
  { label: '高速充電', e16: '30分で最大50%', e17: '30分で最大50%' },
  { label: 'MagSafe', e16: '最大25W', e17: '最大15W' },
  { label: 'Qi2ワイヤレス充電', e16: '最大15W', e17: '最大15W' },
  { label: 'ポート', e16: 'USB-C（USB 2）', e17: 'USB-C（USB 2）' },
  { label: 'SIM', e16: 'デュアルeSIM（物理SIM非対応）', e17: 'デュアルeSIM（物理SIM非対応）' },
  { label: '防水防塵', e16: 'IP68（水深6m/30分）', e17: 'IP68（水深6m/30分）' },
  { label: '生体認証', e16: 'Face ID', e17: 'Face ID' },
  { label: 'Apple Intelligence', e16: '対応', e17: '対応' },
  { label: 'アクションボタン', e16: '搭載', e17: '搭載' },
  { label: 'カメラコントロール', e16: '搭載', e17: '非搭載' },
  { label: 'サイズ', e16: '147.7 x 71.5 x 7.25mm', e17: '146.7 x 71.5 x 7.80mm' },
  { label: '重量', e16: '163g', e17: '169g' },
  { label: 'カラー', e16: 'ブラック / ホワイト / コーラル / ティール', e17: 'ブラック / ホワイト / ソフトピンク' },
  { label: '素材（背面）', e16: 'ガラス', e17: 'ガラス' },
  { label: '前面保護', e16: 'Ceramic Shield 2', e17: 'Ceramic Shield 2' },
  { label: 'OS', e16: 'iOS 18', e17: 'iOS 26' },
]

export default function ComparisonTable() {
  return (
    <div className="m-card m-card--shadow m-table-card">
      <div className="m-table-scroll">
        <table className="m-table m-table--center">
          <thead>
            <tr>
              <th>項目</th>
              <th>iPhone 16e</th>
              <th>iPhone 17e</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                <td>{row.e16}</td>
                <td>{row.e17}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
