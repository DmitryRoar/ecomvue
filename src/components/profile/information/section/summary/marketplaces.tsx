import { Grid, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { MarketplaceEnum } from 'types/project';
import SubCard from 'ui-component/cards/SubCard';
import { NormalizeUtils } from 'utils';

function LinearProgressWithLabel({ value, label, ...other }: LinearProgressProps & { label?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          mr: 1
        }}
      >
        <LinearProgress value={value} {...other} />
      </Box>
      <Box
        sx={{
          minWidth: 35
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {label ? label : `${Math.round(value!)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

type FilterMarketplace = {
  [key: string]: {
    active: number;
    total: number;
  };
};

export const ProfileSectionMarketplaces = () => {
  const theme = useTheme();
  const { marketplaces } = useSelector((s) => s.user);
  const { projects, types } = useSelector((s) => s.marketplace);
  console.log(marketplaces);

  const filteringMarketplaces = useMemo<FilterMarketplace>(() => {
    const validTypes = types.map((t) => t.type);
    return validTypes.reduce(
      (acc, type) => ({
        ...acc,
        [type]: {
          active: projects.filter((p) => p.marketplace_type === type && (p.connections as [])?.length > 0).length,
          total: projects.filter((p) => p.marketplace_type === type).length
        }
      }),
      {}
    );
  }, [projects, types]);

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
