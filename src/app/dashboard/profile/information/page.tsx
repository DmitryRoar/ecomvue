'use client';

import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

// material-ui
import { Grid, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ProfileEditDetails from 'components/profile/information/edit-details';
import { ProfileServices } from 'components/profile/information/services';
import ProfileSummary from 'components/profile/information/summary';
import useAuth from 'hooks/useAuth';
import { useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { UserSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';

const ProfilePage = () => {
  const theme = useTheme();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [value, setValue] = useState<string>(user?.first_name ? '2' : '1');

  const switchTab = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const fetchData = useCallback(async () => {
    await dispatch(UserSlice.getMarkets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (user && !user?.first_name) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Для продолжения необходимо заполнить поле "Имя"',
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  }, [user, dispatch]);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <TabContext value={value}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="profile tabs"
              variant="scrollable"
              sx={{
                mb: 3,
                '& a': {
                  minHeight: 'auto',
                  minWidth: 10,
                  py: 1.5,
                  px: 1,
                  mr: 2.25,
                  color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                '& a.Mui-selected': {
                  color: theme.palette.primary.main
                },
                '& .MuiTabs-indicator': {
                  bottom: 2
                },
                '& a > svg': {
                  marginBottom: '0px !important',
                  mr: 1.25
                },
                'button:disabled': {
                  cursor: 'not-allowed'
                }
              }}
            >
              <Tab label={intl.formatMessage({ id: 'profile' })} value="0" disabled={!user?.first_name} />
              <Tab label={intl.formatMessage({ id: 'information' })} value="1" />
              <Tab label={intl.formatMessage({ id: 'services' })} value="2" disabled={!user?.first_name} />
            </Tabs>
            <TabPanel value="0">
              <ProfileSummary onSwitchTab={switchTab} />
            </TabPanel>
            <TabPanel value="1">
              <ProfileEditDetails />
            </TabPanel>
            <TabPanel value="2">
              <ProfileServices />
            </TabPanel>
          </Grid>
        </TabContext>
      </Grid>
    </MainCard>
  );
};

export default ProfilePage;
