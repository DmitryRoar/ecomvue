'use client';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { OrganizationSlice } from 'store/slices';
import { OrganizationRole } from 'types/organization';
import MainCard from 'ui-component/cards/MainCard';
import Loader from 'ui-component/Loader';
import AccessCreateDetails from './deatils';
import { ProfileAccessItem } from './item';

type Mode = 'details' | null;

export const ProfileAccessList = () => {
  const intl = useIntl();
  const router = useRouter();

  const dispatch = useDispatch();
  const { roles } = useSelector((s) => s.organization);

  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [targetRole, setTargetRole] = useState<OrganizationRole>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(OrganizationSlice.getRoles());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchModeHandler = (mode: Mode) => {
    if (isDisabled) return;
    setMode(mode);
  };

  const goToCreate = () => {
    router.push('access/create');
    setIsDisabled(true);
  };

  return (
    <MainCard title={intl.formatMessage({ id: 'list' })}>
      {loading && <Loader />}
      <Grid container spacing={gridSpacing}>
        <Grid item xs zeroMinWidth>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <OutlinedInput
                id="input-search-card-style1"
                placeholder={intl.formatMessage({ id: 'search' })}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="16px" />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineOutlinedIcon />}
                sx={{ px: 2.75, py: 1.5 }}
                disabled={loading || isDisabled}
                onClick={goToCreate}
              >
                <FormattedMessage id="add" />
              </Button>
            </Grid>

            {roles.map((role, index) => (
              <Grid item xs={12} key={index}>
                <Grid container direction="row" spacing={0}>
                  <ProfileAccessItem
                    onActive={() => {
                      setTargetRole(role);
                      switchModeHandler('details');
                    }}
                    isDisabled={isDisabled}
                    role={role}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {mode === 'details' && (
          <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
            <AccessCreateDetails data={targetRole as OrganizationRole} onClose={() => switchModeHandler(null)} />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};
