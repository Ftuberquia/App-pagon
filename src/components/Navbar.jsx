import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">paGon</div>
            <div className="navbar__help">
                <a href="#ayuda">Ayuda</a>
            </div>
        </nav>
    );
};

export default Navbar;
