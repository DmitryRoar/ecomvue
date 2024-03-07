'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { ReferalSlice } from 'store/slices';

const Referals = () => {
  const { list } = useSelector((s) => s.referal);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(ReferalSlice.getAll());
      await dispatch(ReferalSlice.getPromotion());
      await dispatch(ReferalSlice.getSale());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(list);

  return <div>hello</div>;
};

export default Referals;
