// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';

// types
import { DefaultRootStateProps } from '../../types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['organization'] = {
  organization: null,
  roles: [],
  functools: [],
  update_roles: true
};

const slice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwn.fulfilled, (state, action) => {
        state.organization = action.payload;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.update_roles = false;
      })
      .addCase(getFunctools.fulfilled, (state, action) => {
        state.functools = action.payload;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.update_roles = true;
      });
  }
});

// Reducer
export default slice.reducer;

export const getOwn = createAsyncThunk('organization/getOwn', async () => {
  const { data } = await axios.get('/v1/organizations/');
  return data;
});

export const getRoles = createAsyncThunk(
  'organization/getRoles',
  async () => {
    const { data } = await axios.get('/v1/organizations/roles');
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { organization: state } = getState() as any;
      return state.update_roles;
    }
  }
);

export const getFunctools = createAsyncThunk('organization/getFunctools', async () => {
  const { data } = await axios.get('/v1/organizations/functools');
  return data;
});

export const createRole = createAsyncThunk('organization/createRole', async (data: any) => {
  const { data: responseData } = await axios.post('/v1/organizations/roles', data);
  return responseData;
});
