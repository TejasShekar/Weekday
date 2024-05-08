export const filterJobs = ({ state, id, jdList, filterMode }) => {
  // Refactored and optimised filtering approach when `id` is not provided :
  // - Prioritize jdList (data fetched from API call) over state.jobPosts
  // - jdList will be chosen when its the first API call or API call via infinite scrolling
  // - This is an optimised approach to prevent filtering over all jobPosts
  // - Also used when a filter was removed partially or cleared

  let jobsToFilter = jdList || state.jobPosts;

  if (filterMode === "addFilter") {
    console.log("filtered existing filteredJobPosts");
    // Filter by provided `id`
    return state.filteredJobPosts.filter((currJob) =>
      filterLogic(state, id, currJob)
    );
  }
  console.log(
    `filtered ${jdList?.length ? "newly fetched dataset" : "entire jobPosts"}`
  );

  // if (!id) {
  return jobsToFilter.filter((currJob) => {
    for (const key in state.appliedFilters) {
      // If the property is not directly defined on `state.appliedFilters`, skip that iteration
      if (!state.appliedFilters.hasOwnProperty(key)) continue;
      if (!filterLogic(state, key, currJob)) return false;
    }
    return true;
  });
  // }
};

const filterLogic = (state, id, currJob) => {
  const filterValue = state.appliedFilters[id];

  // Filter out - remote, techStack, roles
  if (Array.isArray(filterValue) && filterValue.length > 0) {
    const jobValues = Array.isArray(currJob[id]) ? currJob[id] : [currJob[id]];

    return filterValue.some((value) =>
      jobValues.some((jobValue) => {
        const currValue = value?.option ? value.option : value;
        return jobValue?.toLowerCase() === currValue?.toLowerCase();
      })
    );

    // Filter out - Mini exp, min base pay
  } else if (filterValue !== undefined) {
    if (["minJdSalary", "maxJdSalary"].includes(id)) {
      return (
        currJob.minJdSalary >= filterValue || currJob.maxJdSalary >= filterValue
      );
    } else if (id === "minExp") {
      return currJob[id] >= filterValue;
    } else {
      return currJob[id]?.toLowerCase().startsWith(filterValue);
    }
  }

  return true; // Let the job pass if no filter applied for this id
};
