'use client';

import MainLayout from 'layout/MainLayout';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useDispatch } from 'store';
import { MarketplaceSlice, OrganizationSlice, ReferalSlice, TariffSlice } from 'store/slices';
import { StorageNames } from 'types/user';
import AuthGuard from 'utils/route-guard/AuthGuard';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const referalToken = localStorage.getItem(StorageNames.referal);
    if (referalToken) {
      await dispatch(ReferalSlice.setToken({ token: referalToken }));
      localStorage.removeItem(StorageNames.referal);
    }

    await Promise.allSettled([
      dispatch(MarketplaceSlice.getAll()),
      dispatch(MarketplaceSlice.getTypes()),
      dispatch(MarketplaceSlice.getTypes()),
      dispatch(TariffSlice.getAll()),
      dispatch(OrganizationSlice.getOwn())
    ]);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
