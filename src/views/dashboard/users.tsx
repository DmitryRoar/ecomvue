'use client';

import React, { useEffect, useState } from 'react';

// material-ui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// types
import { ArrangementOrder, EnhancedTableHeadProps, EnhancedTableToolbarProps, GetComparator, HeadCell, KeyedObject } from 'types';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconSearch } from '@tabler/icons-react';
import UserAdd from 'components/profile/users/user-add';
import { FormattedMessage, useIntl } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { OrganizationSlice } from 'store/slices';
import { IUsers } from 'types/user';

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: IUsers[], comparator: (a: IUsers, b: IUsers) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0] as IUsers, b[0] as IUsers);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    label: 'id',
    align: 'center'
  },
  {
    id: 'fullname',
    numeric: false,
    label: 'full-name',
    align: 'left'
  },
  {
    id: 'email',
    numeric: false,
    label: 'email',
    align: 'left'
  },
  {
    id: 'city',
    numeric: false,
    label: 'city',
    align: 'left'
  },
  {
    id: 'date',
    numeric: true,
    label: 'date-of-connection',
    align: 'center'
  },
  {
    id: 'status',
    numeric: false,
    label: 'status',
    align: 'center'
  },
  {
    id: 'typeConnect',
    numeric: false,
    label: 'type-of-connect',
    align: 'center'
  },
  {
    id: 'permissions',
    numeric: false,
    label: 'permissions',
    align: 'left'
  }
];

interface ProEnhancedTableHeadProps extends EnhancedTableHeadProps {
  theme: Theme;
  selected: string[];
}

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main
      })
    }}
  >
    {numSelected > 0 ? (
      <Typography color="inherit" variant="h4">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} />
    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  theme,
  selected
}: ProEnhancedTableHeadProps) {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={16}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <FormattedMessage id={headCell.label} />
                {orderBy === headCell?.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
              <FormattedMessage id="actions" />
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

const Users = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { organization: data } = useSelector((s) => s.organization);
  const [open, setOpen] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [search, setSearch] = React.useState<string>('');
  console.log('search: ', search);
  const [rows, setRows] = React.useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setRows(data.my.users);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(OrganizationSlice.getRoles());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row: KeyedObject) => {
        let matches = true;

        const properties = ['fullname', 'nickname', 'city', 'date', 'status', 'typeConnect', 'permissions'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(data as any);
    }
  };

  const handleRequestSort = (_event: React.SyntheticEvent<Element, Event>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId = rows.map((n) => n.user.full_name);
        setSelected(newSelectedId);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container alignItems="center" spacing={gridSpacing}>
          <Grid item xs zeroMinWidth>
            <OutlinedInput
              id="input-search-card-style1"
              placeholder="Search Contact"
              fullWidth
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              sx={{ px: 2.75, py: 1.5 }}
              onClick={handleClickOpenDialog}
            >
              <FormattedMessage id="add" />
            </Button>
            <UserAdd users={rows} open={open} handleCloseDialog={handleCloseDialog} />
          </Grid>
        </Grid>
        {/* <Grid container alignItems="center">

          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              onChange={handleSearch}
              placeholder="Search..."
              value={search}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={6} sx={{ marginLeft: 'auto' }}>
            <Button
              variant="contained"
              size="medium"
              onClick={handleClickOpenDialog}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <AddIcon fontSize="small" />
              Add
            </Button>
          </Grid>
        </Grid> */}
      </CardContent>

      {/* table */}
      {!loading && (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
                theme={theme}
                selected={selected}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    /** Make sure no display bugs if row isn't an OrderData object */
                    if (typeof row === 'number') return null;
                    const isItemSelected = isSelected(row.user.full_name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                        <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.user.full_name)}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.user.full_name)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            {row.user.id}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.user.full_name)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            {row.user.full_name ?? 'Пусто'}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{row.user.email ?? 'Пусто'}</TableCell>
                        <TableCell align="left">Пусто</TableCell>
                        <TableCell align="center">{new Date(row.user.date_joined).toLocaleString()}</TableCell>
                        <TableCell align="left">Пусто</TableCell>
                        <TableCell align="center">Пусто</TableCell>
                        <TableCell align="left">{row.user_role.functools[0].name}</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                          <IconButton size="large" aria-label="more options">
                            <MoreHorizOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            labelRowsPerPage={intl.formatMessage({ id: 'rows-page' })}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </MainCard>
  );
};

export default Users;
