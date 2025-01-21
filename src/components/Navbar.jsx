import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();

    const handleAdminAccess = () => {
        const accessKey = "pagon123"; // Clave "hardcodeada"
        const enteredKey = prompt("Por favor, ingresa la clave para acceder al panel de administrador:");
        if (enteredKey === accessKey) {
            navigate('/admin');
        } else {
            alert("Clave incorrecta. No tienes acceso al panel de administrador.");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/" className="navbar__link">
                    paGon
                </Link>
            </div>
            <ul className="navbar__menu">
                <li className="navbar__item navbar__help">
                    <Link to="/help" className="navbar__link">
                        Ayuda
                    </Link>
                </li>
                <li className="navbar__item navbar__admin">
                    <button onClick={handleAdminAccess} className="navbar__link">
                        Admin.
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
