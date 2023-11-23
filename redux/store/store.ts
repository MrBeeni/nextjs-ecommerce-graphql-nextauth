import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import productReducer from "../slice/productSice";
export function makeStore() {
  return configureStore({
    reducer: { user: userReducer, product: productReducer },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
