import { Container } from "@mui/material";
import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
