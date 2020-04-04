import React from 'react';
import { Container } from '@material-ui/core';
import SearchField from './searchField';
import SearchProfile from './searchProfile';
import SearchResult from './searchResult';
import { SearchFieldWrapper } from './styled';

const SearchPage = () => {
  return <>
    <SearchFieldWrapper>
      <SearchField />
      <SearchProfile />
    </SearchFieldWrapper>
    <SearchResult />
  </>;
}

export default SearchPage;