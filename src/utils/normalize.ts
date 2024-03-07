import { MarketplaceEnum, ProjectType } from 'types/project';

export const marketplaceType = (type: keyof typeof MarketplaceEnum, list: ProjectType[]) => {
  for (const item of list) {
    if (item.type === type) {
      return item.value;
    }
  }
};
