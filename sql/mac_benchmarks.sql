-- ============================================================
-- mac_models にベンチマークスコアを投入
--
-- データソース: Geekbench Browser の Geekbench 6 個別結果（2026-08-10 取得）
--   CPU  https://browser.geekbench.com/v6/cpu/search?q=<機種名>
--   GPU  https://browser.geekbench.com/v6/compute/search?q=<機種名>（API=Metal のみ）
--
-- 取得方法:
--   機種名で検索し、チップ表記（Apple M4 / Apple M4 Pro など）でグルーピングして
--   各スコアの「中央値」を採用した。単発の結果はサーマルや同時実行の影響で
--   大きくぶれるため、平均ではなく中央値を使う。VirtualApple（仮想環境）は除外。
--
-- なぜ Geekbench 6 か:
--   Geekbench Browser のベンチマークチャートは Geekbench 7 に切り替わっているが、
--   当サイトの既存カテゴリ（iPhone/iPad/MacBook 等）はすべて Geekbench 6 で
--   統一されている。スケールが違う数値を混ぜると機種間の比較が壊れるため、
--   v6 の個別結果ページから集計した。
--   検証: MacBook Air M1 は既存DBで single 2346 / metal 32394。
--   今回の Mac mini M1 は single 2404 / metal 34495 で同一スケールと確認できる。
--
-- score_single / score_multi / score_metal は最小構成のチップ（cpu 列の先頭）。
-- benchmarks JSONB にはチップ構成ごとの値を全て格納する。
-- ============================================================

-- iMac 24インチ（2021）/ M1
UPDATE mac_models SET
  score_single = 2377, score_multi = 8589, score_metal = 33918,
  benchmarks = '{"M1": {"single": 2377, "multi": 8589, "metal": 33918}}'
WHERE slug = 'imac-24-2021';

-- iMac 24インチ（2023）/ M3
UPDATE mac_models SET
  score_single = 3018, score_multi = 11709, score_metal = 49260,
  benchmarks = '{"M3": {"single": 3018, "multi": 11709, "metal": 49260}}'
WHERE slug = 'imac-24-2023';

-- iMac 24インチ（2024）/ M4
UPDATE mac_models SET
  score_single = 3714, score_multi = 14762, score_metal = 53314,
  benchmarks = '{"M4": {"single": 3714, "multi": 14762, "metal": 53314}}'
WHERE slug = 'imac-24-2024';

-- Mac mini（2020）/ M1
UPDATE mac_models SET
  score_single = 2404, score_multi = 8712, score_metal = 34495,
  benchmarks = '{"M1": {"single": 2404, "multi": 8712, "metal": 34495}}'
WHERE slug = 'mac-mini-2020';

-- Mac mini（2023）/ M2・M2 Pro
UPDATE mac_models SET
  score_single = 2664, score_multi = 10007, score_metal = 48729,
  benchmarks = '{
    "M2":     {"single": 2664, "multi": 10007, "metal": 48729},
    "M2 Pro": {"single": 2680, "multi": 13113, "metal": 78558}
  }'
WHERE slug = 'mac-mini-2023';

-- Mac mini（2024）/ M4・M4 Pro
UPDATE mac_models SET
  score_single = 3735, score_multi = 15085, score_metal = 58091,
  benchmarks = '{
    "M4":     {"single": 3735, "multi": 15085, "metal": 58091},
    "M4 Pro": {"single": 3870, "multi": 20991, "metal": 100854}
  }'
WHERE slug = 'mac-mini-2024';

-- Mac Studio（2022）/ M1 Max・M1 Ultra
UPDATE mac_models SET
  score_single = 2448, score_multi = 12918, score_metal = 105423,
  benchmarks = '{
    "M1 Max":   {"single": 2448, "multi": 12918, "metal": 105423},
    "M1 Ultra": {"single": 2409, "multi": 18753, "metal": 158833}
  }'
WHERE slug = 'mac-studio-2022';

-- Mac Studio（2023）/ M2 Max・M2 Ultra
UPDATE mac_models SET
  score_single = 2704, score_multi = 15219, score_metal = 133811,
  benchmarks = '{
    "M2 Max":   {"single": 2704, "multi": 15219, "metal": 133811},
    "M2 Ultra": {"single": 2723, "multi": 22260, "metal": 213939}
  }'
WHERE slug = 'mac-studio-2023';

-- Mac Studio（2025）/ M4 Max・M3 Ultra
-- Ultra はコア数が多いぶんマルチとMetalで上回るが、シングルは M4 Max のほうが速い
-- （M3 世代のコアのため）。表示上の逆転は実測どおりなので補正しない。
UPDATE mac_models SET
  score_single = 4059, score_multi = 24527, score_metal = 190319,
  benchmarks = '{
    "M4 Max":   {"single": 4059, "multi": 24527, "metal": 190319},
    "M3 Ultra": {"single": 3227, "multi": 28113, "metal": 228914}
  }'
WHERE slug = 'mac-studio-2025';

-- 確認用
-- SELECT slug, cpu, score_single, score_multi, score_metal FROM mac_models ORDER BY id;
