// material-ui
import { Stack, Typography } from '@mui/material';

import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { SocialMediaType } from 'types/auth';
import MailLogo from '../../../../public/assets/images/logos/mail.svg';
import VKLogo from '../../../../public/assets/images/logos/vk.svg';
import YandexLogo from '../../../../public/assets/images/logos/ya.svg';

const AuthSignInButtons = () => {
  return (
    <>
      <Typography variant="subtitle2" align="center" sx={{ marginBottom: '8px' }}>
        <FormattedMessage id="orLoginUsing" />
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link
          href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID}`}
          style={{ padding: '6px' }}
        >
          <YandexLogo width="36px" />
        </Link>
        <Link
          href={`https://oauth.vk.com/authorize?client_id=${process.env.NEXT_PUBLIC_VK_CLIENT_ID}&redirect_uri=${origin}/auth/media/${SocialMediaType.vk_auth}&display=page&response_type=code`}
          style={{ padding: '6px' }}
        >
          <VKLogo width="36px" />
        </Link>
        <Link
          href={`https://oauth.mail.ru/login?client_id=${process.env.NEXT_PUBLIC_MAIL_RU_CLIENT_ID}&response_type=code&scope=userinfo&redirect_uri=${origin}/auth/media/${SocialMediaType.mail_ru_auth}&state=some_state`}
          style={{ padding: '6px' }}
        >
          <MailLogo width="36px" />
        </Link>
      </Stack>
    </>
  );
};

export default AuthSignInButtons;
