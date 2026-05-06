import Image from 'next/image'

const rows = [
  { label: 'チップ', air: 'M4（Apple Silicon）', neo: 'A18 Pro（iPhone系）' },
  { label: 'メモリ', air: '16GB〜（選択可）', neo: '8GB（固定）' },
  { label: 'ディスプレイ', air: '13.6 / 15.3インチ 60Hz', neo: '13インチ 60Hz' },
  { label: 'ポート', air: 'USB-C×2（TB4）+ MagSafe', neo: 'USB-C×2（充電兼用）' },
  { label: 'MagSafe充電', air: 'あり', neo: 'なし' },
  { label: 'Touch ID', air: '全モデル搭載', neo: '512GBモデルのみ' },
  { label: 'バッテリー', air: '最大18時間（13インチ）', neo: '最大16時間' },
  { label: '重量', air: '約1.24kg〜（13インチ）', neo: '約1.24kg' },
]

export default function ComparisonTable() {
  return (
    <div className="m-card m-card--shadow m-table-card">
      <div className="m-table-scroll">
        <table className="m-table m-table--center">
          <thead>
            <tr>
              <th>項目</th>
              <th>MacBook Air</th>
              <th>MacBook Neo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td style={{ padding: 'var(--space-md)' }}>
                <Image
                  src="/images/macbook/mba-13-2025.jpg"
                  alt="MacBook Air"
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </td>
              <td style={{ padding: 'var(--space-md)' }}>
                <Image
                  src="/images/macbook/mbn-13-2026.jpg"
                  alt="MacBook Neo"
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </td>
            </tr>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                <td>{row.air}</td>
                <td>{row.neo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
