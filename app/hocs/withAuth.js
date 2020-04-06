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

      // We now care a little about the response, because we want to send the logged in users data as a prop
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

      return { pageProps, user: result, shouldRenderWrappedComponent };
    }

    render() {
      const {
        pageProps,
        user,
        shouldRenderWrappedComponent,
        children,
      } = this.props;
      const component = WrappedComponent && shouldRenderWrappedComponent && (
        <WrappedComponent user={user} {...pageProps} />
      );
      const alt = AltComponent ? (
        <AltComponent {...pageProps}>{children}</AltComponent>
      ) : null;
      return component || alt;
    }
  }

  WithAuth.propTypes = {
    pageProps: object,
    user: object,
    shouldRenderWrappedComponent: bool,
    children: node,
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithAuth;
};

const hoistStatic = (higherOrderComponent) => (BaseComponent) => {
  const NewComponent = higherOrderComponent(BaseComponent);
  hoistNonReactStatic(NewComponent, BaseComponent);
  return NewComponent;
};

export default hoistStatic(withAuth);
