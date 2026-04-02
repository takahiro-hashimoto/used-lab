export default function ComparisonSections() {
  const sectionGap = 'var(--space-2xl)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, marginTop: sectionGap }}>

      {/* ── チップ・モデム ── */}
      <div id="chip">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">チップとモバイル通信モデム</h3>
          <p className="popular-card-desc u-mt-md">
            iPhone 16eは<strong>A18チップ</strong>を搭載し、iPhone 17eは後継の<strong>A19チップ</strong>にアップグレードされています。世代が1つ進んだことで、CPU・GPU・Neural Engineすべてで処理効率の改善が見込まれます。
          </p>
          <p className="popular-card-desc u-mt-md">
            最も大きな変化はモバイル通信モデムです。iPhone 16eはQualcomm製モデムを使用していますが、iPhone 17eでは<strong>Apple自社設計のC1Xモデム</strong>を初搭載しています。これにより電力効率の改善が期待されます。
          </p>

          <div className="m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th></th>
                    <th>iPhone 16e</th>
                    <th>iPhone 17e</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>チップ</th>
                    <td>A18</td>
                    <td>A19</td>
                  </tr>
                  <tr>
                    <th>CPU</th>
                    <td>6コア</td>
                    <td>6コア（2高性能+4高効率）</td>
                  </tr>
                  <tr>
                    <th>GPU</th>
                    <td>5コア</td>
                    <td>4コア（Neural Accelerator搭載）</td>
                  </tr>
                  <tr>
                    <th>Neural Engine</th>
                    <td>16コア</td>
                    <td>16コア</td>
                  </tr>
                  <tr>
                    <th>モデム</th>
                    <td>Qualcomm製</td>
                    <td>Apple C1X（自社設計）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── カメラ ── */}
      <div id="camera">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">カメラ性能</h3>
          <p className="popular-card-desc u-mt-md">
            メインカメラはどちらも<strong>48MP Fusionカメラ（ƒ/1.6）</strong>で、2倍望遠（12MP）での撮影にも対応しています。基本的なカメラ構成は同等です。
          </p>
          <p className="popular-card-desc u-mt-md">
            iPhone 17eではフォーカスシステムに<strong>Hybrid Focus Pixels</strong>が採用されており、オートフォーカスの精度が向上しています。またフロントカメラもFocus Pixelsによるオートフォーカスに対応しています。
          </p>
          <p className="popular-card-desc u-mt-md">
            どちらもナイトモード、ポートレートモード、フォトグラフスタイル、4Kドルビービジョン撮影に対応しており、日常的なカメラ利用で大きな差は感じにくいでしょう。
          </p>
        </div>
      </div>

      {/* ── ディスプレイ ── */}
      <div id="display">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">ディスプレイ</h3>
          <p className="popular-card-desc u-mt-md">
            どちらも<strong>6.1インチのSuper Retina XDR OLEDディスプレイ</strong>を搭載しています。リフレッシュレートは両モデルとも60Hzで、ProMotion（120Hz）には非対応です。
          </p>
          <p className="popular-card-desc u-mt-md">
            解像度はiPhone 16eが2,556 x 1,179ピクセル、iPhone 17eが2,532 x 1,170ピクセルとわずかに異なりますが、どちらも460ppiで見た目の差はほぼありません。
          </p>
          <p className="popular-card-desc u-mt-md">
            ピーク輝度はiPhone 17eが屋外1,200ニト（HDR）と記載されています。HDRコンテンツの視聴や明るい屋外での視認性は同程度です。
          </p>
        </div>
      </div>

      {/* ── ストレージ ── */}
      <div id="storage">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">ストレージと価格構成</h3>
          <p className="popular-card-desc u-mt-md">
            iPhone 16eは<strong>128GB / 256GB / 512GB</strong>の3構成から選べますが、iPhone 17eでは128GBが廃止され<strong>256GB / 512GB</strong>の2構成になりました。
          </p>
          <p className="popular-card-desc u-mt-md">
            Apple Intelligenceのオンデバイスモデルだけで約7GBを使用するため、最小256GBへの引き上げは実用面で歓迎できる変更です。128GBモデルが必要な方は、iPhone 16eが選択肢になります。
          </p>
        </div>
      </div>

      {/* ── デザイン・サイズ ── */}
      <div id="design">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">デザイン・サイズ・重量</h3>
          <p className="popular-card-desc u-mt-md">
            サイズはほぼ同じですが、iPhone 17eの方がやや厚く（+0.55mm）、重く（+6g）なっています。これはApple C1Xモデム搭載に伴う内部設計の変更が影響していると考えられます。
          </p>

          <div className="m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th></th>
                    <th>iPhone 16e</th>
                    <th>iPhone 17e</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>高さ</th>
                    <td>147.7mm</td>
                    <td>146.7mm</td>
                  </tr>
                  <tr>
                    <th>幅</th>
                    <td>71.5mm</td>
                    <td>71.5mm</td>
                  </tr>
                  <tr>
                    <th>厚さ</th>
                    <td>7.25mm</td>
                    <td>7.80mm</td>
                  </tr>
                  <tr>
                    <th>重量</th>
                    <td>163g</td>
                    <td>169g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="popular-card-desc u-mt-md">
            カラーバリエーションはiPhone 16eがブラック・ホワイト・コーラル・ティールの4色、iPhone 17eがブラック・ホワイト・ソフトピンクの3色です。どちらもアルミニウム筐体にガラス背面、Ceramic Shield 2の前面保護を採用しています。
          </p>
        </div>
      </div>

      {/* ── MagSafe・充電 ── */}
      <div id="charging">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">充電とMagSafe</h3>
          <p className="popular-card-desc u-mt-md">
            有線での高速充電（30分で最大50%）やQi2ワイヤレス充電（最大15W）は両モデル共通です。
          </p>
          <p className="popular-card-desc u-mt-md">
            MagSafeワイヤレス充電には差があり、iPhone 16eは<strong>最大25W</strong>に対し、iPhone 17eは<strong>最大15W</strong>です。MagSafeでの充電速度を重視する方はiPhone 16eの方が有利です。
          </p>
        </div>
      </div>

      {/* ── カメラコントロール ── */}
      <div id="controls">
        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="popular-card-title">操作性：カメラコントロール</h3>
          <p className="popular-card-desc u-mt-md">
            iPhone 16eには<strong>カメラコントロールボタン</strong>が搭載されており、カメラの起動やズーム・露出調整を物理ボタンで直感的に操作できます。iPhone 17eにはこの機能は搭載されていません。
          </p>
          <p className="popular-card-desc u-mt-md">
            一方、どちらも<strong>アクションボタン</strong>は搭載しており、消音モード・カメラ起動・フラッシュライトなど好みの機能を割り当てることができます。
          </p>
        </div>
      </div>

    </div>
  )
}
