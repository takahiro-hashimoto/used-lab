import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Style Guide',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function StyleGuidePage() {
  return (
    <main>
      {/* Hero */}
      <div className="hero-wrapper">
        <header className="hero hero--simple">
          <div className="hero-inner l-container">
            <div className="hero-content hero-content--center">
              <h1 className="hero-title">Style Guide</h1>
              <p className="hero-meta">USED LAB Design System v2.1 — コンポーネント一覧</p>
            </div>
          </div>
        </header>
      </div>

      {/* 目次 */}
      <nav className="l-section l-section--no-pt" aria-label="目次">
        <div className="l-container">
          <p className="toc-title">セクション</p>
          <ol className="l-grid l-grid--3col u-list-reset">
            {[
              ['#tokens', 'デザイントークン'],
              ['#typography', 'タイポグラフィ'],
              ['#layout', 'レイアウト'],
              ['#buttons', 'ボタン'],
              ['#badges', 'バッジ・タグ'],
              ['#cards', 'カード'],
              ['#tables', 'テーブル'],
              ['#lists', 'リスト'],
              ['#callouts', 'コールアウト'],
              ['#icons', 'アイコンボックス'],
              ['#ratings', 'レーティング・マーク'],
              ['#forms', 'フォーム要素'],
              ['#sections', 'セクション系'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="toc-item">
                  {label} <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="l-sections" id="content">
        {/* ============================
            0. Design Tokens
           ============================ */}
        <section className="l-section" id="tokens" aria-labelledby="h-tokens">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-tokens">デザイントークン</h2>
            <p className="m-section-desc">CSS変数で管理されている基本的な値</p>

            {/* Colors */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>カラー</h3>
            <div className="l-grid l-grid--4col" style={{ marginTop: 'var(--space-md)' }}>
              {[
                ['--color-primary', '#0071e3', 'Primary'],
                ['--color-primary-dark', '#005bb5', 'Primary Dark'],
                ['--color-primary-light', '#e8f0fe', 'Primary Light'],
                ['--color-accent', '#2ab0f0', 'Accent'],
                ['--color-text', '#1d1d1f', 'Text'],
                ['--color-text-secondary', '#6e6e73', 'Text Secondary'],
                ['--color-text-muted', '#86868b', 'Text Muted'],
                ['--color-bg-subtle', '#f5f5f7', 'BG Subtle'],
                ['--color-bg-muted', '#edf2f9', 'BG Muted'],
                ['--color-border', '#d2d2d7', 'Border'],
                ['--color-positive', '#34a853', 'Positive'],
                ['--color-negative', '#e74c6f', 'Negative'],
              ].map(([varName, hex, label]) => (
                <div key={varName} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: 48,
                      borderRadius: 'var(--radius-sm)',
                      background: hex,
                      border: '1px solid var(--color-border-light)',
                    }}
                  />
                  <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-xs)', fontWeight: 600 }}>{label}</p>
                  <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{varName}</code>
                </div>
              ))}
            </div>

            {/* Shadows */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>シャドウ</h3>
            <div className="l-grid l-grid--4col" style={{ marginTop: 'var(--space-md)' }}>
              {['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl'].map((v) => (
                <div key={v} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: 64,
                      borderRadius: 'var(--radius-md)',
                      background: '#fff',
                      boxShadow: `var(${v})`,
                    }}
                  />
                  <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)', display: 'block' }}>{v}</code>
                </div>
              ))}
            </div>

            {/* Radius */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>角丸（Radius）</h3>
            <div className="l-grid l-grid--5col" style={{ marginTop: 'var(--space-md)' }}>
              {[
                ['--radius-sm', '6px'],
                ['--radius-md', '10px'],
                ['--radius-lg', '16px'],
                ['--radius-xl', '24px'],
                ['--radius-full', '9999px'],
              ].map(([v, val]) => (
                <div key={v} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: `var(${v})`,
                      background: 'var(--color-primary-light)',
                      border: '2px solid var(--color-primary)',
                      margin: '0 auto',
                    }}
                  />
                  <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)', display: 'block' }}>{v}</code>
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Spacing */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>スペーシング</h3>
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                ['--space-xs', '0.25rem (4px)'],
                ['--space-sm', '0.5rem (8px)'],
                ['--space-md', '1rem (16px)'],
                ['--space-lg', '1.5rem (24px)'],
                ['--space-xl', '2rem (32px)'],
                ['--space-2xl', '3rem (48px)'],
                ['--space-3xl', '4rem (64px)'],
              ].map(([v, val]) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', width: 120, flexShrink: 0 }}>{v}</code>
                  <div style={{ height: 12, width: `var(${v})`, minWidth: 4, background: 'var(--color-primary)', borderRadius: 2 }} />
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            1. Typography
           ============================ */}
        <section className="l-section" id="typography" aria-labelledby="h-typography">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-typography">タイポグラフィ</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>見出し（m-section-heading）</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <h2 className="m-section-heading m-section-heading--lg">m-section-heading--lg</h2>
              <h2 className="m-section-heading m-section-heading--md" style={{ marginTop: 'var(--space-md)' }}>m-section-heading--md</h2>
              <h2 className="m-section-heading m-section-heading--sm" style={{ marginTop: 'var(--space-md)' }}>m-section-heading--sm</h2>
              <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-md)' }}>m-sub-heading</h3>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>本文テキスト</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <p className="m-section-desc">m-section-desc — セクションの説明テキスト。見出しの直下に配置します。</p>
              <p className="m-body-text" style={{ marginTop: 'var(--space-sm)' }}>m-body-text — 本文テキスト。記事の段落に使用します。</p>
              <p className="m-desc-text" style={{ marginTop: 'var(--space-sm)' }}>m-desc-text — 説明文テキスト。カードやリストの補足に使います。</p>
              <p className="m-footnote" style={{ marginTop: 'var(--space-sm)' }}>m-footnote — 脚注・補足テキスト。小さめのサイズで表示されます。</p>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>テキストカラーユーティリティ</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
              <span className="text-positive"><i className="fa-solid fa-circle-check" aria-hidden="true"></i> text-positive</span>
              <span className="text-negative"><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> text-negative</span>
              <span className="text-caution"><i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> text-caution</span>
              <span className="text-info"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> text-info</span>
              <span className="text-muted">text-muted</span>
            </div>
          </div>
        </section>

        {/* ============================
            2. Layout
           ============================ */}
        <section className="l-section" id="layout" aria-labelledby="h-layout">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-layout">レイアウト</h2>
            <p className="m-section-desc">l-container（max-width: 960px）+ l-grid でレイアウトを構成</p>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>l-grid（グリッド）</h3>
            {[
              ['l-grid--2col', 2],
              ['l-grid--3col', 3],
              ['l-grid--4col', 4],
            ].map(([cls, cols]) => (
              <div key={cls} style={{ marginTop: 'var(--space-lg)' }}>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{cls}</code>
                <div className={`l-grid ${cls}`} style={{ marginTop: 'var(--space-xs)' }}>
                  {Array.from({ length: Number(cols) }).map((_, i) => (
                    <div key={i} style={{ background: 'var(--color-primary-light)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>l-section バリエーション</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 2, color: 'var(--color-text-secondary)' }}>
                <li><code>l-section</code> — 標準のセクションパディング</li>
                <li><code>l-section--sm</code> — 小さめパディング</li>
                <li><code>l-section--no-pt</code> — 上パディングなし</li>
                <li><code>l-section--bg-subtle</code> — 薄いグレー背景</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================
            3. Buttons
           ============================ */}
        <section className="l-section" id="buttons" aria-labelledby="h-buttons">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-buttons">ボタン</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-btn</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <a className="m-btn m-btn--primary">m-btn--primary</a>
              <a className="m-btn m-btn--sm m-btn--primary">m-btn--sm</a>
              <a className="m-btn m-btn--amazon">m-btn--amazon</a>
              <a className="m-btn m-btn--block m-btn--primary" style={{ maxWidth: 300 }}>m-btn--block</a>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-outline-btn</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <a className="m-outline-btn">m-outline-btn</a>
              <a className="m-outline-btn m-outline-btn--pill">m-outline-btn--pill</a>
              <a className="m-outline-btn m-outline-btn--link">m-outline-btn--link</a>
            </div>
          </div>
        </section>

        {/* ============================
            4. Badges & Tags
           ============================ */}
        <section className="l-section" id="badges" aria-labelledby="h-badges">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-badges">バッジ・タグ</h2>

            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <span className="m-badge">m-badge</span>
              <span className="m-badge m-badge--primary">m-badge--primary</span>
              <span className="m-tag">m-tag</span>
            </div>
          </div>
        </section>

        {/* ============================
            5. Cards
           ============================ */}
        <section className="l-section" id="cards" aria-labelledby="h-cards">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-cards">カード</h2>
            <p className="m-section-desc">m-card をベースに、修飾子を組み合わせてバリエーションを作ります</p>

            <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-xl)' }}>
              {/* 基本カード */}
              <div>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>m-card</code>
                <div className="m-card" style={{ marginTop: 'var(--space-xs)', padding: 'var(--space-lg)' }}>
                  <p style={{ fontSize: 'var(--font-size-sm)' }}>ベースカード。border + border-radius のみ。</p>
                </div>
              </div>

              {/* Shadow */}
              <div>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>m-card m-card--shadow</code>
                <div className="m-card m-card--shadow" style={{ marginTop: 'var(--space-xs)', padding: 'var(--space-lg)' }}>
                  <p style={{ fontSize: 'var(--font-size-sm)' }}>ドロップシャドウ付き。</p>
                </div>
              </div>

              {/* Padded + Shadow */}
              <div>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>m-card--shadow m-card--padded</code>
                <div className="m-card m-card--shadow m-card--padded">
                  <p style={{ fontSize: 'var(--font-size-sm)' }}>内側パディング付き。最もよく使うパターン。</p>
                </div>
              </div>

              {/* Hoverable */}
              <div>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>m-card--shadow m-card--hoverable</code>
                <div className="m-card m-card--shadow m-card--hoverable" style={{ padding: 'var(--space-lg)', cursor: 'pointer' }}>
                  <p style={{ fontSize: 'var(--font-size-sm)' }}>ホバーでシャドウが大きくなる。リンクカードに。</p>
                </div>
              </div>
            </div>

            {/* Stat Card */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-stat-card</h3>
            <div className="l-grid l-grid--3col" style={{ marginTop: 'var(--space-md)' }}>
              <div className="m-stat-card">
                <span className="m-stat-card__label">ラベル</span>
                <span className="m-stat-card__value">¥89,800</span>
                <span className="m-stat-card__note">補足テキスト</span>
              </div>
              <div className="m-stat-card m-stat-card--highlight">
                <span className="m-stat-card__label">ハイライト</span>
                <span className="m-stat-card__value">4.5 / 5.0</span>
                <span className="m-stat-card__note">--highlight</span>
              </div>
              <div className="m-stat-card m-stat-card--lg">
                <span className="m-stat-card__label">ラージ</span>
                <span className="m-stat-card__value">18h</span>
                <span className="m-stat-card__note">--lg</span>
              </div>
            </div>

            {/* Media Card */}
            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>メディアカード（media-card）</h3>
            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <div className="media-card__img-wrap">
                <div style={{ width: 240, height: 160, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-image" style={{ fontSize: 32, color: 'var(--color-text-muted)' }} aria-hidden="true"></i>
                </div>
              </div>
              <div className="media-card__body">
                <h3 className="media-card__title">media-card__title</h3>
                <p className="media-card__desc">media-card__desc — 記事ページのカード型セクションで使用。画像 + テキストの横並びレイアウト。</p>
                <ul className="media-card__list" style={{ marginTop: 'var(--space-sm)' }}>
                  <li>media-card__list の項目1</li>
                  <li>media-card__list の項目2</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            6. Tables
           ============================ */}
        <section className="l-section" id="tables" aria-labelledby="h-tables">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-tables">テーブル</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-table（基本テーブル）</h3>
            <div className="m-card m-card--shadow m-table-card" style={{ marginTop: 'var(--space-md)' }}>
              <div className="m-table-scroll">
                <table className="m-table m-table--center">
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>値A</th>
                      <th>値B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>行見出し</th>
                      <td>データ1</td>
                      <td>データ2</td>
                    </tr>
                    <tr>
                      <th>行見出し</th>
                      <td>データ3</td>
                      <td>データ4</td>
                    </tr>
                    <tr>
                      <th>行見出し</th>
                      <td className="text-positive">ポジティブ</td>
                      <td className="text-negative">ネガティブ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="m-footnote" style={{ marginTop: 'var(--space-sm)' }}>
              tbody th には自動でグレー背景が付きます。m-table--center でセル中央揃え。
            </p>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-spec-row（スペック行）</h3>
            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <dl className="m-spec-row">
                <dt>CPU</dt>
                <dd>Apple M4</dd>
              </dl>
              <dl className="m-spec-row">
                <dt>RAM</dt>
                <dd>16GB</dd>
              </dl>
              <dl className="m-spec-row">
                <dt>ストレージ</dt>
                <dd>512GB SSD</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* ============================
            7. Lists
           ============================ */}
        <section className="l-section" id="lists" aria-labelledby="h-lists">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-lists">リスト</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-check-list</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)' }}>
              <ul className="m-check-list">
                <li className="m-check-list__item">チェックリストの項目1</li>
                <li className="m-check-list__item">チェックリストの項目2</li>
                <li className="m-check-list__item">チェックリストの項目3</li>
              </ul>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>lead-box__list（リードセクション用）</h3>
            <div className="lead-box" style={{ marginTop: 'var(--space-md)' }}>
              <p>リードボックスのテキスト例</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                lead-link — リンク付きの案内テキスト
              </p>
            </div>
          </div>
        </section>

        {/* ============================
            8. Callouts
           ============================ */}
        <section className="l-section" id="callouts" aria-labelledby="h-callouts">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-callouts">コールアウト</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
              <div className="m-callout">
                <span className="m-callout__label">
                  <i className="fa-solid fa-circle-info" aria-hidden="true"></i> m-callout
                </span>
                <p className="m-callout__text">標準のコールアウト。補足情報の掲載に使います。</p>
              </div>

              <div className="m-callout m-callout--tip">
                <span className="m-callout__label">
                  <i className="fa-solid fa-lightbulb" aria-hidden="true"></i> m-callout--tip
                </span>
                <p className="m-callout__text">ヒント・おすすめポイントに。暖色系のスタイル。</p>
              </div>

              <div className="m-callout m-callout--subtle">
                <span className="m-callout__label">
                  <i className="fa-solid fa-memo-circle-info" aria-hidden="true" style={{ opacity: 0.6 }}></i> m-callout--subtle
                </span>
                <p className="m-callout__text">控えめなスタイル。注釈やメモに。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            9. Icon Boxes
           ============================ */}
        <section className="l-section" id="icons" aria-labelledby="h-icons">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-icons">アイコンボックス</h2>

            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-xl)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)', alignItems: 'flex-end' }}>
              {[
                ['m-icon-box--xs', 'xs'],
                ['m-icon-box--sm', 'sm'],
                ['m-icon-box--md', 'md'],
                ['m-icon-box--44', '44'],
                ['m-icon-box--lg', 'lg'],
                ['m-icon-box--xl', 'xl'],
              ].map(([cls, label]) => (
                <div key={cls} style={{ textAlign: 'center' }}>
                  <span className={`m-icon-box ${cls}`}>
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                  </span>
                  <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-xs)', color: 'var(--color-text-muted)' }}>{label}</p>
                </div>
              ))}
              <div style={{ textAlign: 'center' }}>
                <span className="m-icon-box m-icon-box--md m-icon-box--circle">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                </span>
                <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-xs)', color: 'var(--color-text-muted)' }}>circle</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            10. Ratings & Marks
           ============================ */}
        <section className="l-section" id="ratings" aria-labelledby="h-ratings">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-ratings">レーティング・マーク</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-rating</h3>
            <div className="l-grid l-grid--3col" style={{ marginTop: 'var(--space-md)' }}>
              <div className="m-rating">
                <span className="m-rating__label">項目名</span>
                <span className="m-rating__value">4.5</span>
                <span className="m-rating__icon m-rating__icon--excellent">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                </span>
              </div>
              <div className="m-rating">
                <span className="m-rating__label">項目名</span>
                <span className="m-rating__value">3.0</span>
                <span className="m-rating__icon m-rating__icon--good">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                </span>
              </div>
              <div className="m-rating">
                <span className="m-rating__label">項目名</span>
                <span className="m-rating__value">2.0</span>
                <span className="m-rating__icon m-rating__icon--fair">
                  <i className="fa-solid fa-circle-minus" aria-hidden="true"></i>
                </span>
              </div>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-mark</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)', alignItems: 'center' }}>
              {[
                ['m-mark--excellent', 'excellent', 'fa-circle-check'],
                ['m-mark--good', 'good', 'fa-circle-check'],
                ['m-mark--fair', 'fair', 'fa-circle-minus'],
                ['m-mark--none', 'none', 'fa-circle-xmark'],
              ].map(([cls, label, icon]) => (
                <div key={cls} style={{ textAlign: 'center' }}>
                  <span className={`m-mark m-mark--md ${cls}`}>
                    <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
                  </span>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)' }}>{label}</p>
                </div>
              ))}
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-price-display</h3>
            <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xl)', alignItems: 'baseline' }}>
              <span className="m-price-display m-price-display--sm">¥59,800 <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>--sm</span></span>
              <span className="m-price-display m-price-display--md">¥89,800 <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>--md</span></span>
              <span className="m-price-display m-price-display--lg m-price-display--primary">¥129,800 <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>--lg --primary</span></span>
            </div>
          </div>
        </section>

        {/* ============================
            11. Forms
           ============================ */}
        <section className="l-section" id="forms" aria-labelledby="h-forms">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-forms">フォーム要素</h2>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>m-selectable-card</h3>
            <div className="l-grid l-grid--3col" style={{ marginTop: 'var(--space-md)' }}>
              <label className="m-selectable-card">
                <input type="radio" name="demo" defaultChecked />
                <span>選択肢 A</span>
              </label>
              <label className="m-selectable-card">
                <input type="radio" name="demo" />
                <span>選択肢 B</span>
              </label>
              <label className="m-selectable-card">
                <input type="radio" name="demo" />
                <span>選択肢 C</span>
              </label>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>spec-filter__tag（フィルタータグ）</h3>
            <div className="spec-filter" style={{ marginTop: 'var(--space-md)' }}>
              <button className="spec-filter__tag is-active">すべて</button>
              <button className="spec-filter__tag">iPad Pro</button>
              <button className="spec-filter__tag">iPad Air</button>
              <button className="spec-filter__tag">iPad mini</button>
            </div>
          </div>
        </section>

        {/* ============================
            12. Section Patterns
           ============================ */}
        <section className="l-section" id="sections" aria-labelledby="h-sections">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="h-sections">セクション系パターン</h2>
            <p className="m-section-desc">ページ構成でよく使うコンポーネントのまとめ</p>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>FAQ（faq-list）</h3>
            <dl className="faq-list" style={{ marginTop: 'var(--space-md)' }}>
              <div className="faq-item">
                <dt className="faq-question">質問テキストがここに入ります</dt>
                <dd className="faq-answer">回答テキストがここに入ります。m-card と同じ角丸・ボーダーのスタイルです。</dd>
              </div>
              <div className="faq-item">
                <dt className="faq-question">2つ目の質問テキスト</dt>
                <dd className="faq-answer">2つ目の回答テキスト。</dd>
              </div>
            </dl>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>結論カード（conclusion-card）</h3>
            <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-md)' }}>
              <div className="conclusion-card">
                <div className="conclusion-header conclusion-header--good">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  おすすめ
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <p className="conclusion-headline">おすすめな人の見出し</p>
                  <ul className="m-check-list" style={{ marginTop: 'var(--space-sm)' }}>
                    <li className="m-check-list__item">ポイント1</li>
                    <li className="m-check-list__item">ポイント2</li>
                  </ul>
                </div>
              </div>
              <div className="conclusion-card">
                <div className="conclusion-header conclusion-header--wait">
                  <i className="fa-solid fa-circle-pause" aria-hidden="true"></i>
                  見送り推奨
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <p className="conclusion-headline">おすすめしない人の見出し</p>
                  <ul className="m-check-list" style={{ marginTop: 'var(--space-sm)' }}>
                    <li className="m-check-list__item">ポイント1</li>
                    <li className="m-check-list__item">ポイント2</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>Related Link Card</h3>
            <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-md)' }}>
              <a className="m-card m-card--shadow related-link-card related-link-card--icon m-card--hoverable" href="#">
                <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                  <i className="fa-solid fa-laptop" aria-hidden="true"></i>
                </span>
                <p className="related-link-card__title">関連リンクのタイトル</p>
                <p className="related-link-card__desc">説明テキスト。リンク先の概要を簡潔に。</p>
                <span className="related-link-card__arrow">
                  <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </span>
              </a>
              <a className="m-card m-card--shadow related-link-card related-link-card--icon m-card--hoverable" href="#">
                <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                  <i className="fa-solid fa-tablet-screen-button" aria-hidden="true"></i>
                </span>
                <p className="related-link-card__title">関連リンクのタイトル</p>
                <p className="related-link-card__desc">説明テキスト。リンク先の概要を簡潔に。</p>
                <span className="related-link-card__arrow">
                  <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </span>
              </a>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>Glossary Box</h3>
            <div className="glossary-box glossary-box--numbered" style={{ marginTop: 'var(--space-md)' }}>
              <div className="glossary-header">
                <i className="fa-solid fa-book" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                用語解説
              </div>
              <div className="glossary-item">
                <p className="glossary-item-title">用語名</p>
                <p className="glossary-item-desc">用語の説明文がここに入ります。</p>
              </div>
              <div className="glossary-item">
                <p className="glossary-item-title">用語名2</p>
                <p className="glossary-item-desc">2つ目の用語の説明文。</p>
              </div>
            </div>

            <h3 className="m-sub-heading" style={{ marginTop: 'var(--space-2xl)' }}>タイムライン（m-timeline）</h3>
            <div className="m-timeline" style={{ marginTop: 'var(--space-md)' }}>
              <div className="m-timeline__item">
                <span className="m-timeline__number">1</span>
                <div className="m-timeline__content">
                  <p style={{ fontWeight: 600 }}>ステップ1のタイトル</p>
                  <p className="m-desc-text">ステップの説明テキスト。</p>
                </div>
              </div>
              <div className="m-timeline__item">
                <span className="m-timeline__number">2</span>
                <div className="m-timeline__content">
                  <p style={{ fontWeight: 600 }}>ステップ2のタイトル</p>
                  <p className="m-desc-text">ステップの説明テキスト。</p>
                </div>
              </div>
              <div className="m-timeline__item">
                <span className="m-timeline__number">3</span>
                <div className="m-timeline__content">
                  <p style={{ fontWeight: 600 }}>ステップ3のタイトル</p>
                  <p className="m-desc-text">ステップの説明テキスト。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
