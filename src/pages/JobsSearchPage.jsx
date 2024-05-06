import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/jobsDataSlice";
import JobPostingCard from "../components/JobPostingCard";

const JobsSearchPage = () => {
  const [offset, setOffset] = useState(0);
  const observerTarget = useRef(null);
  const dispatch = useDispatch();
  const {
    data: { jdList: jobPostings, totalCount },
    isLoading,
    isError,
  } = useSelector((state) => state.jobsData);

  useEffect(() => {
    dispatch(fetchData(10, offset));

    // Implement Infinite Scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && jobPostings.length <= totalCount) {
          setOffset((prev) => {
            dispatch(fetchData(10, prev + 10));
            return prev + 10;
          });
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    jobPostings?.length && (
      <>
        <Typography variant="body2" textAlign="center">
          Total Matching Jobs : {totalCount}
        </Typography>
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          {jobPostings?.map((job) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={job.jdUid}>
              <JobPostingCard job={job} />
            </Grid>
          ))}
          <Grid item ref={observerTarget}>
            <Typography variant="body2">Loading more jobs</Typography>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default JobsSearchPage;
