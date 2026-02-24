export default function ComparisonSections() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* OSの違い */}
      <div id="os" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/use-macbook.jpg"
          alt="MacBookを操作する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">OSの違い</h3>
          <p className="popular-card-desc">
            OSはシステム全体を管理し、さまざまなアプリケーションを動かすための最も基本的なソフトウェアです。これが異なるため、後述する対応ソフトや操作性などさまざまな箇所に違いが出てきます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            <strong>Windows</strong>はMicrosoft社が開発したWindowsシリーズをOSとして搭載。DELL、SONY、富士通、LENOVOなどさまざまなメーカーからパソコンが製造・販売されており、対応アプリの豊富さや製品の選択肢の多さが強みです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            <strong>Mac</strong>はApple社が開発したmacOSを搭載。OSとPC本体の製造がすべてApple社で行われており、Apple製品同士のスムーズな連携が強みです。直感的に操作できるシンプルなUI設計も人気の理由のひとつです。
          </p>
        </div>
      </div>

      {/* シェアの違い */}
      <div id="share" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/iphone-image.jpg"
          alt="WindowsとMacのシェア比較"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">シェアの違い</h3>
          <p className="popular-card-desc">
            統計データによると、日本国内のパソコンOSシェアはWindowsユーザーが約7割を占めており、圧倒的に高いことがわかります。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            ただし、会社や職種単位で見るとシェアの割合は変わってきます。<strong>デザイナーやエンジニアなど、クリエイティブ系の職種やIT企業ではMacのシェアが高い</strong>傾向にあります。
          </p>
        </div>
      </div>

      {/* 製品数・価格帯の違い */}
      <div id="price" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-mini-macbook.jpg"
          alt="MacBookとiPad"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">製品数・価格帯の違い</h3>
          <p className="popular-card-desc">
            Windows OSを搭載しているパソコンはMicrosoft以外にもDELL、SONY、富士通、LENOVO、マウスなどさまざまなメーカーで製造されています。そのため、数万円台で買える低スペックモデルから数十万円のハイスペックモデルまで幅広い選択肢があり、予算に見合ったモデルを購入しやすいです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            一方、macOSを搭載しているパソコンはApple社のみで製造されており、製品ラインナップも10〜20種類前後とかなり絞られています。基本的にハイスペックなモデルが多く、一番安いモデルでも15万円前後の価格です。購入するパソコンの選択肢はWindowsのほうが豊富と言えます。
          </p>
        </div>
      </div>

      {/* カスタマイズ性・自由度の違い */}
      <div id="customize" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-pro-use.jpg"
          alt="パソコンのカスタマイズ"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">カスタマイズ性・自由度の違い</h3>
          <p className="popular-card-desc">
            WindowsはCPU、メモリ、ストレージ、無線LANの有無などさまざまな要素を細かくカスタマイズして購入することが可能です。また、購入後に使用感に不満が出てきたらメモリやストレージを自分で増設することもできるので、非常にカスタマイズ性が高いと言えます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Macも購入時にある程度スペックをカスタマイズして注文することは可能ですが、購入後にメモリやストレージを自分で増設することは基本的にできません。買った後に不満が出てもカスタマイズができないため、カスタマイズ性・自由度はWindowsに比べて低いと言えるでしょう。
          </p>
        </div>
      </div>

      {/* 対応ソフト・アプリの違い */}
      <div id="apps" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-split-view.jpg"
          alt="対応アプリの違い"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">対応ソフト・アプリの違い</h3>
          <p className="popular-card-desc">
            OfficeやAdobeなどのメジャーなアプリ・ソフトウェアは基本的にWindows、MacどちらのOSでも使用できます。ただし、ソフトウェアはシェアの高いWindowsを基準に設計される傾向が強く、中にはWindowsのみ対応だったり、Macでは機能が制限されている場合もあります。
          </p>

          <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-solid fa-circle-info" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              Mac標準搭載のOffice互換アプリ
            </p>
            <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
              <li>Excel → <strong>Numbers</strong></li>
              <li>Word → <strong>Pages</strong></li>
              <li>PowerPoint → <strong>Keynote</strong></li>
            </ul>
            <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
              互換アプリは便利な存在ですが、ファイルを開くとレイアウトが崩れることもあります。OfficeファイルをMacで扱うなら「Office for Mac」を使うのが無難です。
            </p>
          </div>

          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            パソコンを購入する際は具体的にどのようなアプリをメインで使うかをしっかり考えた上で必要なOSを選びましょう。
          </p>
        </div>
      </div>

      {/* ゲームプレイについての違い */}
      <div id="game" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-md-clock.jpg"
          alt="パソコンゲームのイメージ"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">ゲームプレイについての違い</h3>
          <p className="popular-card-desc">
            パソコンでゲームをプレイしたい場合はWindowsを選択しましょう。理由は大きく2つあります。
          </p>

          <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
            <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'decimal' }}>
              <li><strong>Windows対応のゲームソフトの数がMacに比べて圧倒的に多い</strong></li>
              <li><strong>WindowsはGPUやグラフィックボードを独自に拡張しやすい</strong>が、Macでは難しい</li>
            </ul>
          </div>

          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Macでも仮想環境ソフト（Parallelsなど）を使えばWindows環境を構築できますが、高いスペックのMacが必要になるためコスパが悪く、あまりおすすめできる選択肢ではありません。
          </p>
        </div>
      </div>

      {/* マウス・トラックパッドの操作性の違い */}
      <div id="operation" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/magic-keyboarda.jpg"
          alt="Macのトラックパッド操作"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">マウス・トラックパッドの操作性の違い</h3>
          <p className="popular-card-desc">
            Macのトラックパッドはタップ、スワイプ、ピンチなどさまざまなジェスチャー機能が搭載されており、直感的なアプリ操作が可能です。出先のカフェなどでマウスがなくても困るシーンはほとんどありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            一方Windowsのトラックパッドはあくまでもマウスの補助的な役割にとどまり、基本的にはマウス操作が主となります。もちろんメーカーによって使用感はさまざまなので一概には言えませんが、トラックパッドの満足度はMacのほうが高いと考えてよいでしょう。
          </p>
        </div>
      </div>

      {/* キーボードの違い */}
      <div id="keyboard" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/use-macbook.jpg"
          alt="キーボードの違い"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">キーボードの違い</h3>
          <p className="popular-card-desc">
            WindowsとMacのキーボードは修飾キーが異なるのが特徴です。これによってショートカットキーの組み合わせなどに違いが出てきます。
          </p>

          <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <p style={{ fontWeight: 700 }}>
                <i className="fa-brands fa-apple" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                Macの修飾キー
              </p>
              <p className="popular-card-desc">Command、Option、Control</p>
            </div>
            <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
            <div>
              <p style={{ fontWeight: 700 }}>
                <i className="fa-brands fa-windows" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                Windowsの修飾キー
              </p>
              <p className="popular-card-desc">Windows、Alt、Control</p>
            </div>
          </div>

          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            WindowsPCはメーカーごとにキー配列に差がある場合がありますが、Macはキーボード配列が統一されています。新しいMacに買い替えても違和感なく使えるのはMacのメリットです。
          </p>
        </div>
      </div>

      {/* デザインの違い */}
      <div id="design" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-11-pro-m4-15.jpg"
          alt="Macのデザイン"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">デザインの違い</h3>
          <p className="popular-card-desc">
            Macといえばアルミ削り出しの洗練されたボディが印象的です。薄く軽量で強度のあるノートPCを作るために一枚のアルミ厚板を削り出したのが始まりで、今ではiMacやMac miniなどの筐体にも採用されています。装飾が少なくシンプルな見た目が特徴で、デザインに惚れ込んで購入するユーザーも多数います。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsはさまざまなメーカーから販売されているため、デザインもメーカーによって大きく異なります。個性的なモデルからMacと同じくアルミ削り出しのスタイリッシュなモデルまで多種多様。見た目の好みで選べる自由度の高さがWindowsの魅力です。
          </p>
        </div>
      </div>

      {/* データ連携・共有 */}
      <div id="data" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/apple-watch-image.jpg"
          alt="Macのデータ連携"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">データ連携・共有</h3>
          <p className="popular-card-desc">
            MacはAirDropを使うことでiPhoneやiPadなどのデバイスに簡単に写真や動画などのデータを送ることができます。またiCloudを利用すればMacで書いたテキストメモをすぐにスマホから編集・チェックすることも可能。ハードからソフトまですべて一社で手掛けているAppleだからこそ実現できるデバイス間連携は非常に使い勝手がよいです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsも「Windowsにリンク」アプリを使えばAndroidやiPhoneにデータを送ることができますが、転送できるデータの種類が限られます。サードパーティ製のファイル転送ソフトを使う手もありますが、Macに比べるとやや手間が多く直感的とは言えません。
          </p>
        </div>
      </div>

      {/* リセールバリューの違い */}
      <div id="resale" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="Macのリセールバリュー"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">リセールバリューの違い</h3>
          <p className="popular-card-desc">
            Macは旧モデルになっても人気が高く、中古市場での需要が安定しています。初期費用はWindowsより高く感じるかもしれませんが、古くなったPCを下取りに出せば、そこまでお金をかけずに新しいPCに買い替えることができるのが魅力です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            逆にWindowsはハイスペックなパソコンでも中古だと値段が下がりやすい傾向があります。新品にこだわらなければ、使い勝手のよいWindows PCをお手頃価格で手に入れられる可能性もあります。
          </p>
        </div>
      </div>
    </div>
  )
}
