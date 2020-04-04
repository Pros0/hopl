import React, { Component } from 'react';
import { object, bool, node } from 'prop-types';
import Router from 'next/router';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { Cookies } from 'react-cookie';
import fetcher from '../utils/fetcher';
import { getGatewayUsersMe } from '../utils/gateways';

const withAuth = ({
  WrappedComponent,
  AltComponent,
  shouldBeLoggedIn,
  redirectTo,
}) => {
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
      let isAuthenticated = true;
      const result = await fetcher(getGatewayUsersMe(), {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        isAuthenticated = false;
      });
      isAuthenticated = isAuthenticated && !result.error;

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

      pageProps = { ...pageProps, user: result };

      return { pageProps, shouldRenderWrappedComponent };
    }

    render() {
      const { pageProps, shouldRenderWrappedComponent, children } = this.props;
      const component = WrappedComponent && shouldRenderWrappedComponent && (
        <WrappedComponent {...pageProps}>{children}</WrappedComponent>
      );
      const alt = AltComponent ? (
        <AltComponent {...pageProps}>{children}</AltComponent>
      ) : null;
      return component || alt;
    }
  }

  WithAuth.propTypes = {
    pageProps: object,
    shouldRenderWrappedComponent: bool,
    children: node,
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  hoistNonReactStatic(WithAuth, WrappedComponent);

  return WithAuth;
};

export default withAuth;
