// material-ui
import { Grid } from '@mui/material';

import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

import useAuth from 'hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import ProfileAvatarForm from './section/edit-details/avatar-form';
import ProfileContactForm from './section/edit-details/contact-form';
import ProfileEducationForm from './section/edit-details/education-form';
import ProfilePersonalForm from './section/edit-details/personal-form';
import ProfileSocialForm from './section/edit-details/social-form';
import ProfileWorkForm from './section/edit-details/work-form';

export type PersonalEditProps = {
  onSubmit: (values: any) => Promise<void>;
};

const ProfileEditDetails = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { onUpdateUser } = useAuth();

  const submitHandler = async (values: any): Promise<void> => {
    try {
      await onUpdateUser(values);
      dispatch(
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'success' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          close: false,
          alert: {
            color: 'success'
          }
        })
      );
    } catch (err: any) {
      if (err) {
        dispatch(
          openSnackbar({
            open: true,
            message: err?.response?.data?.detail,
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
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4}>
        <SubCard title={<FormattedMessage id="avatar" />}>
          <ProfileAvatarForm />
        </SubCard>
      </Grid>
      <Grid item xs={12} md={8}>
        <SubCard title={<FormattedMessage id="personal-information" />}>
          <ProfilePersonalForm onSubmit={submitHandler} />
        </SubCard>
      </Grid>
      <Grid item xs={6} md={6}>
        <SubCard title={<FormattedMessage id="contact-information" />}>
          <ProfileContactForm onSubmit={submitHandler} />
        </SubCard>
      </Grid>
      <Grid item xs={6} md={6}>
        <SubCard title={<FormattedMessage id="education-information" />}>
          <ProfileEducationForm onSubmit={submitHandler} />
        </SubCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubCard title={<FormattedMessage id="work-information" />}>
          <ProfileWorkForm onSubmit={submitHandler} />
        </SubCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubCard title={<FormattedMessage id="social-information" />}>
          <ProfileSocialForm onSubmit={submitHandler} />
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default ProfileEditDetails;
