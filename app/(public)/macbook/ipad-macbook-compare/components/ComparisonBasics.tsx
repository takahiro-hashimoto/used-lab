import Image from "next/image";

export default function ComparisonBasics() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ファイル管理 */}
      <div id="file-management" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-grid">
          <figure>
            <Image src="/images/content/photo/macbook-folder-manegment.webp" alt="MacBookのファイル管理方法" width={400} height={300} loading="lazy" style={{ border: '1px solid #d5d5d8', borderRadius: 'var(--radius-md)' }} />
            <figcaption>MacBookのファイル管理方法</figcaption>
          </figure>
          <figure>
            <Image src="/images/content/photo/ipad-folder-image.webp" alt="iPadのファイル管理方法" width={400} height={300} loading="lazy" style={{ border: '1px solid #d5d5d8', borderRadius: 'var(--radius-md)' }} />
            <figcaption>iPadのファイル管理方法</figcaption>
          </figure>
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">ファイル管理</h3>
          <p className="media-card__desc">
            macOSではフォルダの移動はドラッグ&ドロップ、ファイルのコピーは「Command+C」のショートカットで簡単に行うことができます。
          </p>
          <p className="media-card__desc u-mt-sm">
            一方iPadOSでは、上記のようなファイル操作をmacOSほどシンプルに行うことができません。また、macOSのほうがファイルの階層構造がわかりやすく必要なファイルにアクセスしやすいので、<strong>ファイル管理という点ではmacOSが操作しやすい</strong>と言えます。
          </p>
        </div>
      </div>

      {/* マルチタスク機能 */}
      <div id="multitask" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-grid">
          <figure>
            <Image src="/images/content/photo/ipad-sprit-view-1024x683.webp" alt="iPadのSplit Viewで複数のアプリを同時に立ち上げる様子" width={400} height={300} loading="lazy" />
            <figcaption>iPadのSplit Viewで複数のアプリを同時に立ち上げる様子</figcaption>
          </figure>
          <figure>
            <Image src="/images/content/photo/macbook-multi-task-1024x683.webp" alt="MacBookで複数アプリを立ち上げ・行き来する様子" width={400} height={300} loading="lazy" />
            <figcaption>MacBookで複数アプリを立ち上げ・行き来する様子</figcaption>
          </figure>
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">マルチタスク機能</h3>
          <p className="media-card__desc">
            iPadOSではSplit Viewを使用してアプリを2つ横に並べたり、Slide Overでアプリを重ねて表示したりできます。ただし、どちらも表示できるアプリは2つまでですし、対応するアプリも限られます。
          </p>
          <p className="media-card__desc u-mt-sm">
            それに対してmacOSは<strong>アプリを複数画面に表示できるのはもちろんのこと、複数デスクトップを作成して効率よく作業する</strong>ことができます。マルチタスクのしやすさは圧倒的にMacBookのほうが上というのが現状です。
          </p>
        </div>
      </div>

      {/* サイズ・形状 */}
      <div id="size" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-grid" style={{ gridTemplateColumns: '1fr' }}>
          <figure>
            <Image src="/images/content/photo/mac-ipad-compare.jpg" alt="MacBookとiPadのサイズ・形状比較" width={400} height={300} loading="lazy" style={{ border: '1px solid #d5d5d8', borderRadius: 'var(--radius-md)' }} />
            <figcaption>MacBookとiPadのサイズ・形状比較</figcaption>
          </figure>
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">サイズ・形状</h3>
          <p className="media-card__desc">
            MacBookとiPadはそもそもデバイスの形状が異なります。それぞれの特徴を押さえておきましょう。
          </p>
        </div>

        <div className="glossary-box glossary-box--filled u-mt-md">
          <dl className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <i className="fa-solid fa-laptop" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                MacBook
              </dt>
              <dd className="glossary-item-desc">
                ノートパソコン型のデバイス。画面サイズは<strong>13.3〜16.2インチ</strong>、重量は<strong>約1.2〜2.1kg</strong>。キーボードとトラックパッドが一体になっているため、開いたらすぐに作業を始められます。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <i className="fa-solid fa-tablet-screen-button" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                iPad
              </dt>
              <dd className="glossary-item-desc">
                タブレット型のデバイス。画面サイズは<strong>8.3〜12.9インチ</strong>、本体重量は<strong>約293〜682g</strong>と軽量です。Magic KeyboardなどのApple純正キーボードを組み合わせればノートパソコンに近い感覚でタイピングもできます。ただしキーボードの重量が500〜700gあるため、<strong>組み合わせ次第では同サイズのMacBookより重くなる</strong>点には注意が必要です。
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* 操作方法 */}
      <div id="operation" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-grid" style={{ gridTemplateColumns: '1fr' }}>
          <figure>
            <Image src="/images/content/photo/magic-keyboarda.jpg" alt="iPadのMagic Keyboardによる操作" width={400} height={300} loading="lazy" style={{ border: '1px solid #d5d5d8', borderRadius: 'var(--radius-md)' }} />
            <figcaption>iPadのMagic Keyboardによる操作</figcaption>
          </figure>
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">操作方法</h3>
          <p className="media-card__desc">
            操作方法も両者の基本的な違いのひとつです。それぞれ下記のような特徴があります。
          </p>
        </div>

        <div className="glossary-box glossary-box--filled u-mt-md">
          <dl className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <i className="fa-solid fa-laptop" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                MacBook
              </dt>
              <dd className="glossary-item-desc">
                キーボードやトラックパッドで操作するのが基本。トラックパッドは細かく設定を変えることができ、これを駆使することで作業効率をぐっとアップさせることができます。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">
                <i className="fa-solid fa-tablet-screen-button" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                iPad
              </dt>
              <dd className="glossary-item-desc">
                スマホと同様にタッチ操作で扱うのが基本。加えてApple PencilやMagic Keyboardなどの周辺機器を使用することで、手書き入力やキーボード入力もできるようになります。
              </dd>
            </div>
          </dl>
        </div>

        <div className="media-card__body u-mt-md">
          <p className="media-card__desc">
            また、iPadはUSB端子がひとつしかなく、拡張性を上げるにはUSBハブが必須です。それに対して<strong>MacBook（特にMacBook Pro）はインターフェイスの種類が豊富</strong>なので、マルチメディアハブなどがなくてもある程度の作業をこなすことができます。
          </p>
        </div>
      </div>
    </div>
  )
}
