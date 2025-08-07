import classes from "./login.module.css";
import { useState, useEffect } from "react";
import LoginForm from "../../../components/forms/login-form/LoginForm";
import SignUpForm from "../../../components/forms/sign_up-form/SignUpform";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login({ setLogged }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [response, setResponse] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === "User found") {
          if (response.data.user) {
            setLogged(true);
          } else {
            setLogged(false);
          }
        }
        else if (response.data.message === "User not found") {
          toast.error("email or password is incorrect", {
            position: "top-center",
            autoClose: 1000,
          });
        }
        else {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  }

  function onSignUp() {
    axios
      .post(
        "http://localhost:5000/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => setResponse(response.data.user))
      .catch((error) => "");
  }

  return (
    <div className={classes.login}>
      <h1 className={classes.appTitle}>Phone Book</h1>
      <div className={classes.forms}>
        <div className={classes.form}>
          <div
            className={
              classes.aboveForm + " " + (isSignUp ? "" : classes.activeTab)
            }
          >
            <button onClick={() => setIsSignUp(false)}>Login</button>
          </div>
          <LoginForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            email={isSignUp ? "" : email}
            setEmail={setEmail}
            password={isSignUp ? "" : password}
            setPassword={setPassword}
          />
        </div>
        OR
        <div className={classes.form}>
          <div
            className={
              classes.aboveForm + " " + (isSignUp ? classes.activeTab : "")
            }
          >
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          </div>

          <SignUpForm
            setIsSignUp={setIsSignUp}
            setResponse={setResponse}
            response={response}
            onSignUp={onSignUp}
            isSignUp={isSignUp}
            name={name}
            setName={setName}
            email={isSignUp ? email : ""}
            setEmail={setEmail}
            password={isSignUp ? password : ""}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
