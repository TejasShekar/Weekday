import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/jobsDataSlice";
import JobPostingCard from "../components/JobPostingCard";
import JobFilters from "../components/JobFilters";

const JobsSearchPage = () => {
  const [offset, setOffset] = useState(0);
  const observerTarget = useRef(null);
  const dispatch = useDispatch();
  const { filteredJobPosts, totalCount, isLoading, isError, appliedFilters } =
    useSelector((state) => state.jobsData);

  // useEffect for fetching data
  useEffect(() => {
    dispatch(fetchData(10, offset));
  }, [offset]); // Only re-run the effect if offset changes

  // useEffect for setting up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        filteredJobPosts.length < totalCount &&
        offset <= totalCount
      ) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [filteredJobPosts, totalCount]); // Only re-run the effect if filteredJobPosts or totalCount changes

  return (
    <>
      <JobFilters appliedFilters={appliedFilters} />
      <Typography variant="body1" textAlign="center" gutterBottom>
        Total Matching Jobs :{" "}
        {isLoading ? (
          <CircularProgress color="inherit" disableShrink size="16px" />
        ) : (
          filteredJobPosts.length
        )}
      </Typography>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        {filteredJobPosts.map((job) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={job.jdUid}>
            <JobPostingCard job={job} />
          </Grid>
        ))}
        <Grid item ref={observerTarget}></Grid>
      </Grid>

      <Box sx={{ textAlign: "center", p: 2, height: "80px" }}>
        {isLoading ? (
          <CircularProgress color="inherit" disableShrink />
        ) : (
          filteredJobPosts.length === 0 && (
            <Typography variant="h5" textAlign="center">
              No matching jobs found!
            </Typography>
          )
        )}
      </Box>
      {isError && (
        <Typography variant="body1" textAlign="center" gutterBottom>
          Unable to fetch more jobs
        </Typography>
      )}
    </>
  );
};

export default JobsSearchPage;
