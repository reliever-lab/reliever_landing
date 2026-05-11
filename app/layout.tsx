import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reliever | 슬랙 기반 코드베이스 인텔리전스",
  description:
    "Reliever는 레포지토리, 엔지니어링 시스템, 코드베이스의 맥락을 분석하는 안전한 슬랙 에이전트를 제공합니다.",
  openGraph: {
    title: "Reliever | 슬랙 기반 코드베이스 인텔리전스",
    description:
      "레포지토리, 코드 오너십, 엔지니어링 맥락을 분석하는 안전한 슬랙 에이전트",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
