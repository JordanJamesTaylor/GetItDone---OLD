/* IMPORT DEPENDENCIE */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* IMPORT MATERIAL UI COMPONENTS */
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';

/* IMPORT MATERIAL UI COMPONENTS */
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton
} from '@mui/material/'

/* IMPORT MATERIAL UI ICONS */
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

/* IMPORT CSS */
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp({ user, setUser, setErrors, setSignIn, setInvalidPassword, setInvalidSignUp, badSignUp, badPassword }) {
  
  // Show/hide password if eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  
  // Hide/show password on icon click
  const handleShowPassword = () => setShowPassword(true);
  const handleHidePassword = () => setShowPassword(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(password.length < 6){
      setInvalidPassword(true)
      badPassword()
      return <></>
    }

    const formData = new FormData()
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)

    fetch("/profiles", { 
      method: "POST",
      body: formData
      }).then((r) => {
      if (r.ok) {
          r.json().then((user) => setUser(user));
          setErrors([])
          navigate("/")
      } else {
        setInvalidSignUp(true)
        badSignUp()
        r.json().then((err) => setErrors(err.errors));
      }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={showPassword ? handleHidePassword : handleShowPassword}
                          //onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setSignIn(true)}
            >
              Already have an account
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}