import { useState } from 'react';
import { ConnectionCreate } from 'types/marketplace';
import { MarketplaceEnum } from 'types/project';
import { ConectionEntityProps } from '.';
import { ConnectionInputAvito } from './avito';
import { ConnectionInputWb } from './wb';

export const ReadConnection = ({ marketplace_type, isEdit, value, ...props }: ConectionEntityProps): JSX.Element => {
  const [connection, setConnection] = useState<ConnectionCreate>(value);

  switch (marketplace_type) {
    case MarketplaceEnum.wildberries:
      return <ConnectionInputWb value={connection} onSetInput={setConnection} isEdit={isEdit} {...props} />;
    case MarketplaceEnum.ozon:
      return <ConnectionInputAvito value={connection} onSetInput={setConnection} isEdit={isEdit} {...props} />;
    default:
      return <></>;
  }
};
