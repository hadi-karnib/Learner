import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // classes: classesReducer,
    // enrollment: enrollmentReducer,
    // withdrawal: withdrawalReducer,
  },
});

export default store;
