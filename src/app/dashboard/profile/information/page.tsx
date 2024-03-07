'use client';

import { SyntheticEvent, useCallback, useState } from 'react';

// material-ui
import { Grid, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ProfileEditDetails from 'components/profile/information/edit-details';
import ProfileSummary from 'components/profile/information/summary';
import useAuth from 'hooks/useAuth';
import { useIntl } from 'react-intl';

const ProfilePage = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { user } = useAuth();

  const [value, setValue] = useState<string>(user?.first_name ? '0' : '1');

  const switchTab = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
            </Tabs>
            <TabPanel value="0">
              <ProfileSummary onSwitchTab={switchTab} />
            </TabPanel>
            <TabPanel value="1">
              <ProfileEditDetails />
            </TabPanel>
          </Grid>
        </TabContext>
      </Grid>
    </MainCard>
  );
};

export default ProfilePage;
