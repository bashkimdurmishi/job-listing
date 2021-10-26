import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { registerUser } from "../../redux/user/actions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, ToggleButton } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import WorkIcon from "@mui/icons-material/Work";

const theme = createTheme();

const Register = (props) => {
  let [userType, setUserType] = useState("seeker");
  let [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const history = useHistory();

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
  });
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
  });

  let validate = () => {
    let errorsData = [];

    /*Email Validation */
    errorsData.email = [];

    if (!state.email) {
      errorsData.email.push("Email can't be blank!");
    }

    const validEmailRegex =
      /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Proper email is expected");
      }
    }
    /*Email Validation */

    /*Password Validation */
    errorsData.password = [];

    if (!state.password) {
      errorsData.password.push("Password can't be blank!");
    }

    const validPasswordRegex =
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/;
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password must contain a minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      }
    }
    /*Password Validation */

    /*other Validations */
    errorsData.fullName = [];
    if (!state.fullName) {
      errorsData.fullName.push("Name can't be blank!");
    }

    setErrors(errorsData);
  };

  useEffect(validate, [state]);

  let onRegisterClick = () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });

    setDirty(dirtyData);
    validate();

    if (isValid) {
      props.registerUser({ fullName: state.fullName, email: state.email, password: state.password, userType: userType, history: history });
    }
  };

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <WorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up As {userType === "seeker" ? "Job Seeker" : "Job Poster"}
          </Typography>

          {/*Form Starts*/}
          <Box
            component="form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={0} sx={{ mb: 0 }}>
              <Grid item xs={6} direction="column">
                <ToggleButton
                  fullWidth
                  color="primary"
                  selected={userType === "seeker" && true}
                  variant="outlined"
                  onClick={() => setUserType("seeker")}
                  sx={{
                    mb: 0,
                    borderRadius: 0,
                    borderTopLeftRadius: 10,
                    borderBottom: "none",
                    height: 50,
                  }}
                >
                  Job Seeker
                </ToggleButton>
              </Grid>
              <Grid item xs={6} direction="column">
                <ToggleButton
                  fullWidth
                  color="primary"
                  selected={userType === "poster" && true}
                  variant="outlined"
                  onClick={() => setUserType("poster")}
                  sx={{
                    mb: 0,
                    borderRadius: 0,
                    borderTopRightRadius: 10,
                    borderBottom: "none",
                    height: 50,
                  }}
                >
                  Job Poster
                </ToggleButton>
              </Grid>
              <Grid item xs={12} sx={{ mt: 0, mb: 2 }}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  value={state.fullName}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <Box sx={{ color: "error.main" }}>
                  {dirty["fullName"] && errors["fullName"][0]
                    ? errors["fullName"]
                    : ""}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: 0, mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <Box sx={{ color: "error.main" }}>
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: 0, mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <Box sx={{ color: "error.main" }}>
                  {dirty["password"] && errors["password"][0]
                    ? errors["password"]
                    : ""}
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {() => onRegisterClick()}
            >
              Sign Up As {userType === "seeker" ? "Job Seeker" : "Job Poster"}
            </Button>
            {props.userError && (<Box sx={{ color: "error.main" }}>
                  {props.userError}
            </Box>)}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = {
  registerUser,
};

const mapStateToProps = (state) => ({
  userError: state.user.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
