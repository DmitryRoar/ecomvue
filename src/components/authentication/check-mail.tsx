'use client';

import Link from 'next/link';

// material-ui
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import { useRouter } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| AUTH3 - CHECK MAIL ||============================== //

const CheckMail = () => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const goBackHandler = () => {
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
                    <Link href="#" aria-label="theme-logo">
                      <Typography color={theme.palette.secondary.main} gutterBottom variant={'h3'}>
                        {process.env.NEXT_PUBLIC_NAME}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                      <Grid item xs={12}>
                        <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                          <FormattedMessage id="check-mail-title" />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                          <FormattedMessage id="check-mail-description" />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                        <FormattedMessage id="open-mail" />
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation fullWidth size="large" onClick={goBackHandler}>
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

export default CheckMail;
