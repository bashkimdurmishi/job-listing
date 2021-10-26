import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/user/actions";
import { useHistory } from "react-router";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";

import { createTheme, ThemeProvider } from "@mui/material/styles";

//component import
import Footer from "../Footer/Footer";

const theme = createTheme();

function Login(props) {
  let history = useHistory();
  const [email, setEmail] = useState("balan@test.com");
  const [password, setPassword] = useState("test1234@B");
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let validate = () => {
    let errorsData = {};

    /*Email Validation */
    errorsData.email = [];

    if (!email) {
      errorsData.email.push("Email can't be blank!");
    }

    const validEmailRegex =
      /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email is expected");
      }
    }
    /*Email Validation Ends */

    /*Password Validation */
    errorsData.password = [];

    if (!password) {
      errorsData.password.push("Password can't be blank!");
    }

    const validPasswordRegex =
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password must contain a minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      }
    }
    /*Password Validation Ends */

    setErrors(errorsData);
  };

  useEffect(validate, [email, password]);

  let onLoginClick = async (e) => {
    e.preventDefault();
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid) {
      props.login({ email, password, history });
    }
  };

  //check if login form is valid
  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2016/03/09/09/22/meeting-1245776_960_720.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <WorkIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onLoginClick}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}
              />
              <Box sx={{ color: "error.main" }}>
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box sx={{ color: "error.main" }}>
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </Box>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const mapDispatchToProps = {
  login,
};

const mapStateToProps = (state) => ({
  userData: state.user.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
