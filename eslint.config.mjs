import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // OpenNext（Cloudflare向け）のビルド成果物。バンドル済みの Next.js 本体が
    // 入っており、除外しないと 778ファイル・2万件超を走査してヒープを食い潰す
    // （eslint が 4GB で OOM して build が落ちる）。
    ".open-next/**",
  ]),
]);

export default eslintConfig;
