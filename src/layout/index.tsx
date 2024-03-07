import LAYOUT, { Props } from 'constant';
import GuestGuard from 'utils/route-guard/GuestGuard';
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';

export default function Layout({ variant = LAYOUT.main, children }: Props) {
  switch (variant) {
    case LAYOUT.minimal:
      return <MinimalLayout>{children}</MinimalLayout>;

    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );

    default:
      return <MainLayout>{children}</MainLayout>;
  }
}
