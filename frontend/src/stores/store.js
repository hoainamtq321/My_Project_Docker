import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer
  },
});
