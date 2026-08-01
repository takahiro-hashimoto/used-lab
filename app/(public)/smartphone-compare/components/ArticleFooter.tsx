import ContinuousAside from '@/app/components/ContinuousAside'
import AuthorByline from '@/app/components/AuthorByline'
import ShareBox from '@/app/components/ShareBox'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'

type Props = {
  pageUrl: string
  pageTitle: string
}

/**
 * ブランド中立の記事フッター。
 * IPhoneArticleFooter はブランド固有の人気記事を含むため、横断ページ用に
 * 全カテゴリへ誘導する CrossCategoryLinks ＋ 著者 ＋ シェアで構成する。
 */
export default function ArticleFooter({ pageUrl, pageTitle }: Props) {
  return (
    <ContinuousAside>
      <section className="l-section" aria-label="関連カテゴリ">
        <div className="l-container">
          {/* currentCategory を横断ページ扱いにして全7カテゴリを表示 */}
          <CrossCategoryLinks currentCategory="/smartphone-compare/" />
        </div>
      </section>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
