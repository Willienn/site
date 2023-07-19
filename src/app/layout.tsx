import "./global.css";
import { Providers } from "@/app/providers";
import Head from "next/head";
import { Box } from "@CS-chakra";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "Daily Codes",
  description: "Talk about anything i want and sometimes my poems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Providers>
          <Box
            minHeight={"100vh"}
            pos={"relative"}
            pb={["80px", "80px", "100px"]}
          >
            <Nav />
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
