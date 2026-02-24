export default function ComparisonBasics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* ファイル管理 */}
      <div id="file-management" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">ファイル管理</h3>
          <p className="popular-card-desc">
            macOSではフォルダの移動はドラッグ&ドロップ、ファイルのコピーは「Command+C」のショートカットで簡単に行うことができます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            一方iPadOSでは、上記のようなファイル操作をmacOSほどシンプルに行うことができません。また、macOSのほうがファイルの階層構造がわかりやすく必要なファイルにアクセスしやすいので、<strong>ファイル管理という点ではmacOSが操作しやすい</strong>と言えます。
          </p>
        </div>
        <div className="popular-card-img-grid">
          <figure>
            <img src="/images/content/use-macbook.jpg" alt="MacBookのファイル管理方法" loading="lazy" />
            <figcaption>MacBookのファイル管理方法</figcaption>
          </figure>
          <figure>
            <img src="/images/content/ipad-pro-use.jpg" alt="iPadのファイル管理方法" loading="lazy" />
            <figcaption>iPadのファイル管理方法</figcaption>
          </figure>
        </div>
      </div>

      {/* マルチタスク機能 */}
      <div id="multitask" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">マルチタスク機能</h3>
          <p className="popular-card-desc">
            iPadOSではSplit Viewを使用してアプリを2つ横に並べたり、Slide Overでアプリを重ねて表示したりできます。ただし、どちらも表示できるアプリは2つまでですし、対応するアプリも限られます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            それに対してmacOSは<strong>アプリを複数画面に表示できるのはもちろんのこと、複数デスクトップを作成して効率よく作業する</strong>ことができます。マルチタスクのしやすさは圧倒的にMacBookのほうが上というのが現状です。
          </p>
        </div>
        <div className="popular-card-img-grid">
          <figure>
            <img src="/images/content/use-macbook.jpg" alt="MacBookで複数アプリを立ち上げ・行き来する様子" loading="lazy" />
            <figcaption>MacBookで複数アプリを立ち上げ・行き来する様子</figcaption>
          </figure>
          <figure>
            <img src="/images/content/ipad-split-view.jpg" alt="iPadのSplit Viewで複数のアプリを同時に立ち上げる様子" loading="lazy" />
            <figcaption>iPadのSplit Viewで複数のアプリを同時に立ち上げる様子</figcaption>
          </figure>
        </div>
      </div>

      {/* サイズ・形状 */}
      <div id="size" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">サイズ・形状</h3>
          <p className="popular-card-desc">
            MacBookはノートパソコン型のデバイスです。現行ラインナップの各モデルごとのインチ数や重量をまとめると下記のようになります。
          </p>
        </div>

        {/* MacBook スペック表 */}
        <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th></th>
                  <th colSpan={3}>MacBook Air</th>
                  <th colSpan={3}>MacBook Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>イメージ</th>
                  <td>
                    <img src="/images/macbook/mba-13-2020.jpg" alt="MacBook Air 13.3インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/macbook/mba-13-2024.jpg" alt="MacBook Air 13.6インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/macbook/mba-15-2024.jpg" alt="MacBook Air 15.3インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/macbook/mbp-13-2022.jpg" alt="MacBook Pro 13.6インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/macbook/mbp-14-2024-nov.jpg" alt="MacBook Pro 14.2インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/macbook/mbp-16-2024-nov.jpg" alt="MacBook Pro 16.2インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                </tr>
                <tr>
                  <th>インチ数</th>
                  <td>13.3インチ</td>
                  <td>13.6インチ</td>
                  <td>15.3インチ</td>
                  <td>13.6インチ</td>
                  <td>14.2インチ</td>
                  <td>16.2インチ</td>
                </tr>
                <tr>
                  <th>重量</th>
                  <td>1.2kg</td>
                  <td>1.2kg</td>
                  <td>1.5kg</td>
                  <td>1.4kg</td>
                  <td>1.6kg</td>
                  <td>2.1kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-lg)' }}>
          <p className="popular-card-desc">
            iPadはタブレット端末で、Magic KeyboardなどのApple純正キーボードを組み合わせることで、ノートパソコンに近い感覚でタイピングできるようになります。現行ラインナップの各モデルごとのインチ数や重量をまとめると下記のようになります。
          </p>
        </div>

        {/* iPad スペック表 */}
        <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th></th>
                  <th>iPad Pro 12.9</th>
                  <th>iPad Pro 11</th>
                  <th>iPad Air</th>
                  <th>iPad mini</th>
                  <th>無印 iPad</th>
                  <th>無印 iPad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>イメージ</th>
                  <td>
                    <img src="/images/ipad/ipad-pro-12-6.jpg" alt="iPad Pro 12.9インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/ipad/ipad-pro-11-6.jpg" alt="iPad Pro 11インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/ipad/ipad-air-7-11.jpg" alt="iPad Air" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/ipad/ipad-mini-7.jpg" alt="iPad mini" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/ipad/ipad-10.jpg" alt="無印 iPad 10.9インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <img src="/images/ipad/ipad-9.jpg" alt="無印 iPad 10.2インチ" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </td>
                </tr>
                <tr>
                  <th>画面サイズ</th>
                  <td>12.9インチ</td>
                  <td>11インチ</td>
                  <td>10.9インチ</td>
                  <td>8.3インチ</td>
                  <td>10.9インチ</td>
                  <td>10.2インチ</td>
                </tr>
                <tr>
                  <th>重さ</th>
                  <td>682g</td>
                  <td>466g</td>
                  <td>461g</td>
                  <td>293g</td>
                  <td>477g</td>
                  <td>487g</td>
                </tr>
                <tr>
                  <th>純正キーボード</th>
                  <td>
                    Magic Keyboard<br />
                    Smart Keyboard Folio
                  </td>
                  <td>
                    Magic Keyboard<br />
                    Smart Keyboard Folio
                  </td>
                  <td>
                    Magic Keyboard<br />
                    Smart Keyboard Folio
                  </td>
                  <td>なし</td>
                  <td>Smart Keyboard Folio</td>
                  <td>Smart Keyboard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            各iPadに対応しているSmart Keyboard FolioやMagic Keyboardの重量は500〜700gほど。<strong>組み合わせ次第では同等のインチ数のMacBookよりも重量が重くなる</strong>のはややネガティブなポイントです。
          </p>
        </div>
      </div>

      {/* 操作方法 */}
      <div id="operation" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">操作方法</h3>
          <p className="popular-card-desc">
            操作方法も両者の基本的な違いのひとつです。それぞれ下記のような特徴があります。
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
          <div className="m-card" style={{ padding: 'var(--space-lg)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-solid fa-laptop" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              MacBook
            </p>
            <p className="popular-card-desc">
              キーボードやトラックパッドで操作するのが基本。トラックパッドは細かく設定を変えることができ、これを駆使することで作業効率をぐっとアップさせることができます。
            </p>
          </div>

          <div className="m-card" style={{ padding: 'var(--space-lg)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-solid fa-tablet-screen-button" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              iPad
            </p>
            <p className="popular-card-desc">
              スマホと同様にタッチ操作で扱うのが基本。加えてApple PencilやMagic Keyboardなどの周辺機器を使用することで、手書き入力やキーボード入力もできるようになります。
            </p>
          </div>
        </div>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            また、iPadはUSB端子がひとつしかなく、拡張性を上げるにはUSBハブが必須です。それに対して<strong>MacBook（特にMacBook Pro）はインターフェイスの種類が豊富</strong>なので、マルチメディアハブなどがなくてもある程度の作業をこなすことができます。
          </p>
        </div>
      </div>
    </div>
  )
}
