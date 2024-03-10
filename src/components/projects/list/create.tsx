'use client';

import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

// material-ui
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// types
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { MarketplaceCreate } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { ConectionInputs } from '../connection/inputs';

// sticky edit card
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  return React.cloneElement(children, {
    style: {
      position: 'relative',
      height: '100%',
      top: 0,
      width: '100%'
    }
  });
}

const INIT_USER: MarketplaceCreate = {
  marketplace_type: MarketplaceEnum.ozon,
  name: '',
  organization_id: 0
} as const;

interface CreateProps {
  names: string[];
  onClose: () => void;
}

const ProjectCreatePopup = ({ names, onClose }: CreateProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const projectRef = useRef();

  const { types } = useSelector((s) => s.marketplace);

  const [userData, setUserData] = useState<typeof INIT_USER>(INIT_USER);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  const onReset = () => {
    setUserData(INIT_USER);
    // onClose();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent | any, prop: keyof typeof userData) => {
    if (event.target.value === 'new') {
      onReset();
      setIsNewProject(true);
    } else {
      setUserData((state: any) => ({ ...state, [prop]: event?.target.value }));
    }
  };

  const handleBlur = () => {
    if (!userData.name.trim()) {
      setIsNewProject(false);
    }
  };

  return (
    <>
      <ElevationScroll>
        <SubCard
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
            width: '100%',
            maxWidth: 342
          }}
          content={false}
        >
          <PerfectScrollbar style={{ height: 'calc(100vh - 83px)', overflowX: 'hidden' }}>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar alt="connection" sx={{ width: 64, height: 64 }} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="caption">Image size should be 125kb Max.</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <IconButton size="large" onClick={onClose}>
                      <HighlightOffTwoToneIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {names.length && !isNewProject ? (
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>
                      <FormattedMessage id="project" />
                    </InputLabel>
                    <Select
                      ref={projectRef}
                      label={intl.formatMessage({ id: 'project' })}
                      value={userData.name ?? ''}
                      onChange={(e) => handleChange(e, 'name')}
                    >
                      <MenuItem value={'new'}>
                        <FormattedMessage id="new" />
                      </MenuItem>

                      {names.map((name, idx) => (
                        <MenuItem value={name} key={idx}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>
                      <FormattedMessage id="project" />
                    </InputLabel>
                    <OutlinedInput
                      value={userData.name ?? ''}
                      onBlur={handleBlur}
                      label={intl.formatMessage({ id: 'project' })}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleChange(e, 'name');
                      }}
                      type="text"
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>
                    <FormattedMessage id="service" />
                  </InputLabel>
                  <Select
                    required
                    label={intl.formatMessage({ id: 'service' })}
                    value={userData.marketplace_type}
                    onChange={(e) => handleChange(e, 'marketplace_type')}
                  >
                    {types.map((marketType, idx) => (
                      <MenuItem value={marketType.type} key={idx}>
                        {marketType.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <ConectionInputs baseInputs={userData} onClose={onClose} readOnly />

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        onClose();
                        onReset();
                      }}
                    >
                      <FormattedMessage id="close" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PerfectScrollbar>
        </SubCard>
      </ElevationScroll>
    </>
  );
};

export default ProjectCreatePopup;
