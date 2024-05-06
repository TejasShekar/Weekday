import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/jobsDataSlice";
import JobPostingCard from "../components/JobPostingCard";

const JobsSearchPage = () => {
  const dispatch = useDispatch();
  const {
    data: { jdList: jobPostings, totalCount },
    isLoading,
    isError,
  } = useSelector((state) => state.jobsData);

  useEffect(() => {
    dispatch(fetchData(10, 0));
  }, []);

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
        </Grid>
      </>
    )
  );
};

export default JobsSearchPage;
