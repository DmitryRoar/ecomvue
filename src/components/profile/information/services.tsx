'use client';

import { Alert, Autocomplete, Chip, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { StorageNames } from 'types/user';
import SubCard from 'ui-component/cards/SubCard';

export const ProfileServices = () => {
  const intl = useIntl();
  const theme = useTheme();

  const { types } = useSelector((s) => s.marketplace);

  const [showTitle, setShowTitle] = useState(JSON.parse(localStorage.getItem(StorageNames.servicesTitle) as string) || true);
  const [userData, setUserData] = useState([]);
  console.log('userdata: ', userData);

  useEffect(() => {
    const isShow = JSON.parse(localStorage.getItem(StorageNames.servicesTitle) as string);
    if (isShow !== null) {
      setShowTitle(isShow);
    }
  }, []);

  const closeAlertHandler = () => {
    setShowTitle(false);
    localStorage.setItem(StorageNames.servicesTitle, JSON.stringify(false));
  };

  return (
    <Grid container spacing={gridSpacing}>
      {showTitle && (
        <Grid item xs={12}>
          <Alert variant="outlined" severity="info" sx={{ borderColor: theme.palette.primary.main }} onClose={closeAlertHandler}>
            <Typography>
              <FormattedMessage id="services-title" />:
            </Typography>
          </Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <SubCard title={intl.formatMessage({ id: 'marketplaces' })}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={types}
              defaultValue={[]}
              getOptionLabel={(option) => option.value}
              onChange={(_, value) => {
                setUserData((state) => ({ ...state, marketplaces: value.map((v) => Number(v.type)) }));
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.type}>
                    {option.value}
                  </li>
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.type} label={option.value} />);
              }}
              renderInput={(params) => <TextField {...params} label={intl.formatMessage({ id: 'list' })} />}
            />
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};
