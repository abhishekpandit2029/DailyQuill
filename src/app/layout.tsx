import type { Metadata } from "next";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { defaultProfileImage } from "@/constants/strings";

const oppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DailyQuill",
  description: "Home page of DailyQuill",
  icons: {
    icon: { url: defaultProfileImage, sizes: "84x84", type: "image/png" },
  },
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
