'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { ReferalSlice } from 'store/slices';

const ReferalSetTokenView = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { joined } = useSelector((s) => s.referal);
  const [isQuery, setIsQuery] = useState(false);

  useEffect(() => {
    if (!isQuery) {
      dispatch(ReferalSlice.setToken({ token: slug }));
      setIsQuery(true);
    }
  }, []);

  useEffect(() => {
    if (joined) {
      router.push('/dashboard/');
    }
  }, [joined]);

  return <></>;
};

export default ReferalSetTokenView;
