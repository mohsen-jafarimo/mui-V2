import React from "react";
import { Button, ButtonGroup } from "@mui/material";

const Filter = ({ categories, filtered, items }) => {
  return (
    <ButtonGroup
      variant="text"
      aria-label="text button group"
      sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}
    >
      <Button onClick={() => filtered()}>All</Button>
      {categories.map((category) => {
        return (
          <Button key={category} onClick={() => filtered(category)}>
            {category}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default Filter;
