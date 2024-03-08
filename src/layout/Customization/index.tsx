'use client';

import { useContext, useState } from 'react';

// material-ui
import { Box, Button, Divider, Drawer, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconColorSwatch, IconPlus } from '@tabler/icons-react';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import BoxContainer from './BoxContainer';
import InputFilled from './InputFilled';
import Layout from './Layout';
import MenuOrientation from './MenuOrientation';
import PresetColor from './PresetColor';
import SidebarDrawer from './SidebarDrawer';
import ThemeModeLayout from './ThemeMode';

import { UIContext } from 'contexts/UIContext';
import useConfig from 'hooks/useConfig';
import { FormattedMessage } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  ) as any;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Customization = () => {
  const theme = useTheme();
  const { onReset } = useConfig();

  // drawer on/off
  const { customTheme: open, setCustomTheme: setOpen } = useContext(UIContext);
  const handleToggle = () => {
    setOpen(!open);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Drawer anchor="right" onClose={handleToggle} open={open} PaperProps={{ sx: { width: 375 } }}>
        {open && (
          <PerfectScrollbar component="div">
            <MainCard content={false} border={false}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ p: 2.5 }}>
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                  <FormattedMessage id="theme-customization" />
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Button variant="outlined" color="error" size="small" onClick={() => onReset()}>
                    <FormattedMessage id="reset" />
                  </Button>
                  <IconButton sx={{ p: 0 }} onClick={handleToggle}>
                    <IconPlus size={24} style={{ transform: 'rotate(45deg)', color: theme.palette.grey[600] }} />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider />
              <Box sx={{ width: '100%', background: 'green' }}>
                <Tabs
                  value={value}
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50',
                    minHeight: 56,
                    '& .MuiTabs-flexContainer': { height: '100%' }
                  }}
                  centered
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label={<IconColorSwatch />} {...a11yProps(0)} sx={{ width: '50%' }} />
                  {/* <Tab label={<IconTextSize />} {...a11yProps(1)} sx={{ width: '50%' }} /> */}
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    {/* layout type */}
                    <ThemeModeLayout />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Theme Preset Color */}
                    <PresetColor />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Input Background */}
                    <InputFilled />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Theme Width */}
                    <BoxContainer />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Theme Layout */}
                    <Layout />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Sidebar Drawer */}
                    <SidebarDrawer />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Menu Orientation */}
                    <MenuOrientation />
                    <Divider />
                  </Grid>
                </Grid>
              </CustomTabPanel>
              {/* <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FontFamily />
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <BorderRadius />
                    <Divider />
                  </Grid>
                </Grid>
              </CustomTabPanel> */}
            </MainCard>
          </PerfectScrollbar>
        )}
      </Drawer>
    </>
  );
};

export default Customization;
