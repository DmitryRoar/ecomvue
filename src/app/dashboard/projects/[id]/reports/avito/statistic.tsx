'use client';

import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { ReportProps } from '.';

export const ReportAvitoStatistic = ({ data, onFetch }: ReportProps<any>) => {
  useEffect(() => {
    onFetch('avito/user_statistic', {
      date_from: DateTime.utc().minus({ weeks: 1 }).toFormat('yyyy-MM-dd'),
      date_to: DateTime.utc().toFormat('yyyy-MM-dd')
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>ReportAvitoStatistic</div>;
};
