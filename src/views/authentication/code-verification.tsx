'use client';
import Link from 'next/link';

// material-ui
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import AuthCodeVerification from 'components/authentication/auth-forms/AuthCodeVerification';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { TransformUtils } from 'utils';

// ===========================|| AUTH3 - CODE VERIFICATION ||=========================== //
const CodeVerification = () => {
  const theme = useTheme();
  const router = useRouter();
  const { confirmMail, onLogout } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const goBackHandler = () => {
    onLogout();
    router.push('/auth/login');
  };

  return (
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
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            <FormattedMessage id="code-verification" />
                          </Typography>
                          <Typography variant="subtitle1" fontSize="1rem">
                            <FormattedMessage id="send-code-verification" />
                          </Typography>
                          {confirmMail && (
                            <Typography variant="caption" fontSize="0.875rem" textAlign={matchDownSM ? 'center' : 'inherit'}>
                              <FormattedMessage id="to-code-verification" /> {TransformUtils.hideEmail(confirmMail)}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthCodeVerification />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
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
  );
};

export default CodeVerification;
