import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationDesktop from "../components/desktopNav";

export const metadata: Metadata = {
  title: "Fit Plants",
  description: "Monitor your plants!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <NavigationDesktop/>
        {children}
      </body>
    </html>
  );
}
