import { RECOMMEND_COUNT, RECOMMEND_COUNT_LABEL } from '@/lib/data/macbook-recommend'

export default function CriteriaSection() {
  return (
    <section className="l-section" id="criteria" aria-labelledby="heading-criteria">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-criteria">
          なぜこの{RECOMMEND_COUNT_LABEL}なのか?選んだ判断基準
        </h2>
        <p className="m-section-desc">
          中古MacBookを選ぶなら、「長く使えるか」「快適に動くか」「価格に見合っているか」の3つが重要。
        </p>
        <p className="m-section-desc">
          この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--blue m-icon-box m-icon-box--lg">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">macOSサポートが十分に残っている</h3>
            </div>
            <p className="criteria-card__desc">
              サポートが切れるとセキュリティリスクが高まり、アプリも使えなくなります。
              <strong>2029年以降までサポートされる機種</strong>だけを選んでいます。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--green m-icon-box m-icon-box--lg">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">日常利用でストレスを感じにくい性能</h3>
            </div>
            <p className="criteria-card__desc">
              Web閲覧・オフィス作業・動画視聴で「遅い」「カクつく」と感じにくい性能を基準にしています。
              M2チップ以上のAppleシリコン搭載モデルに絞って選定しています。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--red m-icon-box m-icon-box--lg">
                <i className="fa-solid fa-coins" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">中古価格と性能のバランスが良い</h3>
            </div>
            <p className="criteria-card__desc">
              「残りのサポート期間」と「実際の中古相場」から、1年あたりのコストを計算しています。
              年単価が最も安くなる機種を優先的に選んでいます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
