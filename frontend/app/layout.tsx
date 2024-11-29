import type { Metadata } from "next";
import { Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authContext";
import Header from "@/components/Header";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";

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
          <PrimeReactProvider>
            <Header />
            {children}
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
