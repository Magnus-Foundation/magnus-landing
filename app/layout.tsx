import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  title: "Magnus, the settlement layer for stablecoins",
  description:
    "An EVM-compatible Layer 1 for stablecoin payments. Pay gas in any stablecoin, with no destination gas. Native fiat-rail gateways (VietQR, M-Pesa, GCash, UPI, PIX) are on the roadmap.",
  metadataBase: new URL("https://magnus.foundation"),
  openGraph: {
    title: "Magnus, the settlement layer for stablecoins",
    description: "Pay gas in any stablecoin. No destination gas. Built for emerging-market payments.",
    url: "https://magnus.foundation",
    siteName: "Magnus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@magnus_chain",
    creator: "@magnus_chain",
    title: "Magnus, the settlement layer for stablecoins",
    description: "Pay gas in any stablecoin. No destination gas. EVM-native.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-[100dvh] bg-bg text-text-main flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
