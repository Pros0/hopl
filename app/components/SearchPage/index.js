import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import LocationSearch from 'components/LocationSearch';
import FilterList from '@material-ui/icons/FilterList';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import { SearchFieldWrapper } from './styled';
import Layout from '../Layout';
import messages from './messages';

const SearchPage = () => {
  const { formatMessage } = useIntl();
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [hasFilters, setHasFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('filter changed:', searchQuery);
    if (searchQuery.name) {
      setLoading(true);
    }
  }, [searchQuery]);

  return (
    <Layout>
      <FilterModal
        open={filterModalOpen}
        onChange={(filter) => {
          setSearchQuery({ ...searchQuery, ...filter });
          setFilterModelOpen(false);
        }}
        onClose={() => setFilterModelOpen(false)}
      />
      <SearchFieldWrapper>
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs={12}>
            <LocationSearch
              onChange={(location) =>
                setSearchQuery({ ...searchQuery, ...location })
              }
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<FilterList />}
              onClick={() => setFilterModelOpen(true)}
            >
              {formatMessage(messages.setFilters)}
            </Button>
          </Grid>
        </Grid>
      </SearchFieldWrapper>
      <SearchResult loading={loading} />
    </Layout>
  );
};

export default SearchPage;
