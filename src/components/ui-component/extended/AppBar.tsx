'use client';

import { cloneElement, ReactElement, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports

// assets
import MenuIcon from '@mui/icons-material/Menu';
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons-react';

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    style: {
      backgroundColor: theme.palette.mode === 'dark' && trigger ? theme.palette.dark[800] : theme.palette.background.default,
      color: theme.palette.text.dark
    }
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const theme = useTheme();

  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Typography color={theme.palette.secondary.main} gutterBottom variant="h2">
                {process.env.NEXT_PUBLIC_NAME}
              </Typography>
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={{ xs: 1.5, md: 2.5 }}>
              <Button color="inherit" component={Link} href="#">
                Home
              </Button>
              <Button color="inherit" component={Link} href="login" target="_blank">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} href="https://codedthemes.gitbook.io/berry" target="_blank">
                Documentation
              </Button>
              <Button component={Link} href="https://links.codedthemes.com/hsqll" disableElevation variant="contained" color="secondary">
                Purchase Now
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={drawerToggler(true)} size="large">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                {drawerToggle && (
                  <Box sx={{ width: 'auto' }} role="presentation" onClick={drawerToggler(false)} onKeyDown={drawerToggler(false)}>
                    <List>
                      <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconHome2 />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/auth/login" target="_blank">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconDashboard />
                          </ListItemIcon>
                          <ListItemText primary="Dashboard" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="https://codedthemes.gitbook.io/berry" target="_blank">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconBook />
                          </ListItemIcon>
                          <ListItemText primary="Documentation" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="https://links.codedthemes.com/hsqll" target="_blank">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconCreditCard />
                          </ListItemIcon>
                          <ListItemText primary="Purchase Now" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
