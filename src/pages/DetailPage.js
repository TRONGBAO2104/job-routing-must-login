import { Box, Chip, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { BASE_URL } from "../app/config";
import SearchAppBar from "../components/SearchAppBar";

function DetailPage() {
  const [job, setJob] = useState([]);
  // console.log(job);

  const params = useParams();
  // console.log(params);

  const jobId = params.jobId;
  // console.log(jobId);

  const jobDetail = job.find((job) => job.id.toString() === jobId);
  console.log(jobDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/jobs");
        console.log(response);

        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(">>> BASE_URL", BASE_URL);
  }, []);

  return (
    <>
      <SearchAppBar />
      {jobDetail && (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h4" component="div" sx={{ mt: 2 }}>
            {jobDetail.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              mb: 1,
            }}
          >
            {jobDetail.skills.map((jobSkill, index) => (
              <Typography key={index} component={"span"} spacing={1}>
                <Chip label={jobSkill} sx={{ m: 0.2 }} color="primary" />
              </Typography>
            ))}
          </Box>

          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            {jobDetail.description}
          </Typography>

          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
            Salary: {jobDetail.salaryLow} - {jobDetail.salaryHigh}
          </Typography>

          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
            City: {jobDetail.city}
          </Typography>
        </Container>
      )}
    </>
  );
}

export default DetailPage;
