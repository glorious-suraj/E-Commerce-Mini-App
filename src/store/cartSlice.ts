import { createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../types/Product';

interface CartState {
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.items.find(
        cartProduct => cartProduct.id === action.payload.id,
      );

      if (cartItem) {
        if (cartItem.quantity >= 5) {
          return;
        }
        cartItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    increaseQty: (state, action) => {
      const cartItem = state.items.find(
        cartProduct => cartProduct.id === action.payload,
      );

      if (cartItem && cartItem.quantity < 5) {
        cartItem.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const cartItem = state.items.find(
        cartProduct => cartProduct.id === action.payload,
      );

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        cartProduct => cartProduct.id !== action.payload,
      );
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
