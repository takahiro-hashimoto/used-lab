import { execSync } from 'node:child_process'

const BUILD_RELEVANT_PATTERNS = [
  /^app\//,
  /^lib\//,
  /^public\//,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^next\.config\.(js|mjs|ts)$/,
  /^tsconfig\.json$/,
  /^eslint\.config\./,
  /^vercel\.json$/,
  /^scripts\/(hash-assets|check-sitemap-coverage|check-price-info)\./,
]

function shouldTriggerBuild(filePath) {
  return BUILD_RELEVANT_PATTERNS.some((pattern) => pattern.test(filePath))
}

/**
 * 今回のデプロイに含まれる変更ファイルを返す。
 *
 * HEAD^..HEAD だと直前1コミットしか見ないため、複数コミットをまとめて
 * push したとき、最後のコミットがビルド対象外だと手前のコミットに入った
 * app/ の変更ごとスキップされる（2026-08-19、ヒーローのCSS修正が
 * ワークフロー削除コミットに隠れて本番へ出なかった）。
 *
 * Vercel が渡す VERCEL_GIT_PREVIOUS_SHA（前回デプロイのコミット）を
 * 起点にして、push 範囲全体を見る。取れない場合や参照できない場合は
 * HEAD^..HEAD に落とし、それも駄目ならビルドする（スキップしない）。
 */
function diffFiles(range) {
  return execSync(`git diff --name-only ${range}`, { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function getChangedFiles() {
  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA
  if (previous) {
    try {
      return diffFiles(`${previous} HEAD`)
    } catch {
      console.log('[vercel-ignore-build] VERCEL_GIT_PREVIOUS_SHA is unreachable. Falling back to HEAD^.')
    }
  }
  try {
    return diffFiles('HEAD^ HEAD')
  } catch {
    return []
  }
}

const changedFiles = getChangedFiles()

if (changedFiles.length === 0) {
  console.log('[vercel-ignore-build] Could not detect changed files. Running build.')
  process.exit(1)
}

const shouldBuild = changedFiles.some(shouldTriggerBuild)

if (shouldBuild) {
  console.log('[vercel-ignore-build] Build-relevant changes detected:')
  changedFiles.filter(shouldTriggerBuild).forEach((file) => console.log(` - ${file}`))
  process.exit(1)
}

console.log('[vercel-ignore-build] Skipping build for non-runtime changes:')
changedFiles.forEach((file) => console.log(` - ${file}`))
process.exit(0)
