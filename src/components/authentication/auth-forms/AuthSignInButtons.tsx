// material-ui
import { Stack, Typography } from '@mui/material';

import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { SocialMediaType } from 'types/auth';
import { RRSvgIcon } from 'ui-component/svg-icon';

const AuthSignInButtons = () => {
  return (
    <>
      <Typography variant="subtitle2" align="center" sx={{ marginBottom: '8px' }}>
        <FormattedMessage id="orLoginUsing" />
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link
          style={{ paddingTop: 4 }}
          href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID}`}
        >
          <RRSvgIcon height={16} width={28} name="ya" prefix="social" fill="#fc3f1d" />
        </Link>
        <Link
          href={`https://oauth.vk.com/authorize?client_id=${process.env.NEXT_PUBLIC_VK_CLIENT_ID}&redirect_uri=${origin}/auth/media/${SocialMediaType.vk_auth}&display=page&response_type=code`}
        >
          <RRSvgIcon height={24} width={24} name="vk" prefix="social" />
        </Link>
        <Link
          href={`https://oauth.mail.ru/login?client_id=${process.env.NEXT_PUBLIC_MAIL_RU_CLIENT_ID}&response_type=code&scope=userinfo&redirect_uri=${origin}/auth/media/${SocialMediaType.mail_ru_auth}&state=some_state`}
        >
          <RRSvgIcon height={22} width={22} name="mailru" prefix="social" fill="#ff9e00" />
          {/* <MailLogo width="36px" /> */}
        </Link>
      </Stack>
    </>
  );
};

export default AuthSignInButtons;
