#!/bin/bash
# デプロイ前の主要ページHTTPステータス確認スクリプト
# git pre-push hookから自動実行される

BASE="https://used-lab.jp"

PAGES=(
  "/" "/news/" "/profile/" "/contact/" "/sitemap-page/" "/guidelines/" "/privacy-policy/"
  "/iphone/" "/iphone/recommend/" "/iphone/price-info/" "/iphone/iphone-spec-table/"
  "/iphone/filter-search/" "/iphone/benchmark/" "/iphone/battery-compare/"
  "/iphone/iphone-shop/" "/iphone/used-iphone-support/" "/iphone/iphone-camera/"
  "/iphone/storage-guide/" "/iphone/used-iphone-attention/" "/iphone/apple-care/"
  "/iphone/mobile-hoken-compare/" "/iphone/mvno/" "/iphone/network-limit/"
  "/iphone/iphone13-13pro-compare/" "/iphone/iphone13-14-compare/"
  "/iphone/iphone14-14pro-compare/" "/iphone/iphone14-15-compare/"
  "/iphone/iphone15-15pro-compare/" "/iphone/iphone15-16-compare/"
  "/iphone/iphone16-16pro-compare/" "/iphone/iphone16e-se3-compare/"
  "/iphone/iphone16plus-air-compare/"
  "/ipad/" "/ipad/recommend/" "/ipad/ipad-spec-table/" "/ipad/ipad-price-info/"
  "/ipad/ipad-filter-search/" "/ipad/benchmark/" "/ipad/apple-pencil-compare/"
  "/ipad/ipad-shop/" "/ipad/used-ipad-support/" "/ipad/wifi-cellular/"
  "/ipad/apple-care/" "/ipad/howto-use-ipad/" "/ipad/storage-guide/"
  "/ipad/accessories-summary/" "/ipad/ipad-buy/" "/ipad/car-navigation-system/"
  "/ipad/ipad-mini-6-review/" "/ipad/review-ipad-pro-11-m4/" "/ipad/used-ipad-attention/"
  "/macbook/" "/macbook/recommend/" "/macbook/macbook-spec-table/" "/macbook/price-info/"
  "/macbook/benchmark/" "/macbook/air-pro-compare/" "/macbook/macbook-shop/"
  "/macbook/used-macbook-support/" "/macbook/used-macbook-attention/"
  "/macbook/storage-guide/" "/macbook/macbook-buy/" "/macbook/ipad-macbook-compare/"
  "/macbook/windows-mac-compare/" "/macbook/apple-care/"
  "/watch/" "/watch/recommend/" "/watch/watch-spec-table/" "/watch/watch-price-info/"
  "/watch/watch-filter-search/" "/watch/watch-shop/" "/watch/used-watch-support/"
  "/watch/gps-cellular-compare/" "/watch/how-to-use-apple-watch/"
  "/watch/apple-watch-always-lit/" "/watch/apple-watch-buy/" "/watch/apple-care/"
  "/watch/used-watch-attention/"
  "/airpods/" "/airpods/recommend/" "/airpods/price-info/" "/airpods/airpods-find/"
  "/airpods/airpods-filter-search/" "/airpods/used-airpods-attention/" "/airpods/airpods-buy/"
)

TMPDIR_PATH=$(mktemp -d)
trap 'rm -rf "$TMPDIR_PATH"' EXIT

echo ""
echo "=========================================="
echo " 主要ページ HTTPステータス確認"
echo " 対象: ${#PAGES[@]}ページ (並列チェック中...)"
echo "=========================================="

# 並列でcurl実行（--max-redirs 5 でリダイレクトループを検出）
for p in "${PAGES[@]}"; do
  (
    code=$(curl -sI -L --max-redirs 5 "${BASE}${p}" -o /dev/null -w "%{http_code}" 2>/dev/null)
    echo "$code $p" > "${TMPDIR_PATH}/$(echo "$p" | tr '/' '_').txt"
  ) &
done
wait

FAILURES=()
WARNINGS=()

while IFS= read -r line; do
  code=$(echo "$line" | awk '{print $1}')
  path=$(echo "$line" | awk '{print $2}')
  if [[ "$code" == "000" ]]; then
    FAILURES+=("⛔ LOOP/TIMEOUT  $path")
  elif [[ "$code" == 5* ]]; then
    FAILURES+=("🔴 $code          $path")
  elif [[ "$code" == "404" ]]; then
    WARNINGS+=("🟡 404           $path")
  elif [[ "$code" != "200" ]]; then
    WARNINGS+=("🟠 $code          $path")
  fi
done < <(cat "${TMPDIR_PATH}"/*.txt | sort -k2)

if [[ ${#FAILURES[@]} -eq 0 && ${#WARNINGS[@]} -eq 0 ]]; then
  echo "✅ 全ページ正常 (200 OK)"
  echo ""
  exit 0
fi

if [[ ${#FAILURES[@]} -gt 0 ]]; then
  echo ""
  echo "【エラー】デプロイをブロックする問題があります:"
  for f in "${FAILURES[@]}"; do echo "  $f"; done
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo "【警告】確認が必要なページ:"
  for w in "${WARNINGS[@]}"; do echo "  $w"; done
fi

if [[ ${#FAILURES[@]} -gt 0 ]]; then
  echo ""
  echo "❌ エラーが検出されたため push を中止しました。"
  echo "   問題を修正してから再度 push してください。"
  echo ""
  exit 1
fi

# 警告のみの場合はユーザーに確認
echo ""
printf "⚠️  警告があります。このまま push しますか? [y/N] "
read -r answer < /dev/tty
if [[ "$answer" =~ ^[Yy]$ ]]; then
  echo "→ push を続行します。"
  echo ""
  exit 0
else
  echo "→ push を中止しました。"
  echo ""
  exit 1
fi
