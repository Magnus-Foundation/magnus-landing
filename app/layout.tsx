import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magnus — The stablecoin blockchain",
  description:
    "An EVM-compatible Layer 1 for stablecoin payments in emerging markets. Pay gas in mVND, USDT, USDC, or any MIP-20 token. VietQR, M-Pesa, GCash, UPI, and PIX natively.",
  metadataBase: new URL("https://magnuschain.xyz"),
  openGraph: {
    title: "Magnus — The stablecoin blockchain",
    description: "Pay gas in any stablecoin. Native VietQR, M-Pesa, GCash, UPI, PIX rails.",
    url: "https://magnuschain.xyz",
    siteName: "Magnus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnus — The stablecoin blockchain",
    description: "Pay gas in any stablecoin. No bridging. Built for emerging markets.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-bg text-text-main flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
