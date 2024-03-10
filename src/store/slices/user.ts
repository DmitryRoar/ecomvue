import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserMarketplace } from 'types/user';
import { DefaultRootStateProps } from '../../types';
import axios from '../../utils/axios';

const initialState: DefaultRootStateProps['user'] = {
  marketplaces: [],
  services: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMarkets.fulfilled, (state, action) => {
        state.marketplaces = action.payload.results;
      })
      .addCase(addWorkMarket.fulfilled, (state, action) => {
        state.marketplaces = [...state.marketplaces, action.payload];
      })
      .addCase(removeWorkMarket.fulfilled, (state, action) => {
        state.marketplaces = state.marketplaces.filter((marketplace) => marketplace.id !== action.payload);
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload.results;
      });
  }
});

// Reducer
export default slice.reducer;

export const getMarkets = createAsyncThunk('user/getMarkets', async () => {
  const { data } = await axios.get('/v1/users/self/user_market');
  return data;
});

export const addWorkMarket = createAsyncThunk('user/addWorkMarket', async (name: string) => {
  const { data } = await axios.post('/v1/users/self/user_market', { name });
  return data;
});

export const removeWorkMarket = createAsyncThunk('user/removeWorkMarket', async (name: string, { getState }) => {
  const { user: state } = getState() as any;

  const finded = state.marketplaces.find((marketplace: UserMarketplace) => marketplace.name === name);
  await axios.delete(`/v1/users/self/user_market/${finded.id}`);
  return finded.id;
});

export const getServices = createAsyncThunk('user/getServices', async () => {
  const { data } = await axios.get('/v1/users/self/user_work');
  return data;
});
