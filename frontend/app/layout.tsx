import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authContext";
import Header from "@/components/Header";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Metadata } from "next";
import StudentProvider from "@/context/studentContext";
import Footer from "@/components/Footer";

const jetBrainsMono = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
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
          <StudentProvider>
            <PrimeReactProvider>
              <ProtectedRoute>
                <Header />
                {children}
                <Footer/>
              </ProtectedRoute>
            </PrimeReactProvider>
          </StudentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
