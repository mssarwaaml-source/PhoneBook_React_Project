import classes from "./app.module.css";
import Login from "./pages/login/Login";
import Contacts from "./pages/contacts/Contacts";
import Groups from "./pages/groups/Groups";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import axios from "axios";
import Layout from "./pages/layout/Layout";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/check", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
          setLogged(true);
        }
      })
      .catch((error) => console.log("Error checking login:"));
  }, []);

  function logout() {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        setLogged(false);
      })
      .catch((error) => console.log("Error logging out:"));
  }

  return (
    <div className={classes.app}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              logged ? <Navigate to="/app/" /> : <Login setLogged={setLogged} />
            }
          />

          <Route
            path="/app"
            element={<Layout logged={logged} logout={logout} />}
          >
            <Route index element={<Home />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="groups" element={<Groups />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
