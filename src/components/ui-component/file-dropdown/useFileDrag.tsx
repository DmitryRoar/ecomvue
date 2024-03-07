import { DragEvent, useCallback, useState } from 'react';

export const useFileDrag = (changeHandler: (e: DragEvent) => void, validationFiles: (oldFiles: File[], newFiles: File[]) => File[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
      return;
    }
    if (e.type === 'dragleave') {
      setIsDragging(false);
      return;
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      console.log('🚀 ~ useFileDrag ~ e:', e?.dataTransfer?.files);

      if (e?.dataTransfer?.files?.length) {
        let newFiles = [...e.dataTransfer.files];
        newFiles = validationFiles(files, newFiles);

        changeHandler(e);
        setFiles((files) => [...files, ...newFiles]);
      }
    },
    [changeHandler, files, validationFiles]
  );

  return { isDragging, handleDrag, handleDrop, files, setFiles };
};
