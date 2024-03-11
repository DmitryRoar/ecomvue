import { ChipOwnProps } from '@mui/material';

export const getRandomChip = (): ChipOwnProps['color'] => {
  const colors: ChipOwnProps['color'][] = ['default', 'error', 'info', 'primary', 'secondary', 'success'];
  return colors[Math.floor(Math.random() * colors.length)];
};
