import classes from "./header.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const [user, setUser] = useState("None");

  useEffect(() => {
    axios
      .get("http://localhost:5000/check", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user.name);
        }
      })
      .catch((error) => console.log("Error checking login:"));
  }, []);
  const name = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
  return (
    <header className={classes.header}>
      <p className={classes.title}>
        <span className={classes.gradientText}>Welcome {name}</span>
      </p>
    </header>
  );
}
