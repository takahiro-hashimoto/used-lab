import Image from 'next/image'
import Link from 'next/link'
import { BenchBar } from '@/app/components/spec-table-utils'

const benchmarkRows = [
  { label: 'MBA 13インチ M4', single: 3687, multi: 14677, metal: 54642, highlight: false },
  { label: 'MBA 13インチ M3', single: 3065, multi: 11959, metal: 47712, highlight: false },
  { label: 'MBA 13インチ M2', single: 2586, multi: 9670, metal: 42171, highlight: false },
  { label: 'MBA 13インチ M1', single: 2346, multi: 8346, metal: 33115, highlight: false },
  { label: 'MacBook Neo', single: 3330, multi: 7200, metal: 28942, highlight: true },
] as const

const maxSingle = Math.max(...benchmarkRows.map((row) => row.single))
const maxMulti = Math.max(...benchmarkRows.map((row) => row.multi))
const maxMetal = Math.max(...benchmarkRows.map((row) => row.metal))

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

      {/* ── チップとパフォーマンスの違い ── */}
      <div id="chip">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/m2.webp" alt="チップとパフォーマンスの違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">チップとパフォーマンスの違い</h3>
          <p className="media-card__desc u-mt-md">
            MacBook AirはMac専用の<strong>Apple Silicon（M1〜M4）</strong>を搭載。MacBook Neoは2026年発売の新製品で、iPhoneやiPadに使われている<strong>A18 Proチップ</strong>を採用しています。
          </p>
          <p className="media-card__desc u-mt-md">
            シングルコア性能はNeoのA18 Proが優秀で、M1 Airと比べると約48%高速です。
          </p>
          <p className="media-card__desc u-mt-md">
            一方で、現行のMacBook AirはM5世代まで進んでおり、マルチコア性能やGPU性能、長時間の作業ではAirが有利な場面もあります。
          </p>
          <p className="media-card__desc u-mt-md">
            <strong>Web閲覧や文書作成の体感差は大きくありません</strong>が、両機ともファンレス設計のため長時間の高負荷作業では速度が落ちることがあります。
          </p>
          <p className="media-card__desc u-mt-md">
            MacBook Neoの仕様や使い勝手をもっと詳しく知りたい方は、
            {' '}<Link href="/macbook/mbn-13-2026/">MacBook Neo 13インチの個別記事</Link>
            {' '}もあわせてご覧ください。
          </p>

          <div className="m-card m-card--shadow m-table-card u-mt-lg">
            <div style={{ height: 1, marginBottom: -1 }}></div>
            <table className="m-table">
              <caption className="visually-hidden">MacBook Air 13インチとMacBook NeoのGeekbench 6ベンチマークスコア比較</caption>
              <thead>
                <tr>
                  <th scope="col">モデル</th>
                  <th scope="col">シングルコア</th>
                  <th scope="col">マルチコア</th>
                  <th scope="col">Metal</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkRows.map((row) => (
                  <tr key={row.label}>
                    <td className={row.highlight ? 'm-table-highlight' : undefined}>{row.label}</td>
                    <td className={row.highlight ? 'm-table-highlight' : undefined}>
                      <BenchBar value={row.single} maxValue={maxSingle} color="#e74c6f" />
                    </td>
                    <td className={row.highlight ? 'm-table-highlight' : undefined}>
                      <BenchBar value={row.multi} maxValue={maxMulti} color="#f0a030" />
                    </td>
                    <td className={row.highlight ? 'm-table-highlight' : undefined}>
                      <BenchBar value={row.metal} maxValue={maxMetal} color="var(--color-primary)" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Apple IntelligenceとAI機能 ── */}
      <div id="ai">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/macbook-edit.webp" alt="Apple IntelligenceとAI機能" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">Apple IntelligenceとAI機能の違い</h3>
          <p className="media-card__desc u-mt-md">
            <strong>MチップのMacBook AirはM1以降の全機種でApple Intelligenceに対応</strong>しています。文章生成・要約・画像生成・Siri強化など、中古のM1 / M2 / M3モデルでも一通り使えます。
          </p>
          <p className="media-card__desc u-mt-md">
            MacBook NeoもA18 ProのNeural Engineで<strong>同様にApple Intelligenceに対応</strong>しており、AI機能の面では両機に差はありません。
          </p>
          <p className="media-card__desc u-mt-md">
            ただし、メモリの選択肢や拡張性まで考えるとAirが有利です。AI活用を入り口に、用途が広がりそうな方はAirを選んでおくと安心です。
          </p>
        </div>
      </div>

      {/* ── メモリの違い ── */}
      <div id="memory">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/macbook-memory.jpg" alt="メモリの違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">メモリ容量の違い</h3>
          <p className="media-card__desc u-mt-md">
            MacBook Neoは<strong>メモリが8GB固定</strong>で、後から増設することはできません。
          </p>
          <p className="media-card__desc u-mt-md">
            写真編集・Web閲覧・文書作業など一般的な用途では問題ありませんが、動画編集や大規模なプログラム開発では物足りなさを感じる可能性があります。
          </p>
          <p className="media-card__desc u-mt-md">
            MacBook Air（M4）は<strong>16GB・24GB・32GBから選択でき</strong>、より重い作業にも対応できます。
          </p>
          <p className="media-card__desc u-mt-md">
            メモリ容量に余裕を持たせたい方にはAirが有利です。また中古市場ではM1/M2世代の16GBモデルも流通しており、コスパよくメモリを確保する方法としておすすめです。
          </p>

          <div className="m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>モデル</th>
                    <th>メモリ選択肢</th>
                    <th>おすすめ用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>MacBook Neo</th>
                    <td>8GB（固定）</td>
                    <td>日常・AI活用・軽作業</td>
                  </tr>
                  <tr>
                    <th>MacBook Air（M4）</th>
                    <td>16 / 24 / 32GB</td>
                    <td>幅広い用途・クリエイティブ</td>
                  </tr>
                  <tr>
                    <th>中古 Air（M1/M2）</th>
                    <td>8 / 16GB</td>
                    <td>コスパ重視・一般用途</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── ポート・充電の違い ── */}
      <div id="port">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/review-macbook-14inch-2021-magsafe-port.jpg" alt="ポート・充電の違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">ポート・充電方法の違い</h3>
          <p className="media-card__desc u-mt-md">
            MacBook AirはUSB-C（Thunderbolt 4）×2に加えて<strong>MagSafe専用の充電ポートを搭載</strong>。充電しながら両方のUSB-Cを周辺機器に使えるのが大きなメリットです。
          </p>
          <p className="media-card__desc u-mt-md">
            Thunderbolt 4対応のため、高速SSD・ドッキングステーション・高解像度モニターなど幅広い機器と接続でき、拡張性の高さが際立ちます。
          </p>
          <p className="media-card__desc u-mt-md">
            MacBook NeoはUSB-C×2のみで、<strong>MagSafeは非搭載</strong>。充電もUSB-Cポートを使う仕様のため、充電中は実質1ポートしか使えない点に注意が必要です。
          </p>
          <p className="media-card__desc u-mt-md">
            また、2ポートともUSB-C形状ですが、AirのThunderbolt 4と比べると転送速度は落ちます。外出先でケーブルをよく抜き差しする方や、ハブ・外部ストレージを多用する方には物足りなく感じる場面も出てくるでしょう。
          </p>

          <div className="m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>MacBook Air</th>
                    <th>MacBook Neo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>充電ポート</th>
                    <td>MagSafe + USB-C×2</td>
                    <td>USB-C×2のみ</td>
                  </tr>
                  <tr>
                    <th>充電中の空きポート</th>
                    <td>USB-C×2（両方使える）</td>
                    <td>USB-C×1（実質1つ）</td>
                  </tr>
                  <tr>
                    <th>規格</th>
                    <td>Thunderbolt 4</td>
                    <td>USB-C（低速）</td>
                  </tr>
                  <tr>
                    <th>外部モニター・高速SSD</th>
                    <td>◎ 対応しやすい</td>
                    <td>△ 制限あり</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Touch IDとセキュリティ ── */}
      <div id="touchid">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/macbook-touchid.jpg" alt="Touch IDとセキュリティ" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">Touch IDとセキュリティの違い</h3>
          <p className="media-card__desc u-mt-md">
            MacBook AirはすべてのモデルにTouch ID（指紋認証）が搭載されており、ロック解除・Apple Pay・パスワード入力をすばやく行えます。
          </p>
          <p className="media-card__desc u-mt-md">
            MacBook NeoはTouch IDが<strong>512GBモデルのみ</strong>に搭載。256GBなどの下位モデルではTouch IDが省略されています。
          </p>
          <p className="media-card__desc u-mt-md">
            ロック解除時にパスワード入力が必要になるため、頻繁にPCを開閉する方にとっては少し手間が増えます。Touch IDを重視する方はNeoの上位ストレージモデルか、MacBook Airを選ぶと安心です。
          </p>
        </div>
      </div>

      {/* ── 重量・バッテリーの違い ── */}
      <div id="weight">
        <div className="m-card m-card--shadow m-card--padded">
          <Image src="/images/content/photo/review-macbook-14inch-2021-summary.jpg" alt="重量とバッテリーの違い" style={imgStyle} loading="lazy" width={800} height={450} />
          <h3 className="popular-card-title">重量とバッテリーの違い</h3>
          <p className="media-card__desc u-mt-md">
            MacBook AirとNeoは13インチサイズで<strong>どちらも約1.24kgと同等の軽さ</strong>です。持ち運びの負担は変わりません。
          </p>
          <p className="media-card__desc u-mt-md">
            ただしAirには15インチモデル（約1.51kg）もあり、大画面が欲しい場合はAirが唯一の選択肢です。
          </p>
          <p className="media-card__desc u-mt-md">
            バッテリー持続時間はMacBook Airが最大18時間、MacBook Neoが最大16時間で、<strong>AirのほうがNeoより約2時間長持ち</strong>します。外出先での長時間使用を重視する方にはAirが有利です。
          </p>

          <div className="m-table-card u-mt-lg">
            <div className="m-table-scroll">
              <table className="m-table m-table--center">
                <thead>
                  <tr>
                    <th>モデル</th>
                    <th>重量</th>
                    <th>ビデオ再生</th>
                    <th>Webブラウズ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>MacBook Air 13インチ</th>
                    <td>約1.24kg</td>
                    <td>最大18時間</td>
                    <td>最大15時間</td>
                  </tr>
                  <tr>
                    <th>MacBook Air 15インチ</th>
                    <td>約1.51kg</td>
                    <td>最大18時間</td>
                    <td>最大15時間</td>
                  </tr>
                  <tr>
                    <th>MacBook Neo 13インチ</th>
                    <td>約1.24kg</td>
                    <td>最大16時間</td>
                    <td>最大11時間</td>
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
