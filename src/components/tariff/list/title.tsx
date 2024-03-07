import { CardContent, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { Tariff, TariffPlanNames } from 'types/tariff';

const FeatureContentWrapper = styled(CardContent)(({ theme }) => ({
  borderLeft: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[200]} !important`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.25rem',
    padding: '40px 16px'
  }
}));

const PlanList = ({ plan, view, priceFlag }: { plan: Tariff; view: number; priceFlag: TariffPlanNames }) => {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Grid item xs={12} sm={3} md={3} sx={{ display: 'block' }}>
      <FeatureContentWrapper>
        {/* {plan.popular && (
          <PopularBadgeWrapper sx={{ transform: rtlLayout ? 'rotate(316deg)' : 'rotate(45deg)' }}>Popular</PopularBadgeWrapper>
        )} */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                textTransform: 'uppercase',
                fontSize: '1.25rem',
                fontWeight: 500,
                position: 'relative',
                color: theme.palette.primary.main
              }}
            >
              {plan.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                '& > span': {
                  fontSize: '1.25rem',
                  fontWeight: 500
                },
                [theme.breakpoints.down('lg')]: {
                  fontSize: '1.25rem',
                  '& > span': {
                    fontSize: '1rem'
                  }
                }
              }}
            >
              <sup>₽</sup>
              {plan.plans[0].price}
              <span>/{priceFlag === 'Месячный' ? intl.formatMessage({ id: 'monthly' }) : intl.formatMessage({ id: 'year' })}</span>
            </Typography>
          </Grid>
        </Grid>
      </FeatureContentWrapper>
    </Grid>
  );
};

type Props = {
  plans: Tariff[];
};

export const TariffTilte = ({ plans }: Props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={3} md={3} />
      {plans.map((item, index) => (
        <PlanList plan={item} view={1} priceFlag={'Годовой'} key={index} />
      ))}
    </Grid>
  );
};
