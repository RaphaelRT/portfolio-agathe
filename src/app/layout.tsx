import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agathe Minier – Portfolio",
  description: "Agathe Minier – Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}

      
        <Script id="dev-info" strategy="afterInteractive">
          {`
            console.log(
              "%c Developed by ROBERT Raphaël ",
              "color: #fff; background: #000; padding: 4px 8px; font-size: 16px; font-weight: bold;"
            );
            console.log(
              "%c Portfolio: %chttps://raphaelrbr.com/",
              "color: #fff; font-size: 14px;",
              "color: #4caf50; font-size: 14px; text-decoration: underline;"
            );
            console.log(
              "%c GitHub: %chttps://github.com/RaphaelRT",
              "color: #fff; font-size: 14px;",
              "color: #2196f3; font-size: 14px; text-decoration: underline;"
            );
            console.log(
              "%c LinkedIn: %chttps://www.linkedin.com/in/raphael-rbrt/",
              "color: #fff; font-size: 14px;",
              "color: #0e76a8; font-size: 14px; text-decoration: underline;"
            );
          `}
        </Script>
      </body>
    </html>
  );
}
