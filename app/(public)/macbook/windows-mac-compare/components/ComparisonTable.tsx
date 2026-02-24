const rows = [
  { label: 'シェア', win: '70%ほど', mac: '15%ほど（クリエイターに人気）' },
  { label: '製品数・価格', win: '製品数が多く、価格帯も幅広い', mac: '製品数は少なく、全体的に高価格' },
  { label: 'スペック', win: '低スペック〜ハイスペックまで多様', mac: '全体的に高性能' },
  { label: 'カスタマイズ性', win: '高い', mac: '低い' },
  { label: '対応アプリ', win: '豊富', mac: 'Windowsには劣る' },
  { label: '対応ゲーム', win: '豊富', mac: '少ない' },
  { label: '操作性', win: 'モデルによって差がある', mac: 'シンプルで使いやすい' },
  { label: 'データ連携', win: 'やや不便', mac: '直感的に連携できる' },
  { label: 'デザイン', win: '多種多様', mac: 'シンプルで美しい' },
  { label: 'リセールバリュー', win: '低い', mac: '高い' },
]

export default function ComparisonTable() {
  return (
    <div className="m-card m-card--shadow m-table-card">
      <div className="m-table-scroll">
        <table className="m-table m-table--center">
          <thead>
            <tr>
              <th>項目</th>
              <th>Windows</th>
              <th>Mac</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                <td>{row.win}</td>
                <td>{row.mac}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
