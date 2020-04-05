import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import LocationSearch from 'components/LocationSearch';
import FilterList from '@material-ui/icons/FilterList';
import { AuthContext } from '../../contexts/authContext';
import fetcher from '../../utils/fetcher';
import SearchResult from './searchResult';
import FilterModal from './filterModal';
import UserInformationModal from './userInformationModal';
import { SearchFieldWrapper } from './styled';
import Layout from '../Layout';
import messages from './messages';
import { getGatewayUsers } from '../../utils/gateways';

const SearchPage = () => {
  const { formatMessage } = useIntl();
  const [filterModalOpen, setFilterModelOpen] = useState(false);
  const [userModalOpen, setUserModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ init: false });
  const [hasFilters, setHasFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery.init && !loading) {
      setLoading(true);
      fetcher(`${getGatewayUsers()}/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          setResult([resp]);
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
          setSearchQuery({ ...searchQuery, ...filter, init: true });
          setFilterModelOpen(false);
        }}
        onClose={() => setFilterModelOpen(false)}
      />
      {/** TODO: <UserInformationModal /> is a work in progress  */}
      <UserInformationModal
        onClose={() => setUserModelOpen(false)}
        open={userModalOpen}
        user={{
          firstName: 'Demo',
          lastName: 'Demosson',
          email: 'demo@demo.se',
        }}
      />
      <SearchFieldWrapper>
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs={12}>
            <LocationSearch
              onChange={(location) =>
                setSearchQuery({ ...searchQuery, ...location, init: true })
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
      <SearchResult
        searchResults={result}
        loading={loading}
        onSelect={() => setUserModelOpen(true)}
      />
    </Layout>
  );
};

export default SearchPage;
