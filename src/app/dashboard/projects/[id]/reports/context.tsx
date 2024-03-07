import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';
import { IReportAvitoList } from 'types/reports/avito';

interface IContext {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  items: IReportAvitoList[];
  onSaveItems: (data: IReportAvitoList[]) => void;
}

export const ReportContext = createContext({} as IContext);

export const ReportProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IReportAvitoList[]>([]);

  const onSaveItems = (data: IReportAvitoList[]) => {
    setItems(data);
  };

  return <ReportContext.Provider value={{ loading, onSaveItems, items, setLoading }}>{children}</ReportContext.Provider>;
};
