import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserMarketplace } from 'types/user';
import { DefaultRootStateProps } from '../../types';
import axios from '../../utils/axios';

const initialState: DefaultRootStateProps['user'] = {
  marketplaces: [],
  services: [],
  defaultServices: []
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
      .addCase(getDefaultServices.fulfilled, (state, action) => {
        state.defaultServices = action.payload;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload.results;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services = [...state.services, action.payload];
      })
      .addCase(removeService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.id !== action.payload);
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

export const getDefaultServices = createAsyncThunk('user/getDefaultServices', async () => {
  const { data } = await axios.get('/v1/users/work_item_default/');
  return data;
});

export const getServices = createAsyncThunk('user/getServices', async () => {
  const { data } = await axios.get('/v1/users/self/user_work_item');
  return data;
});

export const addService = createAsyncThunk('user/addService', async (name: string) => {
  const { data } = await axios.post('/v1/users/self/user_work_item', { name });
  return data;
});

export const removeService = createAsyncThunk('user/removeService', async (name: string, { getState }) => {
  const { user: state } = getState() as any;

  const finded = state.services.find((service: UserMarketplace) => service.name === name);
  await axios.delete(`/v1/users/self/user_work_item/${finded.id}`);
  return finded.id;
});
