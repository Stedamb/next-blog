import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "easymde/dist/easymde.min.css";
import { Navbar } from "@/components/Navbar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
  weight: "100 900",
});
const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${clashDisplay.variable} antialiased`}
      >
        <Navbar />
        <main className="mx-4">
          {children}
        </main>
      </body>
    </html>
  );
}
