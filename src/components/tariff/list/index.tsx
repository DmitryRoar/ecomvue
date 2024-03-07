'use client';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircle';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Alert, Button, ButtonGroup, CardContent, Grid, Typography } from '@mui/material';
import { Box, Stack, styled, useTheme } from '@mui/system';
import useConfig from 'hooks/useConfig';
import { Fragment, SyntheticEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { Tariff, TariffPlanNames } from 'types/tariff';
import MainCard from 'ui-component/cards/MainCard';
import { TariffTilte } from './title';

const FeatureTitleWrapper = styled(CardContent)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[100]} !important`,
  textAlign: 'left',
  paddingTop: 12,
  paddingBottom: '12px !important'
}));

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

const PopularBadgeWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: '#fff',
  display: 'inline-block',
  padding: '40px 40px 5px',
  fontSize: '0.8125rem',
  position: 'absolute',
  top: -24,
  right: -55
}));

type plan = {
  name: string;
  plans: {
    id: number;
    name: string;
    price: number;
  }[];
  funcionals: {
    name: string;
    value: number;
  }[];
};

type planListItem = {
  type: string;
  label: string;
  permission?: number[];
};

const planList: planListItem[] = [
  {
    type: 'group',
    label: 'Features'
  },
  {
    type: 'list',
    label: 'Only 1 User uses',
    permission: [1, 1, 1]
  },
  {
    type: 'list',
    label: '10 Projects for',
    permission: [0, 1, 1]
  },
  {
    type: 'list',
    label: 'Unlimited Bandwidth',
    permission: [0, 0, 1]
  },
  {
    type: 'list',
    label: 'Unlimited Data',
    permission: [0, 0, 1]
  },
  {
    type: 'group',
    label: 'Storage & Security'
  },
  {
    type: 'list',
    label: '5GB of Storage',
    permission: [0, 1, 1]
  },
  {
    type: 'list',
    label: 'Fully Security Suite',
    permission: [0, 0, 1]
  }
];

const PlanList = ({ plan, view, priceFlag }: { plan: Tariff; view: number; priceFlag: TariffPlanNames }) => {
  const theme = useTheme();
  const intl = useIntl();
  const { rtlLayout } = useConfig();

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

const ListItem = ({ item, index, view }: { item: number; index: number; view: number }) => (
  <Grid item xs={4} sm={3} md={3} sx={{ display: view !== index + 1 ? { xs: 'none', sm: 'block' } : 'block' }}>
    {item === 1 && (
      <Box sx={{ px: 3, py: 1.5 }}>
        <CheckCircleTwoToneIcon sx={{ color: 'success.dark' }} />
      </Box>
    )}
    {item === 0 && (
      <Box sx={{ px: 3, py: 1.5 }}>
        <RemoveRoundedIcon sx={{ opacity: '0.3' }} />
      </Box>
    )}
  </Grid>
);

const OrderButton = ({ view, index, popular }: { view: number; index: number; popular?: boolean }) => (
  <Grid item xs={12} sm={3} md={3} sx={{ display: view !== index ? { xs: 'none', sm: 'block' } : 'block' }}>
    <FeatureContentWrapper>
      <Button variant={popular ? 'contained' : 'outlined'} color={popular ? 'secondary' : 'primary'}>
        <FormattedMessage id="order-now" />
      </Button>
    </FeatureContentWrapper>
  </Grid>
);

const TariffList = () => {
  const theme = useTheme();
  const intl = useIntl();

  const [priceFlag, setPriceFlag] = useState('monthly');
  const { list } = useSelector((s) => s.tariff);
  console.log(list);

  const [view, setView] = useState(1);
  const handleChange = (event: SyntheticEvent, newView: number) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <MainCard title={intl.formatMessage({ id: 'tariffs' })}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Alert variant="outlined" severity="info" sx={{ borderColor: theme.palette.primary.main }}>
            This is an info alert — check it out!
          </Alert>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="center">
            <ButtonGroup disableElevation variant="contained" sx={{ mb: 3 }}>
              <Button
                size="large"
                sx={{ bgcolor: priceFlag === 'monthly' ? 'primary.main' : 'primary.200' }}
                onClick={() => setPriceFlag('monthly')}
              >
                <FormattedMessage id="monthly" />
              </Button>
              <Button
                size="large"
                sx={{ bgcolor: priceFlag === 'yearly' ? 'primary.main' : 'primary.200' }}
                onClick={() => setPriceFlag('yearly')}
              >
                <FormattedMessage id="year" />
              </Button>
            </ButtonGroup>
          </Stack>

          <Grid container spacing={gridSpacing}>
            <TariffTilte plans={list} />
            <Grid item xs={12}>
              <MainCard content={false} sx={{ textAlign: 'center' }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} md={3} />
                  {list.map((item, index) => (
                    <PlanList plan={item} view={view} priceFlag={'Годовой'} key={index} />
                  ))}
                </Grid>
                {planList.map((list, index) => (
                  <Fragment key={index}>
                    {list.type === 'group' && (
                      <FeatureTitleWrapper>
                        <Typography variant="subtitle1">{list.label}</Typography>
                      </FeatureTitleWrapper>
                    )}
                    {list.type === 'list' && (
                      <Grid
                        container
                        spacing={0}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor:
                            theme.palette.mode === 'dark'
                              ? `${theme.palette.background.default} !important`
                              : `${theme.palette.grey[200]} !important`
                        }}
                      >
                        <Grid item xs={8} sm={3} md={3}>
                          <Box sx={{ px: 3, py: 1.5 }}>
                            <Typography component="div" align="left" variant="body2">
                              {list.label}
                            </Typography>
                          </Box>
                        </Grid>
                        {list.permission?.map((item, i) => <ListItem key={i} item={item} index={index} view={view} />)}
                      </Grid>
                    )}
                  </Fragment>
                ))}
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} md={3} />
                  <OrderButton view={view} index={1} />
                  <OrderButton view={view} index={2} popular />
                  <OrderButton view={view} index={3} />
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TariffList;
