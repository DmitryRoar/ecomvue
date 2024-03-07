'use client';

import { Autocomplete, Button, Chip, FormControl, Grid, InputLabel, OutlinedInput, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { ConnectionCreate } from 'types/marketplace';
import { ProjectPermission } from 'types/project';
import { ConnectionProps } from '.';

export const AddConnectionWb = ({ marketplace: rawMarketplace, onSubmit }: ConnectionProps) => {
  const intl = useIntl();
  const { permissions } = useSelector((s) => s.marketplace);

  const [marketplace, setMarketplace] = useState<ConnectionCreate>({
    marketplace_id: rawMarketplace!.id as number,
    name: '',
    token: '',
    permissions: []
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent | any, prop: keyof typeof marketplace) => {
    setMarketplace((state: any) => ({ ...state, [prop]: event?.target.value }));
  };

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="name" />
          </InputLabel>
          <OutlinedInput
            label={intl.formatMessage({ id: 'name' })}
            value={marketplace.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
            type="text"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={permissions}
          defaultValue={[]}
          getOptionLabel={(option: ProjectPermission) => option.value}
          onChange={(_, value) => {
            setMarketplace((state) => ({ ...state, permissions: value.map((v) => Number(v.type)) }));
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
          renderInput={(params) => <TextField {...params} label={intl.formatMessage({ id: 'access' })} />}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="api-key" />
          </InputLabel>
          <OutlinedInput
            label={intl.formatMessage({ id: 'api-key' })}
            value={marketplace.token}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'token')}
            type="text"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={() => onSubmit(marketplace)}>
          <FormattedMessage id="save" />
        </Button>
      </Grid>
    </>
  );
};
