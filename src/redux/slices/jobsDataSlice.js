import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  controller: null,
};

const jobsDataSlice = createSlice({
  name: "jobsData",
  initialState,
  reducers: {
    fetchDataStart(state, action) {
      state.isLoading = true;
      state.isError = null;
      state.controller = action.payload;
    },
    fetchDataSuccess(state, action) {
      state.isLoading = false;
      state.data = { ...state.data, ...action.payload };
    },
    fetchDataFailure(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  jobsDataSlice.actions;

export const fetchData = (limit, offset) => async (dispatch, getState) => {
  const { jobsData } = getState();
  if (jobsData.controller) {
    // Need to understand more about handling abort controllers w.r.t. RTK
    jobsData.controller?.abort();
  }

  const controller = new AbortController();
  const signal = controller.signal;

  dispatch(fetchDataStart(signal));
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, offset }),
        signal,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    if (error.name !== "AbortError") {
      // Only dispatch error action if it's not an aborted request
      dispatch(fetchDataFailure(error.message));
    }
  }
};

export default jobsDataSlice.reducer;
