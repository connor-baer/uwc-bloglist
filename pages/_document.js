import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { LOCALE } from '../constants/site';
import { FAVICONS_PATH } from '../constants/paths';

export default class CustomDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <html lang={LOCALE}>
        <Head>
          <link
            rel="shortcut icon"
            href={`${FAVICONS_PATH}/favicon.ico`}
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${FAVICONS_PATH}/favicon.png`}
          />
          <link
            rel="apple-touch-icon"
            href={`${FAVICONS_PATH}/apple-touch-icon.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${FAVICONS_PATH}/apple-touch-icon-57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${FAVICONS_PATH}/apple-touch-icon-72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${FAVICONS_PATH}/apple-touch-icon-76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${FAVICONS_PATH}/apple-touch-icon-114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${FAVICONS_PATH}/apple-touch-icon-120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${FAVICONS_PATH}/apple-touch-icon-144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${FAVICONS_PATH}/apple-touch-icon-152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${FAVICONS_PATH}/apple-touch-icon-180x180.png`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
