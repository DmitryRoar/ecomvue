type TValidationFiles = {
  maxSize?: number;
  allowedExtensions?: string[];
  maxFiles?: number;
};

export const useValidationFiles = ({ maxSize, allowedExtensions = [], maxFiles }: TValidationFiles) => {
  // const invalidSize = (file: File): boolean => {
  //   if (!maxSize) {
  //     return false;
  //   }
  //   return file.size > maxSize * 1024 * 1024;
  // };

  // const invalidExtension = (file: File) => {
  //   if (allowedExtensions.length === 0) {
  //     return false;
  //   }
  //   return !allowedExtensions.includes(file.type);
  // };

  // const invalidCountOfFiles = (size: number) => {
  //   if (!maxFiles) {
  //     return false;
  //   }
  //   return size > maxFiles;
  // };

  const validationFiles = (oldFiles: File[], newFiles: File[]) => {
    const result = [...oldFiles];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];

      // if (invalidSize(file)) {
      //   continue;
      // }

      // if (invalidExtension(file)) {
      //   continue;
      // }

      // if (invalidCountOfFiles(result.length + 1)) {
      //   break;
      // }

      result.push(file);
    }

    return result;
  };

  return { validationFiles };
};
