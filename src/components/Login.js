import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../Firebase/firebase";

function Login() {
  const signIn = () => {
    //   signIN using firebase
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://discord.com/assets/ff41b628a47ef3141164bfedb04fb220.png"
          alt=""
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
