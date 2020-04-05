import React from 'react';
import withAuth from '../hocs/withAuth';
import SearchPage from '../components/SearchPage';
import UserPage from '../components/UserPage';

const Index = (props) => {
  // eslint-disable-next-line react/prop-types
  const { user } = props;
  return user?.roles?.some((role) => role === 'organiser') ? (
    <SearchPage {...props} />
  ) : (
    <UserPage {...props} />
  );
};

export default withAuth({
  WrappedComponent: Index,
  redirectTo: '/login',
  shouldBeLoggedIn: true,
});
