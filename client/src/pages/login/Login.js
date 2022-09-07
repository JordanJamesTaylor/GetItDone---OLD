/* IMPORT DEPENDENCIES */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

/* IMPORT COMPONENTS */
import SignIn from "../../page components/auth/SignIn";
import SignUp from "../../page components/auth/SignUp";

/* IMPORT CSS */
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ user, setUser, setErrors }){

  const [signIn, setSignIn] = useState(true);
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

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

  return(
    <>
      <ToastContainer />
      {invalidLogin ? noProfile() : <></>}
      {invalidPassword ? badPassword() : <></>}
      {
        signIn ? 
          <SignIn user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} setinvalidLogin={setinvalidLogin} /> 
          : 
          <>
    
            <SignUp user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} setInvalidPassword={setInvalidPassword} />
          </>
      }        
    </>
  )
};