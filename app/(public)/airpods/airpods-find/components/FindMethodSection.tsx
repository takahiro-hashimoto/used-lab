export default function FindMethodSection() {
  const models = [
    { name: 'AirPods Pro（第2世代）', case: true, earphone: true },
    { name: 'AirPods Pro（第1世代）', case: false, earphone: true },
    { name: 'AirPods（第3世代）', case: true, earphone: true },
    { name: 'AirPods（第2世代）', case: false, earphone: true },
    { name: 'AirPods（第1世代）', case: false, earphone: true },
  ]

  return (
    <div className="m-card m-card--shadow m-card--padded">
      {/* モデル別対応表 */}
      <h3 className="m-sub-heading">各モデルごとの「探す」アプリの対応状況</h3>
      <div className="m-table-card" style={{ marginTop: 'var(--space-md)' }}>
        <div className="m-table-scroll">
          <table className="m-table">
            <thead>
              <tr>
                <th>モデル</th>
                <th>ケース本体の捜索</th>
                <th>イヤホンの捜索</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name}>
                  <th>{m.name}</th>
                  <td style={{ textAlign: 'center', color: m.case ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                    {m.case ? (
                      <><i className="fa-solid fa-circle-check" aria-hidden="true"></i> 対応</>
                    ) : (
                      <><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> 非対応</>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', color: m.earphone ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> 対応
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 探すアプリで探す */}
      <h3 className="m-sub-heading">
        「探す」アプリで紛失したAirPodsを探す
      </h3>
      <p className="m-body-text" style={{ marginTop: 'var(--space-sm)' }}>
        手元にiPhoneがある場合は下記の手順で簡単にAirPodsの位置をチェックすることができます。
      </p>
      <div className="m-timeline" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="m-timeline__item">
          <div className="m-timeline__number">1</div>
          <div className="m-timeline__content">
            <h4>「探す」が有効になっていることを確認する</h4>
            <p>「探す」機能を使用するには、設定画面で「探す」が有効になっている必要があります。まずは状態を確認しましょう。</p>
          </div>
        </div>
        <div className="m-timeline__item">
          <div className="m-timeline__number">2</div>
          <div className="m-timeline__content">
            <h4>「探す」アプリを立ち上げてAirPodsを選択</h4>
            <p>アプリの「デバイスを探す」からAirPodsを選択します。最後にBluetooth接続が切れた場所と時刻が表示されます。接続範囲内なら音を鳴らして捜索することも可能です。</p>
          </div>
        </div>
        <div className="m-timeline__item">
          <div className="m-timeline__number">3</div>
          <div className="m-timeline__content">
            <h4>どうしても見つからない場合は「紛失モード」に切り替える</h4>
            <p>紛失モードをONにすると、他のiPhoneユーザーがAirPodsの近くを通った時に位置情報が通知されたり、拾った方にメッセージを表示できます。</p>
          </div>
        </div>
      </div>

      {/* iCloudから探す */}
      <h3 className="m-sub-heading">
        iCloudから紛失したAirPodsを探す
      </h3>
      <p className="m-body-text" style={{ marginTop: 'var(--space-sm)' }}>
        手元にiPhoneがない場合はiCloudにアクセスして、AirPodsの位置をチェックしましょう。
      </p>
      <div className="m-timeline" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="m-timeline__item">
          <div className="m-timeline__number">1</div>
          <div className="m-timeline__content">
            <h4>iCloudへログインする</h4>
            <p>
              パソコンから<a href="https://www.icloud.com/" target="_blank" rel="noopener noreferrer">iCloud</a>へログインします。
            </p>
          </div>
        </div>
        <div className="m-timeline__item">
          <div className="m-timeline__number">2</div>
          <div className="m-timeline__content">
            <h4>「探す」アプリを開く</h4>
            <p>管理画面の中にある「探す」アプリをクリックします。</p>
          </div>
        </div>
        <div className="m-timeline__item">
          <div className="m-timeline__number">3</div>
          <div className="m-timeline__content">
            <h4>デバイスの中からAirPodsを選択</h4>
            <p>所有しているApple製品の中からAirPodsを選択し、位置をチェックします。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
