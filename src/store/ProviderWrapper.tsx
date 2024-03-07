'use client';

import { ReactNode, useEffect, useState } from 'react';

// map styles
/*import 'mapbox-gl/dist/mapbox-gl.css';*/
// third-party
import { Provider } from 'react-redux';
// project-import
import Loader from 'ui-component/Loader';
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import { ConfigProvider } from 'contexts/ConfigContext';
import NavigationScroll from 'layout/NavigationScroll';
import { dispatch, store } from 'store';
import { getMenu } from 'store/slices/menu';
import ThemeCustomization from 'themes';

import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMenu()).then(() => {
      setLoading(true);
    });
  }, []);

  if (!loading) return <Loader />;

  return (
    <Provider store={store}>
      <ConfigProvider>
        <ThemeCustomization>
          <RTLLayout>
            <Locales>
              <NavigationScroll>
                <AuthProvider>
                  <Notistack>
                    <Snackbar />
                    {children}
                  </Notistack>
                </AuthProvider>
              </NavigationScroll>
            </Locales>
          </RTLLayout>
        </ThemeCustomization>
      </ConfigProvider>
    </Provider>
  );
}
