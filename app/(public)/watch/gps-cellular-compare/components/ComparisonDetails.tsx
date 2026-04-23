import Image from 'next/image'
export default function ComparisonDetails() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①Apple Watch単体で出来る範囲 — フルサイズ画像 */}
      <div id="standalone" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <Image
            src="/images/content/photo/ipad-wifi-04.webp"
            alt="Apple Watch単体で通信している様子"
            className="media-card__img"
            width={720}
            height={400} sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①Apple Watch単体で出来る範囲</h3>
          <p className="media-card__desc">
            GPSモデルはiPhoneとのペアリングを前提に設計されており、<strong>BluetoothまたはWi-Fi経由</strong>でiPhoneの通信回線に依存して動作します。一方、セルラーモデルはeSIMを搭載しており<strong>LTE通信</strong>に対応しているため、Apple Watch単体での通信が可能です。
          </p>
          <p className="media-card__desc">
            ワークアウトやApple Pay決済はGPSモデルでも単体で使えますが、<strong>iPhoneが近くにない状態でApple MusicやLINE、Siriを使いたいかどうか</strong>が選ぶ際の重要なポイントです。
          </p>
        </div>

        <div className="m-card m-table-card u-mt-md">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th>機能</th>
                  <th>GPSモデル</th>
                  <th>セルラーモデル</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>電話の発着信（通話）</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>メッセージ / LINE送受信</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>Apple Musicストリーミング</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>Siri（音声アシスタント）</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>マップ / ナビゲーション</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>天気アプリの確認</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>ワークアウト記録</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>アクティビティ記録</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>Apple Pay決済</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>Suicaチャージ・改札</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>緊急SOS</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>転倒検出 / 衝突事故検出</th>
                  <td>◯</td>
                  <td>◯</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-xl">
          <span className="m-callout__label">ポイント</span>
          <p className="m-callout__text">
            緊急SOSや転倒検出はGPSモデルでも動作しますが、iPhoneが近くにない場合は<strong>セルラーモデルでなければ自動的に緊急通報できません</strong>。安全面を重視するならセルラーモデルが安心です。
          </p>
        </div>
      </div>

      {/* ②ランニングコスト — フルサイズ画像 */}
      <div id="running-cost" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <Image
            src="/images/content/photo/nomad-stratos-band0008.jpg"
            alt="Apple Watchのセルラー通信にかかるランニングコストのイメージ"
            className="media-card__img"
            width={720}
            height={400} sizes="(max-width: 768px) 100vw, 720px" />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②ランニングコスト</h3>
          <p className="media-card__desc">
            セルラーモデルでモバイル通信を利用するには、iPhoneと同じキャリアで専用の通信オプション（eSIM契約）が必要です。<strong>GPSモデルは通信オプションが不要</strong>なのでランニングコストは一切かかりません。
          </p>
          <p className="media-card__desc">
            セルラーモデルの月額費用は年間で約4,600〜6,600円になるため、購入前に把握しておきましょう。
          </p>
        </div>

        <div className="m-card m-table-card u-mt-md">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th>キャリア</th>
                  <th>サービス名</th>
                  <th>月額（税込）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>ドコモ</th>
                  <td>ワンナンバーサービス</td>
                  <td>550円</td>
                </tr>
                <tr>
                  <th>au</th>
                  <td>ナンバーシェア</td>
                  <td>385円</td>
                </tr>
                <tr>
                  <th>SoftBank</th>
                  <td>Apple Watchモバイル通信サービス</td>
                  <td>385円</td>
                </tr>
                <tr>
                  <th>楽天モバイル</th>
                  <td>電話番号シェアサービス</td>
                  <td>550円</td>
                </tr>
                <tr>
                  <th>ahamo</th>
                  <td>ワンナンバーサービス</td>
                  <td>550円</td>
                </tr>
                <tr>
                  <th>irumo</th>
                  <td>ワンナンバーサービス</td>
                  <td>550円</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-xl">
          <span className="m-callout__label">ポイント</span>
          <p className="m-callout__text">
            <strong>格安SIM（MVNO）ではApple Watchのセルラー通信は利用できません。</strong>povo・LINEMO・Y!mobile・UQモバイルなどのサブブランドも現時点では非対応です。セルラーモデルの通信機能を使うには、上記の大手キャリア回線が必要になる点に注意してください。
          </p>
        </div>
      </div>

      {/* ③選べる素材の種類 — 横並び */}
      <div id="material" className="m-card m-card--shadow m-card--padded">
        <div className="media-card--aside">
          <div className="media-card__img-wrap">
            <Image
              src="/images/content/thumbnail/apple-watch-type.jpg"
              alt="Apple Watchのアルミニウム・ステンレス・チタニウム素材"
              className="media-card__img"
              width={240}
              height={160} sizes="(max-width: 480px) 100vw, 240px" />
          </div>
          <div className="media-card__body">
            <h3 className="media-card__title">③選べる素材の種類</h3>
            <p className="media-card__desc">
              GPSモデルはアルミニウムケースのみの展開ですが、セルラーモデルはステンレススチールやチタニウムといった上位素材も選べます。
            </p>
            <p className="media-card__desc">
              <strong>ステンレスやチタニウム素材が欲しい場合は、セルラーモデルを選ぶ必要があります。</strong>ただし通信契約をせずにGPSモデルと同じ使い方をすることも可能です。
            </p>
            <p className="media-card__desc">
              なお<strong>Apple Watch Ultraはセルラーモデルのみ</strong>の展開です。
            </p>
            <div className="m-card m-table-card u-mt-md">
              <div className="m-table-scroll">
                <table className="m-table m-table--center">
                  <thead>
                    <tr>
                      <th></th>
                      <th>アルミニウム</th>
                      <th>ステンレス</th>
                      <th>チタニウム</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>GPSモデル</th>
                      <td>◯</td>
                      <td>×</td>
                      <td>×</td>
                    </tr>
                    <tr>
                      <th>セルラーモデル</th>
                      <td>◯</td>
                      <td>◯</td>
                      <td>◯</td>
                    </tr>
                    <tr>
                      <th>Ultra（セルラーのみ）</th>
                      <td>×</td>
                      <td>×</td>
                      <td>◯</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ④本体価格の差 — 横並び */}
      <div id="price-diff" className="m-card m-card--shadow m-card--padded">
        <div className="media-card--aside">
          <div className="media-card__img-wrap">
            <Image
              src="/images/content/thumbnail/apple-watch-image.jpg"
              alt="Apple Watch GPSモデルとセルラーモデルの価格差イメージ"
              className="media-card__img"
              width={240}
              height={160} sizes="(max-width: 480px) 100vw, 240px" />
          </div>
          <div className="media-card__body">
            <h3 className="media-card__title">④本体価格の差</h3>
            <p className="media-card__desc">
              同じケースサイズ・素材で比較すると、セルラーモデルはGPSモデルより<strong>約1万〜1.5万円ほど高い</strong>のが一般的です。
            </p>
            <p className="media-card__desc">
              さらにセルラーモデルは月額の通信費もかかるため、トータルコストの差はさらに広がります。
            </p>
            <div className="m-card m-table-card u-mt-md">
              <div className="m-table-scroll">
                <table className="m-table m-table--center">
                  <thead>
                    <tr>
                      <th>モデル</th>
                      <th>GPSモデル</th>
                      <th>セルラーモデル</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Series 10（アルミ・42mm）</th>
                      <td>59,800円〜</td>
                      <td>75,800円〜</td>
                    </tr>
                    <tr>
                      <th>SE 第2世代（アルミ・40mm）</th>
                      <td>34,800円〜</td>
                      <td>39,800円〜</td>
                    </tr>
                    <tr>
                      <th>Ultra 2（チタニウム・49mm）</th>
                      <td>—</td>
                      <td>128,800円〜</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⑤バッテリー持ちの違い — 横並び */}
      <div id="battery" className="m-card m-card--shadow m-card--padded">
        <div className="media-card--aside">
          <div className="media-card__img-wrap">
            <Image
              src="/images/content/thumbnail/watch-charge.jpg"
              alt="Apple Watchのバッテリー残量表示"
              className="media-card__img"
              width={240}
              height={160} sizes="(max-width: 480px) 100vw, 240px" />
          </div>
          <div className="media-card__body">
            <h3 className="media-card__title">⑤バッテリー持ちの違い</h3>
            <p className="media-card__desc">
              GPSモデルとセルラーモデルのバッテリー容量は同じで、Apple公称の<strong>最大18時間</strong>という数値も共通です。ただしセルラーモデルでLTE通信を利用すると、Bluetooth接続時よりもバッテリー消費が早くなります。
            </p>
            <p className="media-card__desc">
              普段はiPhoneと一緒に持ち歩き、ランニング時だけセルラー通信を使うといった使い方であれば、バッテリーへの影響は限定的です。<strong>常時セルラー通信をオンにしない限り、実用上の差はほとんどありません。</strong>
            </p>
            <p className="media-card__desc">
              なお、watchOSのアップデートで省電力モードが搭載されており、バッテリーが少なくなった際は最大36時間まで使用を延長できます。
            </p>
          </div>
        </div>
      </div>

      {/* ⑥デジタルクラウンのデザイン — 横並び */}
      <div id="digital-crown" className="m-card m-card--shadow m-card--padded">
        <div className="media-card--aside">
          <div className="media-card__img-wrap">
            <Image
              src="/images/content/thumbnail/digital-crown.jpg"
              alt="セルラーモデルのデジタルクラウンにある赤いリング"
              className="media-card__img"
              width={240}
              height={160} sizes="(max-width: 480px) 100vw, 240px" />
          </div>
          <div className="media-card__body">
            <h3 className="media-card__title">⑥デジタルクラウンのデザイン</h3>
            <p className="media-card__desc">
              セルラーモデルのApple Watchには<strong>デジタルクラウンに赤いリング</strong>が刻まれており、モバイル通信対応モデルであることを視覚的に示しています。遠目からでも判別しやすいアクセントです。
            </p>
            <p className="media-card__desc">
              GPSモデルにはこの赤い装飾がないため、外観でも両者を見分けることができます。中古で購入する際のモデル判別にも役立つポイントです。
            </p>
          </div>
        </div>
      </div>

      {/* ⑦ファミリー共有 — 横並び */}
      <div id="family-sharing" className="m-card m-card--shadow m-card--padded">
        <div className="media-card--aside">
          <div className="media-card__img-wrap">
            <Image
              src="/images/content/thumbnail/watch-image-07.jpg"
              alt="Apple Watchのファミリー共有で子どもと連絡を取るイメージ"
              className="media-card__img"
              width={240}
              height={160} sizes="(max-width: 480px) 100vw, 240px" />
          </div>
          <div className="media-card__body">
            <h3 className="media-card__title">⑦ファミリー共有</h3>
            <p className="media-card__desc">
              セルラーモデルはファミリー共有に対応しており、<strong>1つのiPhoneで複数のApple Watchを管理</strong>することができます。iPhoneを持たないお子さんやシニア世代でもApple Watchを利用できるのが大きな特徴です。
            </p>
            <p className="media-card__desc">
              たとえばセルラーモデルのApple Watchを小さなお子さんに持たせておけば、離れていてもApple Watchに電話をしてコミュニケーションを取ることが可能です。月額385〜550円なので、スマホを契約するよりもはるかに安く<strong>キッズケータイの代替</strong>として活用できます。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
