export default function ShopComparisonSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="comparison" aria-labelledby="heading-comparison">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
          購入先ごとのメリット・デメリット比較
        </h2>
        <p className="m-section-desc">ここでは「どこで買うか」を判断するための最低限の情報を整理しました。</p>
        <p className="m-section-desc">安さ・安全性・保証・初心者向きかの4つの軸で比較しています。</p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th>比較項目</th>
                  <th>中古タブレット専門店</th>
                  <th>Apple認定整備済</th>
                  <th>ECモール</th>
                  <th>フリマアプリ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>安さ</strong></td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">最安値クラス</span>
                  </td>
                  <td>
                    <span className="text-caution">△</span><br />
                    <span className="text-sm text-muted">新品の最大15%引き</span>
                  </td>
                  <td>
                    <span className="text-info">○</span><br />
                    <span className="text-sm text-muted">ポイント還元あり</span>
                  </td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">最安値が見つかる</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>安全性</strong></td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">検品体制あり</span>
                  </td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">Apple公式品質</span>
                  </td>
                  <td>
                    <span className="text-info">○</span><br />
                    <span className="text-sm text-muted">店舗による</span>
                  </td>
                  <td>
                    <span className="text-caution">△</span><br />
                    <span className="text-sm text-muted">自己責任の範囲が広い</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>保証</strong></td>
                  <td>
                    <span className="text-info">○</span><br />
                    <span className="text-sm text-muted">赤ロム永久保証など</span>
                  </td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">1年間メーカー保証</span>
                  </td>
                  <td>
                    <span className="text-info">○</span><br />
                    <span className="text-sm text-muted">店舗の保証に準じる</span>
                  </td>
                  <td>
                    <span className="text-negative">✕</span><br />
                    <span className="text-sm text-muted">基本的になし</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>初心者向きか</strong></td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">おすすめ</span>
                  </td>
                  <td>
                    <span className="text-positive">◎</span><br />
                    <span className="text-sm text-muted">おすすめ</span>
                  </td>
                  <td>
                    <span className="text-info">○</span><br />
                    <span className="text-sm text-muted">ある程度知識があれば</span>
                  </td>
                  <td>
                    <span className="text-caution">△</span><br />
                    <span className="text-sm text-muted">知識が必要</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
