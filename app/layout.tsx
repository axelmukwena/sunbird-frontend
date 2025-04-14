import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteBaseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl ?? ""),
  title: "Meetcheck - Digital Meeting Attendance Tracker",
  applicationName: "Meetcheck",
  authors: {
    name: "Meetcheck",
    url: siteBaseUrl,
  },
  referrer: "origin",
  icons: {
    icon: "/static/favicon.ico",
    shortcut: "/static/favicon.ico",
    apple: "/static/meetcheck-seo.png",
  },
  description: "Streamline your meeting attendance with digital sign-in and QR code check-in",
  openGraph: {
    type: "website",
    url: siteBaseUrl,
    title: "Meetcheck - Digital Meeting Attendance Tracker",
    siteName: "Meetcheck",
    description: "Replace paper sign-in sheets with a modern digital solution for tracking meeting attendance",
    images: [
      {
        url: `${siteBaseUrl}/static/meetcheck-seo.png`,
        width: 1200,
        height: 630,
        alt: "Meetcheck logo with tagline: Streamline Meeting Attendance"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Meetcheck - Digital Meeting Attendance Tracker",
    description: "Modern solution for tracking meeting attendance with QR code check-in",
    images: [`${siteBaseUrl}/static/meetcheck-seo.png`],
  },
  assets: `${siteBaseUrl}/static/`,
  keywords: ["meeting attendance", "digital sign-in", "QR code check-in", "attendance tracker", "meeting management"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
