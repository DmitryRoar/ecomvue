import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { DefaultRootStateProps } from '../../types';

const initialState: DefaultRootStateProps['user'] = {
  marketplaces: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMarkets.fulfilled, (state, action) => {
      state.marketplaces = action.payload;
    });
  }
});

// Reducer
export default slice.reducer;

export const getMarkets = createAsyncThunk('user/getMarkets', async () => {
  const { data } = await axios.get('/v1/users/self/user_market');
  return data;
});
