import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Inicio from "./Components/Inicio";

import Publicar from "./Components/Publicar";
import SubMenu from "./Components/SubMenu";
import "./css/NavBar.css";

function NavBar() {
  return (
    <Router>
      <nav className="nav_container">
        <ul className="items glass">
          <li>
            <Link to="/inicio">Inicio</Link>
          </li>
          <li>
            <Link to="Publicar">Publicar</Link>
          </li>
          <li>
            <div></div>
            {/* <Link to="opciones">Opciones</Link>
            <SubMenu/> */}
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/inicio">
          <Inicio />
        </Route>
        <Route path="/publicar">
          <Publicar />
        </Route>
        <Route path="/opciones">
          {}
        </Route>
      </Switch>
    </Router>
  );
}
export default NavBar;
