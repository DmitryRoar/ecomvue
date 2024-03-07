export function areAllFieldsFilled(obj: any) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        return false;
      }
    }
  }
  return true;
}

export const concatStrings = (...strings: (string | undefined)[]): string => strings.filter(String).join(' ');

export const isObject = (data: any) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    return data;
  }
};
