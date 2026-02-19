import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "ユーズドラボ | 中古Apple製品の価格比較・スペック情報",
  description: "中古iPhone・iPad・Apple Watch・MacBook・AirPodsの価格比較、スペック情報、おすすめショップを紹介",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
