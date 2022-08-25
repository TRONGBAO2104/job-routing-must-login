import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

import TagList from "./TagList";

export default function JobCard({ job }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.loggedIn) {
      navigate(`/jobs/${job.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card sx={{ height: 350, position: "relative" }}>
      <CardContent sx={{ position: "absolute", top: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {job.title}
        </Typography>

        <TagList job={job} />

        <Divider variant="middle" sx={{ mb: 1 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button size="small" variant="contained" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
