// src/store/uploads/uploadsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  uploads: [], // Assuming uploads hold an array of uploads
};

const uploadsSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.uploads = action.payload;
      state.error = null;
    },
    createUploadSuccess: (state, action) => {
      state.loading = false;
      state.uploads = [...state.uploads, action.payload];
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchByClassSuccess: (state, action) => {
      state.loading = false;
      state.uploads = action.payload;
      state.error = null;
    },
  },
});

export const uploadsActions = uploadsSlice.actions;
export default uploadsSlice.reducer;
