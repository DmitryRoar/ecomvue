'use client';

import Link from 'next/link';
import React, { SyntheticEvent, useState } from 'react';

// material-ui
import {
    Box,
    Button,
    Checkbox,
    Dialog,
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
import AnimateButton from 'ui-component/extended/AnimateButton';

// types
// assets
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from 'hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { StringColorProps } from 'types';
import { StorageNames } from 'types/user';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from '../../../store/slices/snackbar';
import AuthSignInButtons from './AuthSignInButtons';

const JWTRegister = ({ ...others }) => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [termsModalIsOpened, setTermsModalIsOpened] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState<StringColorProps>();
  const { onRegister } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const openTermsModal = () => setTermsModalIsOpened(true);
  const closeTermsModal = () => setTermsModalIsOpened(false);

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .max(255)
            .required(intl.formatMessage({ id: 'required-input' })),
          password: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'required-input' }))
        })}
        onSubmit={async (values) => {
          try {
            setIsSubmit(true);
            const token = JSON.parse(localStorage.getItem(StorageNames.token) as string);
            if (searchParams.get('ref') && !token) {
              localStorage.setItem(StorageNames.referal, searchParams.get('ref') as string);
            }
            await onRegister(values.email, values.password);
            router.push('/auth/code-verification');
          } catch (err: any) {
            setIsSubmit(false);
            if (err) {
              dispatch(
                openSnackbar({
                  open: true,
                  message: err?.detail,
                  variant: 'alert',
                  anchorOrigin: { vertical: 'top', horizontal: 'center' },
                  close: false,
                  alert: {
                    color: 'error'
                  }
                })
              );
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">
                <FormattedMessage id="email" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">
                <FormattedMessage id="password" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      <FormattedMessage id="agreeWith" /> &nbsp;
                      <Typography onClick={openTermsModal} variant="subtitle1" component={Link} href="">
                        <FormattedMessage id="terms" />
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <AuthSignInButtons />

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmit} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  <FormattedMessage id="register" />
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Dialog open={termsModalIsOpened} maxWidth="lg">
        <CloseIcon sx={{ cursor: 'pointer', position: 'absolute', right: '10px' }} onClick={closeTermsModal} />
        <Box sx={{ padding: '24px' }}>
          <Typography id="modal-modal-title" variant="h6" component="p">
            Скоро здесь будет текст
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default JWTRegister;
