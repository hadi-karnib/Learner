import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classesReducer from "./classes/classesSlice";
import withdrawalReducer from "./withdrawals/withdrawalsSlice";
import uploadReducer from "./uploads/uploadsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    uploads: uploadReducer,
    withdrawal: withdrawalReducer,
  },
});

export default store;
