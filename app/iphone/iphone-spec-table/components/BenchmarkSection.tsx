import { BenchBar } from '@/app/components/spec-table-utils'

type SpecModel = {
  id: number
  model: string
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
  antutu_cpu: number | null
  antutu_gpu: number | null
  antutu_mem: number | null
  antutu_ux: number | null
}

type Props = {
  models: SpecModel[]
}

export default function BenchmarkSection({ models }: Props) {
  // Geekbench: score_single/multi/metal が揃っているモデルのみ
  const geekbenchModels = models
    .filter((m) => m.score_single != null && m.score_multi != null && m.score_metal != null)
    .sort((a, b) => (b.score_single || 0) - (a.score_single || 0))

  const maxSingle = Math.max(...geekbenchModels.map((m) => m.score_single || 0))
  const maxMulti = Math.max(...geekbenchModels.map((m) => m.score_multi || 0))
  const maxMetal = Math.max(...geekbenchModels.map((m) => m.score_metal || 0))

  // Antutu: antutu_cpu が揃っているモデルのみ
  const antutuModels = models
    .filter((m) => m.antutu_cpu != null && m.antutu_gpu != null && m.antutu_mem != null && m.antutu_ux != null)
    .sort((a, b) => {
      const totalA = (a.antutu_cpu || 0) + (a.antutu_gpu || 0) + (a.antutu_mem || 0) + (a.antutu_ux || 0)
      const totalB = (b.antutu_cpu || 0) + (b.antutu_gpu || 0) + (b.antutu_mem || 0) + (b.antutu_ux || 0)
      return totalB - totalA
    })

  const antutuTotals = antutuModels.map((m) => (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0))
  const maxAntutuTotal = Math.max(...antutuTotals, 0)
  const maxAntutuCpu = Math.max(...antutuModels.map((m) => m.antutu_cpu || 0))
  const maxAntutuGpu = Math.max(...antutuModels.map((m) => m.antutu_gpu || 0))
  const maxAntutuMem = Math.max(...antutuModels.map((m) => m.antutu_mem || 0))
  const maxAntutuUx = Math.max(...antutuModels.map((m) => m.antutu_ux || 0))

  return (
    <section className="l-section l-section--bg-subtle" id="benchmark" aria-labelledby="heading-benchmark">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-benchmark">
          歴代iPhoneのチップ性能・処理速度を比較（ベンチマークスコア）
        </h2>
        <p className="m-section-desc">
          チップ性能の違いを可視化するために2種類のベンチマークスコア一覧表を用意。
        </p>
        <p className="m-section-desc">
          iPhoneの買い替えでどれくらい処理速度が上がるのかご確認ください。
        </p>

        {/* Geekbench */}
        {geekbenchModels.length > 0 && (
          <div id="geekbench">
            <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
              Geekbench スコア一覧
            </h3>
            <p className="m-section-desc" style={{ textAlign: 'left' }}>
              CPU単体の処理性能（シングル/マルチコア）を評価。純粋な計算処理能力や高負荷タスクを評価するのが得意です。
            </p>

            {/* 用語解説カード */}
            <div className="l-grid l-grid--3col l-grid--gap-lg" style={{ marginBottom: 'var(--space-xl, 24px)' }}>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">シングルスコア</p>
                <p className="glossary-item-desc">1つのCPUコアの処理性能を示す指標でアプリの起動やWeb閲覧など日常的な操作に影響する</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">マルチスコア</p>
                <p className="glossary-item-desc">複数のCPUコアを同時に使ったときの処理能力でゲームや動画編集などの重たい作業に効果を発揮する</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">メタルスコア</p>
                <p className="glossary-item-desc">GPUのグラフィック性能を示す指標で、3DゲームやAR、映像の描画処理に関わる</p>
              </div>
            </div>

            {/* テーブル */}
            <div className="m-card m-card--shadow m-table-card">
              <table className="m-table">
                <caption className="visually-hidden">iPhoneモデル別 Geekbench 6 ベンチマークスコア比較</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル</th>
                    <th scope="col">シングルコア</th>
                    <th scope="col">マルチコア</th>
                    <th scope="col">Metal</th>
                  </tr>
                </thead>
                <tbody>
                  {geekbenchModels.map((m) => (
                    <tr key={m.id}>
                      <td style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{m.model}</td>
                      <td><BenchBar value={m.score_single!} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={m.score_multi!} maxValue={maxMulti} color="#f0a030" /></td>
                      <td><BenchBar value={m.score_metal!} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Antutu */}
        {antutuModels.length > 0 && (
          <div id="antutu" style={{ marginTop: 'var(--space-3xl, 48px)' }}>
            <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
              Antutu スコア一覧
            </h3>
            <p className="m-section-desc" style={{ textAlign: 'left' }}>
              CPUだけでなく、GPU、メモリ、UXまで含めた総合的な端末の性能を評価。ゲームやマルチタスク、日常的な操作を含めた全体的な快適さを判断するのが得意です。
            </p>

            {/* 用語解説カード */}
            <div className="l-grid l-grid--4col l-grid--gap-lg" style={{ marginBottom: 'var(--space-xl, 24px)' }}>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">CPU</p>
                <p className="glossary-item-desc">デバイスの演算処理能力。アプリの起動や動作速度、OSの基本操作の速さに直結します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">GPU</p>
                <p className="glossary-item-desc">3Dグラフィックスの描画性能。主に高負荷な3Dゲームや動画編集の処理速度に影響します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">MEM</p>
                <p className="glossary-item-desc">RAMとストレージのデータ読み書き速度。アプリの切り替えやロード時間、ファイル転送速度に影響します。</p>
              </div>
              <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
                <p className="glossary-item-title">UX</p>
                <p className="glossary-item-desc">アプリのレスポンス速度や並行処理能力など、日常操作の総合的な快適性を評価する指標です。</p>
              </div>
            </div>

            {/* テーブル */}
            <div className="m-card m-card--shadow m-table-card">
              <table className="m-table">
                <caption className="visually-hidden">iPhoneモデル別 Antutu Benchmark v10 スコア比較</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル</th>
                    <th scope="col">合計</th>
                    <th scope="col">CPU</th>
                    <th scope="col">GPU</th>
                    <th scope="col">MEM</th>
                    <th scope="col">UX</th>
                  </tr>
                </thead>
                <tbody>
                  {antutuModels.map((m, i) => {
                    const total = (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
                    return (
                      <tr key={m.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{m.model}</td>
                        <td><BenchBar value={total} maxValue={maxAntutuTotal} color="var(--color-primary, #2589d0)" /></td>
                        <td><BenchBar value={m.antutu_cpu!} maxValue={maxAntutuCpu} color="#e74c6f" /></td>
                        <td><BenchBar value={m.antutu_gpu!} maxValue={maxAntutuGpu} color="#34a853" /></td>
                        <td><BenchBar value={m.antutu_mem!} maxValue={maxAntutuMem} color="#34a853" /></td>
                        <td><BenchBar value={m.antutu_ux!} maxValue={maxAntutuUx} color="#f0a030" /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
