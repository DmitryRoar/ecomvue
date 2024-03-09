'use client';

import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { ReferalSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import MainCard from 'ui-component/cards/MainCard';

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

const Referals = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { invited, promotion } = useSelector((s) => s.referal);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(ReferalSlice.getAll());
      await dispatch(ReferalSlice.getPromotion());
      await dispatch(ReferalSlice.getSale());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyClipboardHandler = () => {
    navigator.clipboard.writeText(`${origin}/auth/register?ref=${promotion}`);
    dispatch(
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: intl.formatMessage({ id: 'success' }),
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <MainCard>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={1}>
                <Typography variant="h3">{promotion}</Typography>
                <Typography variant="body1">
                  <FormattedMessage id="your-referral" />
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Tooltip placement="left" title={intl.formatMessage({ id: 'copy' })}>
                <Button variant="outlined" sx={{ minWidth: 32, height: 32, p: 0 }} onClick={copyClipboardHandler}>
                  <ContentPasteOutlinedIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={1}>
                <Typography variant="h3">{invited}</Typography>
                <Typography variant="body1">
                  <FormattedMessage id="people-invited" />
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Referals;
