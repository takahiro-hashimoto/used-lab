import 'server-only'

// ============================================================
// ローカルの管理画面から、本番のキャッシュ無効化を呼ぶ。
//
// 管理画面はローカルからのみ操作する運用にしたため、保存時の
// revalidateTag はローカルのキャッシュにしか効かない。DBは共有なので
// データは更新されるが、本番のページは古いまま残る。
// そこで、ローカルでパージしたのと同じタグを本番へ送る。
//
// 送るタグを絞るのが重要。/api/revalidate-all はボディ無しだと
// 全21タグをパージするため、編集1件で全ページが再生成対象になり
// ISR Writes が膨らむ。本番の管理画面で保存していたときと同じ範囲
// （カテゴリのタグ + shops + shopLinks）に揃える。
//
// REVALIDATE_TARGET が未設定なら何もしない。設定を入れるまで
// 従来どおりローカル完結で動く。
// ============================================================

/** 転送に失敗したときのメッセージ。成功・未設定なら null */
export async function forwardPurge(tags: readonly string[]): Promise<string | null> {
  const target = process.env.REVALIDATE_TARGET
  const secret = process.env.REVALIDATE_SECRET

  if (!target) return null
  if (!secret) {
    return '本番のキャッシュ更新に失敗しました: REVALIDATE_SECRET が未設定です'
  }
  if (tags.length === 0) return null

  try {
    const res = await fetch(`${target.replace(/\/$/, '')}/api/revalidate-all/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
      // next.config の trailingSlash: true に合わせて末尾スラッシュを付ける。
      // 付けないと 308 が返り、POSTボディが落ちる
      // 保存操作を長く待たせない。失敗しても手動で叩き直せる
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      return `本番のキャッシュ更新に失敗しました（HTTP ${res.status}）。データは保存済みです`
    }
    return null
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e)
    return `本番のキャッシュ更新に失敗しました（${reason}）。データは保存済みです`
  }
}
