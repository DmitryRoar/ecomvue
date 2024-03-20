import { cloneElement, ReactElement, SyntheticEvent, useState } from 'react';

// material-ui
import { Avatar, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// types

// assets
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import { DateTime } from 'luxon';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { ConnectionCreate, Marketplace } from 'types/marketplace';
import { NormalizeUtils } from 'utils';
import { ReadConnection } from '../connection/inputs/read';

// sticky details card
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
  project: Marketplace;
  onClose: (e: SyntheticEvent) => void;
};

const ProjectDetails = ({ project, onClose }: Props) => {
  const theme = useTheme();
  const intl = useIntl();
  const { types } = useSelector((s) => s.marketplace);
  const [connection, setConnection] = useState<ConnectionCreate>(project.connections[0]);

  // const [showAddInputs, setShowAddInputs] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState(false);

  // useEffect(() => {
  //   setShowAddInputs(false);
  // }, [project]);
  console.log('project: ', project);

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
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Avatar alt={project?.name} sx={{ width: 64, height: 64 }} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div" sx={{ fontSize: '1rem' }}>
                      {project.name}
                    </Typography>
                  </Grid>
                </Grid>
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
                {isEdit ? (
                  <Button variant="outlined" color="success" onClick={() => setIsEdit(false)} fullWidth>
                    <FormattedMessage id="save" />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => setIsEdit(true)}
                    fullWidth
                    startIcon={<ChatBubbleTwoToneIcon />}
                  >
                    <FormattedMessage id={'edit'} />
                  </Button>
                )}
              </Grid>
              <Grid item xs={6}>
                {isEdit ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setIsEdit(false)}
                    fullWidth
                    startIcon={<NotInterestedTwoToneIcon />}
                  >
                    <FormattedMessage id="cancel" />
                  </Button>
                ) : (
                  <Button variant="outlined" color="error" fullWidth disabled startIcon={<NotInterestedTwoToneIcon />}>
                    <FormattedMessage id="remove" />
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {project.connections[0] && (
            <ReadConnection isEdit={isEdit} value={project.connections[0]} marketplace_type={project.marketplace_type} />
          )}

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <BusinessTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2">{NormalizeUtils.marketplaceType(project.marketplace_type, types)}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <CloudQueueOutlinedIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2">
                  {DateTime.fromISO(project.created_at as string, { zone: 'utc', locale: intl.locale }).toLocaleString(DateTime.DATE_MED)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubCard>
    </ElevationScroll>
  );
};

export default ProjectDetails;
