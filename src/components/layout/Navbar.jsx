import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AG.
        </Link>

        {/* Hamburger button - mobile only */}
        <button
          className="navbar-hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <nav className={`navbar-nav ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-menu">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Projects</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
            <li>
              {user ? (
                <Link to="/admin/dashboard" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }} onClick={() => setIsOpen(false)}>
                  <LayoutDashboard size={16} /> Console
                </Link>
              ) : (
                <Link to="/login" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setIsOpen(false)}>
                  <LogIn size={16} /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;