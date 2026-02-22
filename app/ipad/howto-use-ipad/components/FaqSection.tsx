export default function FaqSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          iPadの使い道に関するよくある質問
        </h2>
        <p className="m-section-desc">
          iPadの購入を検討している方から寄せられる、よくある疑問にお答えします。
        </p>

        <div className="faq-list">

          {/* Q1 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadはノートPC代わりになりますか？</h3>
            <div className="faq-answer">
              <p>
                iPadとノートPCに使用されてるOSは別物で、使用できるアプリの数や幅に違いがあるため完全に代用することは難しいです。詳しく知りたい方は「<a href="/macbook/ipad-macbook-compare/">MacBookとiPadどっちを買うおすすめ？</a>」をご覧ください。
              </p>
            </div>
          </div>

          {/* Q2 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">Wi-Fiモデルとセルラーモデルの違いはなんですか？</h3>
            <div className="faq-answer">
              <p>
                セルラーモデルの場合、SIMカードを挿すことでどこでもネット接続が行えますが、Wi-FiモデルはWi-Fi環境がある場所でしかネット接続ができません。詳しくは「<a href="/ipad/wifi-cellular/">iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？</a>」にて解説しています。
              </p>
            </div>
          </div>

          {/* Q3 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadはどんな風に選ぶと失敗がないですか？</h3>
            <div className="faq-answer">
              <p>
                動画や電子書籍の視聴などインプット作業が多めならiPad（無印）やiPad mini、ノートの記入や写真編集のようにアウトプット作業が多めならiPad ProやiPad Airがおすすめです。
              </p>
            </div>
          </div>

          {/* Q4 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadの各シリーズにはどんな違いがありますか？</h3>
            <div className="faq-answer">
              <p>
                iPadの違いに関しては<a href="/ipad/ipad-spec-table/">歴代iPadのスペック比較</a>で詳しく解説しているのでぜひチェックしてみてください。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
