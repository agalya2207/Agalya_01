import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, LogIn } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PORTFOLIO.
        </Link>
        <nav>
          <ul className="navbar-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                Contact
              </NavLink>
            </li>
            <li>
              {user ? (
                <Link to="/admin/dashboard" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }}>
                  <LayoutDashboard size={16} /> Console
                </Link>
              ) : (
                <Link to="/login" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
