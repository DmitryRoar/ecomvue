import { Grid, LinearProgress, LinearProgressProps, Paper, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import SubCard from 'ui-component/cards/SubCard';
import { CalculateUtils } from 'utils';

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
  const { projects, types } = useSelector((s) => s.marketplace);

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
            <Grid gap={12}>
              <Grid item container alignItems="center" gap={1} direction="row">
                <Paper
                  elevation={3}
                  sx={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />{' '}
                -
                <Typography align="left" variant="subtitle1">
                  <FormattedMessage id="active" />
                </Typography>
              </Grid>
              <Grid item container alignItems="center" gap={1} direction="row">
                <Paper
                  elevation={3}
                  sx={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.dark,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />{' '}
                -
                <Typography align="left" variant="subtitle1">
                  <FormattedMessage id="archive" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2}>
          {Object.keys(filteringMarketplaces).map((key, idx) => {
            const stat = filteringMarketplaces[key];

            return (
              stat.total > 0 && (
                <Grid item xs={12} md={6} key={idx}>
                  <Typography variant="body2">{types.find((t) => t.type === key)?.value}</Typography>
                  <LinearProgressWithLabel
                    color="primary"
                    aria-label="junior skill progress"
                    variant="determinate"
                    label={stat.total.toString()}
                    value={CalculateUtils.percentage(stat.active, stat.total)}
                  />
                </Grid>
              )
            );
          })}
        </Grid>
      </SubCard>
    </Grid>
  );
};
