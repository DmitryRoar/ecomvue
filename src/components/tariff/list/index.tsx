'use client';

import { Alert, Button, ButtonGroup, CardContent, Grid, Typography } from '@mui/material';
import { Stack, styled, useTheme } from '@mui/system';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { TariffSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import { Organization } from 'types/organization';
import { TariffPlan, TariffPlanNames } from 'types/tariff';
import MainCard from 'ui-component/cards/MainCard';
import { TariffFeatures } from './features';
import { TariffTilte } from './title';

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

type ButtonProps = {
  onSubmit: () => Promise<void>;
  isPopular?: boolean;
};

const OrderButton = ({ onSubmit, isPopular }: ButtonProps) => (
  <Grid item xs={12} sm={3} md={3} sx={{ display: 'block' }} onClick={onSubmit}>
    <FeatureContentWrapper>
      <Button variant={isPopular ? 'contained' : 'outlined'} color={isPopular ? 'secondary' : 'primary'}>
        <FormattedMessage id="order-now" />
      </Button>
    </FeatureContentWrapper>
  </Grid>
);

const TariffList = () => {
  const theme = useTheme();
  const intl = useIntl();

  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.tariff);
  const { organization } = useSelector((s) => s.organization);

  const [flag, setFlag] = useState<TariffPlanNames>('Месячный');
  const [currentPlan, setCurrentPlan] = useState<number>(organization?.my.tariffs.at(-1)?.tariff_plan as any);

  const tariffs = useMemo(() => {
    return list.filter((item) => {
      return item.plans.some((plan) => plan.name.includes(flag));
    });
  }, [list, flag]);

  const submitHandler = async (tariffIdx: number) => {
    const id = (tariffs[tariffIdx].plans.find((plan: TariffPlan) => plan.name === flag) as TariffPlan).id;
    const { tariff_plan } = await dispatch(TariffSlice.purchase(id)).unwrap();
    setCurrentPlan(tariff_plan);
    dispatch(
      openSnackbar({
        open: true,
        message: intl.formatMessage({ id: 'success' }),
        variant: 'alert',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        close: false,
        alert: {
          color: 'success'
        }
      })
    );
  };

  return (
    <MainCard title={intl.formatMessage({ id: 'tariffs' })}>
      <Grid container spacing={gridSpacing}>
        {(organization as Organization)?.my.tariffs.length > 0 && (
          <Grid item xs={12}>
            <Alert variant="outlined" severity="info" sx={{ borderColor: theme.palette.primary.main }}>
              <Stack display="flex" flexDirection="row" gap={0.5}>
                <Typography>
                  <FormattedMessage id="your-tariff" />:
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {list.find((t) => t.plans.find((plan) => plan.id === currentPlan))?.name}
                </Typography>
                <Typography sx={{ textTransform: 'lowercase' }}>
                  <FormattedMessage id="will-expire-soon" />
                </Typography>
              </Stack>
            </Alert>
          </Grid>
        )}

        <Grid item sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="center">
            <ButtonGroup disableElevation variant="contained" sx={{ mb: 3, paddingLeft: gridSpacing }}>
              <Button
                size="large"
                sx={{ bgcolor: flag === 'Месячный' ? 'primary.main' : 'primary.200' }}
                onClick={() => setFlag('Месячный')}
              >
                <FormattedMessage id="monthly" />
              </Button>
              <Button size="large" sx={{ bgcolor: flag === 'Годовой' ? 'primary.main' : 'primary.200' }} onClick={() => setFlag('Годовой')}>
                <FormattedMessage id="year" />
              </Button>
            </ButtonGroup>
          </Stack>

          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <MainCard content={false} sx={{ textAlign: 'center' }}>
                <TariffTilte tariffs={tariffs} flag={flag} />
                <TariffFeatures tariffs={tariffs} />
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} md={3} />
                  <OrderButton onSubmit={() => submitHandler(0)} />
                  <OrderButton onSubmit={() => submitHandler(1)} isPopular />
                  <OrderButton onSubmit={() => submitHandler(2)} />
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
