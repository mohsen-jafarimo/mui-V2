import { Box, Typography, Stack, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import "../home.css";
import Filter from "../components/Filter";
import { useEffect } from "react";

const Home = () => {
  const [cuurentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);

  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const indexOfLastPost = cuurentPage * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const products = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (e, value) => {
    console.log(e);
    setCurrentPage(value);
  };
  return (
    <>
      <Box position="static" mt={{ xs: "60px", sm: "80px" }}>
        <Typography variant="h5" align="center" mb={2}>
          Latest Product
        </Typography>
        <Stack direction={"column"} gap={4} my={2}>
          {products.map((p) => {
            return <Product key={p.id} product={p} />;
          })}
        </Stack>
        <Box display={"flex"} justifyContent={"center"}>
          <Pagination count={5} onChange={paginate} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
