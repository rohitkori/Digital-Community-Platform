import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const theme = {
  palette: {
    mode: "light",
  },
};

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const loginPromise = new Promise((resolve, reject) => {
      loginUser(email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(loginPromise, {
      loading: "Login to your account...",
      success: "Successfully Logged in!",
      error: "Something went wrong!",
    });
  };
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} action={<Link to="/dashboard" />}>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          id="signup-form-password"
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <Button variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </form>
      <small>
        Don't have an account? <Link to="/register">Register Here</Link>
      </small>
    </ThemeProvider>
  );
};

export default Login;
