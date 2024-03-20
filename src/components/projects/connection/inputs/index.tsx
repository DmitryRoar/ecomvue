'use client';

import { Button, Grid } from '@mui/material';
import { OfferTariff } from 'components/projects/offer-tariff';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { MarketplaceSlice, TariffSlice } from 'store/slices';
import { addConnection } from 'store/slices/marketplace';
import { openSnackbar } from 'store/slices/snackbar';
import { MarketplaceCreate } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { CoreUtils } from 'utils';
import { ConnectionInputAvito } from './avito';
import { ConnectionInputWb } from './wb';

// GOD COMPONENT. Sorry :( IDK HOW It's work [DDRR]

export type ConnectionProps = {
  onSetInput: Dispatch<SetStateAction<any>>;
  isEdit?: boolean;
  value?: any;
};
export type ConectionEntityProps = {
  marketplace_type: keyof typeof MarketplaceEnum;
  isEdit?: boolean;
  value?: any;
  onClose?: () => void;
};

type Props = {
  baseInputs: MarketplaceCreate;
  marketplace_type: keyof typeof MarketplaceEnum;
  isEdit?: boolean;
  onClose: () => void;
};

export const ConectionInputs = ({ onClose, isEdit, marketplace_type, baseInputs }: Props) => {
  // musor
  const dispatch = useDispatch();
  const intl = useIntl();
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
      if (!CoreUtils.areAllFieldsFilled(value.project) || !CoreUtils.areAllFieldsFilled(value.connection)) {
        throw Error(intl.formatMessage({ id: 'fill-all-fields' }));
      }

      const { id } = await dispatch(MarketplaceSlice.create({ ...value.project, organization_id: organization!.my.id }) as any).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { token, ...connection } = await dispatch(
        submitConnectionByType({ ...(value.connection as any), marketplace_id: id }) as any
      ).unwrap();
      onClose();
      dispatch(addConnection({ marketplace_id: id, connection }));
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
    } catch (err: any) {
      setShowPopup(true);
      if (err.message) {
        dispatch(
          openSnackbar({
            open: true,
            message: err?.message,
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            close: false,
            alert: {
              color: 'error'
            }
          })
        );
      }
    }
  };

  const subForm = useMemo(() => {
    switch (marketplace_type) {
      case MarketplaceEnum.wildberries:
        return <ConnectionInputWb isEdit={isEdit} onSetInput={setValue} />;
      case MarketplaceEnum.avito:
        return <ConnectionInputAvito isEdit={isEdit} onSetInput={setValue} />;
    }
  }, [marketplace_type]);

  const purchaseTariffHandler = async () => {
    try {
      await dispatch<any>(TariffSlice.purchase(5)).unwrap();
      dispatch(
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'tariff-purchased' }),
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

  const accessTypes = [MarketplaceEnum.avito, MarketplaceEnum.wildberries];

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
      {isEdit && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={submitHandler}
            disabled={!accessTypes.includes(value.project.marketplace_type as MarketplaceEnum)}
          >
            <FormattedMessage id="save" />
          </Button>
        </Grid>
      )}
    </>
  );
};
