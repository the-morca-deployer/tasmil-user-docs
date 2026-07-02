import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.tasmil.finance"),
  title: {
    template: "%s | Tasmil Finance Docs",
    default: "Tasmil Finance Docs",
  },
  description:
    "Learn how to use Tasmil Finance — AI-managed DeFi yield vaults on Stellar.",
  openGraph: {
    title: "Tasmil Finance Docs",
    description:
      "Learn how to use Tasmil Finance — AI-managed DeFi yield vaults on Stellar.",
    url: "https://docs.tasmil.finance",
    siteName: "Tasmil Finance Docs",
    images: [{ url: "/brand/og-default.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-fd-background text-fd-foreground">
        {/* @ts-expect-error fumadocs 16.8.11: the `next` RootProviderProps loses `children` through ComponentProps<>, but it is the provider wrapping the app and renders children at runtime. */}
        <RootProvider theme={{ defaultTheme: "dark" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
