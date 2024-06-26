// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';

// types
import { ICreateReferal } from 'types/referal';
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['referal'] = {
  invited: 0,
  promotion: ''
};

const slice = createSlice({
  name: 'referal',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.invited = action.payload.count;
      })
      .addCase(getPromotion.fulfilled, (state, action) => {
        state.promotion = action.payload.code;
      });
  }
});

// Reducer
export default slice.reducer;

export const getAll = createAsyncThunk('referal/getAll', async () => {
  const { data } = await axios.get('/v1/referal/user');
  return data;
});

export const getPromotion = createAsyncThunk('referal/getPromotion', async () => {
  const { data } = await axios.get('/v1/referal/promotion');
  return data;
});

export const getSale = createAsyncThunk('referal/getSale', async () => {
  const { data } = await axios.get('/v1/referal/sale');
  return data;
});

export const getToken = createAsyncThunk('organizations/getToken', async (userData: Partial<ICreateReferal> | any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<{ link: string }>('/v1/referal/get_token', userData);
    return data.link;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const setToken = createAsyncThunk('referal/setToken', async (data: { token: string }, { rejectWithValue }) => {
  try {
    return await axios.post('/v1/referal/set_token', data);
  } catch (err) {
    return rejectWithValue(err);
  }
});
