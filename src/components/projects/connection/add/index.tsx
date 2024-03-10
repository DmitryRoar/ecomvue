'use client';
// DEPRECATED

import { useDispatch } from 'store';
import { MarketplaceSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import { Marketplace } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { CoreUtils } from 'utils';
import { AddConnectionAvito } from './avito';
import { AddConnectionWb } from './wb';

export type ConnectionProps = {
  marketplace: Marketplace;
  onSubmit: any;
};

export const AddConnection = (props: ConnectionProps & { onClose: () => void }) => {
  const dispatch = useDispatch();

  const submitHandler = (cb: any) => {
    return async (data: any) => {
      try {
        if (CoreUtils.areAllFieldsFilled(data)) {
          await dispatch(cb(data)).unwrap();
          props.onSubmit();
          props.onClose();
          dispatch(
            openSnackbar({
              open: true,
              message: 'Соединение успешно создано',
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
              message: 'Необходимо заполнить все поля',
              variant: 'alert',
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              close: false,
              alert: {
                color: 'error'
              }
            })
          );
        }
      } catch (err: any) {
        if (err?.detail) {
          dispatch(
            openSnackbar({
              open: true,
              message: err?.detail,
              variant: 'alert',
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              close: false,
              alert: {
                color: 'error'
              }
            })
          );
        } else {
          Object.values(err).forEach((value) => {
            dispatch(
              openSnackbar({
                open: true,
                message: value,
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                close: false,
                alert: {
                  color: 'error'
                }
              })
            );
          });
        }
      }
    };
  };

  switch (props.marketplace.marketplace_type) {
    case MarketplaceEnum.wildberries:
      return <AddConnectionWb {...props} onSubmit={submitHandler(MarketplaceSlice.createWbConnection)} />;
    case MarketplaceEnum.avito:
      return <AddConnectionAvito {...props} onSubmit={submitHandler(MarketplaceSlice.createAvitoConnection)} />;
    default:
      return <></>;
  }
};
