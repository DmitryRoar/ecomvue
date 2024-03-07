'use client';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { MarketplaceEnum } from 'types/project';
import { StorageNames } from 'types/user';
import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import { RExportExcel } from 'ui-component/export-excel';
import axiosServices from 'utils/axios';
import { ReportContext } from '../context';
import { ReportAvitoBalanceOperation } from './balance-operation';
import { ReportAvitoItems } from './items';
import { ReportAvitoPromotion } from './promotion';
import { ReportAvitoStatistic } from './statistic';

import * as ExcelJS from 'exceljs';

export type ReportProps<T> = {
  onFetch: (endpoint: string, body?: any, transformCb?: (item: T) => T[]) => Promise<void>;
  data: T;
};

type RequestType = {
  [key: string]: {
    body: any;
    response: any;
  };
};

type Props = {
  slug: string;
};

export const ProjectReportAvito = ({ slug }: Props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { loading, setLoading } = useContext(ReportContext);
  const { projects } = useSelector((state) => state.marketplace);
  const [tab, setTab] = useState('1');

  const [requests, setRequest] = useState<RequestType>({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState('');

  const project = useMemo(() => {
    return projects.find((p) => p.marketplace_type === MarketplaceEnum.avito && p.id === Number(slug));
  }, [projects, slug]);

  const handleChange = (_: SyntheticEvent, value: string) => {
    if (!loading) {
      setTab(value);
    }
  };

  const fetchDataHandler = (tabId: string) => {
    return async (endpoint: string, body?: any, transformCb?: any) => {
      try {
        setLoading(true);
        let isOtherBody = 1;
        if (requests[tabId]) {
          if (requests[tabId].body == body) {
            isOtherBody = 0;
          } else {
            isOtherBody = Object.keys(requests[tabId]?.body).reduce((acc, key) => {
              if (requests[tabId].body[key] !== body[key]) {
                acc += 1;
              }
              return acc;
            }, 0);
          }
        }

        if (!requests[tabId]?.response || isOtherBody) {
          const { data } = await axiosServices.post(`/v1/${endpoint}/`, {
            marketplace_id: slug,
            ...body
          });
          setRequest((state) => ({
            ...state,
            [tabId]: { body: body ? body : null, response: transformCb ? data.map(transformCb) : data }
          }));
        }
      } catch (err: any) {
        dispatch(
          openSnackbar({
            open: true,
            message: err?.detail ?? err?.details?.error?.fields?.user_id,
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            close: false,
            alert: {
              color: 'error'
            }
          })
        );
        console.log('ERR: ', err);
      } finally {
        setLoading(false);
      }
    };
  };

  const onDestroy = (event?: any) => {
    if (event) {
      event.preventDefault();
    }
    localStorage.removeItem(StorageNames.reportAvitoBalance);
    localStorage.removeItem(StorageNames.reportAvitoPromition);
  };

  useEffect(() => {
    onDestroy();
  }, [slug]);

  useEffect(() => {
    window.addEventListener('beforeunload', onDestroy);
    return () => {
      window.removeEventListener('beforeunload', onDestroy);
    };
  }, []);

  const showSearchSection = useMemo(() => tab === '1', [tab]);

  const EXCEL_COLUMNS = [
    { header: intl.formatMessage({ id: 'id' }), key: 'id', width: 11 },
    { header: intl.formatMessage({ id: 'title' }), key: 'title', width: 44 },
    { header: intl.formatMessage({ id: 'price' }), key: 'price' },
    { header: intl.formatMessage({ id: 'category' }), key: 'category', width: 23 },
    { header: intl.formatMessage({ id: 'status' }), key: 'status' },
    { header: intl.formatMessage({ id: 'address' }), key: 'address', width: 42.5 },
    { header: intl.formatMessage({ id: 'url' }), key: 'url', width: 115 }
  ] as ExcelJS.Column[];

  return (
    <TabContext value={tab}>
      {loading && <Loader />}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="avito tabs">
          <Tab label={intl.formatMessage({ id: 'all-advertisements' })} value="1" />
          <Tab label={intl.formatMessage({ id: 'advertising-services' })} value="2" />
          <Tab label={intl.formatMessage({ id: 'cash-transactions' })} value="3" />
          <Tab label={intl.formatMessage({ id: 'statistics' })} value="4" />
        </Tabs>
      </Box>
      <MainCard
        title={`${project?.name} | Avito`}
        secondary={showSearchSection ? <RExportExcel columns={EXCEL_COLUMNS} data={requests[tab]?.response} /> : null}
      >
        <TabPanel sx={{ padding: 0 }} value="1">
          <ReportAvitoItems data={requests['1']?.response} onFetch={fetchDataHandler('1')} />
        </TabPanel>
        <TabPanel value="2">
          <ReportAvitoPromotion data={requests['2']?.response} onFetch={fetchDataHandler('2')} />
        </TabPanel>
        <TabPanel value="3" sx={{ p: 0 }}>
          <ReportAvitoBalanceOperation data={requests['3']?.response} onFetch={fetchDataHandler('3')} />
        </TabPanel>
        <TabPanel value="4">
          <ReportAvitoStatistic data={requests['4']?.response} onFetch={fetchDataHandler('4')} />
        </TabPanel>
      </MainCard>
    </TabContext>
  );
};
