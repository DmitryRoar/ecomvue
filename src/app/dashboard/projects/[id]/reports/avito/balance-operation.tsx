import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { Button, Grid, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Field, Formik } from 'formik';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { ReportAvitoBalance } from 'types/reports/avito';
import { StorageNames } from 'types/user';
import RevenueCard from 'ui-component/cards/RevenueCard';
import SubCard from 'ui-component/cards/SubCard';
import { CoreUtils, TransformUtils } from 'utils';
import * as Yup from 'yup';
import { ReportProps } from '.';
import { ReportContext } from '../context';

export const ReportAvitoBalanceOperation = ({ onFetch, data }: ReportProps<ReportAvitoBalance>) => {
  const intl = useIntl();
  const theme = useTheme();

  const { loading } = useContext(ReportContext);

  const submitHandler = async ({ date_from, date_to }: any) => {
    try {
      if (!date_from) {
        throw Error(intl.formatMessage({ id: 'fill-all-fields' }));
      }
      const format = 'yyyy-MM-dd';
      await onFetch('avito/user_balance_and_operations', {
        date_from: DateTime.fromJSDate(date_from).toFormat(format),
        date_to: date_to ? DateTime.fromJSDate(date_to).toFormat(format) : DateTime.now().toFormat(format)
      });
      localStorage.setItem(StorageNames.reportAvitoBalance, JSON.stringify({ date_from, date_to }));
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
    <Grid>
      <Grid>
        <SubCard>
          <Formik
            initialValues={{
              date_from: JSON.parse(localStorage.getItem(StorageNames.reportAvitoBalance) as string)?.date_from ?? null,
              date_to: JSON.parse(localStorage.getItem(StorageNames.reportAvitoBalance) as string)?.date_to ?? null
            }}
            validationSchema={Yup.object().shape({
              date_from: Yup.date().required().nullable(),
              date_to: Yup.date().nullable()
            })}
            onSubmit={submitHandler}
          >
            {({ values, handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Field
                        fullWidth
                        name="date_from"
                        render={({ field, form }: any) => (
                          <DatePicker
                            {...field}
                            maxDate={new Date()}
                            format={intl.locale === 'ru' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'}
                            label={intl.formatMessage({ id: 'date-from' })}
                            selected={field.value}
                            onChange={(val) => form.setFieldValue(field.name, val)}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Field
                        fullWidth
                        name="date_to"
                        render={({ field, form }: any) => (
                          <DatePicker
                            {...field}
                            maxDate={new Date()}
                            minDate={DateTime.fromJSDate(values.date_from || new Date()).toJSDate()}
                            format={intl.locale === 'ru' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'}
                            label={intl.formatMessage({ id: 'date-to' })}
                            selected={field.value}
                            onChange={(val) => form.setFieldValue(field.name, val)}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={4}>
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
        <>
          <Grid container spacing={gridSpacing} sx={{ paddingTop: gridSpacing }}>
            <Grid item xs={6} lg={6}>
              <RevenueCard
                primary={intl.formatMessage({ id: 'balance' })}
                secondary={TransformUtils.currencyFormat(data.balance.reduce((acc, balance) => (acc += balance.real), 0))}
                iconPrimary={MonetizationOnTwoToneIcon}
                color={theme.palette.secondary.main}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <RevenueCard
                primary={intl.formatMessage({ id: 'bonus' })}
                secondary={TransformUtils.currencyFormat(data.balance.reduce((acc, balance) => (acc += balance.bonus), 0))}
                iconPrimary={SavingsOutlinedIcon}
                color={theme.palette.primary.main}
              />
            </Grid>
          </Grid>

          <Grid>
            <List>
              {data.operations.map((operation, idx) => (
                <SubCard key={idx} sx={{ margin: '1.5rem 0' }}>
                  <ListItem>
                    <ListItemText primary={operation.operation_name} secondary={TransformUtils.currencyFormat(operation.amount_total)} />
                  </ListItem>
                </SubCard>
              ))}
            </List>
          </Grid>
        </>
      )}
    </Grid>
  );
};
