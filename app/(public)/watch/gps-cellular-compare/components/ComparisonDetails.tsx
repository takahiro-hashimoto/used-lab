export default function ComparisonDetails() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* ①Apple Watch単体で出来る範囲 */}
      <div id="standalone" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">①Apple Watch単体で出来る範囲</h3>
          <p className="popular-card-desc">
            GPSモデルはiPhoneの通信回線に依存して動作しますが、セルラーモデルはeSIMを搭載しておりApple Watch単体での通信が可能です。具体的にどのような違いがあるかを下記の表にまとめました。
          </p>
        </div>

        <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
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
                  <th>電話の受発信</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>メッセージ送受信</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>音楽ストリーミング再生</th>
                  <td>×</td>
                  <td>◯</td>
                </tr>
                <tr>
                  <th>地図アプリの閲覧</th>
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
              </tbody>
            </table>
          </div>
        </div>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            ワークアウトやApple Pay決済はGPSモデルでもApple Watch単体で使えるのは意外と知られていません。<strong>iPhoneが近くにない状態で音楽やメッセージを使いたいかどうか</strong>が、選ぶ際の重要なポイントです。
          </p>
        </div>
      </div>

      {/* ②ランニングコスト */}
      <div id="running-cost" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">②ランニングコスト</h3>
          <p className="popular-card-desc">
            セルラーモデルでモバイル通信を利用するには、iPhoneと同じキャリアで専用の通信オプション（eSIM契約）が必要です。対応キャリアと月額料金は以下のとおりです。
          </p>
        </div>

        <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
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

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            <strong>GPSモデルはこうした通信オプションが不要</strong>なので、ランニングコストは一切かかりません。セルラーモデルの月額費用は年間で約4,600〜6,600円になるため、購入前に把握しておきましょう。
          </p>
        </div>
      </div>

      {/* ③選べる素材の種類 */}
      <div id="material" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">③選べる素材の種類</h3>
          <p className="popular-card-desc">
            GPSモデルはアルミニウムケースのみの展開ですが、セルラーモデルはステンレススチールやチタニウムといった上位素材も選べます。上位素材は価格が高くなりますが、上質な質感と優れた耐久性が魅力です。
          </p>
        </div>

        <div className="m-card m-table-card" style={{ marginTop: 'var(--space-md)' }}>
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
              </tbody>
            </table>
          </div>
        </div>

        <div className="popular-card-body" style={{ marginTop: 'var(--space-md)' }}>
          <p className="popular-card-desc">
            <strong>ステンレスやチタニウム素材が欲しい場合は、セルラーモデルを選ぶ必要があります。</strong>ただし通信契約をせずにGPSモデルと同じ使い方をすることも可能です。
          </p>
        </div>
      </div>

      {/* ④デジタルクラウンのデザイン */}
      <div id="digital-crown" className="m-card m-card--shadow m-card--padded">
        <h3 className="popular-card-title">④デジタルクラウンのデザイン</h3>
        <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
          セルラーモデルのApple Watchには<strong>デジタルクラウンに赤いリング</strong>が刻まれており、モバイル通信対応モデルであることを視覚的に示しています。遠目からでも判別しやすいアクセントです。
        </p>
        <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
          GPSモデルにはこの赤い装飾がないため、外観でも両者を区別することができます。
        </p>
      </div>

      {/* ⑤ファミリー共有 */}
      <div id="family-sharing" className="m-card m-card--shadow m-card--padded">
        <h3 className="popular-card-title">⑤ファミリー共有</h3>
        <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
          セルラーモデルはファミリー共有に対応しており、<strong>1つのiPhoneで複数のApple Watchを管理</strong>することができます。
        </p>
        <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
          たとえばセルラーモデルのApple Watchを小さなお子さんに持たせておけば、離れていてもApple Watchに電話をしてコミュニケーションを取ることが可能です。月額385〜550円なので、スマホを契約するよりもはるかに安く<strong>キッズケータイの代替</strong>として使えるのは嬉しいポイントです。
        </p>
      </div>
    </div>
  )
}
