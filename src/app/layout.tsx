import {Providers} from "./providers";
import {WebSite, WithContext} from "schema-dts";
import {ReactNode} from "react";
import {Fira_Code, Roboto_Slab} from "next/font/google";

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Codes",
    alternateName: "daily codes",
    description: "Talk about anything i want and sometimes my poems",
    url: "https://dailycodes.dev/",
    keywords: ["blog", "daily", "codes", "poems", "programming", "web development","nextjs","nextjs13","nextjs14"],
  };

  return (
    <html lang="en" className={`${firaCode.variable} ${robotoSlab.variable}`}>
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
