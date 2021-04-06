import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "../Home/Home";
import Post from "../Post/Post";
import {Navbar , Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" className="bg-dark" fixed="bottom" variant="dark">
        <Navbar.Brand href="/home">HOME</Navbar.Brand>
        <Navbar.Brand href="/post">PUBLICAR</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <div className="mb-2">
          {['up'].map((direction) => (
            <DropdownButton
              key={direction}
              id={`dropdown-button-drop-${direction}`}
              drop={direction}
              variant="secondary"
              title={` Drop ${direction} `}
            >
              <Dropdown.Item href="config">Configuracion</Dropdown.Item>
              <Dropdown.Item href="profile">Perfil</Dropdown.Item>
              <Dropdown.Item href="get_out">Salir</Dropdown.Item>
            </DropdownButton>
            ))}
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/config">
            <h1>
              Configuraciones
            </h1>
        </Route>
        <Route path="/profile">
            <h1>
              Perfil
            </h1>
        </Route>
        <Route path="/get_out">
            <h1>
              Salir
            </h1>
        </Route>
      </Switch>
    </Router>
  );
}
export default NavBar;
