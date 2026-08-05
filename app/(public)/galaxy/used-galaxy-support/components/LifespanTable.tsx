/**
 * サポート終了後に起きることの解説と用語集。
 *
 * もともとは世代別のサポート期間表も持っていたが、同じページの
 * SupportMatrix（機種別のサポート期間一覧）と内容が重複していたため表は削除した。
 * 全体像は SupportTimelineMatrix、機種ごとの詳細は SupportMatrix が受け持つ。
 */

const GLOSSARY_GROUPS = [
  {
    title: 'Androidアップデート終了のデメリット',
    label: 'セキュリティ更新終了のデメリット',
    intro:
      'Galaxyはセキュリティ更新の保証期間（S24以降のSシリーズ・Z Flip6／Z Fold6以降の折りたたみは7年、S22／S23は5年、それ以前やAシリーズは機種により2〜5年）を過ぎるとサポート終了となり、最新のAndroid（One UI）やセキュリティパッチが配信されなくなります。\nサポート終了後も使い続けると、下記のデメリットが出てくるのが注意点です。',
    items: [
      {
        term: '新たな脆弱性に対応できない',
        description:
          'OSやセキュリティパッチが更新できないと、新しい脆弱性が発見されてもSamsungから修正が提供されなくなり、不正アクセスやマルウェアのリスクが高まります。',
      },
      {
        term: '新しいGalaxy AI・新機能が使えない',
        description:
          'GalaxyはGalaxy AIやかこって検索などの機能をOne UIのアップデートで追加していきますが、サポートが終了すると新機能を受け取れなくなります。',
      },
      {
        term: '一部アプリが非対応になる',
        description:
          'Google PlayのアプリはAndroidの新バージョンに合わせて更新されるため、古いAndroidのままでは動作しなくなったり不具合が起きるアプリが出てきます。',
      },
    ],
  },
  {
    title: 'Galaxyのバッテリー交換・修理サポートについて',
    label: '用語解説',
    intro:
      'Galaxyのバッテリー交換や画面割れの修理は、Samsung正規のサービスプロバイダや街の修理店で対応できます。\n特にZ Flip／Z Foldなどの折りたたみは、ヒンジや折り目部分の内側ディスプレイ・保護フィルムの状態が寿命を左右するため、中古購入時にはこれらの状態をよく確認しましょう。',
    items: [
      {
        term: 'バッテリー交換',
        description:
          'Galaxyのバッテリーは充放電を繰り返すと劣化します。正規サービスプロバイダなら比較的安価に交換可能ですが、発売から年数が経った機種は買い替えとのコスト比較がおすすめです。',
      },
      {
        term: '折りたたみのヒンジ・画面折り目・保護フィルム',
        description:
          'Z Flip／Z Foldは内側ディスプレイに折り目があり、開閉を繰り返すヒンジや貼付済みの保護フィルムが消耗部品です。中古では折り目のスジやフィルムの浮き・剥がれ、ヒンジのガタつきがないかを必ずチェックしましょう。',
      },
    ],
  },
]

export default function LifespanTable() {
  return (
    <section className="l-section" id="after-support" aria-labelledby="heading-after-support">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-after-support">
          サポート終了後に起きること</h2>
        <p className="m-section-desc">
          アップデートが終わった端末を使い続けると何が起きるのか、関連する用語とあわせて解説します。
        </p>
        <p className="m-section-desc">
          Galaxy S24以降のSシリーズやZ Flip6／Z Fold6以降の折りたたみは7年サポートに延長されており、フラッグシップと折りたたみは長く使える点が大きな魅力です。一方でAシリーズや旧世代はサポート年数が短めなので、中古で選ぶ際は世代差に注意しましょう。
        </p>


        {GLOSSARY_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="m-sub-heading">{group.title}</h3>
            {/* 長文は '\n' 区切りで段落を分ける（FaqSection と同じ規約） */}
            {typeof group.intro === 'string'
              ? group.intro.split('\n').map((p, i) => (
                  <p key={i} className="m-body-text">{p}</p>
                ))
              : <p className="m-body-text">{group.intro}</p>}

            <aside className="glossary-box m-card m-card--shadow" aria-label={group.label}>
              <dl className="glossary-list">
                {group.items.map((item) => (
                  <div key={item.term} className="glossary-item">
                    <dt className="glossary-item-title">{item.term}</dt>
                    <dd className="glossary-item-desc">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        ))}
      </div>
    </section>
  )
}
