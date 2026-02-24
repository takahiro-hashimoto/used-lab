# iPad アクセサリ（Apple Pencil / Magic Keyboard）管理画面の追加

## Context
既存の管理画面は5カテゴリ（iPhone/iPad/MacBook/Watch/AirPods）の機種CRUDに対応済み。
ここに **iPad アクセサリ**（`ipad_accessories` テーブル）の登録・編集機能を追加する。
さらに、アクセサリと iPad モデルの互換性（`ipad_accessory_compatibility` テーブル、多対多）も管理できるようにする。

---

## 方針

### アクセサリ本体の CRUD
既存の `CATEGORIES` 配列に `ipad-accessories` を追加するだけで、一覧・新規・編集の全画面が既存の `[category]/` ルーティングで動作する。

### 互換性（多対多）の管理
アクセサリ編集画面に **「対応 iPad モデル」セクション** を追加し、チェックボックスで互換性を設定できるようにする。
- AdminForm とは別コンポーネント（`CompatibilityEditor`）として実装
- 独自の Server Action で保存（アクセサリ本体の保存とは分離）

---

## 変更ファイル一覧

| ファイル | 変更内容 |
|---------|---------|
| `app/admin/field-definitions.ts` | `ACCESSORY_FIELDS` + CATEGORIES に追加 |
| `app/admin/actions.ts` | 互換性 CRUD 用 Server Action 追加 |
| `app/admin/components/CompatibilityEditor.tsx` | **新規** — 対応 iPad チェックボックス UI |
| `app/admin/(authenticated)/[category]/[id]/page.tsx` | アクセサリ時に CompatibilityEditor を表示 |
| `app/admin/(authenticated)/layout.tsx` | ナビにアクセサリリンク追加（CATEGORIES 自動） |

---

## Step 1: field-definitions.ts にアクセサリカテゴリ追加

```typescript
const ACCESSORY_FIELDS: FieldDef[] = [
  { key: 'name', label: 'アクセサリ名', type: 'text', required: true, group: '基本情報' },
  { key: 'type', label: 'タイプ', type: 'select', required: true, options: [
    { value: 'pencil', label: 'Apple Pencil' },
    { value: 'keyboard', label: 'キーボード' },
  ], group: '基本情報' },
  { key: 'image', label: '画像ファイル名', type: 'text', group: '基本情報' },
  { key: 'model_number', label: '型番', type: 'text', group: '基本情報' },
  { key: 'release_date', label: '発売日', type: 'text', group: '基本情報' },
  { key: 'display_order', label: '表示順', type: 'number', required: true, group: '基本情報' },
  { key: 'iosys_url', label: 'イオシス URL', type: 'text', group: 'ショップURL' },
  { key: 'amazon_url', label: 'Amazon URL', type: 'text', group: 'ショップURL' },
  { key: 'mercari_url', label: 'メルカリ URL', type: 'text', group: 'ショップURL' },
]

// CATEGORIES 配列に追加:
{
  key: 'ipad-accessories',
  table: 'ipad_accessories',
  label: 'iPadアクセサリ',
  icon: 'fa-pen-nib',
  listColumns: ['id', 'name', 'type', 'display_order'],
  fields: ACCESSORY_FIELDS,
}
```

→ これだけでダッシュボード・一覧・新規登録・編集が全て動作する。

---

## Step 2: 互換性管理の Server Action を追加

`app/admin/actions.ts` に以下を追加:

```typescript
// アクセサリの互換 iPad 一覧を取得
export async function getAccessoryCompatibility(accessoryId: number): Promise<number[]>

// 互換性を一括更新（既存を全削除 → チェック済みを INSERT）
export async function updateAccessoryCompatibility(accessoryId: number, ipadModelIds: number[]): Promise<{ error: string } | void>

// iPad モデル一覧取得（チェックボックス表示用）
export async function getIPadModelsForSelect(): Promise<{ id: number; model: string }[]>
```

---

## Step 3: CompatibilityEditor コンポーネント（新規）

`app/admin/components/CompatibilityEditor.tsx` — Client Component

- iPad モデル一覧をチェックボックスで表示
- 初期状態: 既存の互換性データからチェック済み
- 「対応モデルを保存」ボタンで `updateAccessoryCompatibility` を呼び出し
- アクセサリ本体の保存とは独立して動作

---

## Step 4: 編集ページに互換性セクションを追加

`app/admin/(authenticated)/[category]/[id]/page.tsx` を変更:

- `category === 'ipad-accessories'` の場合のみ、AdminForm の下に CompatibilityEditor を表示
- サーバー側で互換性データと iPad モデル一覧を取得して Props として渡す

---

## 検証

1. `npm run build` — エラーなし
2. ダッシュボードに「iPadアクセサリ」カードが表示される
3. 一覧画面で全アクセサリ（Pencil + Keyboard）が表示される
4. 新規登録でアクセサリを追加できる
5. 編集画面でアクセサリ情報を更新できる
6. 編集画面の「対応iPadモデル」セクションでチェックボックスが機能する
7. 互換性の保存が `ipad_accessory_compatibility` テーブルに反映される
