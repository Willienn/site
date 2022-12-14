import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="google-site-verification" content="a9WvUWUgrdGoNizhM8stU7ycvk83LEMaODs_8wXyw0M" />
          <title>Daily Codes</title>
          <meta
            name="description"
            content="Falo sobre notícias, curiosidades e também posto coisas autorais."
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/favicon-192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="160x160"
            href="/favicon-160.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/favicon-64.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16.png"
          />
          <link rel="apple-touch-icon" href="/favicon-57.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/favicon-144.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
