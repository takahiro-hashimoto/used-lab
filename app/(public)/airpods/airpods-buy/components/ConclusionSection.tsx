export default function ConclusionSection() {
  return (
    <section id="how-to" className="l-section">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg">結論：AirPodsを安く買うおすすめの方法</h2>
        <p className="m-section-desc">
          8つの購入方法を比較した結論です。お手軽度・お得度・ポイント還元を一覧で比較できます。
        </p>

        <div className="m-card m-card--shadow m-card--padded" style={{ maxWidth: 900, marginInline: 'auto' }}>
          <div className="buy-method-card__text">
            <p>
              最もお得なのは「<a href="#gift-rebates"><strong>Appleギフトカード × 楽天リーベイツ</strong></a>」でポイントを二重取りする方法。手間はかかりますが、還元率は群を抜いています。
            </p>
            <p>
              手軽さを重視するなら「<a href="#amazon"><strong>Amazon</strong></a>」がおすすめ。セール時の割引に加えて1%以上のポイント還元があり、正規代理店の安心感もあります。
            </p>
            <p>
              新品にこだわらないなら「<a href="#used"><strong>中古ショップ</strong></a>」が最安。型落ちモデルを活用すれば、予算をぐっと抑えられます。
            </p>
          </div>

          <div className="m-card m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>購入方法</th>
                    <th>お手軽度</th>
                    <th>お得度</th>
                    <th>ポイント還元</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="#gift-rebates">ギフトカード×リーベイツ</a></td>
                    <td>★★☆☆☆</td>
                    <td>★★★★★</td>
                    <td>SPU + リーベイツ</td>
                    <td>ポイント二重取りで最安</td>
                  </tr>
                  <tr>
                    <td><a href="#amazon">Amazon</a></td>
                    <td>★★★★☆</td>
                    <td>★★★☆☆</td>
                    <td>1%〜</td>
                    <td>セール割引 + 正規代理店</td>
                  </tr>
                  <tr>
                    <td><a href="#rakuten">楽天市場</a></td>
                    <td>★★★★☆</td>
                    <td>★★★☆☆</td>
                    <td>1〜14倍</td>
                    <td>楽天経済圏なら高還元</td>
                  </tr>
                  <tr>
                    <td><a href="#yahoo">ヤフーショッピング</a></td>
                    <td>★★★★☆</td>
                    <td>★★★☆☆</td>
                    <td>最大22.5%</td>
                    <td>PayPay経済圏向け</td>
                  </tr>
                  <tr>
                    <td><a href="#electronics">家電量販店EC</a></td>
                    <td>★★★★☆</td>
                    <td>★★☆☆☆</td>
                    <td>1%程度</td>
                    <td>正規代理店で安心</td>
                  </tr>
                  <tr>
                    <td><a href="#used">中古ショップ</a></td>
                    <td>★★★★☆</td>
                    <td>★★★★☆</td>
                    <td>-</td>
                    <td>型落ち品が格安で買える</td>
                  </tr>
                  <tr>
                    <td><a href="#costco">コストコ</a></td>
                    <td>★★★☆☆</td>
                    <td>★★★☆☆</td>
                    <td>-</td>
                    <td>会員なら3,000〜6,000円安い</td>
                  </tr>
                  <tr>
                    <td><a href="#apple-store">Appleストア</a></td>
                    <td>★★★★★</td>
                    <td>★☆☆☆☆</td>
                    <td>なし</td>
                    <td>在庫豊富・認定整備済あり</td>
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
