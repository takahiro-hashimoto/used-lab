'use client'
// search-v3
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export type SearchEntry = {
  title: string
  href: string
  category: string
  categoryLabel: string
  icon: string
  image: string
  keywords: string
  isModel?: boolean
}

export default function SearchClient({ entries }: { entries: SearchEntry[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paramQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(paramQuery)

  // URLのqパラメータが外部から変更された場合に同期（ヘッダー検索など）
  useEffect(() => {
    setQuery(paramQuery)
  }, [paramQuery])

  useEffect(() => {
    const q = query.trim()
    const url = q ? `/search/?q=${encodeURIComponent(q)}` : '/search/'
    router.replace(url, { scroll: false })
  }, [query, router])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const terms = q.split(/\s+/)

    return entries
      .map((entry) => {
        const title = `${entry.title} ${entry.categoryLabel}`.toLowerCase()
        const keywords = entry.keywords.toLowerCase()
        const allInTitle = terms.every((t) => title.includes(t))
        const allInAny = terms.every((t) => title.includes(t) || keywords.includes(t))
        if (!allInAny) return null

        // スコアリング: タイトルヒット優先
        let score = 0
        for (const t of terms) {
          if (title.includes(t)) score += 10
          if (keywords.includes(t)) score += 3
        }
        if (allInTitle) score += 20
        if (entry.isModel) score -= 15
        return { entry, score }
      })
      .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.entry)
  }, [query, entries])

  const showResults = query.trim().length > 0

  return (
    <>
      <div className="hero-wrapper">
        <nav className="breadcrumb" aria-label="パンくずリスト">
          <div className="l-container">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
                  <span>中古Apple製品を安く買う</span>
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {showResults ? `「${query.trim()}」の検索結果` : '記事を検索'}
              </li>
            </ol>
          </div>
        </nav>

        <header className="hero hero--simple">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              {showResults ? (
                <>
                  <h1 className="hero-title">「{query.trim()}」の検索結果</h1>
                  <p className="hero-description">
                    検索結果が少ない場合はキーワードを短くするか、別の単語でお試しください。
                  </p>
                </>
              ) : (
                <>
                  <h1 className="hero-title">記事を検索</h1>
                  <p className="hero-description">
                    キーワードを入力して、気になる記事を探しましょう。
                  </p>
                </>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="l-sections">
        <section className="l-section">
          <div className="l-container">
            {showResults && results.length > 0 && (
              <>
              <div className="ifd-results-header">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-results">
                  検索結果
                </h2>
                <div className="ifd-results-meta">
                  <span className="ifd-results-count">
                    <strong>{results.length}</strong>件の記事が見つかりました
                  </span>
                </div>
              </div>
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                {results.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="m-card m-card--shadow m-card--hover search-result-card"
                  >
                    <div className="search-result-card__image">
                      <Image
                        src={entry.image}
                        alt=""
                        width={400}
                        height={225}
                        className="search-result-card__img"
                        loading="lazy"
                      />
                      <span className="search-result-card__badge">
                        <i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i>
                        {' '}{entry.categoryLabel}
                      </span>
                    </div>
                    <div className="search-result-card__body">
                      <h3 className="search-result-card__title">{entry.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              </>
            )}

            {showResults && results.length === 0 && (
              <div className="search-empty">
                <i className="fa-regular fa-face-frown search-empty__icon" aria-hidden="true"></i>
                <p>「{query}」に一致する記事が見つかりませんでした。</p>
                <p className="search-empty__hint">
                  別のキーワードで検索してみてください。
                </p>
              </div>
            )}

            {!showResults && (
              <div className="search-categories">
                <p className="search-categories__heading">カテゴリから探す</p>
                <div className="search-categories__list">
                  {['iphone', 'ipad', 'macbook', 'watch', 'airpods'].map((catId) => {
                    const catEntries = entries.filter((e) => e.category === catId)
                    if (catEntries.length === 0) return null
                    const first = catEntries[0]
                    return (
                      <button
                        key={catId}
                        type="button"
                        className="search-categories__chip"
                        onClick={() => setQuery(first.categoryLabel)}
                      >
                        <i className={`fa-solid ${first.icon}`} aria-hidden="true"></i>
                        {' '}{first.categoryLabel}
                        <span className="search-categories__count">{catEntries.length}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
