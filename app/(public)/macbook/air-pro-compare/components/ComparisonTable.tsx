import Image from 'next/image'

const rows = [
  { label: '冷却方式', air: 'ファンレス（静音）', pro: 'ファン搭載（高負荷に強い）' },
  { label: '持続性能', air: '長時間の高負荷でやや低下', pro: '高負荷を長時間維持できる' },
  { label: 'ディスプレイ', air: '60Hz（Liquid Retina）', pro: 'ProMotion 120Hz（14/16インチ）' },
  { label: 'ポート', air: 'USB-C×2 + MagSafe', pro: 'USB-C×3 + HDMI + SD + MagSafe' },
  { label: '外部ディスプレイ', air: '最大2台（M3/M4）', pro: '最大3台以上' },
  { label: '画面サイズ', air: '13.6 / 15.3インチ', pro: '14.2 / 16.2インチ' },
  { label: '重量', air: '約1.24kg〜（13インチ）', pro: '約1.55kg〜（14インチ）' },
  { label: 'バッテリー', air: '最大18時間', pro: '最大24時間' },
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
              <th>MacBook Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td style={{ padding: 'var(--space-md)' }}>
                <Image
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="MacBook Air"
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </td>
              <td style={{ padding: 'var(--space-md)' }}>
                <Image
                  src="/images/macbook/mbp-14-2024-nov.jpg"
                  alt="MacBook Pro"
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
                <td>{row.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
