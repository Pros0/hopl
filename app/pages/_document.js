import React from 'react';
import Document from 'next/document';
import Head from 'next/head';
import {
  ServerStyleSheet as StyledComponentSheets,
  ThemeProvider,
} from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

export default class HoplDocument extends Document {
  static async getInitialProps(ctx) {
    const styledSheets = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

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
                  </Head>
                  <ThemeProvider theme={{}}>
                    <App {...props} />
                  </ThemeProvider>
                </>,
              ),
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
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
