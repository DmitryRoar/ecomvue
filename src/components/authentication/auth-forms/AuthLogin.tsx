import Link from 'next/link';
import React from 'react';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { ReferalSlice } from 'store/slices';
import { StorageNames } from 'types/user';
import { openSnackbar } from '../../../store/slices/snackbar';
import AuthSignInButtons from './AuthSignInButtons';

const INIT_VALUE = {
  email: 'example@ecomvue.com',
  password: 'example',
  submit: null
};

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const theme = useTheme();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { onLogin } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  const submitHandler = async (values: any) => {
    try {
      if (values.email.trim() === INIT_VALUE.email.trim()) {
        throw Error(intl.formatMessage({ id: 'enter-correct-values' }));
      } else {
        await onLogin(values.email, values.password);
        const referal = localStorage.getItem(StorageNames.referal);
        if (referal) {
          await dispatch(ReferalSlice.setToken({ token: referal }));
          localStorage.removeItem(StorageNames.referal);
        }
      }
    } catch (err: any) {
      console.log(err.message);
      dispatch(
        openSnackbar({
          open: true,
          message: err?.message ?? err?.detail,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  return (
    <Formik
      initialValues={INIT_VALUE}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Это поле обязательно'),
        password: Yup.string().max(255).required('Это поле обязательно')
      })}
      onSubmit={submitHandler}
      enableReinitialize
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} autoComplete="off" {...others}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">
              <FormattedMessage id="password" />
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label={<FormattedMessage id="keepLogged" />}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component={Link}
                href="/auth/forgot-password"
                color="secondary"
                sx={{ textDecoration: 'none' }}
              >
                <FormattedMessage id="forgotPassword" />
              </Typography>
            </Grid>
          </Grid>
          <AuthSignInButtons />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                <FormattedMessage id="login" />
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
