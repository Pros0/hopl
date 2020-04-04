import React from 'react';
import {
  CardHeader,
  Card,
  Avatar,
  Typography,
  CardContent,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { SearchItemWrapper } from './styled';

const SearchResultItem = ({ avatar, infoText, name, shortInfo }) => (
  <SearchItemWrapper>
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{avatar}</Avatar>}
        title={name}
        subheader={shortInfo}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {infoText}
        </Typography>
      </CardContent>
    </Card>
  </SearchItemWrapper>
);

export default SearchResultItem;
