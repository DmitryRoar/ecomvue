import { DragEvent, forwardRef } from 'react';
// import { ChangeHandler } from 'react-hook-form';

// import { classNames } from '@/shared/lib/getClassNames.ts';
// import { FilesList } from '@/shared/ui/files-list';

import { IconUpload } from '@tabler/icons-react';
import { useFileDrag } from './useFileDrag';
import { useValidationFiles } from './validationFiles';

type Props = {
  labelClassName?: string;
  className?: string;
  id: string;
  onChange: any;
  onBlur: any;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  maxSize?: number;
  allowedExtensions?: string[];
  maxFiles?: number;
  field: any;
  [key: string]: any;
};

export const FileDropdown = forwardRef<HTMLInputElement, Props>(function FileDropdown(
  { className = '', labelClassName = '', multiple = false, maxSize, allowedExtensions, maxFiles, field, ...props },
  ref
) {
  const { validationFiles } = useValidationFiles({ maxSize, allowedExtensions, maxFiles });

  const { handleDrop, handleDrag } = useFileDrag((e: DragEvent) => {
    props.InputProps.handleChangeFile(e);
    console.log(e.dataTransfer?.files);
    //   return void field.onChange(e);
  }, validationFiles);

  const stableId = props.id || Math.floor(Math.random() * 10000).toString();

  // const handleDelete = (file: File) => {
  //   const newFileList = files.filter(({ name, size }) => `${file.name}-${file.size}` !== `${name}-${size}`);
  //   void props.onChange({ target: { files: newFileList } });
  //   setFiles(newFileList);
  // };

  return (
    <div>
      <label htmlFor={stableId}>
        {''}
        <input
          {...props}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e?.currentTarget?.files) {
              // let newFiles = [...e.currentTarget.files];
              // newFiles = validationFiles(files, newFiles);
              // setFiles(newFiles);
            }
            // void props.onChange(e);
          }}
          ref={ref}
          type={'file'}
          multiple={multiple}
        />
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          // className={classNames(styles.drop_zone, { [styles.drop_zone_dragover]: isDragging }, [className])}
        >
          <div>
            <IconUpload />
            {/* <Typography variant={'dbody1'}> */}
            Перенесите или загрузите {multiple ? 'документы' : 'документ'}
            {/* </Typography> */}
          </div>
        </div>
      </label>
      {/* <FilesList files={files} onDelete={handleDelete} /> */}
    </div>
  );
});
