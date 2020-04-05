/* eslint-disable react/prop-types */
import React from 'react';
import Layout from '../Layout';
import UserDetailsForm from './userDetailsForm';
import { PageWrapper } from './styles';

const UserPage = ({ user }) => (
  <Layout>
    <PageWrapper>
      <UserDetailsForm user={user} />
    </PageWrapper>
  </Layout>
);

export default UserPage;
