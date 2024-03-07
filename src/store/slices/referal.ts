// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';

// types
import { ICreateReferal } from 'types/referal';
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['referal'] = {
  list: [],
  token: '',
  joined: false
};

const slice = createSlice({
  name: 'referal',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getToken.fulfilled, (state, action: any) => {
        state.token = action.payload.data.link;
      })
      .addCase(setToken.fulfilled, (state) => {
        state.joined = true;
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
    return await axios.post('/v1/referal/get_token', userData);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const setToken = createAsyncThunk('referal/setToken', async (token: { token: string }, { rejectWithValue }) => {
  try {
    return await axios.post('/v1/referal/set_token', token);
  } catch (err) {
    return rejectWithValue(err);
  }
});
