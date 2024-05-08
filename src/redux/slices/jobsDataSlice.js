import { createSlice } from "@reduxjs/toolkit";
import { filterJobs } from "../../utils/filterUtils";

const initialState = {
  jobPosts: [],
  totalCount: 0,
  isLoading: true,
  isError: false,
  filteredJobPosts: [],
  appliedFilters: {},
};

const jobsDataSlice = createSlice({
  name: "jobsData",
  initialState,
  reducers: {
    // Reducers for Job Fetch
    fetchDataStart(state) {
      state.isLoading = true;
      state.isError = null;
    },
    fetchDataSuccess(state, { payload: { jdList, totalCount } }) {
      state.isLoading = false;
      state.totalCount = totalCount;
      state.jobPosts = [...state.jobPosts, ...jdList];
      state.filteredJobPosts = [
        ...state.filteredJobPosts,
        ...filterJobs({ state, jdList }),
      ];
    },
    fetchDataFailure(state, { payload }) {
      state.isLoading = false;
      state.isError = payload;
    },
    // Reducers for filtering jobs
    addFilter(state, { payload: { id, value } }) {
      state.appliedFilters[id] = value;
      state.filteredJobPosts = filterJobs({
        state,
        id,
        filterMode: "addFilter",
      });
    },
    removeFilter(state, { payload: { id, value } }) {
      state.appliedFilters[id] = value;
      state.filteredJobPosts = filterJobs({ state });
    },
    clearFilter(state, { payload }) {
      delete state.appliedFilters[payload.id];
      state.filteredJobPosts = filterJobs({ state });
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  addFilter,
  removeFilter,
  clearFilter,
} = jobsDataSlice.actions;

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
    // setTimeout(() => {
    dispatch(fetchDataSuccess(data));
    // }, 3000);
  } catch (error) {
    if (error.name !== "AbortError") {
      // Only dispatch error action if it's not an aborted request
      dispatch(fetchDataFailure(error.message));
    }
  }
};

export default jobsDataSlice.reducer;
