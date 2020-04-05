import React from 'react';
import App from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../contexts/authContext';
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

    const cookies =
      ctx && ctx.req && ctx.req.headers.cookie
        ? new Cookies(ctx.req.headers.cookie)
        : new Cookies();

    const token = cookies.get('token');

    return { pageProps, locale, messages, token };
  }

  render() {
    const { theme } = this.state;
    const { Component, pageProps, locale, messages, token } = this.props;
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
              <AuthContext.Provider value={{ token }}>
                <Component {...pageProps} />
              </AuthContext.Provider>
            </>
          </ThemeProvider>
        </MuiThemeProvider>
      </RawIntlProvider>
    );
  }
}
