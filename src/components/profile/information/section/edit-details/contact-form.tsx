'use client';

import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { Field, Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { ReactNode } from 'react';
import InputMask from 'react-input-mask';
import { FormattedMessage, useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';
import { PersonalEditProps } from '../../edit-details';

const PhoneInput = ({ field, ...rest }: any) => (
  <InputMask mask="+7 (999) 999-99-99" maskChar=" " value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
    {(() => <TextField {...field} {...rest} fullWidth label={<FormattedMessage id="phone" />} />) as never as ReactNode}
  </InputMask>
);

const ProfileContactForm = ({ onSubmit }: PersonalEditProps) => {
  const intl = useIntl();
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        email: user?.email,
        phone_number: user?.phone_number
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().max(255).required(),
        phone_number: Yup.string()
          .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'phone-format')
          .required()
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleSubmit, handleChange, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'email' })}
                defaultValue={values.email}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Field error={Boolean(touched.phone_number && errors.phone_number)} name="phone_number" component={PhoneInput} />
              {touched.phone_number && errors.phone_number && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.phone_number}
                </FormHelperText>
              )}
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
              <Button variant="contained" color="secondary" type="submit">
                <FormattedMessage id="save" />
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ProfileContactForm;
