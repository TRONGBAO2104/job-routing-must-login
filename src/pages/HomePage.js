import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { BASE_URL } from "../app/config";

import JobList from "../components/JobList";
import BasicPagination from "../components/BasicPagination";
import SearchAppBar from "../components/SearchAppBar";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/jobs");
        // console.log(response);

        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log(">>> BASE_URL", BASE_URL);
  }, []);

  return (
    <>
      <SearchAppBar />

      <JobList jobs={jobs} />

      <BasicPagination />
    </>
  );
}

export default HomePage;
