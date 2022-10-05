import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ setPage }) {
  const handleChangePage = (event, page) => {
    // console.log(event, page);
    setPage(page);
  };
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Pagination count={10} onChange={handleChangePage} />
    </Stack>
  );
}
