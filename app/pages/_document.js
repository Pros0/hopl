import React from 'react';
import Document from 'next/document';
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
                  <ThemeProvider theme={{}}></ThemeProvider>
                  <App {...props} />
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
