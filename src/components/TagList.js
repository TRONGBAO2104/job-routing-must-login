import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function MiddleDividers({ job }) {
  const jobSkills = job.skills;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", mb: 1 }}
    >
      {jobSkills.slice(0, 4).map((jobSkill, index) => (
        <Typography key={index} component={"span"} spacing={1}>
          <Chip label={jobSkill} sx={{ m: 0.2 }} color="primary" />
        </Typography>
      ))}
    </Box>
  );
}
