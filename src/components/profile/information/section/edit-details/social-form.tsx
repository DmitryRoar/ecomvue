'use client';

import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FormattedMessage } from 'react-intl';
import VKIcon from 'ui-component/VkIcon';
import { PersonalEditProps } from '../../edit-details';

const ProfileSocialForm = ({ onSubmit }: PersonalEditProps) => {
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        sc_facebook: user?.sc_facebook,
        sc_instagram: user?.sc_instagram,
        sc_twitter: user?.sc_twitter,
        sc_vk: user?.sc_vk
      }}
      validationSchema={Yup.object().shape({
        sc_facebook: Yup.string().url(),
        sc_instagram: Yup.string().url(),
        sc_twitter: Yup.string().url(),
        sc_vk: Yup.string().url()
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container rowGap={2}>
            <Grid container alignItems="flex-start" spacing={gridSpacing}>
              <Grid item style={{ margin: '12px 0 0 0' }}>
                <VKIcon sx={{ fill: 'currentColor' }} />
              </Grid>
              <Grid item xs>
                <TextField fullWidth name="sc_vk" onChange={handleChange} label={'VKontakte'} defaultValue={values.sc_vk} />
                {touched.sc_vk && errors.sc_vk && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.sc_vk}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item style={{ margin: '12px 0 0 0' }}>
                <InstagramIcon />
              </Grid>
              <Grid item xs>
                <TextField fullWidth name="sc_instagram" onChange={handleChange} label={'Instagram'} defaultValue={values.sc_instagram} />
                {touched.sc_instagram && errors.sc_instagram && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.sc_instagram}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item style={{ margin: '12px 0 0 0' }}>
                <FacebookIcon />
              </Grid>
              <Grid item xs>
                <TextField fullWidth name="sc_facebook" onChange={handleChange} label={'Facebook'} defaultValue={values.sc_facebook} />
                {touched.sc_facebook && errors.sc_facebook && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.sc_facebook}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item style={{ margin: '12px 0 0 0' }}>
                <TwitterIcon />
              </Grid>
              <Grid item xs>
                <TextField fullWidth name="sc_twitter" onChange={handleChange} label={'Twitter'} defaultValue={values.sc_twitter} />
                {touched.sc_twitter && errors.sc_twitter && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.sc_twitter}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }} xs={12}>
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

export default ProfileSocialForm;
