import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPosts: [],
  totalCount: 0,
  isLoading: false,
  isError: false,
};

const jobsDataSlice = createSlice({
  name: "jobsData",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.isLoading = true;
      state.isError = null;
    },
    fetchDataSuccess(state, { payload }) {
      state.isLoading = false;
      state.totalCount = payload.totalCount;
      state.jobPosts = [...state.jobPosts, ...payload.jdList];
    },
    fetchDataFailure(state, { payload }) {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  jobsDataSlice.actions;

let controller = null;

export const fetchData = (limit, offset) => async (dispatch) => {
  // Abort any ongoing/previous calls
  if (controller) {
    controller.abort();
  }

  // Create new abort controller
  controller = new AbortController();
  const signal = controller.signal;

  dispatch(fetchDataStart());
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
