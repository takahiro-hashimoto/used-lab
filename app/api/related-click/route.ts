import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { source, dest } = await req.json()

    if (
      typeof source !== 'string' || typeof dest !== 'string' ||
      !source.startsWith('/') || !dest.startsWith('/')
    ) {
      return NextResponse.json({ error: 'invalid params' }, { status: 400 })
    }

    await supabase.rpc('increment_related_link_click', {
      p_source_path: source,
      p_dest_path: dest,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
