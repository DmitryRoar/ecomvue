import { Grid, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import SubCard from 'ui-component/cards/SubCard';

type Props = {
  work: {
    place: string;
    detail: string | undefined;
  };
};

export const ProfileSectionEmployment = ({ work }: Props) => {
  const intl = useIntl();

  return (
    <Grid item xs={12}>
      <SubCard title={intl.formatMessage({ id: 'employment' })}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">{work.place}</Typography>
                <Typography variant="subtitle2">
                  <FormattedMessage id="place-of-work" />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">{work.detail}</Typography>
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
