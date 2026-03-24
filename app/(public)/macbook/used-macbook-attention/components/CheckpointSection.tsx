import RatingMark from '@/app/components/RatingMark'

export default function CheckpointSection() {
  return (
    <section className="l-section" id="checkpoint" aria-labelledby="heading-checkpoint">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checkpoint">
          中古MacBookの選び方チェックポイント10
        </h2>
        <p className="m-section-desc">
          中古MacBook Air/Proは選択肢が豊富なので、どのモデルを選ぶべきか分かりづらいのがネック。<br />
          ここではMacBook Air/Proの各モデルの違いを把握する際に優先してチェックすべき項目を10点紹介します。
        </p>

        {/* 1. CPU */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">1</span>
            CPU（搭載チップ）
          </h3>
          <p className="checkpoint-card__text">
            CPUはApple製（M1〜M4）とIntel製の2種類があり、Apple製の方が処理性能が大幅に高いです。2026年現在、<strong>Intel製MacBookはサポートが終了済みまたは間近のため避けるべき</strong>です。
          </p>
          <div className="checkpoint-card__chips">
            <div className="checkpoint-chip">
              <span className="checkpoint-chip__name">M1</span>
              <span className="checkpoint-chip__desc">文章作成やWeb閲覧など日常的な作業を快適にこなしたい方に</span>
            </div>
            <div className="checkpoint-chip">
              <span className="checkpoint-chip__name">M2</span>
              <span className="checkpoint-chip__desc">写真・動画編集、デザイン、プログラミングを効率よく行いたい方に</span>
            </div>
            <div className="checkpoint-chip">
              <span className="checkpoint-chip__name">M3</span>
              <span className="checkpoint-chip__desc">4K動画編集や3Dグラフィックなど高負荷な作業にも対応したい方に</span>
            </div>
            <div className="checkpoint-chip">
              <span className="checkpoint-chip__name">M4</span>
              <span className="checkpoint-chip__desc">AI活用や高負荷のプロ向け作業に対応した最新チップを使いたい方に</span>
            </div>
          </div>
          <p className="checkpoint-card__link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <a href="/macbook/macbook-spec-table/#benchmark">MacBookの処理性能比較（ベンチマークスコア）</a>
          </p>
        </div>

        {/* 2. ディスプレイサイズ */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">2</span>
            ディスプレイサイズ・本体重量
          </h3>
          <p className="checkpoint-card__text">
            MacBookのディスプレイは13、14、15、16インチの4種類。大きい方がストレージ容量の選択肢が豊富で、バッテリー持ちが良いなどの特徴もあります。下記の表を参考にサイズを決めましょう。
          </p>
          <div className="checkpoint-card__table-wrap">
            <table className="m-table">
              <thead>
                <tr>
                  <th></th>
                  <th>小（13〜14インチ）</th>
                  <th>大（15〜16インチ）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>携帯性</td><td><RatingMark mark="◯" size="sm" /></td><td><RatingMark mark="△" size="sm" /></td></tr>
                <tr><td>バッテリー持ち</td><td><RatingMark mark="△" size="sm" /></td><td><RatingMark mark="◯" size="sm" /></td></tr>
                <tr><td>情報取得効率</td><td><RatingMark mark="△" size="sm" /></td><td><RatingMark mark="◯" size="sm" /></td></tr>
                <tr><td>ストレージ容量</td><td><RatingMark mark="△" size="sm" /></td><td><RatingMark mark="◯" size="sm" /></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. 発売年月日 */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">3</span>
            発売年月日
          </h3>
          <p className="checkpoint-card__text">
            macOSは毎年新しいバージョンが発表されます。発売から約6〜7年が経つと新しいOSにアップデートできなくなるため、古すぎるモデルは避けたほうが無難です。
          </p>
          <p className="checkpoint-card__link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <a href="/macbook/used-macbook-support/">MacBookのmacOSサポート期間一覧</a>
          </p>
        </div>

        {/* 4. メモリ */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">4</span>
            メモリ（RAM）
          </h3>
          <p className="checkpoint-card__text">
            各モデルごとに複数のメモリ構成が選べますが、購入後に拡張することはできません。動画編集や3Dグラフィックソフトを使用する場合は16GB以上を選ぶとサクサク作業できます。
          </p>
        </div>

        {/* 5. ストレージ */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">5</span>
            ストレージ（SSD）
          </h3>
          <p className="checkpoint-card__text">
            各モデルごとに複数のストレージが選べますが、購入後に拡張することはできません。趣味や仕事でハードにMacBookを使いたいなら、予算が許す限り大容量のストレージを選ぶのが吉。
          </p>
        </div>

        {/* 6. インターフェース */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">6</span>
            インターフェース
          </h3>
          <p className="checkpoint-card__text">
            MacBook Proの方がインターフェースが充実しています。複数のモニターに外部出力をしたり、SDカードを頻繁に読み込む場合はMacBook Proがおすすめ。機種ごとにThunderbolt 5、4、3などバージョンが異なります。
          </p>
          <p className="checkpoint-card__link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <a href="/macbook/macbook-spec-table/#spec-table">MacBookのスペック比較一覧</a>
          </p>
        </div>

        {/* 7. 冷却ファン */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">7</span>
            冷却ファン
          </h3>
          <p className="checkpoint-card__text">
            PCの熱暴走を防ぐのに重要な冷却ファンはProモデルのみに搭載されています。高負荷がかかる作業が多いならProモデルがおすすめです。
          </p>
          <div className="checkpoint-card__table-wrap">
            <table className="m-table">
              <thead>
                <tr>
                  <th></th>
                  <th>ファンなし（Air）</th>
                  <th>ファンあり（Pro）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>冷却効率</td><td>低い</td><td>高い</td></tr>
                <tr><td>静音性</td><td>高い</td><td>低い</td></tr>
                <tr><td>ホコリ侵入リスク</td><td>なし</td><td>あり</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 8. キー配列 */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">8</span>
            キー配列の種類（JIS or US配列）
          </h3>
          <p className="checkpoint-card__text">
            国内で販売されている中古MacBookのキーは日本語配列（JIS）または英語配列（US）が主流です。買った後にキー配列は変更できないため、検討中の中古端末が希望の配列か必ずチェックしましょう。
          </p>
        </div>

        {/* 9. Apple Intelligence */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">9</span>
            Apple Intelligence
          </h3>
          <ul className="m-check-list">
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> 文章の生成や校正が簡単にできる</li>
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> 画像生成機能が使える</li>
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> SiriでChatGPTが使用可能</li>
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> M1チップ搭載以降のMacBookに搭載</li>
          </ul>
        </div>

        {/* 10. ProMotion */}
        <div className="m-card m-card--padded checkpoint-card">
          <h3 className="checkpoint-card__title">
            <span className="checkpoint-card__number">10</span>
            ProMotion（リフレッシュレート）
          </h3>
          <ul className="m-check-list">
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> 画面が1秒間に120回書き換わるディスプレイ技術</li>
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> 120Hz対応ゲームでは操作の遅延やカクつきが軽減</li>
            <li className="m-check-list__item"><i className="fa-solid fa-check" aria-hidden="true"></i> Webページのスクロールが非常になめらか</li>
          </ul>
        </div>

      </div>
    </section>
  )
}
