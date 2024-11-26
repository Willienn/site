import { SpeedInsights } from "@vercel/speed-insights/next"
import { Fira_Code, Poppins, Roboto_Slab } from "next/font/google"
import { ReactNode, StrictMode } from "react"
import { WebSite, WithContext } from "schema-dts"

const firaCode = Fira_Code({
  subsets: [
    "latin",
  ],
  display: "swap",
  variable: "--font-fira-code",
})

const poppins = Poppins({
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  subsets: [
    "latin",
  ],
  display: "swap",
  variable: "--font-poppins",
})

const robotoSlab = Roboto_Slab({
  subsets: [
    "latin",
  ],
  display: "swap",
  variable: "--font-roboto-slab",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Codes",
    alternateName: "Daily Codes Blog",
    description:
      "Discover Daily Codes, a personal blog by Willien Muniz. Here you may find insights on programming, web development, creative coding, my favorite podcasts, and poetry.",
    url: "https://dailycodes.dev/",
    keywords: [
      "podcasts",
      "Darknet Diaries",
      "Smashing Security",
      "blog",
      "daily",
      "Daily Codes",
      "codes",
      "poems",
      "programming",
      "web development",
      "Next.js",
      "Next.js 13",
      "Next.js 14",
      "Willien Muniz",
      "Willien",
      "programador web",
      "web developer",
      "developer",
      "programador",
      "creative coding",
    ],
    inLanguage: "en",
  }

  return (
    <StrictMode>
      <html
        lang="en"
        className={`${firaCode.variable} ${robotoSlab.variable} ${poppins.variable} bg-zinc-900 text-slate-200`}
      >
        <body>
          <section>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
              }}
            />
          </section>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </StrictMode>
  )
}
