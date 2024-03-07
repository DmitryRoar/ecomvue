'use client';

import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { BaseCreate } from 'types/marketplace';
import axiosServices from 'utils/axios';
import { ConnectionProps } from '.';

const STORAGE_KEY = 'avito-connection-id';

export const AddConnectionAvito = ({ marketplace: rawMarketplace, onSubmit }: ConnectionProps) => {
  const searchParams = useSearchParams();
  const [showConnectionsId, setShowConnectionsId] = useState(false);
  const [pickConnection, setPickConnection] = useState('');

  const filteringConnections = useMemo(
    () => (rawMarketplace.connections as any[]).map(({ id, name }) => ({ id, name })) as any,
    [rawMarketplace]
  );

  const [marketplace, setMarketplace] = useState<BaseCreate & { client_id: string; client_secret: string }>({
    marketplace_id: rawMarketplace!.id as number,
    name: '',
    client_id: '',
    client_secret: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent | any, prop: keyof typeof marketplace) => {
    setMarketplace((state: any) => ({ ...state, [prop]: event?.target.value }));
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

  const saveIdHandler = () => {
    localStorage.setItem(STORAGE_KEY, pickConnection);
  };

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
          <OutlinedInput value={marketplace.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')} type="text" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>
            <FormattedMessage id="client-id" />
          </InputLabel>
          <OutlinedInput
            value={marketplace.client_id}
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
            value={marketplace.client_secret}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'client_secret')}
            type="text"
          />
        </FormControl>
      </Grid>

      {/* YA DISK */}
      <Grid item xs={12}>
        <Link
          href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=fc72eb6169b64c438baccd4726052768`}
          style={{ pointerEvents: (rawMarketplace?.connections as [])?.length <= 0 ? 'none' : 'auto' }}
        >
          <Button
            variant="contained"
            fullWidth
            color="info"
            disabled={(rawMarketplace?.connections as []).length <= 0}
            onClick={linkDiskHandler}
          >
            <FormattedMessage id="link-disk" />
          </Button>
        </Link>
      </Grid>

      {pickConnection ? (
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
      </Grid>
    </>
  );
};
