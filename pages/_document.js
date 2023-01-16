// Next imports
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;

/**
 * This file can update the <html> and <body> tags used to render a Page.
 * This file is only rendered on the server, 
 * so event handlers like onClick cannot be used in _document
 */