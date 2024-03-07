import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

interface IUIContext {
  customTheme: boolean;
  setCustomTheme: Dispatch<SetStateAction<boolean>>;
}

export const UIContext = createContext({} as IUIContext);

export const UIProvider = ({ children }: PropsWithChildren) => {
  const [customTheme, setCustomTheme] = useState(false);

  return <UIContext.Provider value={{ customTheme, setCustomTheme }}>{children}</UIContext.Provider>;
};
