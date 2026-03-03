import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Victor Palacios — Senior UX Consultant",
  description: "Senior UX consultant helping product teams ship software people actually use. 25+ years experience. Book a discovery call.",
  openGraph: {
    title: "Victor Palacios — Senior UX Consultant",
    description: "I turn complex systems into simple, human experiences.",
    url: "https://www.victorpalacios.ca",
    siteName: "Victor Palacios",
    locale: "en_CA",
    type: "website",
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
        <Nav />
        {children}
      </body>
    </html>
  );
}
