'use client'

import { useState } from 'react'

const TABS = [
  { id: 'price', label: 'AppleCare+\n料金' },
  { id: 'promax', label: 'ProMax\n保証内容' },
  { id: 'pro', label: 'Pro\n保証内容' },
  { id: 'standard', label: '無印\n保証内容' },
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
            {tab.label.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < tab.label.split('\n').length - 1 && <br />}
              </span>
            ))}
          </button>
        ))}
      </div>

      {/* パネル: AppleCare+ 料金 */}
      <div
        id="ins-panel-price"
        role="tabpanel"
        hidden={active !== 'price'}
        className="ins-tabs__panel"
      >
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>月払い</th>
                <th>2年一括</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>iPhone 15 Pro<br />iPhone 15 Pro Max</th>
                <td>1,740円</td>
                <td>34,800円</td>
              </tr>
              <tr>
                <th>iPhone 15 Plus<br />iPhone 14 Plus</th>
                <td>1,540円</td>
                <td>31,800円</td>
              </tr>
              <tr>
                <th>iPhone 15<br />iPhone 14</th>
                <td>1,540円</td>
                <td>26,800円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: ProMax 保証内容 */}
      <div
        id="ins-panel-promax"
        role="tabpanel"
        hidden={active !== 'promax'}
        className="ins-tabs__panel"
      >
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>Apple Care+<br />未加入</th>
                <th>Apple Care+<br />加入済み</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>56,800円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>29,800円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>38,800円</td>
                <td>12,900円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: Pro 保証内容 */}
      <div
        id="ins-panel-pro"
        role="tabpanel"
        hidden={active !== 'pro'}
        className="ins-tabs__panel"
      >
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>Apple Care+<br />未加入</th>
                <th>Apple Care+<br />加入済み</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>50,800円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>25,900円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>32,800円</td>
                <td>12,900円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: 無印 保証内容 */}
      <div
        id="ins-panel-standard"
        role="tabpanel"
        hidden={active !== 'standard'}
        className="ins-tabs__panel"
      >
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>Apple Care+<br />未加入</th>
                <th>Apple Care+<br />加入済み</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>42,800円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>29,800円</td>
                <td>3,700円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>23,800円</td>
                <td>12,900円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
