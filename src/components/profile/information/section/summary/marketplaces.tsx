import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { MarketplaceEnum } from 'types/project';
import SubCard from 'ui-component/cards/SubCard';
import { NormalizeUtils } from 'utils';

export const ProfileSectionMarketplaces = () => {
  const { marketplaces } = useSelector((s) => s.user);
  const { types } = useSelector((s) => s.marketplace);

  return (
    <Grid item xs={12}>
      <SubCard
        title={
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormattedMessage id="marketplaces" />
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={gridSpacing}>
          {marketplaces.map((marketplace, idx) => (
            <Grid item key={idx}>
              <Typography variant="h4">
                {NormalizeUtils.marketplaceType(marketplace.name as keyof typeof MarketplaceEnum, types)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </SubCard>
    </Grid>
  );
};
