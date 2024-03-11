'use client';

import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'store';
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
  const dispatch = useDispatch();

  const { onRegisterViaMedia } = useAuth();

  // const requestHandler = useCallback(async () => {
  //   try {
  //     const { code } = searchParams;
  //     const from = params.slug;
  //     if (code && Object.values(SocialMediaType).some((type) => type === from)) {
  //       await onRegisterViaMedia(from, code);
  //     }
  //   } catch (err: any) {
  //     dispatch(
  //       openSnackbar({
  //         open: true,
  //         message: err?.detail,
  //         variant: 'alert',
  //         anchorOrigin: { vertical: 'top', horizontal: 'center' },
  //         close: false,
  //         alert: {
  //           color: 'error'
  //         }
  //       })
  //     );
  //   } finally {
  //     router.push('/auth/login');
  //   }

  // }, [params, searchParams, dispatch, router]);

  const temp = async () => {
    const { code } = searchParams;
    const from = params.slug;
    await onRegisterViaMedia(from, code);
  };

  useEffect(() => {
    temp();
  }, []);

  return <></>;
};

export default AuthMedia;
