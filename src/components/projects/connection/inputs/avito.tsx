'use client';

import { FormControl, Grid, InputLabel, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CreateConnectionAvito } from 'types/marketplace';
import axiosServices from 'utils/axios';
import { ConnectionProps } from '.';

const STORAGE_KEY = 'avito-connection-id';

export const ConnectionInputAvito = ({ onSetInput }: ConnectionProps) => {
  const searchParams = useSearchParams();

  const [value, setValue] = useState<CreateConnectionAvito>({
    name: '',
    client_id: '',
    client_secret: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent | any, prop: keyof typeof value) => {
    setValue((state: any) => ({ ...state, [prop]: event?.target.value }));
    onSetInput((state: any) => ({ ...state, connection: { ...state.connection, [prop]: event?.target.value } }));
  };

  const linkDiskHandler = useCallback(async () => {
    try {
      const code = searchParams.get('code');
      const connectionId = localStorage.getItem(STORAGE_KEY);

      if (code && connectionId) {
        await axiosServices.post('/v1/marketplaces/yadisk/add/', {
          yadisk_code: code,
          connection_id: Number(connectionId)
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [searchParams]);

  // const saveIdHandler = () => {
  //   localStorage.setItem(STORAGE_KEY, pickConnection);
  // };

  useEffect(() => {
    linkDiskHandler();
  }, [linkDiskHandler]);

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="name" />
          </InputLabel>
          <OutlinedInput value={value.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')} type="text" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="client-id" />
          </InputLabel>
          <OutlinedInput
            value={value.client_id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'client_id')}
            type="text"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="client-secret" />
          </InputLabel>
          <OutlinedInput
            value={value.client_secret}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'client_secret')}
            type="text"
          />
        </FormControl>
      </Grid>

      {/* YA DISK */}
      {/* <Grid item xs={12}>
        <Link
          href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=fc72eb6169b64c438baccd4726052768`}
          style={{ pointerEvents: (value?.connections as [])?.length <= 0 ? 'none' : 'auto' }}
        >
          <Button
            variant="contained"
            fullWidth
            color="info"
            disabled={(value?.connections as []).length <= 0}
            onClick={linkDiskHandler}
          >
            <FormattedMessage id="link-disk" />
          </Button>
        </Link>
      </Grid> */}

      {/* {pickConnection ? (
        <Grid item xs={12}>
          <Link
            href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=fc72eb6169b64c438baccd4726052768`}
            style={{ padding: '6px' }}
          >
            <Button variant="contained" fullWidth color="info" onClick={saveIdHandler}>
              <FormattedMessage id="next" />
            </Button>
          </Link>
        </Grid>
      ) : (
        filteringConnections.length > 0 && (
          <Grid item xs={12}>
            <Button variant="contained" fullWidth color="info" onClick={() => setShowConnectionsId((state) => !state)}>
              <FormattedMessage id={showConnectionsId ? 'cancel' : 'link-disk'} />
            </Button>
          </Grid>
        )
      )}

      {filteringConnections.length > 0 && (
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>
              <FormattedMessage id="select-id" />
            </InputLabel>
            <Select value={pickConnection} onChange={(e: any) => setPickConnection(e.target.value)}>
              {filteringConnections.map((connect: any, idx: number) => (
                <MenuItem value={connect.id} key={idx}>
                  {connect.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth onClick={() => onSubmit(marketplace)}>
          <FormattedMessage id="save" />
        </Button>
      </Grid> */}
    </>
  );
};
