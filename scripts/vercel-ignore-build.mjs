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
  /^proxy\.ts$/,
  /^vercel\.json$/,
  /^scripts\/(hash-assets|check-sitemap-coverage|check-price-info)\./,
]

function shouldTriggerBuild(filePath) {
  return BUILD_RELEVANT_PATTERNS.some((pattern) => pattern.test(filePath))
}

function getChangedFiles() {
  try {
    return execSync('git diff --name-only HEAD^ HEAD', { encoding: 'utf8' })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
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
