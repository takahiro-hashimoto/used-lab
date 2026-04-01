export default function ComparisonSections() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* OSの違い */}
      <div id="os" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/apple-watch-unlock-macbook.jpg"
            alt="Apple WatchでMacBookをロック解除する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">OSの違い</h3>
          <p className="media-card__desc">
            OSはアプリケーションを動かすための基本ソフトウェアです。OSが異なるため、対応ソフトや操作性などさまざまな箇所に違いが出てきます。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            <strong>Windows</strong>はMicrosoft社が開発。DELL、富士通、LENOVOなど多くのメーカーからPCが販売されており、対応アプリの豊富さや製品の選択肢の多さが強みです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            <strong>Mac</strong>はApple社が開発したmacOSを搭載。OSとハードウェアをすべてApple社が手掛けており、Apple製品同士のスムーズな連携と直感的なUI設計が人気の理由です。
          </p>
        </div>
      </div>

      {/* シェアの違い */}
      <div id="share" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/macboook-share.jpg"
            alt="WindowsとMacのシェア比較"
            className="media-card__img"
            style={{ border: '1px solid var(--color-border, #e0e0e0)' }}
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">シェアの違い</h3>
          <p className="media-card__desc">
            日本国内のパソコンOSシェアはWindowsが約7割と圧倒的です。官公庁や一般企業の多くがWindows環境を標準としており、ビジネス用途ではWindowsが主流です。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            ただし職種単位で見ると割合は変わり、<strong>デザイナーやエンジニアなどクリエイティブ系の職種やIT企業ではMacのシェアが高い</strong>傾向にあります。近年はiPhoneユーザーがMacにも興味を持つケースが増え、個人利用のシェアも緩やかに伸びています。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            シェアが高いOSを選ぶと<strong>周囲に同じOSのユーザーが多く操作を教えてもらいやすい</strong>ほか、対応ソフトやアクセサリーも豊富です。職場や学校の環境も判断材料にしましょう。
          </p>
        </div>
      </div>

      {/* 製品数・価格帯の違い */}
      <div id="price" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-mini-macbook.jpg"
            alt="MacBookとiPad"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">製品数・価格帯の違い</h3>
          <p className="media-card__desc">
            WindowsはDELL、富士通、LENOVO、マウスなど多数のメーカーが製造しており、数万円台の低スペックモデルから数十万円のハイスペックモデルまで幅広い選択肢があります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            一方MacはApple社のみが製造し、ラインナップは10〜20種類前後。全体的にハイスペックで、最安モデルでも15万円前後です。選択肢の多さではWindowsが有利と言えます。
          </p>
        </div>
      </div>

      {/* カスタマイズ性・自由度の違い */}
      <div id="customize" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/pc-custmize_motherboard.webp"
            alt="パソコンのカスタマイズ"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">カスタマイズ性・自由度の違い</h3>
          <p className="media-card__desc">
            WindowsはCPU・メモリ・ストレージなどを細かく選んで購入でき、購入後にメモリやストレージを自分で増設することも可能。カスタマイズ性は非常に高いです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Macも購入時のスペック選択は可能ですが、購入後の増設は基本的にできません。カスタマイズの自由度はWindowsに比べて低いと言えるでしょう。
          </p>
        </div>
      </div>

      {/* 対応ソフト・アプリの違い */}
      <div id="apps" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/macbook-peep-prevention-filter-front-02.jpg"
            alt="対応アプリの違い"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">対応ソフト・アプリの違い</h3>
          <p className="media-card__desc">
            OfficeやAdobeなどのメジャーなソフトは両OSで使用可能です。ただしソフトウェアはWindowsを基準に設計される傾向があり、Windowsのみ対応やMacでは機能制限がある場合もあります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            MacにはOffice互換アプリとして<strong>Numbers（Excel相当）・Pages（Word相当）・Keynote（PowerPoint相当）</strong>が標準搭載されています。ただし互換アプリではレイアウトが崩れることもあるため、仕事でOfficeファイルをやり取りするなら「Office for Mac」を導入するのが無難です。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            どのアプリをメインで使うかを考えた上でOSを選びましょう。
          </p>
        </div>
      </div>

      {/* ゲームプレイについての違い */}
      <div id="game" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/game-pc.webp"
            alt="パソコンゲームのイメージ"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">ゲームプレイについての違い</h3>
          <p className="media-card__desc">
            PCゲームを楽しみたいならWindowsを選びましょう。理由は大きく2つあります。
          </p>

          <ul className="media-card__list" style={{ marginTop: 'var(--space-sm)' }}>
            <li><strong>Windows対応のゲームソフトがMacに比べて圧倒的に多い</strong></li>
            <li><strong>WindowsはGPUやグラフィックボードを独自に拡張しやすい</strong>が、Macでは難しい</li>
          </ul>

          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Macでも仮想環境ソフト（Parallelsなど）でWindows環境を構築できますが、高スペックなMacが必要でコスパが悪いためおすすめしにくいです。
          </p>
        </div>
      </div>

      {/* マウス・トラックパッドの操作性の違い */}
      <div id="operation" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/use-trackpad.webp"
            alt="Macのトラックパッド操作"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">マウス・トラックパッドの操作性の違い</h3>
          <p className="media-card__desc">
            Macのトラックパッドはタップ・スワイプ・ピンチなど豊富なジェスチャーに対応しており、マウスなしでも快適に操作できます。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsのトラックパッドはマウスの補助的な役割にとどまり、基本的にはマウス操作が主です。メーカーにより差はありますが、トラックパッドの満足度はMacが上回る傾向にあります。
          </p>
        </div>
      </div>

      {/* キーボードの違い */}
      <div id="keyboard" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/mx-keys-mini-for-mac-use-03-1024x683.webp"
            alt="キーボードの違い"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">キーボードの違い</h3>
          <p className="media-card__desc">
            WindowsとMacは修飾キーが異なり、ショートカットの組み合わせにも違いがあります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            WindowsPCはメーカーごとにキー配列が異なる場合がありますが、Macは全モデルで配列が統一されています。買い替えても違和感なく使えるのはMacのメリットです。
          </p>

          <dl className="m-card vs-card" style={{ marginTop: 'var(--space-sm)' }}>
            <dt>
              <i className="fa-brands fa-apple" aria-hidden="true"></i>
              Macの修飾キー
            </dt>
            <dd>Command、Option、Control</dd>
            <dt>
              <i className="fa-brands fa-windows" aria-hidden="true"></i>
              Windowsの修飾キー
            </dt>
            <dd>Windows、Alt、Control</dd>
          </dl>
        </div>
      </div>

      {/* デザインの違い */}
      <div id="design" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review-macbook-14inch-2021-logo.jpg"
            alt="Macのデザイン"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">デザインの違い</h3>
          <p className="media-card__desc">
            Macはアルミ削り出しの洗練されたボディが特徴です。薄型・軽量ながら高い剛性を実現しており、装飾を排したシンプルな見た目はカフェや会議室でも映えます。<strong>デザインに惚れ込んで購入するユーザーも多く</strong>、所有する満足感が高いのもMacならではの魅力です。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsはメーカーごとにデザインが大きく異なり、個性的なモデルからアルミ筐体のスタイリッシュなモデルまで多種多様。カラーバリエーションやタッチスクリーン搭載モデル、2in1タイプなど、見た目と使い方の両面で選べる自由度の高さが魅力です。
          </p>
        </div>
      </div>

      {/* データ連携・共有 */}
      <div id="data" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/Anker-620-MagGo-Phone-Grip-glip-02-1024x683.webp"
            alt="Macのデータ連携"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">データ連携・共有</h3>
          <p className="media-card__desc">
            MacはAirDropでiPhoneやiPadへ簡単にデータを送れます。iCloudを使えばメモや書類もデバイス間で即座に同期可能。Apple製品同士のシームレスな連携は大きな強みです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsも「Windowsにリンク」アプリでスマホにデータを送れますが、転送できるデータの種類が限られます。Macに比べるとやや手間が多く、直感的とは言えません。
          </p>
        </div>
      </div>

      {/* リセールバリューの違い */}
      <div id="resale" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/iosis-macbook.webp"
            alt="Macのリセールバリュー"
            className="media-card__img"
            style={{ border: '1px solid var(--color-border, #e0e0e0)', borderRadius: '8px' }}
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">リセールバリューの違い</h3>
          <p className="media-card__desc">
            Macは旧モデルでも中古市場での人気が高く、<strong>購入から数年経っても比較的高い価格で売却できる</strong>のが大きな魅力です。下取りに出せば少ない追加費用で新しいMacに買い替えられるため、長い目で見るとコスパのよい選択と言えます。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            Windowsはハイスペックモデルでも中古だと値段が下がりやすい傾向があります。メーカーやモデルが多いぶん需要が分散し、特定の機種に人気が集中しにくいことが理由のひとつです。逆に言えば、<strong>新品にこだわらなければお手頃価格で高性能なWindows PCを手に入れるチャンス</strong>もあります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            パソコンの買い替えサイクルまで考慮すると、初期費用だけでなくリセールバリューも含めた「実質コスト」で比較するのが賢い選び方です。
          </p>
        </div>
      </div>

      {/* セキュリティ・ウイルス対策の違い */}
      <div id="security" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/macbook-edit.webp"
            alt="セキュリティのイメージ"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">セキュリティ・ウイルス対策の違い</h3>
          <p className="media-card__desc">
            「Macはウイルスに強い」とよく言われますが、<strong>近年はMacを標的にしたマルウェアやフィッシング詐欺も増加</strong>しています。かつてはシェアの低さゆえに狙われにくかっただけです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            macOSにはGatekeeper・XProtect・FileVaultなどのセキュリティ機能が標準で備わっており、初期状態でも一定の安全性があります。WindowsもWindows Defenderの性能が大幅に向上していますが、<strong>シェアが高い分だけ攻撃対象にされやすい</strong>ため、ウイルス対策ソフトを追加するユーザーも多いです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            どちらのOSでも、OSやアプリを常に最新版に保つことが最も重要なセキュリティ対策です。
          </p>
        </div>
      </div>

      {/* バッテリー持ち・省電力性の違い */}
      <div id="battery" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/macbook-image.jpg"
            alt="MacBookのバッテリー"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">バッテリー持ち・省電力性の違い</h3>
          <p className="media-card__desc">
            <strong>MacBookはApple Siliconの採用以降、バッテリー性能が飛躍的に向上</strong>しました。MacBook Airで最大18時間、MacBook Proでは最大24時間駆動と、一日中充電なしで作業できるレベルです。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            WindowsノートPCのバッテリー駆動時間はモデルによりさまざまですが、同価格帯で比較するとMacBookが優れるケースが多いです。外出先で長時間作業したい方はバッテリー性能を重視しましょう。
          </p>
        </div>
      </div>

      {/* 寿命・耐用年数の違い */}
      <div id="lifespan" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review-macbook-14inch-2021-summary.jpg"
            alt="MacBook Proの外観"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">寿命・耐用年数の違い</h3>
          <p className="media-card__desc">
            一般的にWindowsは3〜5年、Macは5〜7年が寿命の目安です。<strong>AppleはOSとハードウェアを一体設計しているため、古いモデルでも最適化されたパフォーマンスを維持しやすい</strong>のが長寿命の理由です。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            OSサポート期間も異なります。macOSは発売から約6〜7年間アップデートが提供されますが、Windowsはバージョンにより変動します。Windows 10は2025年10月にサポート終了予定で、Windows 11にはハードウェア要件を満たす必要があります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            どちらのOSでも<strong>購入時のスペックに余裕を持たせる</strong>ことが寿命を延ばすコツです。
          </p>
        </div>
      </div>

      {/* サポート体制の違い */}
      <div id="support" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/apple-store.jpg"
            alt="Apple Storeの外観"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">サポート体制の違い</h3>
          <p className="media-card__desc">
            MacはApple Store内の「Genius Bar」で専門スタッフに直接相談でき、電話やチャットサポートも充実。<strong>サポートが一元化されている</strong>のは初心者にとって安心です。AppleCare+に加入すれば修理費用も大幅に抑えられます。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            WindowsはOSサポートがMicrosoft、ハードウェアは各メーカーと問い合わせ先が分かれます。大手メーカーは手厚いサポートがありますが、格安モデルでは限定的な場合も。<strong>メーカーのサポート体制や保証内容を確認した上で購入</strong>しましょう。
          </p>
        </div>
      </div>

      {/* Apple Silicon（Mチップ）と性能面の違い */}
      <div id="chip" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/m2.webp"
            alt="Apple Silicon M2チップ"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">Apple Silicon（Mチップ）と性能面の違い</h3>
          <p className="media-card__desc">
            2020年以降のMacにはApple独自の「Apple Silicon（M1〜M4チップ）」を搭載。CPUとGPUを統合したSoC設計により、<strong>高い処理性能と省電力を両立</strong>しています。動画編集や画像処理でも発熱が少なく、ファンレスで動作するモデルもあります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            WindowsはIntel・AMD・Qualcommなど複数メーカーのCPUから選択可能。ハイエンドのIntel Core UltraやAMD Ryzenは、マルチコア性能やGPU拡張性でMacを上回る場面もあります。
          </p>
          <p className="media-card__desc" style={{ marginTop: 'var(--space-sm)' }}>
            <strong>日常作業や動画編集ではApple Siliconのコスパが非常に高く</strong>、3Dレンダリングなど特殊な用途ではWindows＋高性能GPUが有利です。
          </p>
          <p className="lead-link" style={{ marginTop: 'var(--space-sm)' }}>
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            Apple Siliconの性能をより詳しく知りたい方は「<a href="/macbook/benchmark/">MacBookベンチマークスコア比較</a>」もあわせてご覧ください。
          </p>
        </div>
      </div>



    </div>
  )
}
