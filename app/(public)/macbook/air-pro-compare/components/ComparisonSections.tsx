import Image from 'next/image'

export default function ComparisonSections() {
  const imgStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--space-lg)',
  }

  const sectionGap = 'var(--space-2xl)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, marginTop: sectionGap }}>

      {/* ── 冷却方式と持続性能 ── */}
      <div id="cooling">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/used-lab-image-4.jpg" alt="冷却方式と持続性能" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">冷却方式と持続性能</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            <strong>MacBook Airはファンレス設計</strong>のため、動作中も完全に無音です。Web閲覧や事務作業など日常的な用途では快適ですが、動画書き出しのような高負荷の処理を長時間続けると、チップの発熱を逃がしきれず処理速度が低下する（サーマルスロットリング）ことがあります。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            一方<strong>MacBook Proはファンを搭載</strong>しているため、高負荷が続いても冷却を維持し、チップ本来の性能を長時間発揮できます。ただし、普段使いではファンが回ることはほぼなく静かです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2.2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-lg)' }}>
            <li>4K動画の書き出し・レンダリング → <strong>Pro有利</strong></li>
            <li>Xcodeでの大規模ビルド → <strong>Pro有利</strong></li>
            <li>Web閲覧・事務作業・SNS → <strong>差なし</strong></li>
            <li>写真編集・軽い動画カット → <strong>差なし</strong></li>
          </ul>
        </div>
      </div>

      {/* ── チップ性能の違い ── */}
      <div id="chip">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/m2.webp" alt="チップ性能の違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">チップ性能の違い</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Airには各世代の<strong>無印チップ（M1、M2、M3、M4）</strong>が搭載されます。MacBook Proは無印チップに加えて<strong>Pro / Maxチップ</strong>を選択でき、CPU・GPUのコア数が多くメモリ帯域幅も広い上位構成が選べます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            同じM4チップ同士であればAirとProの基本性能は同等です。Proを選ぶ意味があるのは、<strong>Pro/Maxチップが必要な作業をする場合</strong>か、<strong>ファンによる持続性能が重要な場合</strong>です。各チップの違いは以下の通りです。
          </p>

          <div className="m-table-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>チップ</th>
                    <th>搭載モデル</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>M4</th>
                    <td>Air / Pro</td>
                    <td>日常〜中程度の作業に十分</td>
                  </tr>
                  <tr>
                    <th>M4 Pro</th>
                    <td>Proのみ</td>
                    <td>マルチコア性能が高く動画編集向き</td>
                  </tr>
                  <tr>
                    <th>M4 Max</th>
                    <td>Proのみ</td>
                    <td>GPU性能が極めて高い。3D・映像制作向け</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── ディスプレイの違い ── */}
      <div id="display">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/macbook-peep-prevention-filter-front-02.jpg" alt="ディスプレイの違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">ディスプレイの違い</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Airは<strong>Liquid Retinaディスプレイ（60Hz）</strong>を搭載。十分に美しい画面ですが、リフレッシュレートは標準的な60Hzです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Pro（14/16インチ）は<strong>Liquid Retina XDRディスプレイ（ProMotion 120Hz）</strong>を搭載。スクロールやアニメーションが非常になめらかで、HDRコンテンツの表示にも対応。輝度も最大1,600ニトと高く、屋外での作業でも見やすいです。
          </p>

          <div className="m-table-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>Air</th>
                    <th>Pro（14/16インチ）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>リフレッシュレート</th>
                    <td>60Hz</td>
                    <td>最大120Hz（ProMotion）</td>
                  </tr>
                  <tr>
                    <th>最大輝度</th>
                    <td>500ニト</td>
                    <td>1,000〜1,600ニト</td>
                  </tr>
                  <tr>
                    <th>HDR対応</th>
                    <td>非対応</td>
                    <td>対応</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── ポート・拡張性の違い ── */}
      <div id="port">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/review-macbook-14inch-2021-sdcard-slot.jpg" alt="ポート・拡張性の違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">ポート・拡張性の違い</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Airは<strong>USB-Cポート×2 + MagSafe充電</strong>のシンプルな構成。外付けディスプレイやSDカード、有線LANなどを使いたい場合はUSBハブが必要です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Pro（14/16インチ）は<strong>USB-C×3 + HDMI + SDカードスロット + MagSafe</strong>を備えており、ハブなしで多くのデバイスを接続可能です。プロジェクターや外部モニターにHDMIケーブル一本で繋がるのは特に便利です。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2.2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-lg)' }}>
            <li>カメラのSDカードを直接読み込んで写真を取り込む</li>
            <li>会議室のプロジェクターにHDMIで接続</li>
            <li>外部ディスプレイ+外付けストレージを同時接続</li>
          </ul>
        </div>
      </div>

      {/* ── 外部ディスプレイの違い ── */}
      <div id="external-display">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/desk-tour-2025-entire-image.jpg" alt="外部ディスプレイの接続台数" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">外部ディスプレイの接続台数</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Airは<strong>M1/M2モデルで最大1台</strong>、M3/M4モデルではクラムシェルモード（本体を閉じた状態）時に<strong>最大2台</strong>の外部ディスプレイに対応します。ただし、本体ディスプレイを開いた状態では1台までという制限があります。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Proは<strong>M4 Proで最大2台、M4 Maxで最大4台</strong>の外部ディスプレイに同時接続が可能です。本体ディスプレイを開いたまま複数の外部モニターを使えるため、マルチモニター環境を構築したい方にはProが圧倒的に有利です。
          </p>

          <div className="m-table-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>モデル</th>
                    <th>チップ</th>
                    <th>外部ディスプレイ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Air（M1/M2）</th>
                    <td>M1 / M2</td>
                    <td>最大1台</td>
                  </tr>
                  <tr>
                    <th>Air（M3/M4）</th>
                    <td>M3 / M4</td>
                    <td>最大2台（クラムシェル時）</td>
                  </tr>
                  <tr>
                    <th>Pro（無印チップ）</th>
                    <td>M3 / M4</td>
                    <td>最大2台</td>
                  </tr>
                  <tr>
                    <th>Pro（Proチップ）</th>
                    <td>M4 Pro 等</td>
                    <td>最大2〜3台</td>
                  </tr>
                  <tr>
                    <th>Pro（Maxチップ）</th>
                    <td>M4 Max 等</td>
                    <td>最大4台</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── 重量とバッテリーの違い ── */}
      <div id="weight">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/review-macbook-14inch-2021-summary.jpg" alt="重量とバッテリーの違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">重量とバッテリーの違い</h3>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Air 13インチは<strong>約1.24kg</strong>と非常に軽量で、カバンに入れても負担になりません。15インチでも約1.51kgと、持ち運びを重視する方にはAirが最適です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
            MacBook Pro 14インチは<strong>約1.55kg</strong>、16インチは<strong>約2.14kg</strong>。Airより重くなりますが、バッテリー持続時間はProの方が長く、14インチで最大17時間、16インチで最大24時間と大容量です。
          </p>

          <div className="m-table-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>モデル</th>
                    <th>重量</th>
                    <th>バッテリー</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Air 13インチ</th>
                    <td>約1.24kg</td>
                    <td>最大18時間</td>
                  </tr>
                  <tr>
                    <th>Air 15インチ</th>
                    <td>約1.51kg</td>
                    <td>最大18時間</td>
                  </tr>
                  <tr>
                    <th>Pro 14インチ</th>
                    <td>約1.55kg</td>
                    <td>最大17時間</td>
                  </tr>
                  <tr>
                    <th>Pro 16インチ</th>
                    <td>約2.14kg</td>
                    <td>最大24時間</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
