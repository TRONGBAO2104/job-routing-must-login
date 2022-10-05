import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import JobCard from "./JobCard";
import BasicPagination from "./BasicPagination";

function JobList({ jobs }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.round(jobs.length / 5);
  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        {jobs.slice((page - 1) * 8, page * 8).map((job) => (
          <Grid key={job.id} item xs={12} sm={6} md={4} lg={3}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <BasicPagination totalPages={totalPages} setPage={setPage} />
    </Container>
  );
}

export default JobList;
