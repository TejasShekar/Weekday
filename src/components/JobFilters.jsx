import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Button,
  Grid,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { filters } from "../constants/filters";
import {
  addFilter,
  removeFilter,
  clearFilter,
} from "../redux/slices/jobsDataSlice";
import { capitalizeSentence } from "../utils/helperUtils";

const JobFilters = ({ appliedFilters }) => {
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilterChange = (id, value, reason) => {
    if (reason === "selectOption") {
      dispatch(addFilter({ id, value }));
    } else if (reason === "removeOption") {
      dispatch(removeFilter({ id, value }));
    } else if (reason === "clear") {
      dispatch(clearFilter({ id }));
    } else {
      dispatch(removeFilter({ id, value }));
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <Button
        sx={{
          width: "100%",
          color: "inherit",
          fontSize: "1rem",
          backgroundColor: "#55efc4ba",
          "&:hover": {
            backgroundColor: "primary.main",
          },
          marginBottom: "10px",
        }}
        onClick={toggleDrawer(true)}
      >
        Toggle Filters
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Grid
          container
          sx={{
            display: "flex",
            padding: "20px",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {filters.map((eachFilter) => {
            const {
              fieldName,
              id,
              isMultiSelect,
              selectionOptions,
              isGrouped,
            } = eachFilter;
            return (
              <Grid item xs={12} md={3}>
                <Autocomplete
                  key={id}
                  id={id + "-filter"}
                  sx={{ minWidth: "10rem" }}
                  multiple={isMultiSelect}
                  options={selectionOptions}
                  groupBy={(option) => option.category}
                  getOptionLabel={(option) =>
                    capitalizeSentence(isGrouped ? option.option : option)
                  }
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label={fieldName} />
                  )}
                  onChange={(_, val, reason) =>
                    handleFilterChange(id, val, reason)
                  }
                  disabled={
                    id === "location" &&
                    !!appliedFilters[id] &&
                    !Array.isArray(appliedFilters[id])
                  }
                />
              </Grid>
            );
          })}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="location-filter"
              label="Location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                handleFilterChange("location", event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="companyName-filter"
              label="Search Company Name"
              value={companyName}
              onChange={(event) => {
                setCompanyName(event.target.value);
                handleFilterChange("companyName", event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </>
  );
};

export default JobFilters;
