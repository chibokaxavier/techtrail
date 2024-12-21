import { Text_Me_One } from "next/font/google";
import "./globals.css";
import AuthProvider, { useStoreContext } from "@/context/authContext";
import Header from "@/components/Header";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Metadata } from "next";

const jetBrainsMono = Text_Me_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Text_Me_One",
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
            <ProtectedRoute>
              <Header />
              {children}
            </ProtectedRoute>
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
