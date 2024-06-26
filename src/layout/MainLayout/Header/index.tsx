// material-ui
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import useConfig from 'hooks/useConfig';
import FullScreenSection from './FullScreenSection';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';

import { LAYOUT_CONST } from 'constant';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { layout } = useConfig();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <Typography color={theme.palette.secondary.main} gutterBottom variant={'h3'}>
            {process.env.NEXT_PUBLIC_NAME}
          </Typography>
        </Box>
        {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd)) && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
              }
            }}
            onClick={() => dispatch(openDrawer(!drawerOpen))}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <MegaMenuSection />
      </Box> */}

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LocalizationSection />
      </Box>

      {/* <NotificationSection/>*/}

      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <FullScreenSection />
      </Box>

      <ProfileSection />

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
