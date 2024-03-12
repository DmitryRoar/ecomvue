import { Button, Grid } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ConnectionCreate } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { ConectionEntityProps } from '.';
import { ConnectionInputAvito } from './avito';
import { ConnectionInputWb } from './wb';

export const ReadConnection = ({ marketplace_type, isEdit, value, ...props }: ConectionEntityProps): JSX.Element => {
  console.log(props);
  const [connection, setConnection] = useState<ConnectionCreate>(value);

  const form = useMemo(() => {
    switch (marketplace_type) {
      case MarketplaceEnum.wildberries:
        return <ConnectionInputWb value={connection} onSetInput={setConnection} isEdit={isEdit} {...props} />;
      case MarketplaceEnum.ozon:
        return <ConnectionInputAvito value={connection} onSetInput={setConnection} isEdit={isEdit} {...props} />;
      default:
        return <></>;
    }
  }, [marketplace_type, value, isEdit]);

  return (
    <>
      {form}
      {isEdit && (
        <Grid item xs={12}>
          <Button variant="contained" fullWidth>
            <FormattedMessage id="save" />
          </Button>
        </Grid>
      )}
    </>
  );
};
