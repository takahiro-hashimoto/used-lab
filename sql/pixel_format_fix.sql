-- Pixel 既適用テーブルへの書式統一UPDATE（date/resolution/size をiPhone DB表記に合わせる）
BEGIN;
UPDATE pixel_models SET date = '2021/10/28', resolution = '2,400 x 1,080', size = '158.6 × 74.8 × 8.9mm' WHERE slug = 'pixel-6';
UPDATE pixel_models SET date = '2021/10/28', resolution = '3,120 x 1,440', size = '163.9 × 75.9 × 8.9mm' WHERE slug = 'pixel-6-pro';
UPDATE pixel_models SET date = '2022/7/28', resolution = '2,400 x 1,080', size = '152.2 × 71.8 × 8.9mm' WHERE slug = 'pixel-6a';
UPDATE pixel_models SET date = '2022/10/13', resolution = '2,400 x 1,080', size = '155.6 × 73.2 × 8.7mm' WHERE slug = 'pixel-7';
UPDATE pixel_models SET date = '2022/10/13', resolution = '3,120 x 1,440', size = '162.9 × 76.6 × 8.9mm' WHERE slug = 'pixel-7-pro';
UPDATE pixel_models SET date = '2023/5/11', resolution = '2,400 x 1,080', size = '152.0 × 72.9 × 9.0mm' WHERE slug = 'pixel-7a';
UPDATE pixel_models SET date = '2023/10/12', resolution = '2,400 x 1,080', size = '150.5 × 70.8 × 8.9mm' WHERE slug = 'pixel-8';
UPDATE pixel_models SET date = '2023/10/12', resolution = '2,992 x 1,344', size = '162.6 × 76.5 × 8.8mm' WHERE slug = 'pixel-8-pro';
UPDATE pixel_models SET date = '2024/5/14', resolution = '2,400 x 1,080', size = '152.1 × 72.7 × 8.9mm' WHERE slug = 'pixel-8a';
UPDATE pixel_models SET date = '2024/8/22', resolution = '2,424 x 1,080', size = '152.8 × 72.0 × 8.5mm' WHERE slug = 'pixel-9';
UPDATE pixel_models SET date = '2024/9/4', resolution = '2,856 x 1,280', size = '152.8 × 72.0 × 8.5mm' WHERE slug = 'pixel-9-pro';
UPDATE pixel_models SET date = '2024/8/22', resolution = '2,992 x 1,344', size = '162.8 × 76.6 × 8.5mm' WHERE slug = 'pixel-9-pro-xl';
UPDATE pixel_models SET date = '2025/4/16', resolution = '2,424 x 1,080', size = '154.7 × 73.3 × 8.9mm' WHERE slug = 'pixel-9a';
COMMIT;
