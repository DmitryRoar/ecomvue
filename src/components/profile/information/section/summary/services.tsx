import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

export const ProfileSectionServices = () => {
  const { services } = useSelector((s) => s.user);

  return (
    <Grid item xs={12}>
      <SubCard
        title={
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormattedMessage id="services" />
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={gridSpacing}>
          {services.map((service, idx) => (
            <Grid item key={idx}>
              <Typography variant="h4">{service.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </SubCard>
    </Grid>
  );
};
