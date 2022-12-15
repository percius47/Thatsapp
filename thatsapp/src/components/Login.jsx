import React from "react";
import "./Login.css";


import { auth,provider } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider/StateProvider";
import { actionTypes } from "../reducer/reducer";


function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user,"user details");
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Thatsapp"
        />
        <div className="login__text">
          <h1>Sign in to ThatsApp</h1>
        </div>

        <button type="submit" onClick={signIn}>
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
