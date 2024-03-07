// PROJECT IMPORTS
'use client';

import MainLayout from 'layout/MainLayout';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useDispatch } from 'store';
import { MarketplaceSlice, OrganizationSlice, TariffSlice } from 'store/slices';
import AuthGuard from 'utils/route-guard/AuthGuard';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    await Promise.allSettled([
      dispatch(MarketplaceSlice.getAll()),
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
