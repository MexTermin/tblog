import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inicio from "./Components/Inicio";
import Opciones from "./Components/Opciones";
import Publicar from "./Components/Publicar";
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    return(
        <Router>
            <nav className="nav_container">
                    <ul className="items">
                        <li>
                            <Link to="/inicio">Inicio</Link>
                        </li>
                        <li>
                            <Link to="">Publicar</Link>
                        </li>
                        <li>
                            Opciones
                            {/* <div className="sub-container">
                                <ul className="sub-items">
                                    <li>
                                        <Link to="#">Perfil</Link>
                                    </li>
                                    <li>
                                    <Link  to="#">Configuraciones</Link>
                                    </li>
                                    <li>
                                        <Link to='#'>Salir</Link>
                                    </li>
                                </ul>
                            </div> */}
                        </li>
                     </ul>
                </nav>

                <Switch>
                    <Route exact path="/inicio">
                        <Inicio/>
                    </Route>
                    <Route exact path="/publicar">
                        <Publicar/>
                    </Route>
                    <Route exact path="/opciones">
                        <Opciones/>
                    </Route>
                </Switch>
        </Router>
        
    )
}
export default NavBar;