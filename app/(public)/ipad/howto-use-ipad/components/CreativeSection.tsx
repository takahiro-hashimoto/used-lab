export default function CreativeSection() {
  return (
    <section className="l-section" id="creative" aria-labelledby="heading-creative">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-creative">
          iPadがあればできること【クリエイティブ編】
        </h2>
        <p className="m-section-desc">
          iPadはクリエイティブな活動とも、相性が良いデバイスです。<br />
          最後にこの章では、iPadのクリエイティブな利用方法を5つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 19. 動画編集をする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-video-editing.jpg"
              alt="iPadで動画編集する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">動画編集をする</h3>
              <p className="popular-card-desc">
                iPadは映像編集デバイスとしても非常に優秀です。スマホでは厄介な「テロップの位置調整」や「細かなトリミング」も、iPadの大画面なら誤操作のストレスなく進められます。
              </p>
              <p className="popular-card-desc">
                PCほど学習コストがかからず、直感的に指で操れるため、初心者でもすぐに作業に慣れることができます。
              </p>
              <p className="popular-card-desc">
                最初からApple純正の「iMovie」がプリインストールされているのもポイント。スライドショーや基本的なテロップ入れ程度なら、有料アプリを買わずにすぐ始められるのもiPadならではのメリットです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの映像編集アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/imovie/id377298193" target="_blank" rel="noopener">iMovie</a></li>
                  <li><a href="https://apps.apple.com/jp/app/lumafusion/id1062022008" target="_blank" rel="noopener">LumaFusion</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 20. 写真編集する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-use-image-white-4.jpg"
              alt="iPadでLightroomを操作する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">写真編集する</h3>
              <p className="popular-card-desc">
                iPadではAdobe LightroomやPhotoshopなどの定番ソフトを使用できます。各種パラメータをタッチ操作で直感的に調整できるため、PCよりも手軽に自分好みの写真へ仕上げられるのが魅力です。
              </p>
              <p className="popular-card-desc">
                また、撮影した写真をその場ですぐに編集してシェアできる機動力もiPadならでは。このフットワークの軽さは、場所を選ばずクリエイティブを楽しみたい方にとって、重いPCにはない強力な武器になります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの写真編集アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/us/app/lightroom-photo-video-editor/id878783582" target="_blank" rel="noopener">Lightroom</a></li>
                  <li><a href="https://apps.apple.com/jp/app/affinity-photo-2-ipad%E7%89%88/id1616823773" target="_blank" rel="noopener">Affinity Photo 2 for iPad</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 21. イラストを書く */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/how-to-use-ipad-min-sketch.jpg"
              alt="Apple Pencilでイラストを書く様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">イラストを書く</h3>
              <p className="popular-card-desc">
                iPadとApple Pencilを組み合わせれば、場所を選ばず本格的なイラスト制作が楽しめます。
              </p>
              <p className="popular-card-desc">
                アプリも非常に充実していますが、まずは無料で多機能な「MediBang Paint（メディバンペイント）」がおすすめ。初心者でも使いやすく、App Storeでも高い人気を誇る定番アプリです。
              </p>
              <p className="popular-card-desc">
                注意したいのが、書き心地を左右する「リフレッシュレート」の違いです。<strong>120Hz駆動に対応したiPad Proは、60HzのiPad Airなどと比べてペン先の遅延が圧倒的に少なく</strong>、より紙に近い滑らかな描き心地を実現しています。
              </p>
              <p className="popular-card-desc">
                なおiPadによって対応しているApple Pencilは異なります。<a href="/ipad/apple-pencil-compare/">Apple Pencilの違い</a>などの情報もチェックして自分に合う機種を選びましょう。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのイラストアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://medibangpaint.com/" target="_blank" rel="noopener">MediBang Paint</a></li>
                  <li><a href="https://www.clipstudio.net/ja/" target="_blank" rel="noopener">クリップスタジオ</a></li>
                  <li><a href="https://procreate.com/jp" target="_blank" rel="noopener">プロクリエイト</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 22. モデリングをする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/G8qw3UXbQAACat7.jpg"
              alt="iPadでモデリングする様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">モデリングをする</h3>
              <p className="popular-card-desc">
                iPadとApple Pencilの組み合わせは、3Dプリンター用のデータ作成とも非常に相性が良いです。PCのCADソフトは習得に時間がかかりますが、iPadなら直感的な操作でアイデアを素早く形にできます。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>Shapr3D</p>
                  <p className="popular-card-desc">Apple Pencilに最適化された3DCADアプリ。図面を描くような感覚で精密なモデリングが可能で、3Dプリンター用の出力もスムーズに行えます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>Nomad Sculpt</p>
                  <p className="popular-card-desc">粘土をこねるように造形できるスカルプトアプリ。フィギュアなどの有機的な形状作りに最適で、ペン先でなぞるだけで直感的なディテールの作り込みが可能です。</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                作成したモデルをAR（拡張現実）で実寸表示し、プリント前にサイズ感を確認できるのもiPadならではの強み。趣味の造形から実用パーツ作成まで、3Dプリンターをフル活用したい方にとってiPadは最強のパートナーになります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのモデリングアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/shapr3d-cad-modeling/id1091675242" target="_blank" rel="noopener">Shapr3D</a></li>
                  <li><a href="https://apps.apple.com/jp/app/nomad-sculpt/id1519508656" target="_blank" rel="noopener">Nomad Sculpt</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 23(番外). カメラでテザー撮影する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/shooting-camera.jpg"
              alt="カメラでテザー撮影する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">カメラでテザー撮影する</h3>
              <p className="popular-card-desc">
                iPadはカメラのテザー撮影にも使用することができます。テザー撮影とはカメラとタブレットやPCをつないでリアルタイムに写真をチェックしながら撮影する手法で、下記のようなメリットがあります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>ピンボケに気付きやすい</li>
                  <li>明るさを調整しやすい</li>
                  <li>iPadに直接写真が保存されるから編集効率が上がる</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                ノートPCでもテザー撮影はできるのですが、どうしても機動性がいまいち。iPadなら、どこでも身軽にテザー撮影を行うことができるので、外で写真を撮る方なんかに特におすすめです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのテザー撮影用アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/imaging-edge-mobile/id489191124" target="_blank" rel="noopener">SONY Imaging Edge</a></li>
                  <li><a href="https://apps.apple.com/jp/app/fujifilm-camera-remote/id793063045" target="_blank" rel="noopener">FUJIFILM Camera Remote</a></li>
                  <li><a href="https://www.captureone.com/ja/products/capture-one-for-ipad" target="_blank" rel="noopener">Capture One for iPad</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
