'use client';

import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { UserSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import { ProjectType } from 'types/project';
import SubCard from 'ui-component/cards/SubCard';

export const ProfileSectionMarketplaces = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { types } = useSelector((s) => s.marketplace);
  const { marketplaces } = useSelector((s) => s.user);

  const [mutateMarketplaes, setMutateMarketplaces] = useState<ProjectType[] | null>(null);
  const [removeItems, setRemoveItems] = useState<string[]>([]);
  const [newItems, setNewItems] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const transformMarketplaces = useMemo(() => {
    return types.filter(({ type }) => marketplaces.some((marketplace) => marketplace.name === type));
  }, [types, marketplaces]);

  const submitHandler = async () => {
    try {
      if (!newItems.length && !removeItems.length) {
        throw Error(intl.formatMessage({ id: 'make-change' }));
      }
      setIsDisabled(true);
      if (newItems.length) {
        for (const marketplace of newItems) {
          await dispatch(UserSlice.addWorkMarket(marketplace)).unwrap();
        }
      }
      if (removeItems.length) {
        for (const marketplace of removeItems) {
          await dispatch(UserSlice.removeWorkMarket(marketplace)).unwrap();
        }
      }

      dispatch(
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'success' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'success'
          }
        })
      );
    } catch (err: any) {
      setMutateMarketplaces(transformMarketplaces);
      dispatch(
        openSnackbar({
          open: true,
          message: err?.message ?? intl.formatMessage({ id: 'something-wrong' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <SubCard title={intl.formatMessage({ id: 'marketplaces' })}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            disabled={isDisabled}
            disableCloseOnSelect
            options={types}
            value={mutateMarketplaes ?? transformMarketplaces}
            defaultValue={transformMarketplaces}
            getOptionLabel={(option) => option.value}
            onChange={(_, value, reason, detail) => {
              if (reason === 'removeOption') {
                setRemoveItems((state) => [...state, detail?.option.type as string]);
              }
              if (reason === 'selectOption') {
                setNewItems((state) => [...state, detail?.option.type as string]);
              }
              setMutateMarketplaces(value);
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.type}>
                  {option.value}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.type} label={option.value} />);
            }}
            renderInput={(params) => <TextField {...params} label={intl.formatMessage({ id: 'list' })} />}
          />
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
          <Button variant="contained" color="secondary" type="button" disabled={isDisabled} onClick={submitHandler}>
            <FormattedMessage id="save" />
          </Button>
        </Grid>
      </Grid>
    </SubCard>
  );
};
