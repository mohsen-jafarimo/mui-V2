import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const [register, { isLoading, error }] = useRegisterMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, username, password }).unwrap();
      dispatch(setCredentials({ res, email, username }));
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      position="static"
      mt={{ xs: "60px", sm: "80px" }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={500}
      justifyContent={"center"}
      component="form"
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          type="text"
          required
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="text"
          required
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "#456fef",
            color: "white",
            ":hover": { color: "black" },
          }}
        >
          Sign Up
        </Button>
      </div>

      <Box mt={5}>
        Already have an account ?<Link to={`/login`}>sign in</Link>
      </Box>
    </Box>
  );
};

export default Register;
