import { ButtonBase, Tooltip, useTheme } from '@mui/material';
import { IconDeviceFloppy } from '@tabler/icons-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';
import { useIntl } from 'react-intl';

type Props = {
  title?: string;
  columns: ExcelJS.Column[];
  data: any;
};

export const RExportExcel = ({ title, data, columns }: Props) => {
  const theme = useTheme();
  const intl = useIntl();

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const filename = title ?? `Report-${DateTime.now().toFormat('yyyy-MM-dd')}`;
    const worksheet = workbook.addWorksheet(filename);
    console.log(data);
    worksheet.columns = columns;

    worksheet.addRows(data);
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, filename);
  };

  return (
    <Tooltip title={intl.formatMessage({ id: 'excel-export' })} placement="left">
      <ButtonBase sx={{ mt: 0.5 }} onClick={handleExport}>
        <IconDeviceFloppy color={theme.palette.secondary.main} aria-label="Export CSV File" />
      </ButtonBase>
    </Tooltip>
  );
};
