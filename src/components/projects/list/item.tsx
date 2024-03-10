import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Avatar, Button, Grid, Tooltip, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ProjecetCreateModeNames } from 'app/dashboard/projects/page';
import { useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { Marketplace } from 'types/marketplace';

const ListWrapper = styled('div')(({ theme }) => ({
  padding: '15px 0',
  borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderTop: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderColor: `${theme.palette.grey[100]}!important`
}));

interface ItemProps extends Marketplace {
  onActive: () => void;
  onSetMode: (mode: ProjecetCreateModeNames) => void;
}

const ProjectItem = ({ name, marketplace_type, onSetMode, onActive, ...props }: ItemProps & any) => {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <ListWrapper>
      <Grid container alignItems="center" spacing={gridSpacing}>
        <Grid item xs={12} sm={6} style={{ cursor: 'pointer' }}>
          <Grid container alignItems="center" spacing={gridSpacing} sx={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar alt={name} sx={{ width: 48, height: 48 }} />
            </Grid>
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="div">
                    {props.connections[0]?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'flex-start' } }}>
            <Grid item>
              <Tooltip placement="top" title={intl.formatMessage({ id: 'edit' })}>
                <Button variant="outlined" sx={{ minWidth: 32, height: 32, p: 0 }} onClick={() => onActive()}>
                  <RemoveRedEyeOutlinedIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListWrapper>
  );
};

export default ProjectItem;
