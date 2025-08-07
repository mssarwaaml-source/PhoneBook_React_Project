import  Header  from "../../../components/header/Header";
import  Footer  from "../../../components/footer/Footer";
import NavBar from "../../../components/navbar/NavBar";
import classes from "./layout.module.css";
import { pages } from "../../data/pages";


import { Navigate, Outlet } from "react-router-dom";



export default function Layout({ logged , logout}) {

  if(!logged){
    return <Navigate to="/" />
  }

  return (
  <div className={classes.layout}>

    <Header />

    <NavBar pages={pages} logout={logout} />
    <main>
      <Outlet />
    </main>
    <Footer />


  </div>
);
}
