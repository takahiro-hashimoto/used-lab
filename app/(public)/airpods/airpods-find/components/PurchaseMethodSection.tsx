import Image from 'next/image'

export default function PurchaseMethodSection() {
  const appleStorePrices = [
    { model: 'AirPods Pro 2（USB-C）', case: '15,800円', earphone: '14,400円' },
    { model: 'AirPods Pro 2（Lightning）', case: '15,800円', earphone: '14,400円' },
    { model: 'AirPods Pro 1', case: '15,800円', earphone: '14,400円' },
    { model: 'AirPods 4（ワイヤレス）', case: '12,800円', earphone: '11,400円' },
    { model: 'AirPods 4', case: '11,400円', earphone: '11,400円' },
    { model: 'AirPods 3（MagSafe）', case: '12,000円', earphone: '11,400円' },
    { model: 'AirPods 3（Lightning）', case: '11,400円', earphone: '11,400円' },
    { model: 'AirPods 2（ワイヤレス）', case: '12,800円', earphone: '11,400円' },
    { model: 'AirPods 2（Lightning）', case: '9,000円', earphone: '11,400円' },
  ]

  return (
    <>
      {/* Appleストア */}
      <div className="m-card m-card--shadow m-card--padded">
        <h3 className="media-card__title">Appleストアで購入する</h3>
        <p className="m-body-text u-mt-sm">
          AirPodsのケースやイヤホン片方を紛失した場合、<a href="https://support.apple.com/ja-jp/airpods/repair" target="_blank" rel="noopener noreferrer">Appleストアの修理サービス</a>から欠けてしまったパーツを購入することが可能です。新品に交換してもらえるのは大きなメリットですが、価格が高めなのがネックです。
        </p>
        <div className="m-table-card u-mt-md">
          <div className="m-table-scroll">
            <table className="m-table">
              <thead>
                <tr>
                  <th>モデル</th>
                  <th>充電ケース</th>
                  <th>片耳</th>
                </tr>
              </thead>
              <tbody>
                {appleStorePrices.map((p) => (
                  <tr key={p.model}>
                    <td>{p.model}</td>
                    <td style={{ textAlign: 'center' }}>{p.case}</td>
                    <td style={{ textAlign: 'center' }}>{p.earphone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* メルカリ */}
      <div className="m-card m-card--shadow m-card--padded">
        <Image src="/images/content/photo/mercari-airpods.webp" alt="メルカリのAirPods検索結果" width={800} height={450} loading="lazy" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--color-border-light)' }} />
        <h3 className="media-card__title">メルカリ・ラクマで購入する</h3>
        <p className="m-body-text u-mt-sm">
          メルカリやラクマといったフリマサービスでも「AirPods 片方」「AirPods ケースのみ」などのキーワードで検索すると多数の出品アイテムがヒットします。Appleストアに比べると相場はぐっと安くなりますが、出品者の信頼性や購入後のトラブルには注意が必要です。
        </p>
        <div className="m-callout m-callout--tip u-mt-md">
          <span className="m-callout__label">
            <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
            メルカリで代替品をお得に購入
          </span>
          <ul className="u-mt-xs" style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
            <li><a href="https://jp.mercari.com/search?keyword=airpods+%E7%89%87%E8%80%B3" target="_blank" rel="noopener noreferrer nofollow">AirPods「イヤホン片方のみ」の在庫を見る</a></li>
            <li><a href="https://jp.mercari.com/search?keyword=airpods+%E3%82%B1%E3%83%BC%E3%82%B9%E3%81%AE%E3%81%BF" target="_blank" rel="noopener noreferrer nofollow">AirPods「ケースのみ」の在庫を見る</a></li>
          </ul>
        </div>
      </div>

      {/* eイヤホン */}
      <div className="m-card m-card--shadow m-card--padded">
        <Image src="/images/content/photo/e-earphone-airpods-01.webp" alt="eイヤホンのAirPods販売ページ" width={800} height={450} loading="lazy" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--color-border-light)' }} />
        <h3 className="media-card__title" id="recommend-shop">eイヤホンで購入する（おすすめ）</h3>
        <p className="m-body-text u-mt-sm">
          Appleストアでは費用が高く、フリマでは品質に不安が残る。そこでおすすめなのが、イヤホン専門店の<strong>eイヤホン</strong>で欠けたパーツを買う方法です。
        </p>
        <ul className="media-card__list u-mt-lg">
          <li>AirPodsの片耳 or ケースのみの買取りを行っているため、<strong>豊富な選択肢</strong>から欠けたパーツを購入可能</li>
          <li>中古品なので<strong>価格が安く</strong>、状態の評価もプロが正しく行っている</li>
          <li><strong>AmazonPay</strong>に対応しているので支払いが簡単</li>
          <li><strong>楽天ペイ</strong>にも対応し、楽天ポイントが付与される</li>
        </ul>
        <p className="m-body-text u-mt-md">
          実際にeイヤホンで片耳AirPods Pro（第2世代）を購入してみましたが、梱包が丁寧なのはもちろんのこと、<strong>しっかり状態や保証期間が記載されたシートも同梱されている</strong>のが好印象でした。
        </p>
        <div className="m-callout m-callout--tip u-mt-lg">
          <span className="m-callout__label">
            <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
            eイヤホンで代替品をお得に購入
          </span>
          <ul className="u-mt-xs" style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
            <li><a href="https://px.a8.net/svt/ejp?a8mat=3T8VI7+EX11Z6+55QO+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.e-earphone.jp%2Fsearch%3Ftype%3Dproduct%26options%255Bprefix%255D%3Dlast%26q%3DAirPods%2B%25E7%2589%2587%25E8%2580%25B3%26filter.p.m.custom.is_on_sale%3D%25E8%25B2%25A9%25E5%25A3%25B2%25E4%25B8%25AD" target="_blank" rel="noopener noreferrer nofollow" style={{ color: 'var(--color-primary)' }}>片耳のみの中古AirPodsを見る</a></li>
            <li><a href="https://px.a8.net/svt/ejp?a8mat=3T8VI7+EX11Z6+55QO+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.e-earphone.jp%2Fsearch%3Ftype%3Dproduct%26options%255Bprefix%255D%3Dlast%26q%3DAirPods%2B%25E5%2585%2585%25E9%259B%25BB%25E3%2582%25B1%25E3%2583%25BC%25E3%2582%25B9%26filter.p.m.custom.is_on_sale%3D%25E8%25B2%25A9%25E5%25A3%25B2%25E4%25B8%25AD" target="_blank" rel="noopener noreferrer nofollow" style={{ color: 'var(--color-primary)' }}>充電ケースのみの中古AirPodsを見る</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
