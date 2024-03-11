'use client';

import { useState } from 'react';

import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DASHBOARD_PATH } from 'config';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import OtpInput from 'react18-input-otp';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const AuthCodeVerification = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string>('');
  const { onConfirmEmail } = useAuth();
  const router = useRouter();
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];

  const submitHandler = async () => {
    try {
      await onConfirmEmail(otp);
      router.push(DASHBOARD_PATH);
    } catch (err: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: err?.details,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    } finally {
      setOtp('');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={(otpNumber: string) => setOtp(otpNumber)}
          numInputs={6}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            border: `2px solid ${theme.palette.primary.main}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button disableElevation disabled={!otp?.trim()} fullWidth size="large" type="submit" variant="contained" onClick={submitHandler}>
          <FormattedMessage id="continue" />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <FormattedMessage id="didnt-receive-code" />
          <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
            <FormattedMessage id="resend-code" />
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthCodeVerification;
