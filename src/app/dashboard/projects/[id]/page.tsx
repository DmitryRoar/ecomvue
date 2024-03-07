'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'store';
import { MarketplaceEnum, ProjectGeneral } from 'types/project';
import { ProjectReportAvito } from './reports/avito';
import { ReportProvider } from './reports/context';
import { ProjectReportYandex } from './reports/yandex';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    type: string;
  };
};

const Project = ({ params, searchParams }: Props) => {
  const router = useRouter();

  const { projects } = useSelector((s) => s.marketplace);
  const project = projects.find(
    (p: ProjectGeneral) => (p.id as number).toString() === params.id && searchParams.type === p.marketplace_type
  );

  useEffect(() => {
    if (!project && projects.length) {
      router.push('/dashboard');
    }
  }, [project, projects.length, router]);

  switch (project?.marketplace_type) {
    case MarketplaceEnum.avito:
      return (
        <ReportProvider>
          <ProjectReportAvito slug={params.id} />
        </ReportProvider>
      );
    case MarketplaceEnum.yandex_market:
      return <ProjectReportYandex />;
  }

  return (
    <div>
      список отчетов для: {params.id}. MP: {searchParams.type}
    </div>
  );
};

export default Project;
