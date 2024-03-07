import { Grid, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import SubCard from 'ui-component/cards/SubCard';

type Props = {
  study: {
    place: string;
    detail: string | undefined;
  };
};

export const ProfileSectionEducation = ({ study }: Props) => {
  const intl = useIntl();

  return (
    <Grid item xs={12}>
      <SubCard title={intl.formatMessage({ id: 'education' })}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">{study.place}</Typography>
                <Typography variant="subtitle2">
                  <FormattedMessage id="place-of-study" />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">{study.detail}</Typography>
                <Typography variant="subtitle2">
                  <FormattedMessage id="details" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};
