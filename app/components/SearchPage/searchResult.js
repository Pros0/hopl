import React from 'react';
import { bool, array, func } from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { useIntl } from 'react-intl';
import { SearchResultWrapper, SearchResultText } from './styled';
import SearchResultItem from './searchResultItem';
import messages from './messages';

const LoadingSearchResults = () =>
  [...Array(6).keys()].map((key) => (
    <SearchResultItem
      key={key}
      avatar={
        <Skeleton animation="wave" variant="circle" width={40} height={40} />
      }
      name={
        <Skeleton
          animation="wave"
          height={10}
          width="40%"
          style={{ marginBottom: 6 }}
        />
      }
      shortInfo={
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      infoText={
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 4 }} />
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 4 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="75%"
            style={{ marginBottom: 4 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="90%"
            style={{ marginBottom: 4 }}
          />
        </>
      }
    />
  ));

const SearchResult = ({ loading, searchResults, onSelect }) => {
  const { formatMessage } = useIntl();
  return (
    <SearchResultWrapper>
      {loading ? (
        <LoadingSearchResults />
      ) : (
        <>
          {searchResults.length ? (
            <>
              {searchResults.map((user) => (
                <SearchResultItem
                  key={user.id}
                  onClick={onSelect}
                  name={`${user.firstName} ${user.lastName}`}
                  infoText="Hi! I am just here for the demo so dont mind me!"
                  avatar={`${user.firstName ? user.firstName[0] : ''}${
                    user.lastName ? user.lastName[0] : ''
                  }`}
                />
              ))}
            </>
          ) : (
            <>
              <SearchResultText>
                {formatMessage(messages.noSearchResults)}
              </SearchResultText>
            </>
          )}
        </>
      )}
    </SearchResultWrapper>
  );
};

SearchResult.propTypes = {
  loading: bool,
  onSelect: func,
  searchResults: array,
};

SearchResult.defaultProps = {
  loading: false,
  onSelect: () => {},
  searchResults: [],
};

export default SearchResult;
