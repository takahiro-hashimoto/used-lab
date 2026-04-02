import Image from 'next/image'

export default function RunningCostSection() {
  return (
    <section className="l-section" id="running-cost" aria-labelledby="heading-running-cost">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-running-cost">
          iPadカーナビの通信費・ランニングコスト
        </h2>
        <p className="m-section-desc">
          カーナビ用途に必要なデータ量と、おすすめの格安SIMプランを紹介します。
        </p>

        <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
          <div className="media-card__body">
            <p className="media-card__desc">
              カーナビ用途のデータ通信量の目安は<strong>1時間あたり約5〜10MB</strong>程度。月に30時間ナビを使っても<strong>約150〜300MB</strong>なので、1GBプランでも十分足ります。
            </p>
            <p className="media-card__desc">
              音楽ストリーミングや動画再生を併用する場合は、その分のデータ量も加味して<strong>3GB以上のプランを選ぶのがおすすめ</strong>です。iPadはeSIMに対応しているため、SIMカードの差し替え不要でオンラインから即日開通できる事業者も多く、手軽に導入できます。コスパの良い格安SIM事業者は下記の通りです。
            </p>
          </div>

          <div className="m-table-card u-mt-xl">
            <table className="m-table">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>povo2.0</th>
                  <th>IIJmio</th>
                  <th>楽天モバイル</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ロゴ</strong></td>
                  <td>
                    <a href="https://povo.jp/" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/mvno/povo.jpg" alt="povo2.0のロゴ" width={80} height={40} style={{ objectFit: 'contain' }} />
                    </a>
                  </td>
                  <td>
                    <a href="https://www.iijmio.jp/" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/mvno/iijmio.jpg" alt="IIJmioのロゴ" width={80} height={40} style={{ objectFit: 'contain' }} />
                    </a>
                  </td>
                  <td>
                    <a href="https://network.mobile.rakuten.co.jp/" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/mvno/rakuten-mobile.jpg" alt="楽天モバイルのロゴ" width={80} height={40} style={{ objectFit: 'contain' }} />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td><strong>回線</strong></td>
                  <td>au</td>
                  <td>docomo / au</td>
                  <td>楽天</td>
                </tr>
                <tr>
                  <td><strong>プラン</strong></td>
                  <td>1GB（7日間）</td>
                  <td>2GB</td>
                  <td>〜3GB</td>
                </tr>
                <tr>
                  <td><strong>月額（税込）</strong></td>
                  <td>390円</td>
                  <td>440円</td>
                  <td>1,078円</td>
                </tr>
                <tr>
                  <td><strong>eSIM対応</strong></td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <td><strong>特徴</strong></td>
                  <td>基本料0円で必要な時だけトッピング</td>
                  <td>データ専用eSIMが業界最安水準</td>
                  <td>段階制で3GB超は無制限（3,278円）</td>
                </tr>
                <tr>
                  <td><strong>おすすめ度</strong></td>
                  <td>★★★★★</td>
                  <td>★★★★★</td>
                  <td>★★★★☆</td>
                </tr>
                <tr>
                  <td><strong>リンク</strong></td>
                  <td><a href="https://povo.jp/" target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary m-btn--sm">サービス詳細を見る</a></td>
                  <td><a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=892528273" target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary m-btn--sm">サービス詳細を見る</a></td>
                  <td><a href="https://hb.afl.rakuten.co.jp/hgc/258cf4cc.6d6fceff.258cf4cd.200f7802/?pc=https%3A%2F%2Fwww.rakuten.ne.jp%2Fgold%2Frakutenmobile-store%2Fproduct%2Frakuten-certified%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9" target="_blank" rel="noopener noreferrer" className="m-btn m-btn--primary m-btn--sm">サービス詳細を見る</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="m-table-note">※ 2026年4月時点の情報です。最新の料金・プラン内容は各公式サイトをご確認ください。</p>

          <div className="m-callout m-callout--tip u-mt-2xl">
            <p className="m-callout__label">コストを最小限に抑えるには</p>
            <p className="m-callout__body">
              カーナビ専用なら<strong>povo2.0</strong>が最もコスパに優れています。基本料金0円で、必要なときだけ1GB（390円/7日間）をトッピングする使い方が可能。月によって利用頻度が異なる方に最適です。毎日のように使う方は<strong>IIJmioのデータ専用eSIM（2GB/440円）</strong>が業界最安水準で安定しておすすめ。データ量を気にせず使いたい方は<strong>楽天モバイル</strong>なら3GB超でも無制限（3,278円）で利用できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
