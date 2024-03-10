'use client';

import { Button, Checkbox, Grid, OutlinedInput } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { OrganizationSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import { FunctoolEnum } from 'types/organization';
import MainCard from 'ui-component/cards/MainCard';
import Loader from 'ui-component/Loader';

const ProfileAccessCreate = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  const { functools } = useSelector((s) => s.organization);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(OrganizationSlice.getFunctools()).unwrap();
      } catch (err) {
        dispatch(
          openSnackbar({
            open: true,
            message: intl.formatMessage({ id: 'something-wrong' }),
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            close: false,
            alert: {
              color: 'error'
            }
          })
        );
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async () => {
    try {
      if (!name.trim() || !picked.length) {
        throw Error('dsadas');
      }
      await dispatch(OrganizationSlice.createRole({ name, functools: picked }));
      router.push('/dashboard/profile/access');
    } catch (err: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: err?.detail ?? intl.formatMessage({ id: 'fill-all-fields' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  const columns: GridColDef[] = [
    {
      flex: 0.5,
      field: 'name',
      headerName: intl.formatMessage({ id: 'name' }),
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      editable: false,
      hideable: false
    },
    {
      flex: 0.5,
      field: 'see',
      headerName: intl.formatMessage({ id: 'look' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: ({ row }) => {
        const checked = picked.some((pick) => pick === row.id);
        return (
          row.type === FunctoolEnum.see && (
            <Checkbox
              color="primary"
              checked={checked}
              onChange={() => {
                setPicked((state) => (checked ? state.filter((s) => s !== row.id) : [...state, row.id]));
              }}
            />
          )
        );
      }
    },
    {
      flex: 0.5,
      field: 'create_refact',
      headerName: intl.formatMessage({ id: 'create-edit' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: ({ row }) => {
        const checked = picked.some((pick) => pick === row.id);
        return (
          row.type === FunctoolEnum.create_refact && (
            <Checkbox
              color="primary"
              checked={checked}
              onChange={() => {
                setPicked((state) => (checked ? state.filter((s) => s !== row.id) : [...state, row.id]));
              }}
            />
          )
        );
      }
    },
    {
      flex: 0.5,
      field: 'delete',
      headerName: intl.formatMessage({ id: 'deletion' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: ({ row }) => {
        const checked = picked.some((pick) => pick === row.id);
        return (
          row.type === FunctoolEnum.delete && (
            <Checkbox
              color="primary"
              checked={checked}
              onChange={() => {
                setPicked((state) => (checked ? state.filter((s) => s !== row.id) : [...state, row.id]));
              }}
            />
          )
        );
      }
    }
  ];

  return (
    <MainCard title={intl.formatMessage({ id: 'creation' })}>
      {loading && <Loader />}
      <Grid container spacing={gridSpacing}>
        <Grid item xs>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <OutlinedInput
                id="input-search-card-style1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={intl.formatMessage({ id: 'role-name' })}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" sx={{ px: 2.75, py: 1.5 }} onClick={submitHandler}>
                <FormattedMessage id="create" />
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ marginTop: gridSpacing }}>
            {!loading && <DataGrid rows={functools as any} columns={columns} hideFooter autoHeight disableColumnMenu disableColumnFilter />}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileAccessCreate;
