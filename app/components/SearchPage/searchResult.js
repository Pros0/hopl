import React from 'react';
import { bool, array } from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { useIntl } from 'react-intl';
import { SearchResultWrapper, SearchResultText } from './styled';
import SearchResultItem from './searchResultItem';
import messages from './messages';

const LoadingSearchResults = () => {
  return [...Array(6).keys()].map(key => <SearchResultItem 
    avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
    name={<Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />}
    shortInfo={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
    infoText={<>
      <Skeleton animation="wave" height={10} style={{ marginBottom: 4 }} />
      <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 4 }} />
      <Skeleton animation="wave" height={10} width="75%" style={{ marginBottom: 4 }} />
      <Skeleton animation="wave" height={10} width="90%" style={{ marginBottom: 4 }} />
    </>}
    />)
}

const SearchResult = ({ isLoading, searchResults }) => {
  const { formatMessage } = useIntl();
  return <SearchResultWrapper>
      {isLoading ? <LoadingSearchResults /> : <>
        {searchResults.length ? <>
          {searchResults.map(user => <SearchResultItem 
            name={user.name}
            infoText={user.info}
            avatar={user.name[0]}
          />)}
        </> : <>
          <SearchResultText>
            {formatMessage(messages.noSearchResults)}
          </SearchResultText>
        </>
      }
      </>}
    </SearchResultWrapper>
}

SearchResult.propTypes = {
  isLoading: bool,
  searchResults: array
}

SearchResult.defaultProps = {
  isLoading: false,
  searchResults: []
}

export default SearchResult;