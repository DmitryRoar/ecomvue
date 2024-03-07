export const nullTostring = <T>(object: { [key: string]: string | null }): NonNullable<T> => {
  return Object.fromEntries(Object.entries(object).map((item) => (item[1] === null ? [item[0], ''] : item))) as NonNullable<T>;
};
