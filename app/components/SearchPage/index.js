import React, { useState, useEffect } from 'react';
import LocationSearch from 'components/LocationSearch';
import SearchProfile from './searchProfile';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import { SearchFieldWrapper } from './styled';
import Layout from '../Layout';

const SearchPage = () => {
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    console.log('filter changed:', searchQuery);
  });

  return (
    <Layout>
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
    </Layout>
  );
};

export default SearchPage;
