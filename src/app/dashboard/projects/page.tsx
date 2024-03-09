'use client';

import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// third-party

// project imports
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// types
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { IconSearch } from '@tabler/icons-react';
import ProjectCreatePopup from 'components/projects/list/create';
import ProjectDetails from 'components/projects/list/details';
import ProjectItem from 'components/projects/list/item';
import { FormattedMessage, useIntl } from 'react-intl';
import { MarketplaceSlice } from 'store/slices';
import { Marketplace } from 'types/marketplace';
import { ProjectGeneral } from 'types/project';

export type ProjecetCreateModeNames = 'edit' | 'add' | null;

const ProjectCreate = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { projects } = useSelector((s) => s.marketplace);

  const [mode, setMode] = useState<ProjecetCreateModeNames>(projects.length ? null : 'add');
  const [targetProject, setTargetProject] = useState<ProjectGeneral | null>(null);
  const [localProjects, setLocalProjects] = useState(projects);

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  useEffect(() => {
    (async () => {
      await dispatch(await MarketplaceSlice.getPermissions());
    })();
  }, [dispatch]);

  const names = useMemo(() => [...new Set(projects.map((project) => project.name))], [projects]);
  const divisionByType = useMemo(
    () =>
      localProjects.reduce((acc: { [type: string]: ProjectGeneral[] }, obj) => {
        const { name } = obj;
        if (!acc[name]) {
          acc![name] = [];
        }
        acc[name].push(obj);

        return acc;
      }, {}),
    [localProjects]
  );

  const changeModeHandler = (name: ProjecetCreateModeNames) => setMode(name);
  const closeHandler = () => setMode(null);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalProjects(() =>
      event.target.value.trim() ? projects.filter((s) => s.name.toLowerCase().includes(event.target.value.toLowerCase())) : projects
    );
  };

  return (
    <MainCard title={intl.formatMessage({ id: 'projects' })}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs zeroMinWidth sx={{ display: mode === 'add' || mode === 'edit' ? { xs: 'none', md: 'block' } : 'block' }}>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <OutlinedInput
                onChange={searchHandler}
                id="input-search-card-style1"
                placeholder={intl.formatMessage({ id: 'search' })}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="16px" />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                startIcon={mode ? <CancelOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                sx={{ px: 2.75, py: 1.5 }}
                onClick={() => changeModeHandler(!mode ? 'add' : null)}
              >
                {mode ? <FormattedMessage id="close" /> : <FormattedMessage id="add" />}
              </Button>
            </Grid>

            {Object.keys(divisionByType).map((key, idx) => (
              <Fragment key={idx}>
                <Grid item xs={12}>
                  <Typography variant="h4" color="primary" sx={{ fontSize: '1rem', textTransform: 'capitalize' }}>
                    {key}
                  </Typography>
                </Grid>
                {divisionByType[key].map((project, projectIdx) => (
                  <Grid item xs={12} key={projectIdx}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={12}>
                        <ProjectItem
                          {...project}
                          onSetMode={changeModeHandler}
                          onActive={() => {
                            setTargetProject(project);
                            setMode('edit');
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Fragment>
            ))}
          </Grid>
        </Grid>
        {mode === 'edit' && (
          <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
            <ProjectDetails project={targetProject as Marketplace} onClose={closeHandler} />
          </Grid>
        )}

        {mode === 'add' && (
          <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
            <ProjectCreatePopup names={names} onClose={closeHandler} />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default ProjectCreate;
