'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'utils/axios';

type Props = {
  searchParams: {
    code: string;
  };
};

const ProjectConfirmation = ({ searchParams }: Props) => {
  const router = useRouter();

  const confirmHandler = async () => {
    try {
      await axios.post('/v1//marketplaces/yadisk/add/', {
        yadisk_code: searchParams.code,
        connection_id: 0 // ???
      });
      router.push('/dashboard/projects');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!searchParams.code) {
      router.push('/dashboard');
    } else {
      confirmHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams]);

  return <></>;
};

export default ProjectConfirmation;
