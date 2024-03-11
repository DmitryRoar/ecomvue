'use client';

import { Alert, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { StorageNames } from 'types/user';
import { ProfileSectionServices } from './section/services';
import { ProfileSectionMarketplaces } from './section/services/marketplaces';

export const ProfileServices = () => {
  const theme = useTheme();

  const [showTitle, setShowTitle] = useState(JSON.parse(localStorage.getItem(StorageNames.servicesTitle) as string) || true);

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
        <ProfileSectionMarketplaces />
      </Grid>

      <Grid item xs={12}>
        <ProfileSectionServices />
      </Grid>
    </Grid>
  );
};
