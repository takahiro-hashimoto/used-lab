-- macbook_models に benchmarks カラム (JSONB) を追加
-- チップバリアント別のGeekbench 6スコアを格納する
--
-- データソース:
--   CPU: https://browser.geekbench.com/mac-benchmarks
--   GPU: https://browser.geekbench.com/metal-benchmarks
--
-- 格納形式:
-- {
--   "M2 Pro": { "single": 2656, "multi": 14456, "metal": 78225 },
--   "M2 Max": { "single": 2749, "multi": 14744, "metal": 133580 }
-- }

ALTER TABLE macbook_models
ADD COLUMN IF NOT EXISTS benchmarks jsonb DEFAULT NULL;

-- ============================================================
-- ベンチマークデータ投入
-- 各チップの代表的な構成（上位コア数）の値を採用
-- ============================================================

-- ID=1: MacBook Air 13インチ（2020） / M1
UPDATE macbook_models SET benchmarks = '{
  "M1": { "single": 2347, "multi": 8342, "metal": 32394 }
}' WHERE id = 1;

-- ID=2: MacBook Air 13インチ（2022） / M2
UPDATE macbook_models SET benchmarks = '{
  "M2": { "single": 2587, "multi": 9666, "metal": 44727 }
}' WHERE id = 2;

-- ID=3: MacBook Air 15インチ（2023） / M2
UPDATE macbook_models SET benchmarks = '{
  "M2": { "single": 2597, "multi": 9709, "metal": 44727 }
}' WHERE id = 3;

-- ID=4: MacBook Air 13インチ（2024） / M3
UPDATE macbook_models SET benchmarks = '{
  "M3": { "single": 3065, "multi": 11959, "metal": 44336 }
}' WHERE id = 4;

-- ID=5: MacBook Air 15インチ（2024） / M3
UPDATE macbook_models SET benchmarks = '{
  "M3": { "single": 3067, "multi": 11988, "metal": 44336 }
}' WHERE id = 5;

-- ID=6: MacBook Air 13インチ（2025） / M4
UPDATE macbook_models SET benchmarks = '{
  "M4": { "single": 3697, "multi": 14745, "metal": 54713 }
}' WHERE id = 6;

-- ID=7: MacBook Air 15インチ（2025） / M4
UPDATE macbook_models SET benchmarks = '{
  "M4": { "single": 3708, "multi": 14707, "metal": 54713 }
}' WHERE id = 7;

-- ID=8: MacBook Pro 13インチ（2020） / M1
UPDATE macbook_models SET benchmarks = '{
  "M1": { "single": 2324, "multi": 8189, "metal": 32394 }
}' WHERE id = 8;

-- ID=9: MacBook Pro 14インチ（2021） / M1 Pro / M1 Max
UPDATE macbook_models SET benchmarks = '{
  "M1 Pro": { "single": 2386, "multi": 12348, "metal": 62109 },
  "M1 Max": { "single": 2386, "multi": 12348, "metal": 112213 }
}' WHERE id = 9;

-- ID=10: MacBook Pro 16インチ（2021） / M1 Pro / M1 Max
UPDATE macbook_models SET benchmarks = '{
  "M1 Pro": { "single": 2374, "multi": 12261, "metal": 62109 },
  "M1 Max": { "single": 2374, "multi": 12261, "metal": 112213 }
}' WHERE id = 10;

-- ID=11: MacBook Pro 13インチ（2022） / M2
UPDATE macbook_models SET benchmarks = '{
  "M2": { "single": 2600, "multi": 9643, "metal": 44727 }
}' WHERE id = 11;

-- ID=12: MacBook Pro 14インチ（2023年2月） / M2 Pro / M2 Max
UPDATE macbook_models SET benchmarks = '{
  "M2 Pro": { "single": 2656, "multi": 14456, "metal": 78225 },
  "M2 Max": { "single": 2749, "multi": 14744, "metal": 133580 }
}' WHERE id = 12;

-- ID=13: MacBook Pro 16インチ（2023年2月） / M2 Pro / M2 Max
UPDATE macbook_models SET benchmarks = '{
  "M2 Pro": { "single": 2643, "multi": 14355, "metal": 78225 },
  "M2 Max": { "single": 2749, "multi": 14744, "metal": 133580 }
}' WHERE id = 13;

-- ID=14: MacBook Pro 14インチ（2023年11月） / M3 / M3 Pro / M3 Max
UPDATE macbook_models SET benchmarks = '{
  "M3": { "single": 3076, "multi": 11537, "metal": 44336 },
  "M3 Pro": { "single": 3100, "multi": 15260, "metal": 74427 },
  "M3 Max": { "single": 3107, "multi": 18935, "metal": 143825 }
}' WHERE id = 14;

-- ID=15: MacBook Pro 16インチ（2023年11月） / M3 Pro / M3 Max
UPDATE macbook_models SET benchmarks = '{
  "M3 Pro": { "single": 3105, "multi": 15249, "metal": 74427 },
  "M3 Max": { "single": 3128, "multi": 20962, "metal": 143825 }
}' WHERE id = 15;

-- ID=16: MacBook Pro 14インチ（2024） / M4 / M4 Pro / M4 Max
UPDATE macbook_models SET benchmarks = '{
  "M4": { "single": 3754, "multi": 14920, "metal": 54713 },
  "M4 Pro": { "single": 3851, "multi": 22429, "metal": 105442 },
  "M4 Max": { "single": 3884, "multi": 25647, "metal": 179229 }
}' WHERE id = 16;

-- ID=17: MacBook Pro 16インチ（2024） / M4 Pro / M4 Max
UPDATE macbook_models SET benchmarks = '{
  "M4 Pro": { "single": 3877, "multi": 22508, "metal": 105442 },
  "M4 Max": { "single": 3916, "multi": 25712, "metal": 179229 }
}' WHERE id = 17;
