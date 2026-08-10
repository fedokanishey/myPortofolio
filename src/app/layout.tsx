import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgressBar } from "@/components/atoms/ScrollProgressBar";
import { CursorFollower } from "@/components/atoms/CursorFollower";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6366F1",
};

export const metadata: Metadata = {
  title: {
    template: "%s | PortfolioBuilder",
    default: "PortfolioBuilder - Create Your Professional Portfolio",
  },
  description:
    "Build and showcase your professional portfolio with our modern, customizable platform. Stand out with beautiful designs and seamless sharing.",
  keywords: [
    "portfolio",
    "developer portfolio",
    "portfolio builder",
    "professional portfolio",
  ],
  authors: [{ name: "PortfolioBuilder" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PortfolioBuilder",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PortfolioBuilder",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        </head>
        <body className={`${inter.variable} ${plusJakarta.variable} ${caveat.variable} font-sans antialiased bg-background text-foreground selection:bg-indigo-500/30 selection:text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              <ScrollProgressBar />
              <CursorFollower />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
