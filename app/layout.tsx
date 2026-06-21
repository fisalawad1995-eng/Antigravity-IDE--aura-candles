import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import BackgroundGlow from "@/components/ui/background-components";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura — Candles, Gifts & Florals | Handcrafted Luxury",
  description:
    "Discover Aura — premium handcrafted candles, curated gift sets, and botanical floral arrangements. Transform your space with warmth, light, and artisan fragrance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <BackgroundGlow />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
