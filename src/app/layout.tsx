import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import { PropsWithChildren } from 'react';
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME}`,
  description:
    'Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
