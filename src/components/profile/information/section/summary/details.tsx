import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { IconEdit } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { FormattedMessage, useIntl } from 'react-intl';
import { UserProfile } from 'types/user-profile';
import SubCard from 'ui-component/cards/SubCard';
import { CoreUtils } from 'utils';
import { createRow } from 'utils/table';

type Props = {
  user: UserProfile | null;
  onSwitchTab: (newTab: string) => void;
};

export const ProfileSectionDetails = ({ user, onSwitchTab }: Props) => {
  const intl = useIntl();

  const rows = [
    createRow('full-name', CoreUtils.concatStrings(user?.first_name, user?.last_name, user?.pathronymic) ?? ''),
    createRow('date-of-birth', user?.birthday ? DateTime.fromISO(user.birthday).toLocaleString() : ''),
    createRow('country', user?.country ?? ''),
    createRow('city', user?.city || '')
  ];

  return (
    <Grid item xs={12}>
      <SubCard
        title={intl.formatMessage({ id: 'about-me' })}
        secondary={
          <Button aria-label="Edit Details" onClick={() => onSwitchTab('1')}>
            <IconEdit stroke={1.5} size="20px" />
          </Button>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">{user?.about_me}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <FormattedMessage id="personal-information" />
            </Typography>
          </Grid>
          <Divider sx={{ pt: 1 }} />
          <Grid item xs={12}>
            <TableContainer>
              <Table
                sx={{
                  '& td': {
                    borderBottom: 'none'
                  }
                }}
                size="small"
              >
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell variant="head">
                        <FormattedMessage id={row.translateId} />
                      </TableCell>
                      <TableCell>:</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};
