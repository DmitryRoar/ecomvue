import { CardContent, Grid, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Fragment } from 'react';
import { Tariff } from 'types/tariff';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircle';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const FeatureTitleWrapper = styled(CardContent)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[100]} !important`,
  textAlign: 'left',
  paddingTop: 12,
  paddingBottom: '12px !important'
}));

type planListItem = {
  type: string;
  label: string;
  permission?: number[];
};

const planList: planListItem[] = [
  {
    type: 'group',
    label: 'Features',
    permission: [0]
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

const ListItem = ({ item }: { item: number }) => (
  <Grid item xs={4} sm={3} md={3} sx={{ display: 'block' }}>
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

type Props = {
  plans: Tariff[];
};

export const TariffFeature = ({ plans }: Props) => {
  const theme = useTheme();

  return planList.map((list, index) => (
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
              theme.palette.mode === 'dark' ? `${theme.palette.background.default} !important` : `${theme.palette.grey[200]} !important`
          }}
        >
          <Grid item xs={8} sm={3} md={3}>
            <Box sx={{ px: 3, py: 1.5 }}>
              <Typography component="div" align="left" variant="body2">
                {list.label}
              </Typography>
            </Box>
          </Grid>
          {list?.permission?.map((item: any, i) => <ListItem key={i} item={item} view={1} />)}
        </Grid>
      )}
    </Fragment>
  ));
};
