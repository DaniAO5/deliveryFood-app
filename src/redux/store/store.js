import { configureStore } from "@reduxjs/toolkit";
import { restoReducer } from "../reducers/restoReducers";
import { userReducer } from "../reducers/userReducers";

const reducer = {
  user: userReducer,
  restoStore: restoReducer,
};

const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
