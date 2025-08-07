import classes from "./loginform.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function LoginForm({
  isSignUp,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classes.login + " " + (isSignUp ? classes.inactiveTab : "")}>

      <form onSubmit={onSubmit} aria-label="Login form">
        <h2 className={classes.title}>Sign In</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          name="email"
          required
          value={email}
        />

        <div className={classes.inputWrapper}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
