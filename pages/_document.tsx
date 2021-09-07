import Document, { Head, Html, Main, NextScript } from 'next/document';

import { mediaStyles } from '@/components/media';

export default class HubDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
