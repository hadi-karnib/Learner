// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classesReducer from "./classes/classesSlice";
import enrollmentReducer from "./enrollment/enrollmentSlice"; // Adjust the import path

const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    enrollment: enrollmentReducer,
  },
});

export default store;
