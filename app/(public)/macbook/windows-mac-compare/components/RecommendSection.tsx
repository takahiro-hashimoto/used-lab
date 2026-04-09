export default function RecommendSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          MacとWindowsそれぞれどんな方におすすめ？
        </h2>
        <p className="m-section-desc">
          これまでの比較を踏まえて、両者がそれぞれどんな方に向いているかをまとめます
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Windowsがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">Windowsがおすすめな人</h3>
            <div className="m-card u-mt-sm" style={{ padding: 'var(--space-lg)' }}>
              <ul className="info-card__list">
                <li>Officeツールの使用頻度が高いビジネス職の人</li>
                <li>豊富な選択肢の中からパソコンを選びたい人</li>
                <li>パソコンのカスタマイズを自由に行いたい人</li>
                <li>ゲームプレイを楽しみたい人</li>
              </ul>
            </div>
            <p className="media-card__desc u-mt-sm">
              仕事でOfficeツールをよく使ったり、一緒に仕事をする人にWindowsユーザーが多い場合はWindows PCを選ぶとファイル共有などで困ることが少ないです。目的と予算に合ったパソコンを選びやすく、購入後のカスタマイズの幅が広いのも魅力。<strong>ゲーミングPCが欲しい場合は対応ソフトが圧倒的に多いWindows PC一択</strong>です。
            </p>
          </div>

          {/* Macがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">Macがおすすめな人</h3>
            <div className="m-card u-mt-sm" style={{ padding: 'var(--space-lg)' }}>
              <ul className="info-card__list">
                <li>デザイナーやプログラマーなどの職業の人</li>
                <li>シンプルな使い勝手のパソコンが欲しい人</li>
                <li>パソコン選びに自信がなく、無難なPCが欲しい人</li>
                <li>iPhoneやiPadなどApple製品をお持ちの方</li>
              </ul>
            </div>
            <p className="media-card__desc u-mt-sm">
              デザイナーやプログラマーなどクリエイティブ系の職業の方や、これからクリエイティブ系の仕事を目指す学生の方にはMacがおすすめです。
            </p>

            <dl className="glossary-box m-card u-mt-sm">
              <div className="glossary-item">
                <dt className="glossary-item-title">デザイナーにMacが親しまれる理由</dt>
                <dd className="glossary-item-desc">
                  標準搭載フォントが豊富でDTP主流フォントも最初から使える。ディスプレイの色再現性が高く、印刷物の仕上がりをイメージしやすい。周りにMacユーザーが多くデータの受け渡しがしやすい。
                </dd>
              </div>
              <div className="glossary-item">
                <dt className="glossary-item-title">プログラマーにMacが親しまれる理由</dt>
                <dd className="glossary-item-desc">
                  UNIXコマンドがすぐに使え開発環境を整えやすい。iPhoneアプリ開発に必須の「Xcode」が使えるのはMacのみ。トラックパッドの操作性が高く作業が捗る。
                </dd>
              </div>
            </dl>

            <p className="media-card__desc u-mt-sm">
              またMacBookは製品ラインナップが絞られており、一番安価なMacBook Airを購入してもそこそこハイスペックなモデルです。<strong>パソコン選びに自信がなく失敗しない一台がほしい方</strong>にもおすすめ。ある程度のスペックがあるので、後から動画編集などの重い作業を始めたくなっても買い替えなしで対応できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
