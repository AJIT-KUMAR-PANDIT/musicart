import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/UserSlice";
import ProductReducer from "./Product/ProductSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    product: ProductReducer,
  },
});
