import type { Metadata } from "next";
import "../../../src/app/globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import clsx from "clsx";

const oppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DailyQuill",
  description: "Home page of DailyQuill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(oppins.className, "min-h-screen")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
