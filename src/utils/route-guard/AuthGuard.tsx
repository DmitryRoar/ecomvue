'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// project imports
import Loader from 'components/ui-component/Loader';
import useAuth from 'hooks/useAuth';
import { PropsWithChildren, useEffect } from 'react';
import { StorageNames } from 'types/user';

const AuthGuard = ({ children }: PropsWithChildren): JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tokens = JSON.parse(localStorage.getItem(StorageNames.token) as string);
  const { loading, confirmMail } = useAuth();

  const isAuth = tokens && !confirmMail;

  useEffect(() => {
    if (confirmMail) {
      router.replace('/auth/code-verification');
    }
  }, [confirmMail]);

  useEffect(() => {
    if (isAuth && !pathname.startsWith('/dashboard')) {
      const redirectUrl = searchParams.get('redirect_url');
      router.push(redirectUrl ? `/${redirectUrl}` : '/dashboard');
    }
  }, [isAuth, pathname, searchParams]);

  useEffect(() => {
    if (!isAuth && !pathname.startsWith('/auth')) {
      const queryParams = [];
      for (const [key, value] of searchParams.entries()) {
        queryParams.push(`${key}=${value}`);
      }
      router.push(`/auth/login?redirect_url=${pathname.slice(1)}${queryParams.length > 0 ? `?${queryParams}` : ''}`);
    }
  }, [isAuth, pathname]);

  return loading ? <Loader /> : <>{children}</>;
};

export default AuthGuard;
