import { useEffect, useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/auth";

const Login = () => {
  const [email, setEmail] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const [login, { isLoading, error }] = useLoginMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username: email, password }).unwrap();
      dispatch(setCredentials({ res, email, password }));
      navigate("/");
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
      onSubmit={submitHandler}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          label="Password"
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "#456fef",
            color: "white",
            ":hover": { color: "black" },
          }}
        >
          Sign In
        </Button>
      </div>

      <Box mt={5}>
        new User ?<Link to={`/register`}>register</Link>
      </Box>
    </Box>
  );
};

export default Login;
