import { Providers } from "./providers";
import Head from "next/head";

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "http://www.schema.org",
    "@type": "WebSite",
    name: "Daily Codes",
    alternateName: "dailycodes",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
