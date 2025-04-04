import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ id: number; title: string; price: number; image: string;}>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) 
        existing.quantity += 1;
       else 
        state.items.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity: (state, action) => {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item && item.quantity > 1) 
          item.quantity -= 1;
        else 
          state.items = state.items.filter(i => i.id !== action.payload.id);
      },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
