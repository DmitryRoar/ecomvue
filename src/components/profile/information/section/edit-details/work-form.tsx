'use client';

import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';
import { PersonalEditProps } from '../../edit-details';

const ProfileWorkForm = ({ onSubmit }: PersonalEditProps) => {
  const intl = useIntl();
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        place_of_work: user?.place_of_work,
        place_of_work_detail: user?.place_of_work_detail
      }}
      validationSchema={Yup.object().shape({
        place_of_work: Yup.string().max(255),
        place_of_work_detail: Yup.string().max(255)
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="place_of_work"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'place-of-work' })}
                defaultValue={values.place_of_work}
              />
              {touched.place_of_work && errors.place_of_work && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.place_of_work}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={3}
                name="place_of_work_detail"
                onChange={handleChange}
                label={intl.formatMessage({ id: 'details' })}
                defaultValue={values.place_of_work_detail}
              />
              {touched.place_of_work_detail && errors.place_of_work_detail && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.place_of_work_detail}
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

export default ProfileWorkForm;
