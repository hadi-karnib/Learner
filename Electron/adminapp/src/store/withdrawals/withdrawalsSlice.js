import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  withdrawal: [], // Assuming withdrawal holds an array of withdrawals
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.withdrawal = action.payload;
      state.error = null;
    },
    createWithdrawalSuccess: (state, action) => {
      state.loading = false;
      state.withdrawal = [...state.withdrawal, action.payload];
      state.error = null;
    },
    updateWithdrawalStatusSuccess: (state, action) => {
      state.loading = false;
      const updatedWithdrawal = action.payload;
      const index = state.withdrawal.findIndex(
        (w) => w._id === updatedWithdrawal._id
      );
      if (index !== -1) {
        state.withdrawal[index] = updatedWithdrawal;
      }
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const withdrawalActions = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
