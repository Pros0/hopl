import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LocationSearch from 'components/LocationSearch';
import SearchProfile from './searchProfile';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import { SearchFieldWrapper } from './styled';

const SearchPage = () => {
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    console.log('filter changed:', searchQuery);
  });

  return (
    <>
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModelOpen(false)}
      />
      <SearchFieldWrapper>
        <LocationSearch
          onChange={(location) =>
            setSearchQuery({ ...searchQuery, ...location })
          }
        />
        <SearchProfile
          setSearchProfile={(searchProfile) =>
            setSearchQuery({ ...searchQuery, ...searchProfile })
          }
          addSearchProfileClick={() => setFilterModelOpen(true)}
        />
      </SearchFieldWrapper>
      <SearchResult />
    </>
  );
};

export default SearchPage;
