// ============================================================
// 型落ち・未使用品の狙い方
//
// Search Console 上、Watch は「型落ち」「未使用品」の流入が固有クラスタになっている。
//   アップルウォッチ 型落ち どこで 買う  249表示 10.2位
//   apple watch 型落ち どこで買う        43表示  7.5位
//   apple watch 未使用品                51表示  9.5位
//   apple watch 未使用                  42表示  8.4位
//   アップルウォッチ 型落ち 新品          12表示  3.5位
// 合計で約400表示あるのに、本文では「型落ち」「未使用」が各4回出るだけで
// 見出しが無く、受け皿になっていなかった。
//
// 世代比較は watch_models の実値を根拠にしている（CLAUDE.md の運用ルール）。
// 「新しいから速い」ではなく、何がどれだけ違うのかを数値で書くこと。
// 2026-08-12 時点の DB 値:
//   Series 11 / SE3 / Ultra3 (2025-09) … S10 SiP、サポート中
//   Series 10 (2024-09)               … S10 SiP（11と同一）、サポート中
//   Ultra2 (2023-09)                  … S9 SiP、サポート中
//   Series 9 以前 (2023-09以前)        … 最終 watchOS 26
// ============================================================

export default function OlderModelSection() {
  return (
    <section className="l-section" id="older-model" aria-labelledby="heading-older-model">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-older-model">
          <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> 型落ちApple Watchと未使用品の狙い方
        </h2>
        <p className="m-section-desc">
          中古のApple Watchを探している方の多くは、「型落ちを安く買いたい」か「できるだけ新品に近いものが欲しい」のどちらかです。
        </p>
        <p className="m-section-desc">
          どちらも狙い方にコツがあるので、順に説明します。
        </p>

        <div className="m-card m-card--shadow m-card--padded u-mt-xl">
          <h3 className="post-check-item__heading text-info">
            <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 型落ちならSeries 10が本命
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              型落ちで最もおすすめなのは<strong>Series 10（2024年9月発売）</strong>です。理由は単純で、
              現行のSeries 11と<strong>チップが同じS10 SiP</strong>だからです。処理性能の世代差がありません。
            </p>
            <p>
              違いはバッテリー駆動時間で、Series 11が最大24時間、Series 10が最大18時間です。
              毎晩充電する使い方なら、この6時間の差が問題になる場面はほとんどありません。
              睡眠計測のために1日半持たせたい、という人だけがSeries 11を選ぶ理由を持ちます。
            </p>
            <p>
              Series 10は<strong>まだOSサポートが続いている</strong>点も重要です。
              1世代前でありながら寿命に余裕があるので、型落ちの中では最も安心して選べます。
            </p>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-negative">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Series 9以前は寿命を確認してから
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              安さだけで古い世代を選ぶと、OSサポートの終わりが近い個体を掴むことがあります。
              <strong>Series 9・Series 8・Series 7・Series 6・SE（第2世代）・初代Ultraは、watchOS 26が最後</strong>のバージョンです。
            </p>
            <p>
              さらに古いSeries 4・Series 5・SE（第1世代）は、すでにwatchOS 10で更新が止まっています。
            </p>
            <p>
              価格が数千円しか変わらないなら、サポートが続いているSeries 10やUltra 2を選ぶほうが、
              結果的に長く使えます。<strong>1年あたりいくらで使えるか</strong>で比べてみてください。
            </p>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-caution">
            <i className="fa-solid fa-box-open" aria-hidden="true"></i> 「未使用品」は中古と新品のあいだ
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              検索でよく見る「未使用品」は、<strong>購入されたが使われないまま流通した個体</strong>を指します。
              一度誰かの手に渡っている扱いなので分類は中古ですが、状態は新品同様です。
              一括購入の余剰品や、契約時に付いてきたものが売られるケースが多く見られます。
            </p>
            <p>
              メリットは<strong>傷やバッテリー劣化の心配がほぼない</strong>ことです。新品より安く、
              中古よりは高いという中間の価格帯になります。
            </p>
            <p>
              注意したいのは、未使用品でも<strong>メーカー保証の起算日は最初の購入日</strong>だという点です。
              「未使用だから1年保証がまるまる残っている」とは限りません。
              販売店独自の保証が何日付くかを確認しておくと確実です。
            </p>
            <p>
              旧モデルが新品のまま値下げされて売られていることもあります。型落ちの新品を狙う場合は、
              中古専門店だけでなく家電量販店のアウトレットも見比べる価値があります。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
