'use client';

import { useContext } from 'react';
// project import

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { IReportAvitoPromotion, ReportAvitoPackageEnum } from 'types/reports/avito';
import { StorageNames } from 'types/user';
import SubCard from 'ui-component/cards/SubCard';
import { CoreUtils, TransformUtils } from 'utils';
import * as Yup from 'yup';
import { ReportProps } from '.';
import { ReportContext } from '../context';

const PACKAGE_LIST = [
  { formattedID: 'avito-x2_1', value: 'x2_1' },
  { formattedID: 'avito-x2_7', value: 'x2_7' },
  { formattedID: 'avito-x5_1', value: 'x5_1' },
  { formattedID: 'avito-x5_7', value: 'x5_7' },
  { formattedID: 'avito-x10_1', value: 'x10_1' },
  { formattedID: 'avito-x10_7', value: 'x10_7' }
] as { formattedID: string; value: keyof typeof ReportAvitoPackageEnum }[];

export const ReportAvitoPromotion = ({ data, onFetch }: ReportProps<IReportAvitoPromotion>) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { loading, items } = useContext(ReportContext);

  const submitHandler = async (values: any) => {
    try {
      if (!CoreUtils.areAllFieldsFilled(values)) {
        console.log('dsaads');
        throw Error(intl.formatMessage({ id: 'fill-all-fields' }));
      } else {
        await onFetch('avito/promotion_services', values);
        localStorage.setItem(StorageNames.reportAvitoPromition, JSON.stringify(values));
      }
    } catch (err: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: err.message,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  return (
    items && (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={8}>
          <SubCard>
            <Formik
              initialValues={{
                package_id: JSON.parse(localStorage.getItem(StorageNames.reportAvitoPromition as string) as string)?.package_id ?? null,
                item_id: JSON.parse(localStorage.getItem(StorageNames.reportAvitoPromition as string) as string)?.item_id ?? null
              }}
              validationSchema={Yup.object().shape({
                item_id: Yup.string(),
                package_id: Yup.string()
              })}
              onSubmit={submitHandler}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel>
                          <FormattedMessage id="product" />
                        </InputLabel>
                        <Select
                          name="item_id"
                          label={intl.formatMessage({ id: 'product' })}
                          value={values.item_id ?? ''}
                          onChange={handleChange}
                        >
                          {items.map((list, idx) => (
                            <MenuItem value={list.id} key={idx}>
                              {list.title} ({TransformUtils.currencyFormat(list.price)})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel>
                          <FormattedMessage id="type" />
                        </InputLabel>
                        <Select
                          name="package_id"
                          label={intl.formatMessage({ id: 'type' })}
                          value={values.package_id ?? ''}
                          onChange={handleChange}
                        >
                          {PACKAGE_LIST.map((pkg, idx) => (
                            <MenuItem value={pkg.value} key={idx}>
                              <FormattedMessage id={pkg.formattedID} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item justifyContent="flex-end" alignItems="flex-end" xs={4}>
                      <Button fullWidth variant="contained" color="secondary" type="submit" disabled={loading}>
                        <FormattedMessage id="show" />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </SubCard>
        </Grid>
        {CoreUtils.isObject(data) && (
          <Grid item xs>
            <SubCard title="Сумма списания" sx={{ height: '100%' }}>
              <Typography sx={{ color: 'success.dark' }}>{TransformUtils.currencyFormat(data.amount)}</Typography>
            </SubCard>
          </Grid>
        )}
      </Grid>
    )
  );
};
