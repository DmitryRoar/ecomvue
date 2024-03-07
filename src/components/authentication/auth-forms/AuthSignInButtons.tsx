// material-ui
import { Stack, Typography } from '@mui/material';

import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { SocialMediaType } from 'types/auth';
import MailLogo from '../../../../public/assets/images/logos/mail.svg';
import VKLogo from '../../../../public/assets/images/logos/vk.svg';
import YandexLogo from '../../../../public/assets/images/logos/ya.svg';

const AuthSignInButtons = () => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  return (
    <>
      <Typography variant="subtitle2" align="center" sx={{ marginBottom: '8px' }}>
        <FormattedMessage id="orLoginUsing" />
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link
          href="https://oauth.yandex.ru/authorize?response_type=code&client_id=5182394bae63428fae8d8d78a1e6b58a"
          style={{ padding: '6px' }}
        >
          <YandexLogo width="36px" />
        </Link>
        <Link
          href={`https://oauth.vk.com/authorize?client_id=51825298&redirect_uri=${origin}/auth/media/${SocialMediaType.vk_auth}&display=page&response_type=code`}
          style={{ padding: '6px' }}
        >
          <VKLogo width="36px" />
        </Link>
        <Link
          href={`https://oauth.mail.ru/login?client_id=dc007f8b0c3a44f6a3251c68a8364a5f&response_type=code&scope=userinfo&redirect_uri=${origin}/auth/media/${SocialMediaType.mail_ru_auth}&state=some_state`}
          style={{ padding: '6px' }}
        >
          <MailLogo width="36px" />
        </Link>
      </Stack>
    </>
  );
};

export default AuthSignInButtons;
