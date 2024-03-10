export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const currencyFormat = (cost: number) => `₽ ${cost}`;

export const hideEmail = (email: string): string => {
  return email.replace(/(^[a-zA-Z0-9._%+-]+)(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/, function (_, p1, p2) {
    var len = p1.length;
    var asterisks = '*'.repeat(len - 3);
    return asterisks + p1.slice(-3) + p2;
  });
};
