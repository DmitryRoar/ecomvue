'use client';

import { useState } from 'react';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { FormattedMessage } from 'react-intl';
import OtpInput from 'react18-input-otp';
import axios from 'utils/axios';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
  const theme = useTheme();
  const [otp, setOtp] = useState<string>();
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];

  const submitHandler = async () => {
    try {
      await axios.post('/v1/users/confirm-email/', { user_id: '', confirmation_code: otp });
    } catch (err) {
      console.log(err);
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
          numInputs={4}
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
