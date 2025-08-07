import { NavLink } from "react-router-dom";
import classes from "./navbar.module.css";
export default function NavBar({ pages, logout }) {
  return (
    <ul className={classes.navbar}>
      {pages.map((page) => (
        <li key={page}>
          <NavLink
            to={"/app/" + page}
            end
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            {page == "" ? "Home" : page}
          </NavLink>
        </li>
      ))}
      <li>
        <NavLink onClick={logout} >logout</NavLink>
      </li>
    </ul>
  );
}
