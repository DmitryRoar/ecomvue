import { MarketplaceEnum } from 'types/project';
import { ConectionEntityProps } from '.';
import { ConnectionInputWb } from './wb';

export const ReadConnection = ({ marketplace_type, ...props }: ConectionEntityProps): JSX.Element => {
  switch (marketplace_type) {
    case MarketplaceEnum.wildberries:
      return <ConnectionInputWb onSetInput={() => {}} {...props} />;
    default:
      return <></>;
  }
};
