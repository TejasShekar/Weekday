import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/jobsDataSlice";
import JobPostingCard from "../components/JobPostingCard";

const JobsSearchPage = () => {
  const [offset, setOffset] = useState(0);
  const observerTarget = useRef(null);
  const dispatch = useDispatch();
  const { jobPosts, totalCount, isLoading, isError } = useSelector(
    (state) => state.jobsData
  );

  // useEffect for fetching data
  useEffect(() => {
    dispatch(fetchData(10, offset));
  }, [offset]); // Only re-run the effect if offset changes

  // useEffect for setting up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && jobPosts.length < totalCount) {
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
  }, [jobPosts, totalCount]); // Only re-run the effect if jobPosts or totalCount changes

  if (jobPosts?.length <= 0 && isLoading) {
    return (
      <Typography variant="h5" textAlign="center">
        Fetching jobs...
      </Typography>
    );
  }

  return jobPosts?.length > 0 ? (
    <>
      <Typography variant="body2" textAlign="center" gutterBottom>
        Total Matching Jobs : {totalCount}
      </Typography>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        {jobPosts?.map((job) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={job.jdUid}>
            <JobPostingCard job={job} />
          </Grid>
        ))}
        <Grid item ref={observerTarget}></Grid>
      </Grid>

      {isLoading && (
        <Typography variant="h5" textAlign="center" gutterBottom>
          Loading more jobs...
        </Typography>
      )}
    </>
  ) : (
    isError && (
      <Typography variant="body2" textAlign="center" gutterBottom>
        No matching jobs found !
      </Typography>
    )
  );
};

export default JobsSearchPage;
