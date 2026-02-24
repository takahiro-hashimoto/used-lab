export default function WorkStudySection() {
  return (
    <section className="l-section l-section--bg-subtle" id="work" aria-labelledby="heading-work">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-work">
          iPadがあればできること【仕事・勉強編】
        </h2>
        <p className="m-section-desc">
          iPadは、仕事や勉強のジャンルでも大活躍するデバイスです。<br />
          この章では、iPadを使って仕事・勉強を効率化するための利用方法を6つ紹介します。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

          {/* 13. ノートを取る */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-mini-6-apple-pencil.jpg"
              alt="iPad miniとApple Pencil"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">ノートを取る</h3>
              <p className="popular-card-desc">
                iPadはApple Pencilとセットで使うことで、ノートとして活用することができます。iPadをデジタルノートとして使う上で欠かせないアプリといえばGoodnotes 5。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>シンプルで使いやすいUI</li>
                  <li>さまざまな種類のペンで手書き入力ができる</li>
                  <li>画像を自由に挿入できる</li>
                  <li>クラウド保存したデータは他のデバイスからも参照できる</li>
                  <li>ファイル検索の精度が高い</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                iPadをメモ帳や、授業用ノートに使いたいという方はぜひインストールしてみてください。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめのノートアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/goodnotes-5/id1444383602" target="_blank" rel="noopener">Goodnotes 5</a></li>
                  <li><a href="https://apps.apple.com/jp/app/notability/id360593530" target="_blank" rel="noopener">Notability</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 14. 資料作成をする */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/magic-keyboarda.jpg"
              alt="iPadで資料作成する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">資料作成をする</h3>
              <p className="popular-card-desc">
                iPadは「Smart Keyboard Folio」や「Magic Keyboard」などのアクセサリが豊富で、ノートPCのような感覚でタイピングが可能です。快適に文字入力ができるため、外出先での資料作成とも非常に相性が良いです。
              </p>
              <p className="popular-card-desc">
                アプリは標準搭載の「Pages」や「Numbers」がおすすめ。洗練されたテンプレートが揃っており、手軽に見栄えの良い資料を仕上げられます。もちろん、Microsoft OfficeやGoogleドキュメントといった定番ツールも利用可能。用途に合わせて柔軟にツールを選べるのがiPadの強みです。
              </p>
              <p className="popular-card-desc">
                なお、歴代iPadの純正キーボード対応状況は「<a href="/ipad/accessories-summary/">iPadアクセサリー対応機種一覧</a>」で詳しく紹介しています。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの資料作成アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/pages/id361309726" target="_blank" rel="noopener">Pages</a></li>
                  <li><a href="https://apps.apple.com/jp/app/numbers/id361304891" target="_blank" rel="noopener">Numbers</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 15. 教科書を持ち歩く */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-pro-use.jpg"
              alt="iPadを手に持つ様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">教科書を持ち歩く</h3>
              <p className="popular-card-desc">
                学生の中には「毎日重たい教科書を持って移動するのが大変…」と感じている方も多いと思います。iPadがあればデータ版の教科書を入れて、最小限の荷物で登校することも可能。
              </p>
              <p className="popular-card-desc">
                iPadに教科書を入れれば、荷物が少なくなるだけでなく、家に必要な教科書を忘れてくる心配も減り、一石二鳥です。
              </p>
              <p className="popular-card-desc">
                ただし、教科書の中には電子書籍化されていない場合もあります。その場合は「AdobeScan」などスキャンアプリを利用して、紙媒体の教科書をPDFに変換して、データを持ち歩くのがおすすめです。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  教科書を持ち歩くのにおすすめのアプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/adobe-scan-ocr-%E4%BB%98-%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%8A%E3%83%BC%E3%82%A2%E3%83%97%E3%83%AA/id1199564834" target="_blank" rel="noopener">AdobeScan</a></li>
                  <li><a href="https://apps.apple.com/jp/app/pdf-expert-read-edit-sign/id743974925" target="_blank" rel="noopener">PDF Expert</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 16. 子供の知育や学習ツールに使う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-kids-learning.jpg"
              alt="iPadで子供が知育アプリを使う様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">子供の知育や学習ツールに使う</h3>
              <p className="popular-card-desc">
                iPadは知育・学習ツールが非常に充実しており、算数やひらがなの自宅学習に活用するご家庭が増えています。
              </p>
              <p className="popular-card-desc">
                例えばベネッセの「こどもちゃれんじ」では、毎月の教材と連動した「しまじろうクラブ」アプリを提供。教材の使い方もアプリで分かりやすく紹介してくれるため、お子さんが自ら楽しみながら学習を進められます。デジタルならではの演出で、子供の自主的な知育をサポートできるのが大きな魅力です。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  <i className="fa-solid fa-chevron-circle-right" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                  おすすめの学習アプリ
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li><a href="https://apps.apple.com/jp/app/%E3%81%97%E3%81%BE%E3%81%98%E3%82%8D%E3%81%86%E3%82%AF%E3%83%A9%E3%83%96-%E5%AD%A6%E7%BF%92%E3%81%AB%E5%BD%B9%E7%AB%8B%E3%81%A4%E3%81%93%E3%81%A9%E3%82%82-%E3%81%A1%E3%82%83%E3%82%8C%E3%82%93%E3%81%98%E3%82%A2%E3%83%97%E3%83%AA/id1546176901" target="_blank" rel="noopener">しまじろうクラブ</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E3%83%97%E3%83%A9%E3%83%88%E3%83%A2/id1251291765" target="_blank" rel="noopener">プラトモ</a></li>
                  <li><a href="https://apps.apple.com/jp/app/%E3%81%82%E3%81%9D%E3%82%93%E3%81%A7%E3%81%BE%E3%81%AA%E3%81%B9%E3%82%8B-%E5%9B%BD%E6%97%97%E3%82%AF%E3%82%A4%E3%82%BA/id911258201" target="_blank" rel="noopener">あそんでまなべる 国旗クイズ</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 17. サブディスプレイとして使う */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/ipad-mini-macbook.jpg"
              alt="iPadをサブモニターとして使用する様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">サブディスプレイとして使う</h3>
              <p className="popular-card-desc">
                Apple製品といえばそれぞれのデバイスがシームレスに連携できるのが大きな魅力の一つ。MacBookとの連携機能を活用すれば、作業効率をぐっと上げることができるようになります。
              </p>
              <p className="popular-card-desc">
                代表的なのはiPadをMacBookのサブモニターにできる<strong>「Sidecar」</strong>。出先のカフェなどでも手軽にデュアルディスプレイ環境を構築できます。
              </p>
              <p className="popular-card-desc">
                異なる情報を同時に参照しながらの作業は効率が良く、iPadが一台あれば重いモバイルモニターを別途持ち運ぶ必要もありません。場所を選ばず生産性を高めたい方には必須の機能です。
              </p>
              <p className="popular-card-desc">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="https://support.apple.com/ja-jp/102597" target="_blank" rel="noopener">iPadをMacの2台目のディスプレイとして使う – Apple サポート</a>
              </p>
            </div>
          </div>

          {/* 18. 連携マークアップを使用する */}
          <div className="m-card m-card--shadow m-card--padded popular-card">
            <img
              src="/images/content/how-to-use-ipad-markup.jpg"
              alt="iPadで連携マークアップをする様子"
              className="popular-card-img"
              width={240}
              height={160}
              loading="lazy"
            />
            <div className="popular-card-body">
              <h3 className="popular-card-title">連携マークアップを使用する</h3>
              <p className="popular-card-desc">
                Mac上のデータにiPadからリアルタイムで書き込みができる「連携マークアップ」も非常に便利な機能です。Macへ画像を転送する手間を省き、iPadのペン操作を活かして直感的に編集を行えます。
              </p>
              <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                  <li>サムネイル作成：写真に手書きテキストを加え、味のある画像に仕上げる</li>
                  <li>デザイン修正：資料やデザイン案に、手書きで直接指示を書き込む</li>
                </ul>
              </div>
              <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                Macの大きな画面で作業しつつ、iPadを「高機能な液タブ」のように併用できるこの連携は、クリエイティブな作業効率を劇的に高めてくれます。
              </p>
              <p className="popular-card-desc">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                <a href="https://support.apple.com/ja-jp/guide/mac-help/mchl1fd88863/mac" target="_blank" rel="noopener">Macでファイルにマークアップする – Apple サポート</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
