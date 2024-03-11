'use client';

import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { UserSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import SubCard from 'ui-component/cards/SubCard';

export const ProfileSectionServices = () => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const { services, defaultServices } = useSelector((s) => s.user);

  const [mutateServices, setMutateServices] = useState<string[] | null>(null);
  const [removeItems, setRemoveItems] = useState<string[]>([]);
  const [newItems, setNewItems] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const transformServices = useMemo(() => {
    return defaultServices.filter((service) => services.some((s) => s.name === service));
  }, [defaultServices, services]);

  const submitHandler = async () => {
    try {
      if (!newItems.length && !removeItems.length) {
        throw Error(intl.formatMessage({ id: 'make-change' }));
      }
      setIsDisabled(true);
      if (newItems.length) {
        for (const service of newItems) {
          await dispatch(UserSlice.addService(service)).unwrap();
        }
      }
      if (removeItems.length) {
        for (const service of removeItems) {
          await dispatch(UserSlice.removeService(service)).unwrap();
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
      setMutateServices(transformServices);
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
    <SubCard title={intl.formatMessage({ id: 'services' })}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            disabled={isDisabled}
            disableCloseOnSelect
            options={defaultServices}
            value={mutateServices ?? transformServices}
            defaultValue={transformServices}
            getOptionLabel={(option) => option}
            onChange={(_, value, reason, detail) => {
              if (reason === 'removeOption') {
                setRemoveItems((state) => [...state, detail?.option as string]);
              }
              if (reason === 'selectOption') {
                setNewItems((state) => [...state, detail?.option as string]);
              }
              setMutateServices(value);
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option} label={option} />);
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
