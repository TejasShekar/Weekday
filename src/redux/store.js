import { configureStore } from "@reduxjs/toolkit";
import jobsDataReducer from "./slices/jobsDataSlice";

const store = configureStore({
  reducer: {
    jobsData: jobsDataReducer,
  },
});

export default store;
