import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper to build auth headers from state
const authHeaders = (getState) => {
  const { auth } = getState();
  return { headers: { Authorization: `Bearer ${auth.token}` } };
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/cart', authHeaders(getState));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/cart',
        { productId, quantity },
        authHeaders(getState)
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${productId}`,
        { quantity },
        authHeaders(getState)
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update cart item'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/${productId}`,
        authHeaders(getState)
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to remove from cart'
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.delete('/api/cart', authHeaders(getState));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to clear cart'
      );
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToLocalCart(state, action) {
      const { product, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product._id === product._id
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeFromLocalCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(
        (item) => item.product._id !== productId
      );
    },
    updateLocalCartItem(state, action) {
      const { productId, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product._id === productId
      );
      if (existing) {
        existing.quantity = quantity;
      }
    },
    clearLocalCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // fetchCart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // addToCart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.items || [];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateCartItem
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.items || [];
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // removeFromCart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.items || [];
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // clearCart
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToLocalCart,
  removeFromLocalCart,
  updateLocalCartItem,
  clearLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;
