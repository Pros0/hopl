import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { SearchResultWrapper } from './styled';
import SearchResultItem from './searchResultItem';


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

const SearchResult = () => {
  return <SearchResultWrapper>
      <LoadingSearchResults />
    </SearchResultWrapper>
}

export default SearchResult;