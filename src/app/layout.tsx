import type { Metadata } from "next";
import Script from "next/script";
import Pageview from "@/lib/Pageview";
import { Suspense } from "react";
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
        <Suspense fallback={null}>
          <Pageview />
        </Suspense>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P76ZSTQ5');
          `}
        </Script>
        {children}

      
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P76ZSTQ5" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
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
