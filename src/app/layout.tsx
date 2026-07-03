import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Spartan Coaching - Η Κορυφαία Σχολή Πόκερ",
  description: "Μάθε πόκερ από τους καλύτερους επαγγελματίες. Video μαθήματα, live coaching και ανάλυση χεριών.",
  keywords: "πόκερ, coaching, μαθήματα πόκερ, στρατηγική πόκερ, spartan coaching",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
