import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load user'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // loadUser
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
