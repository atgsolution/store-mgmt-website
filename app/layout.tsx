import type { Metadata } from "next";
import "./globals.css";

const title = "Store MGMT Community Edition";
const description = "Open-source, self-hosted POS and store management for small shops, cafés, and restaurants.";

export const metadata: Metadata = {
  metadataBase: new URL("https://storemgmt.atg-solution.vn"),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title, description, url: "/", siteName: title, type: "website", images: [{ url: "/og.jpg", width: 1280, height: 640, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
