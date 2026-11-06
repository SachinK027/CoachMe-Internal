import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteSettings } from "@coachme/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: siteSettings.name,
    template: `%s | ${siteSettings.name}`,
  },
  description: siteSettings.tagline,
  openGraph: {
    title: siteSettings.name,
    description: siteSettings.tagline,
    type: "website",
    siteName: siteSettings.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
