/* IMPORT DEPENDENCIES */
import { useState } from "react";

/* IMPORT COMPONENTS */
import SignIn from "../../page components/auth/SignIn";
import SignUp from "../../page components/auth/SignUp";

export default function Login({ user, setUser, setErrors }){

  const [signIn, setSignIn] = useState(true)

  return(
    <>
      {
        signIn ? 
          <SignIn user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} /> 
          : 
          <SignUp user={user} setUser={setUser} setErrors={setErrors} setSignIn={setSignIn} />
      }        
    </>
  )
};