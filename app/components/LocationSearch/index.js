import React, { useState } from 'react';
import { func } from 'prop-types';
import {
  TextField,
  Grid,
  Container,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import LocationOn from '@material-ui/icons/LocationOn';
import { useIntl } from 'react-intl';
import { FlexGrowGrid } from 'components/common/styles';
import messages from './messages';

const LocationSearch = ({ onChange }) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let timer;
  const searchForLocation = (query) => {
    if (query.length > 3) {
      setLoading(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        axios
          .get(
            `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.locationIQAPIKey}&q=${query}`,
          )
          .then((val) => {
            setOptions(
              val.data.map((place) => ({
                id: place.place_id,
                name: place.display_place,
                boundingbox: place.boundingbox,
                adress: place.adress,
              })),
            );
            setLoading(false);
          });
      }, 2000);
    } else {
      setOptions([]);
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <LocationOn />
      </Grid>
      <FlexGrowGrid item>
        <Autocomplete
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          onChange={(e, option) => {
            onChange(option);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              onChange={(e) => searchForLocation(e.target.value)}
              label={formatMessage(messages.locationPlaceholder)}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                  </>
                ),
              }}
            />
          )}
        />
      </FlexGrowGrid>
    </Grid>
  );
};

LocationSearch.propTypes = {
  onChange: func,
};

export default LocationSearch;
