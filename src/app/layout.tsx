import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artofdesign.academy"),
  title: "Art of Design (AOD) - Crack The Visual Logic",
  description:
    "Level up your creative journey with real-world skills from industry professionals. Crack the visual logic missing in Bangladesh.",
  openGraph: {
    title: "Art of Design (AOD) - Crack The Visual Logic",
    description:
      "Level up your creative journey with real-world skills from industry professionals. Think. Design. Dominate.",
    images: ["/images/course_1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#F9F9F9] text-[#0A0A0C] font-sans antialiased selection:bg-[#FF0022] selection:text-white">
        {children}
      </body>
    </html>
  );
}
