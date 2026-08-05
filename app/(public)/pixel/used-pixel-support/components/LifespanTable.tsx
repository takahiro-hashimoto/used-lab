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
      'Pixelはセキュリティ更新の保証期間（6/7世代は5年、8以降は7年）を過ぎるとサポート終了となり、最新のAndroidやセキュリティパッチが配信されなくなります。\nサポート終了後も使い続けると、下記のデメリットが出てくるのが注意点です。',
    items: [
      {
        term: '新たな脆弱性に対応できない',
        description:
          'OSやセキュリティパッチが更新できないと、新しい脆弱性が発見されてもGoogleから修正が提供されなくなり、不正アクセスやマルウェアのリスクが高まります。',
      },
      {
        term: '新しいAI機能・新機能が使えない',
        description:
          'Pixelは消しゴムマジックやベストテイクなどの機能をFeature Dropで追加していきますが、サポートが終了すると新機能を受け取れなくなります。',
      },
      {
        term: '一部アプリが非対応になる',
        description:
          'Google PlayのアプリはAndroidの新バージョンに合わせて更新されるため、古いAndroidのままでは動作しなくなったり不具合が起きるアプリが出てきます。',
      },
    ],
  },
  {
    title: 'Pixelのバッテリー交換・修理サポートについて',
    label: '用語解説',
    intro:
      'Pixelのバッテリー交換や画面割れの修理は、Google正規のサービスプロバイダ（iCracked等）や街の修理店で対応できます。\nただしモデルが古くなると純正パーツの在庫が減り、修理費用が中古相場に近づくこともあるため、修理か買い替えかの見極めが大切です。',
    items: [
      {
        term: 'バッテリー交換',
        description:
          'Pixelのバッテリーは充放電を繰り返すと劣化します。正規サービスプロバイダなら数千円〜1万円台で交換可能ですが、発売から年数が経った機種は買い替えとのコスト比較がおすすめです。',
      },
      {
        term: '純正パーツの供給',
        description:
          'ディスプレイやカメラなどの純正パーツは供給期間が限られます。サポート終了後の古い機種はパーツ在庫が減り、修理を受けられない場合があります。',
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
