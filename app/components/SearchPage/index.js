import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import LocationSearch from 'components/LocationSearch';
import SearchProfile from './searchProfile';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import { SearchFieldWrapper } from './styled';

const SearchPage = () => {
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  return <>
    <FilterModal open={filterModalOpen} onClose={() => setFilterModelOpen(false)} />
    <SearchFieldWrapper>
      <LocationSearch />
      <SearchProfile addSearchProfileClick={() => setFilterModelOpen(true)} />
    </SearchFieldWrapper>
    <SearchResult />
  </>;
}

export default SearchPage;