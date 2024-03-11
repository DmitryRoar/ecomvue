import { SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports

// types

// assets
import { useIntl } from 'react-intl';
import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { Marketplace } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { ReadConnection } from '../connection/inputs/read';

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

  useEffect(() => {
    setShowAddInputs(false);
    setConnections(project?.connections?.length ?? 0);
  }, [project]);

  const submitHandler = () => setConnections((state) => state + 1);

  return (
    <Grid item xs spacing={gridSpacing} display="flex" flexDirection="column" gap={gridSpacing / 2}>
      <ReadConnection isEdit marketplace_type={project.marketplace_type} />
    </Grid>
  );
};

export default ProjectEdit;
