import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';
import { Product } from '../types/Product';

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await api.get('/products');
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, state => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;
