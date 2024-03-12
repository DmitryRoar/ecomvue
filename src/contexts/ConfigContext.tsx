'use client';
import { createContext, ReactNode } from 'react';

import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

import { PaletteMode } from '@mui/material';
import { CustomizationProps } from 'types/config';

const initialState: CustomizationProps = {
  ...defaultConfig,
  onChangeLayout: () => {},
  onChangeDrawer: () => {},
  onChangeMenuType: () => {},
  onChangePresetColor: () => {},
  onChangeLocale: () => {},
  onChangeRTL: () => {},
  onChangeContainer: () => {},
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onChangeOutlinedField: () => {},
  onReset: () => {}
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'berry-config-ts';

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage(STORAGE_KEY, {
    layout: initialState.layout,
    drawerType: initialState.drawerType,
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: window.navigator.language.split('-')[0] || initialState.locale,
    rtlLayout: initialState.rtlLayout
  });

  const onChangeLayout = (layout: string) => {
    setConfig({
      ...config,
      layout
    });
  };

  const onChangeDrawer = (drawerType: string) => {
    setConfig({
      ...config,
      drawerType
    });
  };

  const onChangeMenuType = (navType: PaletteMode) => {
    setConfig({
      ...config,
      navType
    });
  };

  const onChangePresetColor = (presetColor: string) => {
    setConfig({
      ...config,
      presetColor
    });
  };

  const onChangeLocale = (locale: string) => {
    setConfig({
      ...config,
      locale
    });
  };

  const onChangeRTL = (rtlLayout: boolean) => {
    setConfig({
      ...config,
      rtlLayout
    });
  };

  const onChangeContainer = (container: boolean) => {
    setConfig({
      ...config,
      container
    });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
    setConfig({
      ...config,
      borderRadius: newValue as number
    });
  };

  const onChangeOutlinedField = (outlinedFilled: boolean) => {
    setConfig({
      ...config,
      outlinedFilled
    });
  };

  const onReset = () => {
    setConfig({ ...defaultConfig });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLayout,
        onChangeDrawer,
        onChangeMenuType,
        onChangePresetColor,
        onChangeLocale,
        onChangeRTL,
        onChangeContainer,
        onChangeFontFamily,
        onChangeBorderRadius,
        onChangeOutlinedField,
        onReset
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
