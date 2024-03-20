'use client';

import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import useAuth from 'hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { TransformUtils } from 'utils';

const CodeVerification = () => {
  const theme = useTheme();
  const router = useRouter();
  const intl = useIntl();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { confirmMail, onLogout, onConfirmEmail } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!confirmMail) {
      router.replace('/auth/login');
    }
  }, [confirmMail]);

  const confirmHandler = async (uid: string, token: string) => {
    try {
      await onConfirmEmail(uid, token);
      router.push('/auth/login');
      dispatch(
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'success' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'success'
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    if (token && uid) {
      confirmHandler(uid, token);
    }
  }, [searchParams]);

  const goBackHandler = () => {
    onLogout();
    router.replace('/auth/login');
  };

  return (
    confirmMail && (
      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Typography color={theme.palette.secondary.main} gutterBottom variant="h3">
                        {process.env.NEXT_PUBLIC_NAME}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1" fontSize="0.875rem" textAlign={'center'}>
                              <FormattedMessage id="to-code-verification" /> {TransformUtils.hideEmail(confirmMail)}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <AuthCodeVerification />
                  </Grid> */}
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        href="#"
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                        textAlign={matchDownSM ? 'center' : 'inherit'}
                      >
                        <FormattedMessage id="didnt-receive-code" />
                      </Typography>
                    </Grid>
                  </Grid> */}
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="outlined"
                          color="secondary"
                          onClick={goBackHandler}
                        >
                          <FormattedMessage id="back" />
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
    )
  );
};

export default CodeVerification;
