import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const theme = createTheme();

export default function SignIn({ user, setUser, setErrors, setSignIn, setinvalidLogin, noProfile}) {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    let navigate = useNavigate();

    // Hide/show password on icon click
  const handleShowPassword = () => setShowPassword(true);
  const handleHidePassword = () => setShowPassword(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch("/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
          },
          body: JSON.stringify({ username, password })
          }).then((r) => {
          if (r.ok) {
              r.json().then((user) => setUser(user));
              setErrors([])
              navigate("/profile")
          } else {
              setinvalidLogin(true);
              noProfile();
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setSignIn(false)}
            >
              Don't have an account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
