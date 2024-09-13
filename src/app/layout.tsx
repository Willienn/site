import { Fira_Code, Poppins, Roboto_Slab } from "next/font/google"
import { ReactNode } from "react"
import { WebSite, WithContext } from "schema-dts"
import { Providers } from "./providers"

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Codes",
    alternateName: "daily codes",
    description: "Talk about anything i want and sometimes my poems",
    url: "https://dailycodes.dev/",
    keywords: [
      "blog",
      "daily",
      "codes",
      "poems",
      "programming",
      "web development",
      "nextjs",
      "nextjs13",
      "nextjs14",
    ],
  }

  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${robotoSlab.variable} ${poppins.variable}`}
    >
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
  )
}
