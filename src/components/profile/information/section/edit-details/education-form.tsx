'use client';

import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';
import { PersonalEditProps } from '../../edit-details';

const ProfileEducationForm = ({ onSubmit }: PersonalEditProps) => {
  const intl = useIntl();
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        place_of_study: user?.place_of_study,
        place_of_study_detail: user?.place_of_study_detail
      }}
      validationSchema={Yup.object().shape({
        place_of_study: Yup.string().max(255),
        place_of_study_detail: Yup.string()
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="place_of_study"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'place-of-study' })}
                defaultValue={values.place_of_study}
              />
              {touched.place_of_study && errors.place_of_study && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.place_of_study}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={3}
                name="place_of_study_detail"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'details' })}
                defaultValue={values.place_of_study_detail}
              />
              {touched.place_of_study_detail && errors.place_of_study_detail && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.place_of_study_detail}
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

export default ProfileEducationForm;
