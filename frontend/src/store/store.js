// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classesReducer from "./classes/classesSlice";
import enrollmentReducer from "./enrollment/enrollmentSlice"; // Adjust the import path
import withdrawalReducer from "./withdrawal/withdrawalSlice";
import uploadsReducer from "./uploads/uploadsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    enrollment: enrollmentReducer,
    withdrawal: withdrawalReducer,
    uploads: uploadsReducer,
  },
});

export default store;
