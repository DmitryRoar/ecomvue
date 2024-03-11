// material-ui
import { Divider, Grid, List, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { RRAvatar } from 'ui-component/avatar';
import VKIcon from 'ui-component/VkIcon';
import { CoreUtils } from 'utils';
import { ProfileSectionDetails } from './section/summary/details';
import { ProfileSectionEducation } from './section/summary/education';
import { ProfileSectionEmployment } from './section/summary/employment';
import { ProfileSectionMarketplaces } from './section/summary/marketplaces';
import { ProfileSectionServices } from './section/summary/services';

type SocialProps = {
  sc_facebook: string | undefined;
  sc_instagram: string | undefined;
  sc_twitter: string | undefined;
  sc_vk: string | undefined;
};

const SocialMedia = ({ ...props }: SocialProps): JSX.Element => {
  const getIcon = (media: string) => {
    switch (media) {
      case 'sc_vk':
        return (
          <VKIcon
            sx={{
              fontSize: '1.3rem',
              fill: 'currentColor',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            }}
          />
        );
      case 'sc_twitter':
        return <TwitterIcon sx={{ fontSize: '1.3rem' }} />;
      case 'sc_instagram':
        return <InstagramIcon sx={{ fontSize: '1.3rem' }} />;
      case 'sc_facebook':
        return <FacebookIcon sx={{ fontSize: '1.3rem' }} />;
    }
  };

  return (
    <>
      {Object.keys(props)
        .filter((key) => props[key as keyof SocialProps])
        .map((key, idx) => {
          return (
            <Fragment key={idx}>
              <Divider />
              <ListItemButton>
                <ListItemIcon>{getIcon(key)}</ListItemIcon>
                <ListItemSecondaryAction>
                  <Typography variant="subtitle2" align="right">
                    @{props[key as keyof SocialProps]?.split('/').at(-1)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            </Fragment>
          );
        })}
    </>
  );
};

type Props = {
  onSwitchTab: (newTab: string) => void;
};

const ProfileSummary = ({ onSwitchTab }: Props) => {
  const { user } = useAuth();
  const { marketplaces, services } = useSelector((s) => s.user);
  console.log(user?.image);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={4} xs={12}>
        <SubCard
          title={
            <Grid container display="flex" alignItems="center" spacing={2}>
              <Grid item>
                <RRAvatar
                  size={40}
                  src={user?.image ? `${process.env.NEXT_PUBLIC_MEDIA}${user.image}` : ''}
                  alt={CoreUtils.concatStrings(user?.name, user?.last_name)}
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="h4">
                  {CoreUtils.concatStrings(user?.first_name, user?.last_name, user?.pathronymic)}
                </Typography>
              </Grid>
            </Grid>
          }
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton>
              <ListItemIcon>
                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {user?.email}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>

            {user?.phone_number && (
              <>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <PhoneAndroidOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        <FormattedMessage id="phone" />
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                      {user?.phone_number}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </>
            )}
            <SocialMedia
              sc_vk={user?.sc_vk}
              sc_instagram={user?.sc_instagram}
              sc_facebook={user?.sc_facebook}
              sc_twitter={user?.sc_twitter}
            />
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    <FormattedMessage id="id" />
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {user?.id}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </SubCard>
      </Grid>

      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <ProfileSectionDetails onSwitchTab={onSwitchTab} user={user} />
          {user?.place_of_study && <ProfileSectionEducation study={{ place: user?.place_of_study, detail: user?.place_of_study_detail }} />}
          {user?.place_of_work && <ProfileSectionEmployment work={{ place: user?.place_of_work, detail: user?.place_of_work_detail }} />}
          {marketplaces.length > 0 && <ProfileSectionMarketplaces />}
          {services.length > 0 && <ProfileSectionServices />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSummary;
