import { RECOMMEND_COUNT, RECOMMEND_COUNT_LABEL } from '@/lib/data/airpods-recommend'

export default function CriteriaSection() {
  return (
    <section className="l-section" id="criteria" aria-labelledby="heading-criteria">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-criteria">
          なぜこの{RECOMMEND_COUNT_LABEL}なのか?選んだ判断基準
        </h2>
        <p className="m-section-desc">
          中古AirPodsを選ぶなら、「長く使えるか」「必要な機能があるか」「価格に見合っているか」の3つが重要。
        </p>
        <p className="m-section-desc">
          この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--blue">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">ファームウェアサポートが十分に残っている</h3>
            </div>
            <p className="criteria-card__desc">
              サポートが切れると新機能の追加やセキュリティ修正が受けられなくなります。
              <strong>2029年以降までサポートされる機種</strong>だけを選んでいます。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--green">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">用途に合った機能を搭載している</h3>
            </div>
            <p className="criteria-card__desc">
              ノイズキャンセリング・空間オーディオ・防水性能・USB-C対応など、
              使い方に合った機能があるモデルを選定しています。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--red">
                <i className="fa-solid fa-coins" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">中古価格と機能のバランスが良い</h3>
            </div>
            <p className="criteria-card__desc">
              「残りのサポート期間」と「実際の中古相場」から、コストパフォーマンスを評価しています。
              機能の割に価格がこなれたモデルを優先的に選んでいます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
