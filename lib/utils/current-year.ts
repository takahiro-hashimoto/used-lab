/**
 * いまの年（JST）。
 *
 * Date#getFullYear は実行環境のタイムゾーンで年を返す。ビルド環境が UTC だと
 * （Vercel がそう）、元日の JST 0時〜9時にビルドした場合だけ前年になる。
 * この値は「【2026年版】」のような記事タイトルや FAQ 本文に埋め込んでおり、
 * 年始に前年表記のまま公開されてしまう。
 *
 * 日付表示（formatDateDisplay など）は既に timeZone 指定で JST 固定なので、
 * 年だけがこの経路で環境依存に残っていた。ここに寄せて揃える。
 */
export function currentJstYear(): number {
  // sv-SE は YYYY-MM-DD 形式。getTodayDate と同じ書き方に合わせている
  return Number(new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }).slice(0, 4))
}
