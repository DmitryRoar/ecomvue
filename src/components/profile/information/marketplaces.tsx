import { useSelector } from 'store';

export const ProfileMarketplaces = () => {
  const { marketplaces } = useSelector((s) => s.user);

  console.log(marketplaces);

  return <div>marketplaces</div>;
};
