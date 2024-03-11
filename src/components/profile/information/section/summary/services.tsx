import { Chip, Grid, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import { ColorUtils } from 'utils';

export const ProfileSectionServices = () => {
  const theme = useTheme();
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
              <Chip label={service.name} style={theme.typography.h4} size="medium" color={ColorUtils.getRandomChip()} />
            </Grid>
          ))}
        </Grid>
      </SubCard>
    </Grid>
  );
};
