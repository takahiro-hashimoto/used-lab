// Amazon整備済み品の解説セクション（メリット / 違い / チェックポイント）
// 見出し・表・本文はすべてサイト既存クラスを使用（新規CSSなし）

export default function AmazonRenewedGuide() {
  return (
    <>
      {/* ── メリット ── */}
      <section className="l-section" id="merit" aria-labelledby="heading-merit">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
            「Amazon整備済み品」3つのメリット
          </h2>
          <p className="m-section-desc">Amazon整備済み品は、検査・修理・クリーニング・テストを経たApple製品を、Amazon認定の出品者が販売する仕組み。</p>
          <p className="m-section-desc">ここではAmazon整備済み品の3つのメリットをご紹介します。</p>
          <div className="glossary-box m-card m-card--shadow u-mb-2xl">
            <dl className="glossary-list">
              <div className="glossary-item">
                <dt className="glossary-item-title">Apple公式より安い！新品定価からの「お得度」が魅力</dt>
                <dd className="glossary-item-desc">
                  整備済み品は新品の定価よりも割安に設定されていることが多く、型落ちモデルや人気機種を相場より安く手に入れられます。同じ整備済みでもApple公式整備済製品より価格が抑えめなケースが多く、コスパを重視する人に向いています。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">180日間の返品・交換保証付きで、一般的な中古より安心</dt>
                <dd className="glossary-item-desc">
                  Amazon整備済み品には<strong>最低180日の出品者保証</strong>が付きます。購入から180日以内に正常に動作しない場合、認定出品者が交換または返金に対応します。保証が短い・無い個人売買やフリマと違い、初めての中古でも安心して選べます。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">バッテリー容量80%以上保証＆クリーニング済み</dt>
                <dd className="glossary-item-desc">
                  出品される製品は<strong>バッテリー容量80%以上</strong>・完全動作で、クリーニングと工場出荷時設定への初期化が済んでいます。付属品は互換性のある同等品または純正品（充電器はPSE認証済み、ケーブルはMFi認定済み。ヘッドフォンは付属しません）。外観は「非常に良い／良い／可」の3段階に分類されています。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── 違い・比較 ── */}
      <section className="l-section" id="diff" aria-labelledby="heading-diff">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-diff">
            Apple公式整備済製品との違いを比較
          </h2>
          <p className="m-section-desc">同じ「整備済み」でも、Apple公式整備済製品とは整備元・保証・価格・状態が異なります。</p>
          <p className="m-section-desc">両者の違いを比較表で整理しました。</p>

          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">項目</th>
                    <th scope="col">Amazon整備済み品</th>
                    <th scope="col">Apple公式整備済製品</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">整備元</th>
                    <td>Amazon認定の出品者（メーカー・専門業者）</td>
                    <td>Apple自身</td>
                  </tr>
                  <tr>
                    <th scope="row">価格</th>
                    <td>安め（新品定価より割安なことが多い）</td>
                    <td>中間（新品の数%〜15%程度引き）</td>
                  </tr>
                  <tr>
                    <th scope="row">保証</th>
                    <td>最低180日（出品者保証）</td>
                    <td>1年（AppleCare+加入も可）</td>
                  </tr>
                  <tr>
                    <th scope="row">バッテリー</th>
                    <td>容量80%以上</td>
                    <td>新品同等</td>
                  </tr>
                  <tr>
                    <th scope="row">付属品・箱</th>
                    <td>互換品の場合あり（認証済み）／元箱または無地箱</td>
                    <td>純正・新品同様／専用の白箱</td>
                  </tr>
                  <tr>
                    <th scope="row">在庫</th>
                    <td>機種・タイミングで変動</td>
                    <td>変動が大きく人気品はすぐ完売</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 注意点・デメリット ── */}
      <section className="l-section" id="cons" aria-labelledby="heading-cons">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-cons">
            購入前に知っておきたい注意点
          </h2>
          <p className="m-section-desc">価格の安さが魅力のAmazon整備済み品ですが、Apple公式整備済製品とは異なる弱点もあります。</p>
          <p className="m-section-desc">納得して選ぶために、次の3点は事前に押さえておきましょう。</p>
          <div className="glossary-box m-card m-card--shadow u-mb-2xl">
            <dl className="glossary-list">
              <div className="glossary-item">
                <dt className="glossary-item-title">品質に個体差がある（整備基準は出品者によって異なる）</dt>
                <dd className="glossary-item-desc">
                  整備を行うのはAmazon認定の第三者業者で、整備基準はApple公式ほど統一されていません。外観や状態に個体差が出ることがあるため、コンディション表記と出品者の評価をよく確認してから購入しましょう。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">バッテリーの正確な容量は購入前に分からない</dt>
                <dd className="glossary-item-desc">
                  バッテリーは「容量80%以上」が保証されていますが、具体的な数値（例：85%か95%か）は商品ページに記載されず、購入前に確認できません。バッテリーの状態を重視する場合は、この点を理解したうえで選ぶ必要があります。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">AppleCare+には加入できない</dt>
                <dd className="glossary-item-desc">
                  Apple公式の整備品ではないため、AppleCare+を追加することはできません。保証は出品者による最低180日保証が中心となります。長期保証や手厚いサポートを求める場合は、Apple公式整備済製品の方が安心です。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── チェックポイント ── */}
      <section className="l-section" id="check" aria-labelledby="heading-check">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-check">
            Amazon整備済み品で賢く買い物をするためのポイント
          </h2>
          <p className="m-section-desc">購入前に押さえておきたい3つのチェックポイントをまとめました。</p>
          <p className="m-section-desc">これだけ確認しておけば、整備済み品選びで失敗しにくくなります。</p>


          <div className="glossary-box m-card m-card--shadow u-mb-2xl">
            <dl className="glossary-list">
              <div className="glossary-item">
                <dt className="glossary-item-title">①「180日保証」の適用条件と返品方法を確認しておく</dt>
                <dd className="glossary-item-desc">
                  購入前に、商品ページの保証内容と返品手順に目を通しておきましょう。180日保証は出品者保証で、不具合時は交換または返金の対象です。Amazonの返品ポリシーやマーケットプレイス保証も併用できるため、いざという時の連絡先（出品者／Amazonカスタマーサービス）を把握しておくと安心です。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">② 発送元・出品者が「Amazon」または「評価の高い販売業者」かチェック</dt>
                <dd className="glossary-item-desc">
                  同じ整備済み品でも出品者によって対応品質は変わります。発送元がAmazon（プライム対象）か、出品者の評価が高く件数が十分にあるかを確認しましょう。レビューで「状態」「対応」への評価を見ておくと、ハズレを避けやすくなります。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">③ セール時期（プライムデー等）のポイント還元を狙う</dt>
                <dd className="glossary-item-desc">
                  プライムデーやブラックフライデー、年末年始などのセール時期は、整備済み品も値引きやポイント還元の対象になりやすいタイミングです。急ぎでなければ、セールに合わせて購入すると実質価格をさらに抑えられます。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
