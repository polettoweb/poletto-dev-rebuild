import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poletto.dev"),
  title: "Marco Poletto | Engineering leadership, in practice",
  description:
    "Writing on scaling engineering organisations, delivery, and the human side of technology.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    url: "https://poletto.dev",
    siteName: "Marco Poletto",
    title: "Marco Poletto | Engineering leadership, in practice",
    description:
      "Writing on scaling engineering organisations, delivery, and the human side of technology.",
  },
  twitter: {
    card: "summary",
    title: "Marco Poletto | Engineering leadership, in practice",
    description:
      "Writing on scaling engineering organisations, delivery, and the human side of technology.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://poletto.dev/#marco",
                  name: "Marco Poletto",
                  jobTitle: "Engineering Leader",
                  url: "https://poletto.dev/about",
                  sameAs: [
                    "https://github.com/polettoweb",
                    "https://www.linkedin.com/in/marco-poletto-96853774/",
                    "https://x.com/GamerSince8bit",
                    "https://bsky.app/profile/poletto.dev",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://poletto.dev/#website",
                  name: "Marco Poletto",
                  url: "https://poletto.dev",
                  description:
                    "Writing on scaling engineering organisations, delivery, and the human side of technology.",
                  publisher: { "@id": "https://poletto.dev/#marco" },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
