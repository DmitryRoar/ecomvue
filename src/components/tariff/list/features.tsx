import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { CardContent, Grid, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { FormattedMessage } from 'react-intl';
import { Tariff } from 'types/tariff';

const FeatureTitleWrapper = styled(CardContent)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[100]} !important`,
  textAlign: 'left',
  paddingTop: 12,
  paddingBottom: '12px !important'
}));

type ItemProps = {
  info: {
    name: string;
    value: string;
  } | null;
};

const ListItem = ({ info }: ItemProps) => (
  <Grid item xs={4} sm={3} md={3} sx={{ display: 'block' }}>
    {info ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography>{info.value}</Typography>
      </Box>
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{ px: 3, py: 1.5 }}>
        <RemoveRoundedIcon sx={{ opacity: '0.3' }} />
      </Box>
    )}
  </Grid>
);

type Props = {
  tariffs: Tariff[];
};

export const TariffFeatures = ({ tariffs }: Props) => {
  const theme = useTheme();
  const features = [...new Set(tariffs.map((plan) => plan.funcionals.map((func) => func.name)).flat())];

  return (
    <>
      <FeatureTitleWrapper>
        <Typography variant="subtitle1">
          <FormattedMessage id="features" />
        </Typography>
      </FeatureTitleWrapper>
      {features.map((feature, idx) => (
        <Grid
          container
          spacing={0}
          key={idx}
          sx={{
            borderBottom: '1px solid',
            borderColor:
              theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[200]} !important`
          }}
        >
          <Grid item xs={8} sm={3} md={3}>
            <Box sx={{ px: 3, py: 1.5 }}>
              <Typography component="div" align="left" variant="body2">
                {feature}
              </Typography>
            </Box>
          </Grid>

          {tariffs.map((plan, idx) => (
            <ListItem key={idx} info={plan.funcionals.find((func) => func.name === feature) as any} />
          ))}
        </Grid>
      ))}
    </>
  );
};
