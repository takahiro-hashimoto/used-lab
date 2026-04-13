'use client'

import { useState } from 'react'

const TABS = [
  { id: 'price', label: '料金\n比較' },
  { id: 'pro', label: '17 Pro\n修理費' },
  { id: 'standard', label: '17\n修理費' },
  { id: 'e', label: '17e\n修理費' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function InsuranceCostTabs() {
  const [active, setActive] = useState<TabId>('price')

  return (
    <div className="ins-tabs">
      {/* タブボタン */}
      <div className="ins-tabs__nav" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`ins-panel-${tab.id}`}
            className={`ins-tabs__btn${active === tab.id ? ' is-active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </button>
        ))}
      </div>

      {/* パネル: 料金比較 */}
      <div id="ins-panel-price" role="tabpanel" hidden={active !== 'price'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />（Pro）</th>
                <th>AppleCare+<br />（17 / 17e）</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>月払い</th>
                <td>1,740円</td>
                <td>1,540円</td>
                <td className="ins-tabs__highlight">700円</td>
              </tr>
              <tr>
                <th>2年間合計</th>
                <td>34,800〜41,760円</td>
                <td>26,800〜36,960円</td>
                <td className="ins-tabs__highlight">16,800円</td>
              </tr>
              <tr>
                <th>修理の自己負担</th>
                <td>3,700円〜 / 回</td>
                <td>3,700円〜 / 回</td>
                <td className="ins-tabs__highlight">なし（全額補償）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: iPhone 17 Pro 修理費比較 */}
      <div id="ins-panel-pro" role="tabpanel" hidden={active !== 'pro'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面の損傷</th>
                <td>53,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>25,900円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー修理</th>
                <td>19,400円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラの損傷</th>
                <td>40,800円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: iPhone 17 修理費比較 */}
      <div id="ins-panel-standard" role="tabpanel" hidden={active !== 'standard'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面の損傷</th>
                <td>53,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>25,900円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー修理</th>
                <td>15,800円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラの損傷</th>
                <td>25,600円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: iPhone 17e 修理費比較 */}
      <div id="ins-panel-e" role="tabpanel" hidden={active !== 'e'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面の損傷</th>
                <td>38,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>25,900円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー修理</th>
                <td>15,800円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラの損傷</th>
                <td>21,800円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
