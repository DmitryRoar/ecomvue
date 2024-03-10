import { cloneElement, ReactElement, SyntheticEvent } from 'react';

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

import { FormattedMessage, useIntl } from 'react-intl';
import { FunctoolEnum, OrganizationRole } from 'types/organization';

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
  console.log(data);

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
                  <FormattedMessage id="role" />: {data.name}
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
            {data.functools.map((func, idx) => (
              <Grid sx={{ marginBottom: gridSpacing }} key={idx}>
                <Typography variant="h4" sx={{ marginBottom: 1 }}>
                  {func.name}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      sx={{ alignItems: 'flex-start' }}
                      control={
                        <Checkbox
                          sx={{
                            marginTop: -1
                          }}
                          checked={func.type === FunctoolEnum.see}
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
                          checked={func.type === FunctoolEnum.create_refact}
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
                          checked={func.type === FunctoolEnum.delete}
                        />
                      }
                      onChange={() => {}}
                      label={intl.formatMessage({ id: 'deletion' })}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}

            {/* <Typography>dsadas</Typography>
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
            </Grid> */}
          </Grid>
        </Grid>
      </SubCard>
    </ElevationScroll>
  );
};

export default AccessCreateDetails;
