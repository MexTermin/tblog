import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "../css/SubMenu.css"

function SubMenu() {
    return(
        <Router>
            <div className="sub-container">
                <ul className="sub-items glass">
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
            </div>
            <Route>
                <Switch  path="perfil">
                    {}
                </Switch>
                <Switch  path="configuraciones">
                    {}
                </Switch>
                <Switch path="salir">
                    {}
                </Switch>
            </Route>
        </Router>
        
    )
}

export default SubMenu;