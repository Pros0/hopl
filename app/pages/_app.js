import React from 'react';
import App from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import originalTheme from '../theme/theme';
import GlobalBodyHeightStyle from '../theme/globalBodyHeightStyle';
import GlobalStyle from '../theme/globalStyle';
const cache = createIntlCache();

export default class HoplApp extends App {
  state = {
    theme: originalTheme,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { req } = ctx;
    // eslint-disable-next-line no-underscore-dangle
    const { locale, messages } = req || window.__NEXT_DATA__.props;

    return { pageProps, locale, messages };
  }

  render() {
    const { theme } = this.state;
    const { Component, pageProps, locale, messages } = this.props;

    const intl = createIntl(
      {
        locale,
        messages,
      },
      cache,
    );

    return (
      <RawIntlProvider value={intl}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <>
              <CssBaseline />
              <GlobalStyle />
              <GlobalBodyHeightStyle
                mergeWithTheme={(toMerge) => {
                  this.setState({ theme: { ...theme, ...toMerge } });
                }}
              />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </MuiThemeProvider>
      </RawIntlProvider>
    );
  }
}
