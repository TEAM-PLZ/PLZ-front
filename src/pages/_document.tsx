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
          <meta name="description" content="내 플리를 부탁해, 플리즈" />
          <meta name="keywords" content="플리즈, 내 플리를 부탁해, plz, 플레이리스트" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="플리즈" />
          <meta property="og:image" content="/preview.png" />
          <meta property="og:description" content="내 플리를 부탁해, 플리즈" />
          <meta property="og:url" content="https://plz-front-highjoon.vercel.app/" />
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
