import Image from 'next/image'

export default function FindMethodSection() {
  const models = [
    { name: 'AirPods Pro（第2世代）', case: true, earphone: true },
    { name: 'AirPods Pro（第1世代）', case: false, earphone: true },
    { name: 'AirPods（第3世代）', case: true, earphone: true },
    { name: 'AirPods（第2世代）', case: false, earphone: true },
    { name: 'AirPods（第1世代）', case: false, earphone: true },
  ]

  return (
    <>
      {/* モデル別対応表 */}
      <h3 className="media-card__title">各モデルごとの「探す」アプリの対応状況</h3>
      <div className="m-table-card u-mt-md">
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
                  <td>{m.name}</td>
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
      <h3 className="media-card__title u-mt-2xl">
        「探す」アプリで紛失したAirPodsを探す
      </h3>
      <p className="m-body-text u-mt-sm">
        手元にiPhoneがある場合は下記の手順で簡単にAirPodsの位置をチェックすることができます。
      </p>
      <div className="m-card m-card--shadow m-card--padded">
        <div className="m-timeline u-mt-lg">
          <div className="m-timeline__item">
            <div className="m-timeline__number">1</div>
            <div className="m-timeline__content">
              <h4>「探す」が有効になっていることを確認する</h4>
              <p>「探す」機能を使用するには、設定画面で「探す」が有効になっている必要があります。まずは状態を確認しましょう。</p>
              <div className="media-card__img-grid u-mt-md" style={{ maxWidth: '560px' }}>
                <Image src="/images/content/thumbnail/airpods-find-01.jpg" alt="「探す」の設定画面1" width={400} height={300} loading="lazy" />
                <Image src="/images/content/thumbnail/airpods-find-02.jpg" alt="「探す」の設定画面2" width={400} height={300} loading="lazy" />
              </div>
            </div>
          </div>
          <div className="m-timeline__item">
            <div className="m-timeline__number">2</div>
            <div className="m-timeline__content">
              <h4>「探す」アプリを立ち上げてAirPodsを選択</h4>
              <p>アプリの「デバイスを探す」からAirPodsを選択します。最後にBluetooth接続が切れた場所と時刻が表示されます。接続範囲内なら音を鳴らして捜索することも可能です。</p>
              <div className="media-card__img-grid u-mt-md" style={{ maxWidth: '560px' }}>
                <Image src="/images/content/thumbnail/airpods-find-03.jpg" alt="「探す」アプリでAirPodsを選択1" width={400} height={300} loading="lazy" />
                <Image src="/images/content/thumbnail/airpods-find-04.jpg" alt="「探す」アプリでAirPodsを選択2" width={400} height={300} loading="lazy" />
              </div>
            </div>
          </div>
          <div className="m-timeline__item">
            <div className="m-timeline__number">3</div>
            <div className="m-timeline__content">
              <h4>どうしても見つからない場合は「紛失モード」に切り替える</h4>
              <p>紛失モードをONにすると、他のiPhoneユーザーがAirPodsの近くを通った時に位置情報が通知されたり、拾った方にメッセージを表示できます。</p>
              <div className="media-card__img-grid u-mt-md" style={{ maxWidth: '560px' }}>
                <Image src="/images/content/thumbnail/airpods-find-05.jpg" alt="紛失モードの設定画面1" width={400} height={300} loading="lazy" />
                <Image src="/images/content/thumbnail/airpods-find-06.jpg" alt="紛失モードの設定画面2" width={400} height={300} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iCloudから探す */}
      <h3 className="media-card__title u-mt-2xl">
        iCloudから紛失したAirPodsを探す
      </h3>
      <p className="m-body-text u-mt-sm">
        手元にiPhoneがない場合はiCloudにアクセスして、AirPodsの位置をチェックしましょう。
      </p>
      <div className="m-card m-card--shadow m-card--padded">
        <div className="m-timeline u-mt-lg">
          <div className="m-timeline__item">
            <div className="m-timeline__number">1</div>
            <div className="m-timeline__content">
              <h4>iCloudへログインする</h4>
              <p>
                パソコンから<a href="https://www.icloud.com/" target="_blank" rel="noopener noreferrer">iCloud</a>へログインします。
              </p>
              <Image className="u-mt-md" src="/images/content/photo/icloud-01.jpg" alt="iCloudログイン画面" width={800} height={450} loading="lazy" style={{ width: '50%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }} />
            </div>
          </div>
          <div className="m-timeline__item">
            <div className="m-timeline__number">2</div>
            <div className="m-timeline__content">
              <h4>「探す」アプリを開く</h4>
              <p>管理画面の中にある「探す」アプリをクリックします。</p>
              <Image className="u-mt-md" src="/images/content/photo/icloud-02.jpg" alt="iCloudの探すアプリ" width={800} height={450} loading="lazy" style={{ width: '50%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }} />
            </div>
          </div>
          <div className="m-timeline__item">
            <div className="m-timeline__number">3</div>
            <div className="m-timeline__content">
              <h4>デバイスの中からAirPodsを選択</h4>
              <p>所有しているApple製品の中からAirPodsを選択し、位置をチェックします。</p>
              <Image className="u-mt-md" src="/images/content/photo/icloud-03.jpg" alt="AirPodsの位置を確認" width={800} height={450} loading="lazy" style={{ width: '50%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
