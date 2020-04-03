import React from 'react';
import { Container } from '@material-ui/core';
import SearchField from './searchField';
import SearchProfile from './searchProfile';

const SearchPage = () => {
  return <Container fixed>
    <SearchField />
    <SearchProfile />
  </Container>;
}

export default SearchPage;