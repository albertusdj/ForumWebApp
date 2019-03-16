import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = () =>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/ask/">Ask</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/logout/">Log out</a>
                </li>
            </ul>
        </div>
    </nav>

ReactDOM.render(
    <NavBar />,
    document.getElementById('header')
  );