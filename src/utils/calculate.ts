export const percentage = (value: number, total: number) => {
  if (total === 0) {
    throw new Error('Total cannot be zero');
  }
  return (value / total) * 100;
};
