import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn({ user, setUser, setErrors, setSignIn, setinvalidLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log("USERNAME: ", username)
        console.log("PASSWORD: ", password)

        if(password < 6){
          setinvalidLogin(true);
        };
    
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
              console.log("LOGGED IN")
              setErrors([])
              navigate("/")
          } else {
              setinvalidLogin(true);
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
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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