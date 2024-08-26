import type { Metadata } from "next";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import Dashboardlayout from "@/components/Main/Layout/Dashboardlayout";
import { AuthProvider } from "@/context/AuthProvider";

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
      <body className={oppins.className}>
        <AuthProvider>
          <Dashboardlayout>{children}</Dashboardlayout>
        </AuthProvider>
      </body>
    </html>
  );
}
