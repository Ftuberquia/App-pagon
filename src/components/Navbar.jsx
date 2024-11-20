import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/" className="navbar__link">
                    paGon
                </Link>
            </div>
            <ul className="navbar__menu">
                {/* <li className="navbar__item">
                    <Link to="/" className="navbar__link">
                        Inicio
                    </Link>
                </li> */}
                <li className="navbar__item navbar__help">
                    <Link to="/help" className="navbar__link">
                        Ayuda
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
