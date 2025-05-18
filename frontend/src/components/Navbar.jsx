import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                    <img src="/logoDoqumenta.png" alt="Doqumenta" />
                </NavLink>
            </div>

            <div
                className={`hamburger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span />
                <span />
                <span />
            </div>

            <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsOpen(false)}
                >
                    Inicio
                </NavLink>

                <NavLink
                    to="/programacion"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsOpen(false)}
                >
                    Cartelera
                </NavLink>

                <NavLink
                    to="/prensa"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsOpen(false)}
                >
                    Prensa
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
