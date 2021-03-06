import React from 'react';
import Document from 'next/document';
import Head from 'next/head';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

export default class HoplDocument extends Document {
  static async getInitialProps(ctx) {
    const styledSheets = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    const {
      req: { locale, localeDataScript },
    } = ctx;

    const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${locale}`;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledSheets.collectStyles(
              materialUiSheets.collect(
                <>
                  <Head>
                    <title>Hopl</title>
                    <meta charSet="utf-8" />
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <script src={polyfill} />
                    <script
                      dangerouslySetInnerHTML={{
                        __html: localeDataScript,
                      }}
                    />
                  </Head>
                  <App {...props} />
                </>,
              ),
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        locale,
        localeDataScript,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledSheets.seal();
    }
  }
}
