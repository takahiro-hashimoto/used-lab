export default function FaqSection() {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
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
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                iPadとノートPCに使用されてるOSは別物で、使用できるアプリの数や幅に違いがあるため完全に代用することは難しいです。詳しく知りたい方は「<a href="/macbook/ipad-macbook-compare/">MacBookとiPadどっちを買うおすすめ？</a>」をご覧ください。
              </p>
            </div>
          </div>

          {/* Q2 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">Wi-Fiモデルとセルラーモデルの違いはなんですか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                セルラーモデルの場合、SIMカードを挿すことでどこでもネット接続が行えますが、Wi-FiモデルはWi-Fi環境がある場所でしかネット接続ができません。詳しくは「<a href="/ipad/wifi-cellular/">iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？</a>」にて解説しています。
              </p>
            </div>
          </div>

          {/* Q3 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadはどんな風に選ぶと失敗がないですか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                動画や電子書籍の視聴などインプット作業が多めならiPad（無印）やiPad mini、ノートの記入や写真編集のようにアウトプット作業が多めならiPad ProやiPad Airがおすすめです。
              </p>
            </div>
          </div>

          {/* Q4 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadの各シリーズにはどんな違いがありますか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                iPadの違いに関しては<a href="/ipad/ipad-spec-table/">歴代iPadのスペック比較</a>で詳しく解説しているのでぜひチェックしてみてください。
              </p>
            </div>
          </div>

          {/* Q5 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">iPadのストレージ容量はどれくらい必要ですか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                動画視聴や電子書籍がメインなら64GB〜128GBで十分です。写真・動画編集やイラスト制作など大容量データを扱う場合は256GB以上がおすすめ。USB-C対応モデルなら外部ストレージも活用できるため、本体容量を抑えるという選択肢もあります。
              </p>
            </div>
          </div>

          {/* Q6 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">Apple PencilはどのiPadに対応していますか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                Apple Pencilは世代やモデルによって対応するiPadが異なります。最新のApple Pencil ProはM4 iPad ProやM2以降のiPad Airに対応。第1世代・第2世代・USB-Cモデルもそれぞれ対応機種が違うため、購入前に必ず確認しましょう。詳しくは「<a href="/ipad/apple-pencil-compare/">Apple Pencilの違い</a>」で解説しています。
              </p>
            </div>
          </div>

          {/* Q7 */}
          <div className="faq-item m-card m-card--shadow">
            <h3 className="faq-question">中古や整備済製品のiPadでも快適に使えますか？</h3>
            <div className="faq-answer m-rich-text m-rich-text--muted">
              <p>
                はい、iPadOSのサポート対象モデルであれば中古でも快適に使えます。特にM1チップ以降を搭載したモデルは処理性能に余裕があり、ステージマネージャーやApple Intelligenceなどの最新機能にも対応しています。中古品を選ぶ際はバッテリーの状態やAirDropなどの機能が正常に動作するかを確認しましょう。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
