export default function LifestyleSection() {
  return (
    <section className="l-section" id="lifestyle" aria-labelledby="heading-lifestyle">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifestyle">
          iPadがあればできること【暮らし編】
        </h2>
        <p className="m-section-desc">
          iPadは、普段の生活をより便利にするためにも役に立ちます。ここからは、iPadを生活に役立てる方法について8つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 5. ウェブブラウザで調べ物をする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-split-view.jpg"
              alt="Split Viewで調べ物をする様子"
              className="popular-card-img"
              width={240}
              height={158}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ウェブブラウザで調べ物をする</h3>
              <p className="popular-card-desc">
                iPadのブラウザはPC用サイトをそのまま表示できるため、スマホサイトのように何度もスクロールを繰り返す必要がありません。一度に目に入る情報量が圧倒的に多く、必要なデータに素早くアクセスできるのが最大の強みです。
              </p>
              <p className="popular-card-desc">
                さらに強力なのが、画面を2分割する「Split View（スプリットビュー）」機能。左半分でブラウザを開き、右半分にメモ帳を配置すれば、調べた内容をシームレスに書き写したり、リンクをコピーしたりといった作業が淀みなく行えます。
              </p>
              <p className="popular-card-desc">
                スマホでの煩わしいアプリ切り替えから解放され、アウトプットの質も自然と高まるはずです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのウェブブラウザ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/google-chrome-%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6/id535886823" rel="nofollow noopener" target="_blank">Chrome</a></li>
                  <li><a href="https://apps.apple.com/jp/app/safari/id1146562112" rel="nofollow noopener" target="_blank">Safari</a></li>
                  <li><a href="https://apps.apple.com/jp/app/brave-adblock%E3%81%A7%E5%BA%83%E5%91%8A%E3%82%92%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6/id1052879175" rel="nofollow noopener" target="_blank">Brave</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. カーナビ・地図として活用する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-car-navi-02.jpg"
              alt="iPad miniをカーナビ化する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">カーナビ・地図として活用する</h3>
              <p className="popular-card-desc">
                iPadをカーナビ化すれば、従来の車載ナビにありがちな「地図更新のコスト」や「操作性の悪さ」といった不満を一気に解消できます。
              </p>
              <p className="popular-card-desc">
                GoogleマップやYahoo!カーナビなら常に最新の地図が無料で使え、音楽もサブスクで完結するため利便性は圧倒的。
              </p>
              <p className="popular-card-desc">
                ただし、カーナビとして使うなら<strong>「セルラーモデル」が必須</strong>。Wi-FiモデルはGPSを内蔵しておらず、正確な位置情報を取得できないため注意してください。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのカーナビアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/google-%E3%83%9E%E3%83%83%E3%83%97-%E4%B9%97%E6%8F%9B%E6%A1%88%E5%86%85-%E3%82%B0%E3%83%AB%E3%83%A1/id585027354" target="_blank" rel="noopener">Googleマップ</a></li>
                  <li><a href="https://apps.apple.com/jp/app/yahoo-%E3%82%AB%E3%83%BC%E3%83%8A%E3%83%93/id890808217" target="_blank" rel="noopener">Yahoo!カーナビ</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. 料理レシピを見る */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-11-pro-m4-15.jpg"
              alt="クックパッドでレシピを調べる様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">料理レシピを見る</h3>
              <p className="popular-card-desc">
                普段料理をする際にお世話になっている人も多いであろう「クラシル」や「クックパッド」といったレシピアプリ。スマホで閲覧すると、文字が小さくて詳細部分が見えづらく、画面の拡大縮小をすることってよくあると思います。
              </p>
              <p className="popular-card-desc">
                この場合一旦調理器具を置かなければならず、作業効率が下がってしまうのがデメリット。iPadであれば大きな画面にレシピ情報を表示できるので、手元の調理作業を止めることなく、調理をすすめることができます。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの料理レシピアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB-%E3%83%AC%E3%82%B7%E3%83%94%E5%8B%95%E7%94%BB%E3%81%A7%E6%96%99%E7%90%86%E3%81%8C%E3%81%8A%E3%81%84%E3%81%97%E3%81%8F%E4%BD%9C%E3%82%8C%E3%82%8B/id1059134258" target="_blank" rel="noopener">クラシル</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E3%82%AF%E3%83%83%E3%82%AF%E3%83%91%E3%83%83%E3%83%89-no-1%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94%E6%A4%9C%E7%B4%A2%E3%82%A2%E3%83%97%E3%83%AA/id340368403" target="_blank" rel="noopener">クックパッド</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 8. 新聞を読む */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-11-pro-m4-16.jpg"
              alt="iPadで朝日新聞を読む様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">新聞を読む</h3>
              <p className="popular-card-desc">
                iPadなら新聞もスマートに持ち運べます。左右のスワイプ操作だけでサクサク読み進められるため、混雑した通勤電車や旅行先でも場所を取りません。読み終わった新聞を保管したり、捨てに行ったりする手間が省けるのも、電子版ならではの大きな魅力です。
              </p>
              <p className="popular-card-desc">
                さらに、アプリ版には紙の新聞にはない便利な機能が備わっており、情報収集の効率が劇的に向上します。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>速報プッシュ通知</p>
                  <p className="popular-card-desc">重要ニュースをリアルタイムで受信。翌朝の朝刊を待つことなく、常に最新情報をいち早くキャッチできます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>キーワード登録機能</p>
                  <p className="popular-card-desc">興味のある業界や企業を登録すれば、関連記事を自動で抽出。膨大な紙面から探す手間を省きます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>紙面ビューアー機能</p>
                  <p className="popular-card-desc">実際の紙面と同じレイアウトで閲覧が可能。iPadの画面を活かして全体を俯瞰できます。</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                もし、現在紙の新聞を購読されているなら、この機会にiPadでの「スマートな購読スタイル」に切り替えてみてはいかがでしょうか。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの新聞アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/%E6%97%A5%E6%9C%AC%E7%B5%8C%E6%B8%88%E6%96%B0%E8%81%9E-%E7%B4%99%E9%9D%A2%E3%83%93%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%BC/id503424369" target="_blank" rel="noopener">日本経済新聞 電子版</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E8%AA%AD%E5%A3%B2%E6%96%B0%E8%81%9E%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3-yol/id1514737192" target="_blank" rel="noopener">読売新聞オンライン</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E7%B4%99%E9%9D%A2%E3%83%93%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%BC/id1536374601" target="_blank" rel="noopener">朝日新聞デジタル</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 9. スケジュールを管理する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-schedule.jpg"
              alt="iPadでスケジュール管理する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">スケジュールを管理する</h3>
              <p className="popular-card-desc">
                スマホでは見づらい1ヶ月の予定も、iPadなら一画面でスッキリと俯瞰できます。情報量の多さを活かしたスケジュール管理は、iPadならではの強みです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>FirstSeedCalendar</p>
                  <p className="popular-card-desc">日本企業が開発した、シンプルかつ高機能な定番アプリ。カスタマイズ性が高く、自分好みの見やすいカレンダーを作れます。</p>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                <div>
                  <p style={{ fontWeight: 700 }}>Planner for iPad</p>
                  <p className="popular-card-desc">Apple Pencilでの手書きに特化したアプリ。付箋やスタンプでデコレーションもできるため、本物のシステム手帳のような感覚で楽しめます。</p>
                </div>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                「予定を確認する」だけでなく、iPadなら「予定を書き込む楽しさ」まで味わえるようになります。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのスケジュール管理アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/id1321260278" target="_blank" rel="noopener">FirstSeedCalendar</a></li>
                  <li><a href="https://apps.apple.com/jp/app/id1246635949" target="_blank" rel="noopener">Planner for iPad</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 10. テレビ電話をする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/centerflame.webp"
              alt="iPadでテレビ電話をする様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">テレビ電話をする</h3>
              <p className="popular-card-desc">
                iPadなら画面が大きいため、スマホでは見えにくい相手の表情もハッキリ分かります。複数人での通話や、細かな反応を確認したいシーンでもコミュニケーションが非常にスムーズです。
              </p>
              <p className="popular-card-desc">
                多くのiPadに搭載されているセンターフレーム機能も見逃せません。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-video" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  センターフレーム機能
                </p>
                <p className="popular-card-desc">超広角フロントカメラが、動く自分を常に追いかけて自動でフレーム内に収めてくれる機能。通話中に少し動いても最適な画角を保ち続けてくれるため、手放しでのビデオ通話も快適に行えます。</p>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                手ぶらでのビデオ通話や、家族との近況報告など、iPadがあるだけでテレビ電話のストレスはぐっと軽減されるはずです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのビデオチャットアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/facetime/id1110145091" target="_blank" rel="noopener">FaceTime</a></li>
                  <li><a href="https://apps.apple.com/jp/app/zoom-one-platform-to-connect/id546505307" target="_blank" rel="noopener">ZOOM</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 11. 置き時計として使う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-md-clock.jpg"
              alt="iPadを置き時計として使用する様子"
              className="popular-card-img"
              width={240}
              height={158}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">置き時計として使う</h3>
              <p className="popular-card-desc">
                専用アプリを入れれば、iPadは便利な置き時計になります。壁掛け時計がない部屋でも、スマホを取り出さずに時刻を確認できるのがメリットです。
              </p>
              <p className="popular-card-desc">
                中でもおすすめは「MD Clock」。デザインがおしゃれなだけでなく、無料版でも広告が表示されないため、インテリアを損なわず快適に使えます。
              </p>
              <p className="popular-card-desc">
                なお、時計としての常時表示は電池を消耗するため、充電しながらの使用がおすすめです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの置き時計アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/md-clock-live-in-the-present/id1536358464" target="_blank" rel="noopener">MD Clock</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E7%84%A1%E9%99%90%E6%99%82%E8%A8%88-%E8%A6%8B%E3%82%84%E3%81%99%E3%81%84%E6%99%82%E8%A8%88/id1064833509" target="_blank" rel="noopener">無限時計</a></li>
                  <li><a href="https://apps.apple.com/jp/app/flip-clock-%E3%83%9B%E3%83%BC%E3%83%A0%E7%94%BB%E9%9D%A2%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E6%99%82%E8%A8%88%E3%82%A6%E3%82%A3%E3%82%B8%E3%82%A7%E3%83%83%E3%83%88/id1181028777" target="_blank" rel="noopener">FlipClock</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 12. フォトフレームとして使用する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-photo-frame.jpg"
              alt="iPadをフォトフレームとして使用する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">フォトフレームとして使用する</h3>
              <p className="popular-card-desc">
                iPadに標準搭載されている「スライドショー機能」やサードパーティ製の専用アプリを活用すれば、iPadをデジタルフォトフレームとして使うことができます。
              </p>
              <p className="popular-card-desc">
                Wi-Fi接続が可能なデジタルフォトフレームを新しく購入すると1万円〜2万円ほどが相場ですが、iPadがあれば同じ機能を無料で実現できるのは嬉しいポイント。
              </p>
              <p className="popular-card-desc">
                iPadの高品質なディスプレイを活かして、思い出の写真をインテリアの一部として鮮やかに映し出すことが可能なのは大きなメリットです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのデジタルフォトフレームアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/%E3%81%B5%E3%81%89%E3%81%A8%E3%82%86%E3%82%89-%E5%86%99%E7%9C%9F%E9%91%91%E8%B3%9E-%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4%E3%81%AB%E6%9C%80%E9%81%A9/id936205747" target="_blank" rel="noopener">ふぉとゆら</a></li>
                  <li><a href="https://apps.apple.com/jp/app/photoframe-simple/id824851969" target="_blank" rel="noopener">Photo Frame Simple</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%83%95%E3%82%A9%E3%83%88%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%EF%BD%90%EF%BD%92%EF%BD%8F-%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89%E3%82%B7%E3%83%A7%E3%83%BC%E3%82%AF%E3%83%AA%E3%82%A8%E3%83%BC%E3%82%BF%E3%83%BC/id1219786089" target="_blank" rel="noopener">デジタルフォトフレームPRO</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
