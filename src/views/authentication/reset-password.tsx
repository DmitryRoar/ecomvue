'use client';

import Link from 'next/link';

import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AuthResetPassword from 'components/authentication/auth-forms/AuthResetPassword';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

const ResetPassword = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return token ? (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link href="#" aria-label="theme-logo">
                      <Typography color={theme.palette.secondary.main} gutterBottom variant={'h3'}>
                        {process.env.NEXT_PUBLIC_NAME}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            <FormattedMessage id="reset-password" />
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            <FormattedMessage id="choose-new-password" />
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthResetPassword token={searchParams.get('token') as string} />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  ) : (
    <></>
  );
};

export default ResetPassword;
