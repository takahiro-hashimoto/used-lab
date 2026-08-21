// used-lab 用: Supabase REST 経由の全テーブル JSON バックアップ
import fs from 'node:fs';
import path from 'node:path';

const env = Object.fromEntries(
  fs.readFileSync('.env.local','utf8').split('\n')
    .filter(l=>l.includes('=')&&!l.startsWith('#'))
    .map(l=>[l.slice(0,l.indexOf('=')), l.slice(l.indexOf('=')+1).replace(/^"|"$/g,'')])
);
const URL_ = env.NEXT_PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if(!URL_||!KEY){ console.error('認証情報が読めません'); process.exit(1); }

const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };
const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
const dir = path.join('backups', `used-lab-${stamp}`);
fs.mkdirSync(dir, { recursive: true });

const spec = await (await fetch(`${URL_}/rest/v1/`, { headers: H })).json();
const tables = Object.keys(spec.definitions ?? {});
console.log(`テーブル ${tables.length} 件を検出\n`);

let totalRows = 0, totalBytes = 0;
const manifest = [];
for (const t of tables) {
  const rows = [];
  for (let offset = 0; ; offset += 1000) {
    const r = await fetch(`${URL_}/rest/v1/${t}?select=*&limit=1000&offset=${offset}`, { headers: H });
    if (!r.ok) { console.log(`  ⚠ ${t}: HTTP ${r.status}`); break; }
    const chunk = await r.json();
    rows.push(...chunk);
    if (chunk.length < 1000) break;
  }
  const body = JSON.stringify(rows, null, 1);
  fs.writeFileSync(path.join(dir, `${t}.json`), body);
  totalRows += rows.length; totalBytes += body.length;
  manifest.push({ table: t, rows: rows.length, bytes: body.length });
  console.log(`  ${t.padEnd(32)} ${String(rows.length).padStart(6)} 行  ${(body.length/1024).toFixed(0).padStart(7)} KB`);
}
fs.writeFileSync(path.join(dir,'_manifest.json'), JSON.stringify({
  takenAt: new Date().toISOString(), source: URL_, tables: manifest,
}, null, 2));
console.log(`\n合計 ${totalRows} 行 / ${(totalBytes/1024/1024).toFixed(1)} MB → ${dir}/`);
