import React from 'react';
import App from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

import originalTheme from '../theme/theme';
import GlobalBodyHeightStyle from '../theme/globalBodyHeightStyle';

export default class HoplApp extends App {
  state = {
    theme: originalTheme,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { theme } = this.state;
    const { Component, pageProps } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            <GlobalBodyHeightStyle
              mergeWithTheme={(toMerge) => {
                this.setState({ theme: { ...theme, ...toMerge } });
              }}
            />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}
