import { memo, useMemo } from 'react';

// material-ui
import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from '../MenuList';
import MiniDrawerStyled from './MiniDrawerStyled';

import { LAYOUT_CONST } from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import MenuCard from './MenuCard';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { layout, drawerType } = useConfig();

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', p: 2 }}>
        <Typography color={theme.palette.secondary.main} gutterBottom variant={'h3'}>
          {process.env.NEXT_PUBLIC_NAME}
        </Typography>
      </Box>
    ),
    [theme.palette.secondary.main]
  );

  const drawerContent = (
    <>
      <MenuList />
      {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen && <MenuCard />}
      {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen}
    </>
  );

  const drawerSX = {
    paddingLeft: drawerOpen ? '16px' : 0,
    paddingRight: drawerOpen ? '16px' : 0,
    marginTop: drawerOpen ? 0 : '20px'
  };

  const drawer = useMemo(
    () => (
      <>
        {matchDownMd ? (
          <Box sx={drawerSX}>{drawerContent}</Box>
        ) : (
          <PerfectScrollbar
            options={{ suppressScrollX: true, useBothWheelAxes: false }}
            component="div"
            style={{
              height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
              display: 'flex',
              flexDirection: 'column',
              ...drawerSX
            }}
          >
            {drawerContent}
          </PerfectScrollbar>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchUpMd, drawerOpen, drawerType]
  );

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
        <Drawer
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor="left"
          open={drawerOpen}
          onClose={() => dispatch(openDrawer(!drawerOpen))}
          sx={{
            '& .MuiDrawer-paper': {
              mt: matchDownMd ? 0 : 11,
              zIndex: 1099,
              width: drawerWidth,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: 'none'
            }
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {matchDownMd && logo}
          {drawer}
        </Drawer>
      ) : (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {logo}
          {drawer}
        </MiniDrawerStyled>
      )}
    </Box>
  );
};

export default memo(Sidebar);
