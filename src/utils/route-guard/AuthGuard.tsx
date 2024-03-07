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
  const { loading } = useAuth();

  useEffect(() => {
    if (tokens && !pathname.startsWith('/dashboard')) {
      const redirectUrl = searchParams.get('redirect_url');
      router.push(redirectUrl ? `/${redirectUrl}` : '/dashboard');
    } else if (!tokens && !pathname.startsWith('/auth')) {
      const queryParams = [];
      for (const [key, value] of searchParams.entries()) {
        queryParams.push(`${key}=${value}`);
      }
      router.push(`/auth/login?redirect_url=${pathname.slice(1)}${queryParams.length > 0 ? `?${queryParams}` : ''}`);
    }
  }, [tokens, pathname, router, searchParams]);

  return loading ? <Loader /> : <>{children}</>;
};

export default AuthGuard;
