import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
