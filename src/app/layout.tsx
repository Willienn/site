import { Providers } from "./providers";
import Head from "next/head";
import { WebSite, WithContext } from "schema-dts";
import { ReactNode } from "react";

// export const runtime = 'edge'

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Codes",
    alternateName: "daily codes",
    description: "Talk about anything i want and sometimes my poems",
    url: "https://dailycodes.dev/",
  };

  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="a9WvUWUgrdGoNizhM8stU7ycvk83LEMaODs_8wXyw0M"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/favicon-144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <body>
        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </section>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
