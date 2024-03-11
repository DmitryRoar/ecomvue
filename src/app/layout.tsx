import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import { PropsWithChildren } from 'react';
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME}`,
  description:
    'Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.',
  viewport: 'width=device-width, user-scalable=no'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(96687808, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true,
               ecommerce:"dataLayer"
          });
              `
        }}
      /> */}
    </html>
  );
}
