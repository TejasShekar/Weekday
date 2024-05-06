import { configureStore } from "@reduxjs/toolkit";
import jobsDataReducer from "./slices/jobsDataSlice";

const store = configureStore({
  reducer: {
    jobsData: jobsDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to handle AbortController
        ignoredActions: ["jobsData/fetchDataStart"],
        // Ignore these paths in the state
        ignoredPaths: ["jobsData.controller"],
      },
    }),
});

export default store;
