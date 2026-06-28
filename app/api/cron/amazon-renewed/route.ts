// ============================================
// Cron: Amazon整備済み(Renewed)まとめページの再生成トリガー
// ============================================
// Vercel Cron から1日1回（JST 9:00 = UTC 0:00）呼ばれる。CRON_SECRET で保護。
//   vercel.json の "crons" に登録。
//   キャッシュを無効化するだけで、重いAmazon API取得は次アクセス時に
//   バックグラウンド再生成される（=訪問者を待たせず、再生成は1日1回のみ）。
//   ページ側の revalidate=82800 は、cron失敗時でも24時間以内更新を担保する保険。
// ============================================

import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  // Vercel Cron は Authorization: Bearer <CRON_SECRET> を付与する
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  revalidatePath('/amazon-renewed')
  return NextResponse.json({ ok: true, revalidated: '/amazon-renewed', at: new Date().toISOString() })
}
