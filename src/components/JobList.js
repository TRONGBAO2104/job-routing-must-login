import React from "react";
import { Container, Grid } from "@mui/material";
import JobCard from "./JobCard";

function JobList({ jobs }) {
  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        {jobs.slice(0, 8).map((job) => (
          <Grid key={job.id} item xs={12} sm={6} md={4} lg={3}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default JobList;
