// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconShoppingBag, IconUserCheck } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  IconUserCheck,
  IconShoppingBag
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType[] = [
  {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,

    type: 'group',
    children: [
      {
        id: 'home',
        title: <FormattedMessage id="home" />,
        type: 'item',
        url: '/dashboard',
        icon: icons.IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'profile',
        title: <FormattedMessage id="profile" />,
        type: 'collapse',
        icon: icons.IconUserCheck,
        children: [
          {
            id: 'profileInformation',
            title: <FormattedMessage id="information" />,
            type: 'item',
            url: '/dashboard/profile/information',
            breadcrumbs: true
          },
          {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'item',
            url: '/dashboard/profile/users',
            breadcrumbs: true
          },
          {
            id: 'profileAccess',
            title: <FormattedMessage id="roles" />,
            type: 'item',
            url: '/dashboard/profile/access',
            breadcrumbs: true
          },
          {
            id: 'profileReferals',
            title: <FormattedMessage id="referals" />,
            type: 'item',
            url: '/dashboard/profile/referals',
            breadcrumbs: true
          },
          {
            id: 'profileSettings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '/dashboard/profile/settings',
            breadcrumbs: true
          }
        ]
      },
      {
        id: 'dashboardProjects',
        title: <FormattedMessage id="projects" />,
        type: 'collapse',
        icon: icons.IconShoppingBag,
        children: [
          {
            id: 'dashboardProjectList',
            title: <FormattedMessage id="list" />,
            type: 'item',
            url: '/dashboard/projects',
            breadcrumbs: true
          }
        ]
      }
    ]
  }
];

export default dashboard;
