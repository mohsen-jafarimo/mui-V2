import React from "react";
import { Pagination } from "@mui/material";

const Paginate = ({ onChange, page }) => {
  return (
    <Pagination count={4} onChange={onChange} page={page} color="secondary" />
  );
};

export default Paginate;
