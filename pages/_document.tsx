import Document, { Head, Html, Main, NextScript } from 'next/document';

import { mediaStyles } from '@/components/media';

export default class HubDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link href="/pygments.css" rel="stylesheet" />

          <style
            type="text/css"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
