'use client'
import type { Metadata } from "next";
import { Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import AuthProvider, { useStoreContext } from "@/context/authContext";
import Header from "@/components/Header";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import ProtectedRoute from "@/components/ProtectedRoute";

const jetBrainsMono = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Sorts_Mill_Goudy",
});

const metadata: Metadata = {
  title: "TechTrail",
  openGraph: {
    title: "TechTrail",
    images: [
      {
        url: "/avatar.jpg", // Path to your image in the public directory
        alt: "TechTrail Logo", // Alternate text for accessibility
        width: 1200, // Recommended width for Open Graph images
        height: 630, // Recommended height for Open Graph images
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="TechTrail" />
        <meta property="og:image" content="http://localhost:3000/avatar.jpg" />
        <meta property="og:image:alt" content="TechTrail Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body
        className={` ${jetBrainsMono.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          <PrimeReactProvider>
            <ProtectedRoute >
              <Header />
              {children}
            </ProtectedRoute>
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
