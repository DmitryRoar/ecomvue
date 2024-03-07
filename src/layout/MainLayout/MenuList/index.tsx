import { memo, useEffect } from 'react';

// material-ui
import { Box, Divider, List, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import useConfig from 'hooks/useConfig';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

import { HORIZONTAL_MAX_ITEM } from 'config';
import { LAYOUT_CONST } from 'constant';
import menuItem from 'menu-items';
import { Menu } from 'menu-items/widget';
import { useSelector } from 'store';

// types
import { FormattedMessage } from 'react-intl';
import { NavItemType } from 'types';
import { NormalizeUtils } from 'utils';
import NavCollapse from './NavCollapse';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const { layout } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { types, projects } = useSelector((state) => state.marketplace);

  let getMenu = Menu();
  const handlerMenuItem = () => {
    const isFound = menuItem.items.some((element) => {
      if (element.id === 'widget') {
        return true;
      }
      return false;
    });

    if (getMenu?.id !== undefined && !isFound) {
      menuItem.items.splice(1, 0, getMenu);
    }
  };
  useEffect(() => {
    handlerMenuItem();
    // eslint-disable-next-line
  }, []);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  // last menu-item to show in horizontal menu bar
  const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuItem.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItem.items.length) {
    lastItemId = menuItem.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }
  const uniqueProjects = projects.filter((obj, index, self) => index === self.findIndex((o) => o.name === obj.name));

  const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <List key={item.id}>
              <NavItem item={item} level={1} isParents />
              {layout !== LAYOUT_CONST.HORIZONTAL_LAYOUT && <Divider sx={{ py: 0.5 }} />}
            </List>
          );
        }
        return <NavGroup key={item.id} item={item} lastItem={lastItem!} remItems={remItems} lastItemId={lastItemId} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const ProjectItems = (): JSX.Element => {
    return projects.length > 0 ? (
      <>
        {drawerOpen && (
          <ListItemText
            primary={
              <Typography variant={'body1'} color="inherit">
                <FormattedMessage id="shops" />
              </Typography>
            }
          />
        )}

        {uniqueProjects.map((project, idx) => (
          <NavCollapse
            key={idx}
            menu={{
              id: `project-collapse-${project.name}`,
              title: project.name,
              type: 'collapse',
              breadcrumbs: true,
              children:
                projects
                  .filter((target) => target.name === project.name)
                  .map((target) => ({
                    id: `project-${target.id}_${target.marketplace_type}`,
                    title: NormalizeUtils.marketplaceType(target.marketplace_type, types),
                    type: 'item',
                    url: `/dashboard/projects/${target.id}?type=${target.marketplace_type}`,
                    breadcrumbs: true
                  })) || []
            }}
            level={1}
          />
        ))}
      </>
    ) : (
      <></>
    );
  };

  return layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
    <Box {...(drawerOpen && { sx: { mt: 1.5, flex: 1 } })}>
      {navItems}
      <ProjectItems />
    </Box>
  ) : (
    <>
      {navItems}
      <ProjectItems />
    </>
  );
};

export default memo(MenuList);
