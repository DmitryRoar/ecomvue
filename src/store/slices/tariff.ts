// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';

// types
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['tariff'] = {
  list: []
};

const slice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.list = action.payload.sort((a: any, b: any) => parseInt(a.plans[0].price) - parseInt(b.plans[0].price));
    });
  }
});

// Reducer
export default slice.reducer;

export const getAll = createAsyncThunk('tariff/getAll', async () => {
  const { data } = await axios.get('/v1/tariffs/list/');
  return data;
});

export const getListAdd = createAsyncThunk('tariff/getListAdd', async () => {
  const { data } = await axios.get('/v1/tariffs/list_add');
  return data;
});

export const purchase = createAsyncThunk('tariff/purchase', async (id: number) => {
  const { data } = await axios.post('/v1/tariffs/purchase/', { tariff_plan_id: id });
  return data;
});
