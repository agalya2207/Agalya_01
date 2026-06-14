import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path, hash = '') => {
    const isPathActive = location.pathname === path;
    const isHashActive = hash ? location.hash === hash : !location.hash;
    return isPathActive && isHashActive ? "navbar-link active" : "navbar-link";
  };

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
          <ul className="navbar-menu" style={{ alignItems: 'center' }}>
            <li><Link to="/" className={location.pathname === '/' ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" className={getLinkClass('/about')} onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/about#skills" className={getLinkClass('/about', '#skills')} onClick={() => setIsOpen(false)}>Skills</Link></li>
            <li><Link to="/projects" className={location.pathname === '/projects' ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Projects</Link></li>
            <li><Link to="/about#experience" className={getLinkClass('/about', '#experience')} onClick={() => setIsOpen(false)}>Experience</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? "navbar-link active" : "navbar-link"} onClick={() => setIsOpen(false)}>Contact</Link></li>
            {user && (
              <li>
                <Link to="/admin/dashboard" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }} onClick={() => setIsOpen(false)}>
                  <LayoutDashboard size={16} /> Console
                </Link>
              </li>
            )}
            <li>
              <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ padding: '8px 16px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center' }}>
                Let&apos;s Connect &rarr;
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;