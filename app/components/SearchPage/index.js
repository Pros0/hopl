import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { AuthContext } from '../../contexts/authContext';
import fetcher from '../../utils/fetcher';
import LocationSearch from 'components/LocationSearch';
import FilterList from '@material-ui/icons/FilterList';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import { SearchFieldWrapper } from './styled';
import Layout from '../Layout';
import messages from './messages';
import { getGatewayUsers } from '../../utils/gateways';

const SearchPage = () => {
  const { formatMessage } = useIntl();
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [hasFilters, setHasFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (searchQuery.name && !loading) {
      setLoading(true);
      fetcher(`${getGatewayUsers()}/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          setResult(resp);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
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
