'use client';

import { Button, Grid, TextField } from '@mui/material';
import { Field, Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import { PersonalEditProps } from '../../edit-details';

const ProfilePersonalForm = ({ onSubmit }: PersonalEditProps) => {
  const { user } = useAuth();
  const intl = useIntl();

  const handleSubmit = async (values: any): Promise<void> => {
    await onSubmit({ ...values, birthday: values.birthday ? DateTime.fromJSDate(values.birthday).toFormat('yyyy-MM-dd') : null });
  };

  return (
    <Formik
      initialValues={{
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        pathronymic: user?.pathronymic ?? '',
        country: user?.country ?? '',
        city: user?.city ?? '',
        birthday: user?.birthday ? DateTime.fromISO(user?.birthday).toJSDate() : null,
        about_me: user?.about_me ?? ''
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().notRequired().max(255),
        last_name: Yup.string().notRequired().max(255),
        pathronymic: Yup.string().notRequired().max(255),
        country: Yup.string().notRequired().max(255),
        city: Yup.string().notRequired().max(255),
        birthday: Yup.date().notRequired().nullable(),
        about_me: Yup.string().notRequired()
      })}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="first_name"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'name' })}
                defaultValue={values.first_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="last_name"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'surname' })}
                defaultValue={values.last_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="pathronymic"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'pathronymic' })}
                defaultValue={values.pathronymic}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field
                  fullWidth
                  name="birthday"
                  render={({ field, form, ...rest }: any) => (
                    <DatePicker
                      {...field}
                      format={intl.locale === 'ru' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'}
                      label={intl.formatMessage({ id: 'date-of-birth' })}
                      selected={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="country"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'country' })}
                defaultValue={values.country}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="city"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'city' })}
                defaultValue={values.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={3}
                name="about_me"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'about-me' })}
                defaultValue={values.about_me}
              />
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

export default ProfilePersonalForm;
