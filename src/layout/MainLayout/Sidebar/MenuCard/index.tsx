import { memo, useContext } from 'react';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { IconBuildingBank, IconSettings } from '@tabler/icons-react';
import { UIContext } from 'contexts/UIContext';
import useConfig from 'hooks/useConfig';
import NavItem from 'layout/MainLayout/MenuList/NavItem';
import { FormattedMessage, useIntl } from 'react-intl';
import { gridSpacing } from 'store/constant';

const MenuCard = () => {
  const intl = useIntl();
  const { borderRadius } = useConfig();

  const { setCustomTheme } = useContext(UIContext);

  return (
    <List sx={{ p: 0, m: 0 }}>
      <ListItemText
        primary={
          <Typography variant={'body1'} color="inherit">
            <FormattedMessage id="system" />
          </Typography>
        }
      />
      <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
        <NavItem
          item={{
            title: intl.formatMessage({ id: 'tariffs' }),
            url: '/dashboard/tariffs',
            icon: IconBuildingBank,
            breadcrumbs: true
          }}
          level={1}
        />
      </ListItem>
      <ListItemButton sx={{ borderRadius: `${borderRadius}px`, paddingLeft: gridSpacing }} onClick={() => setCustomTheme(true)}>
        <ListItemIcon>
          <IconSettings stroke={1.5} size="20px" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2">
              <FormattedMessage id="settings" />
            </Typography>
          }
        />
      </ListItemButton>
    </List>
  );
};

export default memo(MenuCard);
