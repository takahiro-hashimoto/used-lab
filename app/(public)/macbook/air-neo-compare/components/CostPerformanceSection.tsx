export default function CostPerformanceSection() {
  return (
    <section className="l-section" id="cost-performance" aria-labelledby="heading-cost-performance">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-cost-performance">
          中古MacBook Airと新品MacBook Neo、どちらがコスパがいい？
        </h2>
        <p className="m-section-desc">
          価格の安さだけでなく、メモリ容量・Apple Intelligence・拡張性まで含めて比べるのがポイントです
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">価格重視なら新品Neo</h3>
            <ul className="info-card__list u-mt-md">
              <li>新品で99,800円から買える</li>
              <li>Apple Intelligence対応機種を安く選びやすい</li>
              <li>初めてのMacでも状態確認の手間が少ない</li>
              <li>Web閲覧・文書作成・授業用途なら満足しやすい</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              新品保証込みでこの価格はかなり強く、レポート作成や事務作業が中心ならコストパフォーマンスは高めです。
              一方で、8GB固定、MagSafeなし、外部ディスプレイやUSB-Cの拡張性が控えめな点は理解しておきたいです。
            </p>
          </div>

          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">総合力なら中古Air</h3>
            <ul className="info-card__list u-mt-md">
              <li>中古M1/M2 Airは5万円台から狙える</li>
              <li>M1以降ならApple Intelligenceに対応</li>
              <li>16GBモデルを選べば長く使いやすい</li>
              <li>Thunderbolt 4、MagSafe 3、外部モニター運用で有利</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              中古でも状態の良い個体を選べれば、価格に対する性能と拡張性のバランスは非常に優秀です。
              特にプログラミング学習、写真編集、長期利用まで考えると、中古MacBook Airのほうが結果的に割安になりやすいです。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-xl">
          <span className="m-callout__label">判断の目安</span>
          <p className="m-callout__text">
            とにかく新品を安く買いたいならNeo、性能・拡張性・長期満足度まで含めた総合コスパを重視するなら中古Airがおすすめです。
            迷ったら「メモリ16GBが必要か」「外部ディスプレイを多用するか」を基準にすると選びやすくなります。
          </p>
        </div>
      </div>
    </section>
  )
}
