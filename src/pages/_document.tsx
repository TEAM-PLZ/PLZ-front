import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.png" />
          <title>플리즈</title>
          <meta name="description" content="내 플리를 부탁해, 플리즈" />
          <meta name="keywords" content="플리즈, 내 플리를 부탁해, plz" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="플리즈" />
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:description" content="내 플리를 부탁해, 플리즈" />
          <meta property="og:url" content="" />
          <meta property="og:site_name" content="플리즈" />
          <meta property="og:locale" content="ko_KR" />
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
