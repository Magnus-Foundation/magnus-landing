import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer. No destination gas fees.",
  metadataBase: new URL("https://magnus.network"),
  openGraph: {
    title: "Magnus — The stablecoin blockchain",
    description:
      "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
    url: "https://magnus.network",
    siteName: "Magnus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnus — The stablecoin blockchain",
    description:
      "The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-bg text-text-main flex flex-col font-sans overflow-x-hidden selection:bg-brand-light/20 selection:text-brand-light">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
