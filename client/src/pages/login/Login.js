/* IMPORT DEPENDENCIES */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

/* IMPORT MATERIAL UI COMPONENTS */
import {
  Grid,
  Paper,
  Typography
} from '@mui/material/'

/* IMPORT CUSTOM COMPONENTS */
import SignIn from "../../page components/auth/SignIn";
import SignUp from "../../page components/auth/SignUp";

/* IMPORT CSS */
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';

export default function Login({ user, setUser, setErrors }){

  const [signIn, setSignIn] = useState(true);
  // eslint-disable-next-line
  const [invalidLogin, setinvalidLogin] = useState(false);
  // eslint-disable-next-line
  const [invalidPassword, setInvalidPassword] = useState(false);
  // eslint-disable-next-line
  const [invalidSignUp, setInvalidSignUp] = useState(false);

  // If user tries to log into an existing account with an incorrect username and/or password
  const noProfile = () => {
    toast.error(
      "Incorrect username or password",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
    setinvalidLogin(false)
  };

  // If user tries to log into an existing account with an incorrect password
  // ...or...
  // if user create an account with a password with fewer than 6 characters
  const badPassword = () => {
    toast.error(
      "Password must be at least 6 characters long",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
    setInvalidPassword(false)
  };

  // If user signup fails for any reason other than a too short password
  const badSignUp = () => {
    toast.error(
      "Failed to create account. All fields must be filled in.",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
    setInvalidSignUp(false)
  };

  return(
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.actitime.com/wp-content/uploads/2020/03/best-to-do-list-apps-to-stop-forgetting-things.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/*<Typography variant="h2" style={{ zIndex: "2", marginTop: "15%", textAlign: "center" }}>Welcome to GetItDone</Typography>*/}
        </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Typography variant="h2" style={{ marginTop: "15%", textAlign: "center" }}>Welcome to GetItDone</Typography>
      <ToastContainer />
      {/* {invalidLogin ? noProfile() : <></>} */}
      {/* {invalidPassword ? badPassword() : <></>} */}
      {
        signIn ? 
          <SignIn user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} setinvalidLogin={setinvalidLogin} noProfile={noProfile}/> 
          : 
          <>
            <SignUp user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} badSignUp={badSignUp} badPassword={badPassword} setInvalidPassword={setInvalidPassword} setInvalidSignUp={setInvalidSignUp} />
          </>
      }     
      </Grid>   
    </Grid>
  )
};