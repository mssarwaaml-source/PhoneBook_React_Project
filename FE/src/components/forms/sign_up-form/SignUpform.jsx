import classes from "./signupform.module.css";
import { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpForm({
  setIsSignUp,
  setResponse,
  response,
  isSignUp,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSignUp,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    if (response === "existingUser") {
      toast.error("The email is already in use.", {
        position: "top-center",
        autoClose: 3000,
      });
      setResponse(undefined);
    } else if (response) {
      toast.success("User created successfully.", {
        position: "top-center",
        autoClose: 1000,
      });
      setResponse(undefined);

      setTimeout(() => {
        setIsSignUp(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }, 2000);
    }
  }, [response]);

  function onSubmit(e) {
    e.preventDefault();
    if (
      validName() &&
      validEmail() &&
      validPassword() &&
      confirmPassword === password
    ) {
      onSignUp();
    }

    if (!validPassword()) {
      setPasswordTouched(true);
    }
    if (confirmPassword !== password) {
      toast.error("The passwords are not the same.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!validName()) {
      toast.error("The name is not valid.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  function validName() {
    const nameRegex = /^[a-zA-Z]+$/;
    return !(name.length < 2 || name.length > 30 || !nameRegex.test(name));
  }

  function validEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validPassword() {
    return !(
      password.length < 3 ||
      password.length > 8 ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    );
  }

  return (
    <div
      className={
        classes.signupform + " " + (isSignUp ? "" : classes.inactiveTab)
      }
    >
      <form aria-label="Sign Up form" onSubmit={onSubmit}>
        <h2 className={classes.title}>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ""))}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={classes.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordTouched(true)}
            onBlur={() => setPasswordTouched(false)}
            data-tooltip-id="password-tooltip"
            data-tooltip-content="Password must be at least 3 and at most 8 characters, contain one letter and one number."
            data-tooltip-place="right"
            data-tooltip-hidden={!passwordTouched || validPassword()}
            style={{
              borderColor:
                passwordTouched && !validPassword() ? "#e53e3e" : undefined,
            }}
          />
          <ReactTooltip
            id="password-tooltip"
            open
            className={classes.tooltip}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        <div className={classes.inputWrapper}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer toastClassName={classes.toast} />
    </div>
  );
}
