import type { InsuranceProps } from './types'

export default function InsuranceSection({
  productName,
  productBenefit,
  appleCarePrice,
  appleCareYears,
}: InsuranceProps) {
  return (
    <section className="l-section" id="insurance" aria-labelledby="heading-insurance">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-insurance">
          中古{productName}でも入れる保険
        </h2>
        <p className="m-section-desc">
          中古{productName}は<strong>Apple Care+に加入できません</strong>（新品購入から30日以内が条件のため）。
        </p>
        <p className="m-section-desc">代わりに、中古端末でも加入できる保険サービスを検討しましょう。</p>

        {/* モバイル保険カード */}
        <div className="m-card m-card--shadow m-card--padded media-card--aside-footer insurance-card">
          <div className="media-card__img-wrap" style={{ minWidth: 0 }}>
            <a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+691UP" rel="nofollow" style={{ display: 'block' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                decoding="async"
                className="insurance-card__banner"
                alt="モバイル保険"
                src="https://www20.a8.net/svt/bgt?aid=191201327468&wid=001&eno=01&mid=s00000019424001050000&mc=1"
              />
            </a>
          </div>
          <div className="media-card__body" style={{ minWidth: 0 }}>
            <div className="media-card__desc m-rich-text">
              <h3 className="media-card__title">モバイル保険</h3>
              <ul className="u-mb-lg m-check-list">
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true"></i> 月額700円で最大3台まで補償
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true"></i> 年間10万円まで修理費用を全額補償
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true"></i> 中古端末・格安スマホも加入OK
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true"></i> 補償期間に終わりがない（月額払いの間ずっと）
                </li>
              </ul>
              <p>
                Apple Care+と違い、期間の縛りがないのが最大のメリット。{productBenefit}
              </p>
            </div>
          </div>
          <div className="media-card__footer" style={{ minWidth: 0 }}>
            <div className="insurance-card__table-wrap">
              <table className="m-table insurance-card__table">
                <thead>
                  <tr>
                    <th scope="col">項目</th>
                    <th scope="col">モバイル保険</th>
                    <th scope="col">Apple Care+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">月額料金</th>
                    <td><strong>700円</strong></td>
                    <td>{appleCarePrice}</td>
                  </tr>
                  <tr>
                    <th scope="row">中古端末</th>
                    <td><strong>加入OK</strong></td>
                    <td>加入不可</td>
                  </tr>
                  <tr>
                    <th scope="row">補償台数</th>
                    <td><strong>最大3台</strong></td>
                    <td>1台のみ</td>
                  </tr>
                  <tr>
                    <th scope="row">補償期間</th>
                    <td><strong>無期限</strong></td>
                    <td>{appleCareYears}</td>
                  </tr>
                  <tr>
                    <th scope="row">年間補償額</th>
                    <td>最大10万円</td>
                    <td>回数制限あり</td>
                  </tr>
                  <tr>
                    <th scope="row">リンク</th>
                    <td>
                      <a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMXFM+45VK+BW0YB&a8ejpredirect=https%3A%2F%2Fmobile-hoken.com%2Flp%2Ftakumi-wp%2F" className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener" target="_blank" aria-label="モバイル保険の詳細を見る">
                        詳細を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <a href="https://www.apple.com/jp/applecare/" className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener" aria-label="Apple Care+の詳細を見る">
                        詳細を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
