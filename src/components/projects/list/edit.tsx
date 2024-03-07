import { cloneElement, ReactElement, SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { Avatar, Button, Divider, Grid, IconButton, Typography, useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// types

// assets
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import { DateTime } from 'luxon';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { Marketplace } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { NormalizeUtils } from 'utils';
import { AddConnection } from '../connection/add';

// sticky details card
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 130,
    target: window || undefined
  });

  return cloneElement(children, {
    style: {
      position: trigger ? 'fixed' : 'relative',
      top: trigger ? 83 : 0,
      width: trigger ? 318 : '100%'
    }
  });
}

type Props = {
  project: Marketplace;
  onClose: (e: SyntheticEvent) => void;
};

const ProjectEdit = ({ project, onClose }: Props) => {
  const theme = useTheme();
  const intl = useIntl();
  const { types } = useSelector((s) => s.marketplace);
  const isAvailable = project.marketplace_type === MarketplaceEnum.wildberries || project.marketplace_type === MarketplaceEnum.avito;

  const [showAddInputs, setShowAddInputs] = useState<boolean>(false);
  const [connections, setConnections] = useState(0);

  // const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setShowAddInputs(false);
    setConnections(project?.connections?.length ?? 0);
  }, [project]);

  const submitHandler = () => setConnections((state) => state + 1);

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
                <Avatar alt={project.name} sx={{ width: 64, height: 64 }} />
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
                <Button variant="outlined" color="warning" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                  <FormattedMessage id="edit" />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth disabled startIcon={<NotInterestedTwoToneIcon />}>
                  <FormattedMessage id="archive" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {isAvailable && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    startIcon={showAddInputs ? <CancelOutlinedIcon /> : <CloudQueueOutlinedIcon />}
                    onClick={() => setShowAddInputs((state) => !state)}
                  >
                    <FormattedMessage id={showAddInputs ? 'close' : 'add'} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider />
          </Grid>
          {showAddInputs && <AddConnection marketplace={project} onSubmit={submitHandler} onClose={() => setShowAddInputs(false)} />}
          {connections > 0 && (
            <>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item>
                    <CloudDoneOutlinedIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="body2">
                      <FormattedMessage id="connections" />: {connections}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
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

export default ProjectEdit;
