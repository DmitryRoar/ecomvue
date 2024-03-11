'use client';

import { DASHBOARD_PATH } from 'config';
import useAuth from 'hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { SocialMediaType } from 'types/auth';

type Props = {
  searchParams: {
    code: string;
  };
  params: {
    slug: keyof typeof SocialMediaType;
  };
};

const AuthMedia = ({ searchParams, params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { onRegisterViaMedia } = useAuth();

  const requestHandler = useCallback(async () => {
    if (pathname === DASHBOARD_PATH) return;
    try {
      const { code } = searchParams;
      const from = params.slug;
      if (code && Object.values(SocialMediaType).some((type) => type === from)) {
        await onRegisterViaMedia(from, code);
        router.push(DASHBOARD_PATH);
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      router.push('/auth/login');
      dispatch(
        openSnackbar({
          open: true,
          message: err?.detail,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  }, [params, searchParams, dispatch, router]);

  useEffect(() => {
    requestHandler();
  }, [requestHandler]);

  return <></>;
};

export default AuthMedia;
