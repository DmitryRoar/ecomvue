import { Autocomplete, Chip, FormControl, Grid, InputLabel, OutlinedInput, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'store';
import { CreateConnectionWb } from 'types/marketplace';
import { ProjectPermission } from 'types/project';
import { TransformUtils } from 'utils';
import { ConnectionProps } from '.';

export const ConnectionInputWb = ({ value: valueProp, isEdit, onSetInput }: ConnectionProps) => {
  const intl = useIntl();
  const { permissions } = useSelector((s) => s.marketplace);

  const [value, setValue] = useState<CreateConnectionWb>(
    valueProp ?? {
      name: '',
      permissions: [],
      token: ''
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent | any, prop: keyof typeof value) => {
    if (!isEdit) return;
    setValue((state: any) => ({ ...state, [prop]: event?.target.value }));
    onSetInput((state: any) => ({ ...state, connection: { ...state.connection, [prop]: event?.target.value } }));
  };

  const defaultValue = useMemo(() => {
    if (value.permissions.length) {
      return permissions.filter((permission: ProjectPermission) => value.permissions.some((cur: any) => Number(cur) === permission.type));
    }
    return [];
  }, [permissions, value]);
  console.log(defaultValue);

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="name" />
          </InputLabel>
          <OutlinedInput
            readOnly={!isEdit}
            label={intl.formatMessage({ id: 'name' })}
            value={value.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
            type="text"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          readOnly={!isEdit}
          disableCloseOnSelect
          options={permissions}
          value={defaultValue}
          getOptionLabel={(option: ProjectPermission) => option.value}
          onChange={(_, value) => {
            setValue((state) => ({ ...state, permissions: value.map((v) => Number(v.type)) }));
            onSetInput((state: any) => ({ ...state, connection: { ...state.connection, permissions: value.map((v) => Number(v.type)) } }));
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
            readOnly={!isEdit}
            label={intl.formatMessage({ id: 'api-key' })}
            value={isEdit ? value.token : TransformUtils.secretWord(value?.token)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'token')}
            type="text"
          />
        </FormControl>
      </Grid>
    </>
  );
};
