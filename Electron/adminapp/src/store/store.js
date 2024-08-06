import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    // auth: authReducer,
    // classes: classesReducer,
    // enrollment: enrollmentReducer,
    // withdrawal: withdrawalReducer,
  },
});

export default store;
