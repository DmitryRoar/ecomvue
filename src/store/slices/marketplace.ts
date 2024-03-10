// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';

// types
import { DateTime } from 'luxon';
import { MarketplaceCreate } from 'types/marketplace';
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['marketplace'] = {
  projects: [],
  types: [],
  permissions: [],
  error: null
};

const slice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    addTypes(state, action) {
      state.types = action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    addConnection(state, action) {
      state.projects = state.projects.map((s) => {
        if (s.id === action.payload.marketplace_id) {
          s.connections = [action.payload.connection];
        }
        return s;
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload;
        state.error = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action: any) => {
        state.projects.push({ ...action.payload, connections: [], created_at: DateTime.utc().toISO() });
        state.error = null;
      })
      .addCase(create.rejected, (state, action: any) => {
        state.error = action.payload.detail;
      })
      .addCase(createWbConnection.fulfilled, (state, action: any) => {
        // state.projects = state.projects.map(
        //   (mainState) => state.projects.find((candidate) => candidate.id === action.payload.marketplace_id) || mainState
        // );
      });
  }
});

// Reducer
export default slice.reducer;

export const getAll = createAsyncThunk('users/getAll', async () => {
  const { data } = await axios.get('/v1/marketplaces/list/');
  return data;
});

export const getTypes = createAsyncThunk('users/getTypes', async () => {
  const { data } = await axios.get('/v1/marketplaces/types/');
  return data;
});

export const getPermissions = createAsyncThunk('users/getPermissions', async () => {
  const { data } = await axios.get('/v1/marketplaces/wb/permissions');
  return data;
});

export const create = createAsyncThunk('users/create', async (userData: MarketplaceCreate, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/v1/marketplaces/create/', userData);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editConnectionWb = createAsyncThunk('users/editWb', async (userData: MarketplaceCreate, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/v1/marketplaces/create/', userData);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createWbConnection = createAsyncThunk('users/createWbConnection', async (userData: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/v1/marketplaces/wb/add/', userData);
    return { ...data, marketplace_id: userData.marketplace_id };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createAvitoConnection = createAsyncThunk('users/createAvitoConnection', async (userData: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/v1/marketplaces/avito/add/', userData);
    return { ...data, marketplace_id: userData.marketplace_id };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const { addConnection } = slice.actions;
