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
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-mini-macbook.jpg"
              alt="Windowsがおすすめな人"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">Windowsがおすすめな人</h3>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>Officeツールの使用頻度が高いビジネス職の人</li>
                  <li>豊富な選択肢の中からパソコンを選びたい人</li>
                  <li>パソコンのカスタマイズを自由に行いたい人</li>
                  <li>ゲームプレイを楽しみたい人</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
                仕事でOfficeツールをよく使ったり、一緒に仕事をする人にWindowsユーザーが多い場合はWindows PCを選ぶとファイル共有などで困ることが少ないです。目的と予算に合ったパソコンを選びやすく、購入後のカスタマイズの幅が広いのも魅力。<strong>ゲーミングPCが欲しい場合は対応ソフトが圧倒的に多いWindows PC一択</strong>です。
              </p>
            </div>
          </div>

          {/* Macがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/use-macbook.jpg"
              alt="Macがおすすめな人"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">Macがおすすめな人</h3>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>デザイナーやプログラマーなどの職業の人</li>
                  <li>シンプルな使い勝手のパソコンが欲しい人</li>
                  <li>パソコン選びに自信がなく、無難なPCが欲しい人</li>
                  <li>iPhoneやiPadなどApple製品をお持ちの方</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
                デザイナーやプログラマーなどクリエイティブ系の職業の方や、これからクリエイティブ系の仕事を目指す学生の方にはMacがおすすめです。
              </p>

              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                    <i className="fa-solid fa-palette" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    デザイナーにMacが親しまれる理由
                  </p>
                  <p className="popular-card-desc">
                    標準搭載フォントが豊富でDTP主流フォントも最初から使える。ディスプレイの色再現性が高く、印刷物の仕上がりをイメージしやすい。周りにMacユーザーが多くデータの受け渡しがしやすい。
                  </p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                    <i className="fa-solid fa-code" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    プログラマーにMacが親しまれる理由
                  </p>
                  <p className="popular-card-desc">
                    UNIXコマンドがすぐに使え開発環境を整えやすい。iPhoneアプリ開発に必須の「Xcode」が使えるのはMacのみ。トラックパッドの操作性が高く作業が捗る。
                  </p>
                </div>
              </div>

              <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
                またMacBookは製品ラインナップが絞られており、一番安価なMacBook Airを購入してもそこそこハイスペックなモデルです。<strong>パソコン選びに自信がなく失敗しない一台がほしい方</strong>にもおすすめ。ある程度のスペックがあるので、後から動画編集などの重い作業を始めたくなっても買い替えなしで対応できます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
