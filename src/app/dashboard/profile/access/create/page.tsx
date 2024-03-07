'use client';

import { Button, Checkbox, Grid, OutlinedInput } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { OrganizationSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';

const ProfileAccessCreate = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { functools } = useSelector((s) => s.organization);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasError(false);
        await dispatch(OrganizationSlice.getFunctools()).unwrap();
      } catch (err) {
        setHasError(true);
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
      field: 'viewing',
      headerName: intl.formatMessage({ id: 'viewing' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: () => <Checkbox color="primary" checked={false} onChange={() => {}} />
    },
    {
      flex: 0.5,
      field: 'create-edit',
      headerName: intl.formatMessage({ id: 'create-edit' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: () => <Checkbox color="primary" checked={false} onChange={() => {}} />
    },
    {
      flex: 0.5,
      field: 'deletion',
      headerName: intl.formatMessage({ id: 'deletion' }),
      type: 'string',
      sortable: false,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: false,
      renderCell: () => <Checkbox color="primary" checked={false} onChange={() => {}} />
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
              <Button variant="contained" size="large" sx={{ px: 2.75, py: 1.5 }}>
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
