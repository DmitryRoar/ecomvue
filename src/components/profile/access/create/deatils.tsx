import { cloneElement, ReactElement, SyntheticEvent } from 'react';

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

import { FormattedMessage, useIntl } from 'react-intl';
import { OrganizationRole } from 'types/organization';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children }: ElevationScrollProps) {
  return cloneElement(children, {
    style: {
      position: 'relative',
      top: 0,
      width: '100%'
    }
  });
}

type Props = {
  data: OrganizationRole;
  onClose: (e: SyntheticEvent) => void;
};

const AccessCreateDetails = ({ data, onClose }: Props) => {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <ElevationScroll>
      <SubCard
        sx={{
          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
          width: '100%',
          maxWidth: 342
        }}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs>
            <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography>
                  <FormattedMessage id="name" />: {data.name}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={onClose} size="large">
                  <HighlightOffTwoToneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  sx={{ alignItems: 'flex-start' }}
                  control={
                    <Checkbox
                      sx={{
                        marginTop: -1
                      }}
                      checked={true}
                    />
                  }
                  onChange={() => {}}
                  label={intl.formatMessage({ id: 'viewing' })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  sx={{ alignItems: 'flex-start' }}
                  control={
                    <Checkbox
                      sx={{
                        marginTop: -1
                      }}
                      checked={true}
                    />
                  }
                  onChange={() => {}}
                  label={intl.formatMessage({ id: 'create-edit' })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  sx={{ alignItems: 'flex-start' }}
                  control={
                    <Checkbox
                      sx={{
                        marginTop: -1
                      }}
                      checked={true}
                    />
                  }
                  onChange={() => {}}
                  label={intl.formatMessage({ id: 'deletion' })}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubCard>
    </ElevationScroll>
  );
};

export default AccessCreateDetails;
