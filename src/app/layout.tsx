import Header from "@/app/components/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dine Market",
  description:
    "An eCommerce Website built with NextJS 13.4.4, TailwindCss ,ShadcnUI & Sanity cms for managing content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Server Component */}

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
