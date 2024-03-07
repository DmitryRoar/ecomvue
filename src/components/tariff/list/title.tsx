import { Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { Tariff } from 'types/tariff';

type Props = {
  plans: Tariff[];
};

export const TariffTilte = ({ plans }: Props) => {
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Card sx={{ display: { xs: 'block', sm: 'none' } }}>
        ВФЫЛВДФЫОВЛДФЫВОФЫЛДВОФДЛ
        <CardContent>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            sx={{
              width: '100%',
              '& > button': {
                border: 'none',
                borderRadius: '5px ​!important'
              },
              '& > button.Mui-selected': {
                background: `${theme.palette.background.default}!important`,
                color: theme.palette.primary.main
              }
            }}
          >
            {plans.map((plan, index) => (
              <ToggleButton key={index} value={0}>
                {plan.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </CardContent>
      </Card>
    </Grid>
  );
};
