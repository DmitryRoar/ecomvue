import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { OrganizationRole } from 'types/organization';

const ListWrapper = styled('div')(({ theme }) => ({
  padding: '15px 0',
  borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderTop: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderColor: `${theme.palette.grey[100]}!important`
}));

type Props = {
  role: OrganizationRole;
  onActive: () => void;
};

export const ProfileAccessItem = ({ role, onActive }: Props) => {
  const intl = useIntl();

  return (
    <Grid item xs={12}>
      <ListWrapper>
        <Grid
          container
          alignItems="center"
          spacing={gridSpacing}
          onClick={() => {
            onActive();
          }}
          style={{ cursor: 'pointer' }}
        >
          <Grid item xs={12} style={{ cursor: 'pointer' }}>
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ flexWrap: 'nowrap' }}>
              <Grid item sm zeroMinWidth>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="div">
                      {role.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
                  <Grid item>
                    <Tooltip placement="top" title={intl.formatMessage({ id: 'look' })}>
                      <Button variant="outlined" sx={{ minWidth: 32, height: 32, p: 0 }}>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListWrapper>
    </Grid>
  );
};
