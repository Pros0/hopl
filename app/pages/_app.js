import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

export default class HoplApp extends App {
  state = {
    theme: {},
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;

    return (
      <>
        <Head>
          <title>Hopl</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <>
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </>
    );
  }
}
