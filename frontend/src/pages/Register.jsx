import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const theme = {
  palette: {
    mode: "light",
  },
};
const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specializations, setSpecializations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      console.log(specializations);
      console.log(firstName, city, email, phone, dateOfBirth, password);

      const registerPromise = new Promise((resolve, reject) => {
        registerUser(
          firstName,
          email,
          city,
          phone,
          dateOfBirth,
          specializations,
          password,
          confirmPassword
        )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      toast.promise(registerPromise, {
        loading: "Creating your account...",
        success: "Registered Successfully!",
        error: "Something went wrong!",
      });
    }
  };

  const Specializations = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
    "Mariah Hickman",
    "Rocco Richardson",
    "Harris Glenn",
  ];

  const handleConfirmPassword = () => {
    let passEle = document.getElementById("signup-form-password");
    let confPassEle = document.getElementById("signup-form-confirmpassword");
    let confPassWarningEle = document.getElementById(
      "signup-form-confirmpassword-warning"
    );
    if (confPassEle.value != "") {
      if (passEle.value == confPassEle.value) {
        confPassEle.style.color = "green";
        confPassWarningEle.style.visibility = "hidden";
      } else {
        confPassEle.style.color = "red";
        confPassWarningEle.style.color = "red";
        confPassWarningEle.style.visibility = "visible";
      }
    } else {
      confPassEle.style.color = "black";
      confPassWarningEle.style.visibility = "hidden";
    }
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            fullWidth
            required
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
          />
          <TextField
            type="number"
            variant="outlined"
            color="secondary"
            label="Phone number"
            pattern="[6-9]{1}[0-9]{9}" // ^\d{2}(?:-\d{4}-\d{4}|\d{8}|\d-\d{3,4}-\d{4})$
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
            onInvalid={(e) => {
              e.target.setCustomValidity(
                "Please enter a valid phone number e.g. 9999999999"
              );
            }}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            fullWidth
            required
          />
        </Stack>
        <Autocomplete
          sx={{ mb: 4 }}
          multiple
          required
          options={Specializations}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Specializations"
              placeholder="Specializations"
            />
          )}
          renderOption={(props, option, { selected }) => (
            <>
              <MenuItem
                {...props}
                key={option}
                value={option}
                sx={{ justifyContent: "space-between" }}
              >
                {option}
                {selected ? specializations.push( option ) : null}
                {selected ? <CheckIcon color="info" /> : null}
              </MenuItem>
            </>
          )}
        />
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label="Date of Birth"
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          id="signup-form-password"
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onKeyUp={handleConfirmPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          id="signup-form-confirmpassword"
          type="password"
          variant="outlined"
          color="secondary"
          label="Confirm Password"
          onKeyUp={handleConfirmPassword}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          // sx={{ mb: 4 }}
        />
        <div id="signup-form-confirmpassword-warning">
          Passwords do not match!
        </div>
        <br />
        <Button variant="outlined" color="primary" type="submit">
          Register
        </Button>
      </form>
      <small>
        Already have an account? <Link to="/login">Login Here</Link>
      </small>
    </ThemeProvider>
  );
};

export default Register;
