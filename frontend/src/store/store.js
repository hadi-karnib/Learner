// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classesReducer from "./classes/classesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
  },
});

export default store;
