'use client';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
