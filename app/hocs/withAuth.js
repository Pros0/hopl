import React, { Component } from 'react';
import { object } from 'prop-types';
import Router from 'next/router';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { Cookies } from 'react-cookie';
import fetcher from '../utils/fetcher';

const withAuth = ({ WrappedComponent, redirectTo, shouldBeLoggedIn }) => {
  class WithAuth extends Component {
    static getCookies(ctx) {
      return ctx && ctx.req && ctx.req.headers.cookie
        ? new Cookies(ctx.req.headers.cookie)
        : new Cookies();
    }

    static async getInitialProps(ctx) {
      const cookies = this.getCookies(ctx);
      const token = cookies.get('token');

      const redirect = () =>
        typeof window !== 'undefined'
          ? Router.push(redirectTo)
          : ctx.res.writeHead(302, { Location: redirectTo }).end();

      if (shouldBeLoggedIn && !token) {
        return redirect();
      }

      // We don't care about the response, just that we don't get an error = we are authenticated
      // TODO
      //   const result = await fetcher('http://localhost:3000/users/me', {
      //     headers: { Authorization: token },
      //   });
      const result = { error: true };
      const isAuthenticated = !result.error;

      let pageProps = {};
      const shouldRenderWrappedComponent =
        (isAuthenticated && shouldBeLoggedIn) ||
        (!isAuthenticated && !shouldBeLoggedIn);

      if (!shouldRenderWrappedComponent && redirectTo) {
        return redirect();
      }

      if (shouldRenderWrappedComponent && WrappedComponent.getInitialProps) {
        pageProps = await WrappedComponent.getInitialProps(ctx);
      }

      return { pageProps };
    }

    render() {
      const { pageProps } = this.props;
      return WrappedComponent && <WrappedComponent {...pageProps} />;
    }
  }

  WithAuth.propTypes = {
    pageProps: object,
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  hoistNonReactStatic(WithAuth, WrappedComponent);

  return WithAuth;
};

export default withAuth;