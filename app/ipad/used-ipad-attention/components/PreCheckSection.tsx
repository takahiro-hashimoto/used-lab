import Image from 'next/image'
import type { IPadModel } from '@/lib/types'

/** Apple Pencil世代ごとの充電方式 */
const PENCIL_CHARGING: Record<string, string> = {
  '第1世代': 'Lightning端子',
  '第2世代': 'マグネット装着',
  'USB-C': 'USB-C端子',
  'Pro': 'マグネット装着',
}

/** Apple Pencil世代の表示順 */
const PENCIL_ORDER = ['第1世代', '第2世代', 'USB-C', 'Pro']

/**
 * DBのモデル一覧からApple Pencil対応表を自動生成
 */
function buildPencilTable(models: IPadModel[]) {
  const grouped: Record<string, string[]> = {}

  for (const m of models) {
    if (!m.pencil) continue
    // 複数対応（「/」「,」「、」区切り）の場合を考慮
    const pencils = m.pencil.split(/[/,、]/).map((p) => p.trim()).filter(Boolean)
    for (const p of pencils) {
      if (!grouped[p]) grouped[p] = []
      grouped[p].push(m.model)
    }
  }

  return PENCIL_ORDER
    .filter((key) => grouped[key] && grouped[key].length > 0)
    .map((key) => ({
      pencil: key,
      models: grouped[key],
      charging: PENCIL_CHARGING[key] ?? '—',
    }))
}

type Props = {
  models: IPadModel[]
}

export default function PreCheckSection({ models }: Props) {
  const pencilRows = buildPencilTable(models)

  return (
    <section className="l-section l-section--bg-subtle" id="pre-check" aria-labelledby="heading-pre-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pre-check">
          【最重要】中古iPadの購入前に必ず確認すべき注意点
        </h2>
        <p className="m-section-desc">中古iPadには「購入後に変更できないポイント」が多数あります。</p>
        <p className="m-section-desc">以下の5つは購入前に必ず確認してください。後から対処できない項目もあります。</p>

        {/* 1. iPadOSサポート */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">iPadOSサポート切れのリスク―サポート残り2年未満なら購入を避ける</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-pro-13-2.jpg"
                  alt="iPadOSサポートのイメージ画像"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                iPadはAppleによるiPadOSサポートが終了すると、新機能が使えなくなるだけでなく、<strong>セキュリティ面でもリスクが高まります</strong>。また、アプリが非対応になり使えなくなるケースもあります。
              </p>
              <p>
                iPadはiPhoneよりもサポート期間が短い傾向にあります。特にiPad（無印）やiPad miniは発売から<strong>約5〜6年</strong>でサポートが終了するモデルもあるため、安さだけで選ぶと「あと1年しか使えない」ということも。
              </p>
              <p>
                「今使える」と「今後も使える」は別です。安さより<strong>「あと何年使えるか」で判断</strong>しましょう。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="/ipad/used-ipad-support">機種別iPadOSサポート期間一覧</a>
              </p>
            </div>
          </div>
        </div>

        {/* 2. バッテリーの劣化状態 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">バッテリーの劣化状態―iPadはバッテリー交換費用が高い</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-air-6-11.jpg"
                  alt="iPadバッテリー確認のイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                中古iPadのバッテリーは使用状況によって劣化度合いが大きく異なります。iPadはiPhoneと違い、<strong>「設定」画面からバッテリー最大容量を直接確認できません。</strong>ショップ側もバッテリー残量を掲載していないケースがほとんどです。
              </p>
              <p>
                そのため、<strong>状態ランクが低く使い古された端末は避けるのが無難です。</strong>ランクA〜B程度の端末を選ぶことで、バッテリーの極端な劣化を回避しやすくなります。
              </p>
              <p>
                <strong>iPadのバッテリー交換費用はiPhoneより高額</strong>（Apple公式で16,800円〜）のため、劣化した端末を安く買っても結果的に割高になることがあります。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">バッテリー交換費用の目安</h4>
            <div className="price-table-wrap">
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">交換先</th>
                    <th scope="col">費用</th>
                    <th scope="col">備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple公式</td>
                    <td>16,800円〜</td>
                    <td>純正部品・保証あり</td>
                  </tr>
                  <tr>
                    <td>非正規店</td>
                    <td>8,000円〜15,000円</td>
                    <td>店舗により品質差あり</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. セルラーモデルのネットワーク利用制限 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">セルラーモデルはネットワーク利用制限（赤ロム）に注意</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-10.jpg"
                  alt="iPadセルラーモデルのイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                中古のセルラーモデルiPadには、iPhoneと同様に<strong>ネットワーク利用制限（赤ロム）</strong>のリスクがあります。前の所有者の分割払いが滞納されると、ある日突然通信ができなくなります。
              </p>
              <p>
                判定が「△」の端末は中古ショップでは安く買えますし、赤ロム保証があるショップもあります。ただし心配な場合は<strong>「◯」判定の端末を選びましょう。</strong>
              </p>
              <p>
                なお、Wi-Fiモデルにはネットワーク利用制限の問題はありません。外出先での通信が不要ならWi-Fiモデルを選ぶのも一つの手です。
              </p>
            </div>
          </div>
        </div>

        {/* 4. Apple Pencil・キーボード対応 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">Apple Pencil・キーボード対応―世代・モデルで互換性が異なる</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-air-7-11.jpg"
                  alt="Apple Pencil対応のイメージ"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                Apple Pencilやキーボードの<strong>対応状況はiPadのモデルごとに異なります</strong>。「Apple Pencilで絵を描きたい」「Magic Keyboardでノートパソコン代わりにしたい」という方は、購入前に必ず対応表を確認してください。
              </p>
              <p>
                特にApple Pencilは世代によって<strong>充電方式・接続方式が全く違う</strong>ため、非対応のiPadを買ってしまうと使えません。
              </p>
            </div>
          </div>

          <div className="caution-how-to">
            <h4 className="caution-how-to__heading">Apple Pencil 対応表</h4>
            <div className="price-table-wrap">
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">Apple Pencil</th>
                    <th scope="col">対応iPad</th>
                    <th scope="col">充電方式</th>
                  </tr>
                </thead>
                <tbody>
                  {pencilRows.map((row) => (
                    <tr key={row.pencil}>
                      <td>{row.pencil}</td>
                      <td>{row.models.join('、')}</td>
                      <td>{row.charging}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
