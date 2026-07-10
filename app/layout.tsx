import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Masti Ki Paathshaala — Learn & Lead | 21st-Century Skills Academy",
  description:
    "A premium 21st-century skill development academy for kids & adults. Robotics, Coding & AI, Chess, Music, Dance, Art, Public Speaking & more — taught with joy in small caring batches. Book a free trial today.",
  keywords: [
    "skill development academy",
    "robotics classes",
    "coding classes",
    "chess classes",
    "learning academy for kids and adults",
    "Masti Ki Paathshaala",
  ],
  openGraph: {
    title: "Masti Ki Paathshaala — Learn & Lead",
    description:
      "Where joy meets learning. Premium 21st-century skill programs for kids & adults.",
    type: "website",
  },
  icons: { icon: "/mkplogo.png" },
};

export const viewport: Viewport = {
  themeColor: "#FFF9F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
