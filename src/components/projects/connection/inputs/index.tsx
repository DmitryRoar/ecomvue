'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { MarketplaceSlice, TariffSlice } from 'store/slices';
import { addConnection } from 'store/slices/marketplace';
import { openSnackbar } from 'store/slices/snackbar';
import { MarketplaceCreate } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { CoreUtils } from 'utils';
import { ConnectionInputAvito } from './avito';
import { ConnectionInputWb } from './wb';

type OfferProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

const OfferTariff = ({ isOpen, onClose, onSubmit }: OfferProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Ошибка :(</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Для продолжения необходимо повысить тариф.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          autoFocus
        >
          Повысить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type ConnectionProps = {
  onSetInput: Dispatch<SetStateAction<any>>;
};

type Props = {
  baseInputs: MarketplaceCreate;
  onClose: () => void;
};

export const ConectionInputs = ({ onClose, baseInputs }: Props) => {
  // musor
  const dispatch = useDispatch();
  const { organization } = useSelector((s) => s.organization);

  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState({
    project: baseInputs,
    connection: null
  });

  useEffect(() => {
    setValue((state) => ({ ...state, project: baseInputs }));
  }, [baseInputs]);

  const submitConnectionByType = useCallback(
    (options: any) => {
      switch (baseInputs.marketplace_type) {
        case MarketplaceEnum.wildberries:
          return MarketplaceSlice.createWbConnection(options);
        case MarketplaceEnum.avito:
          return MarketplaceSlice.createAvitoConnection(options);
      }
    },
    [baseInputs.marketplace_type]
  );

  const submitHandler = async () => {
    try {
      if (CoreUtils.areAllFieldsFilled(value.project) && CoreUtils.areAllFieldsFilled(value.connection)) {
        // eslint-disable-next-line
        const { id } = await dispatch(MarketplaceSlice.create({ ...value.project, organization_id: organization!.id }) as any).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, ...connection } = await dispatch(
          submitConnectionByType({ ...(value.connection as any), marketplace_id: id }) as any
        ).unwrap();
        dispatch(addConnection({ marketplace_id: id, connection }));
        onClose();
        dispatch(
          openSnackbar({
            open: true,
            message: 'Маркетплейс успешно создан',
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            close: false,
            alert: {
              color: 'success'
            }
          })
        );
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Заполните все поля',
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            close: false,
            alert: {
              color: 'error'
            }
          })
        );
      }
    } catch (err) {
      setShowPopup(true);
      console.log(err);
    }
  };

  const subForm = useMemo(() => {
    switch (baseInputs.marketplace_type) {
      case MarketplaceEnum.wildberries:
        return <ConnectionInputWb onSetInput={setValue} />;
      case MarketplaceEnum.avito:
        return <ConnectionInputAvito onSetInput={setValue} />;
    }
  }, [baseInputs.marketplace_type]);

  const purchaseTariffHandler = async () => {
    try {
      await dispatch<any>(TariffSlice.purchase(1)).unwrap();
      dispatch(
        openSnackbar({
          open: true,
          message: 'Тариф успешно куплен',
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'success'
          }
        })
      );
      await submitHandler();
    } catch (err: any) {
      console.log('err: ', err);
    }
  };

  return (
    <>
      <OfferTariff
        isOpen={showPopup}
        onSubmit={purchaseTariffHandler}
        onClose={() => {
          setShowPopup(false);
        }}
      />
      {subForm}
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={submitHandler}>
          <FormattedMessage id="save" />
        </Button>
      </Grid>
    </>
  );
};
