import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authContext";
import Header from "@/components/Header";

const jetBrainsMono = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Sorts_Mill_Goudy",
});

export const metadata: Metadata = {
  title: "TechTrail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
