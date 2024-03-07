import NextLink from 'next/link';

// project imports
import { Typography } from '@mui/material';
import { DASHBOARD_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="theme logo">
    <Typography gutterBottom variant={'h3'}>
      {process.env.NEXT_PUBLIC_NAME}
    </Typography>
  </NextLink>
);

export default LogoSection;
