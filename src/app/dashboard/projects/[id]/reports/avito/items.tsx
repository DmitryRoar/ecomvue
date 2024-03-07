'use client';

import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// project import
import MainCard from 'ui-component/cards/MainCard';

// assets
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { IReportAvitoList, ReportAvitoItemEnum } from 'types/reports/avito';
import Chip, { ChipColor } from 'ui-component/extended/Chip';
import { TransformUtils, TranslateUtils } from 'utils';
import { ReportProps } from '.';
import { ReportContext } from '../context';

type Props = {};

export const ReportAvitoItems = ({ data, onFetch }: Props & ReportProps<IReportAvitoList[]>) => {
  const intl = useIntl();
  const { items, onSaveItems } = useContext(ReportContext);

  useEffect(() => {
    onFetch('avito/items', null, (item: any) => ({ ...item, category: item.category.name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.length && !items?.length) {
      onSaveItems(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, items]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 130 },
    {
      flex: 0.5,
      field: 'title',
      headerName: intl.formatMessage({ id: 'title' }),
      type: 'string',
      align: 'left',
      headerAlign: 'left'
    },
    {
      flex: 0.5,
      field: 'price',
      maxWidth: 100,
      headerName: intl.formatMessage({ id: 'price' }),
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => <Typography>{TransformUtils.currencyFormat(row.price)}</Typography>
    },
    {
      flex: 0.5,
      field: 'categoryName',
      headerName: intl.formatMessage({ id: 'category' }),
      sortable: false,
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap>{row.category}</Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.5,
      field: 'status',
      headerName: intl.formatMessage({ id: 'status' }),
      sortable: true,
      type: 'string',
      minWidth: 100,
      width: 300,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        let color: ChipColor = 'secondary';
        switch (row.status) {
          case ReportAvitoItemEnum.rejected: {
            color = 'error';
            break;
          }
          case ReportAvitoItemEnum.old: {
            color = 'orange';
            break;
          }
          case ReportAvitoItemEnum.blocked: {
            color = 'warning';
            break;
          }
        }
        return (
          <Chip
            label={TransformUtils.capitalize(intl.locale === 'ru' ? TranslateUtils.avitoStatus(row.status) : row.status)}
            size="small"
            chipcolor={color}
          />
        );
      }
    },
    {
      flex: 0.5,
      field: 'address',
      headerName: intl.formatMessage({ id: 'address' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left'
    },
    {
      flex: 0.5,
      field: 'url',
      sortable: false,
      headerName: intl.formatMessage({ id: 'url' }).toUpperCase(),
      type: 'string',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <Link target="_blank" rel="noopener noreferrer" href={row.url}>
          <Typography noWrap>{row.url}</Typography>
        </Link>
      )
    }
  ];

  let headers: any = [];
  columns.map((item) => {
    return headers.push({ label: item.headerName, key: item.field });
  });

  return (
    <MainCard sx={{ padding: 0 }}>
      <Box>
        <DataGrid checkboxSelection rows={data || []} columns={columns} hideFooter autoHeight />
      </Box>
    </MainCard>
  );
};
