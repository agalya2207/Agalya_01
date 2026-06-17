import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Menu, X, Moon, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'HOME',       to: '/'        },
  { label: 'ABOUT',      to: '/about'   },
  { label: 'SKILLS',     to: '/about#skills'      },
  { label: 'PROJECTS',   to: '/projects'           },
  { label: 'EXPERIENCE', to: '/about#experience'   },
  { label: 'CONTACT',    to: '/contact'            },
];

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) => {
    const [path, hash = ''] = to.split('#');
    const hashPart = hash ? `#${hash}` : '';
    return location.pathname === path && (hashPart ? location.hash === hashPart : !location.hash);
  };

  return (
    <header className="navbar-header">
      <style>{`
        .navbar-link-upper {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          position: relative;
          padding: 8px 0;
          text-transform: uppercase;
          transition: var(--transition-smooth);
        }
        .navbar-link-upper::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: var(--color-primary);
          transition: var(--transition-smooth);
        }
        .navbar-link-upper:hover,
        .navbar-link-upper.active { color: var(--color-text); }
        .navbar-link-upper:hover::after,
        .navbar-link-upper.active::after { width: 100%; }

        .navbar-actions {
          display: flex; align-items: center; gap: 12px;
        }
        .navbar-moon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(139,92,246,.08);
          border: 1px solid rgba(139,92,246,.2);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: var(--transition-spring);
        }
        .navbar-moon-btn:hover {
          color: var(--color-primary);
          background: rgba(139,92,246,.18);
          transform: rotate(-20deg) scale(1.1);
        }
        .navbar-connect-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--color-primary), hsl(258,90%,55%));
          color: #fff;
          font-size: 0.82rem; font-weight: 700;
          letter-spacing: 0.04em;
          border: none; cursor: pointer;
          box-shadow: 0 4px 14px rgba(139,92,246,.4);
          transition: var(--transition-spring);
          text-decoration: none;
        }
        .navbar-connect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(139,92,246,.65);
        }
      `}</style>

      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">AG.</Link>

        {/* Hamburger — mobile */}
        <button
          className="navbar-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav links */}
        <nav className={`navbar-nav ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-menu" style={{ alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`navbar-link-upper${isActive(to) ? ' active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Admin Console (only when logged in) */}
            {user && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="navbar-link-upper"
                  style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={14} /> Console
                </Link>
              </li>
            )}

            {/* Actions */}
            <li>
              <div className="navbar-actions">
                <button className="navbar-moon-btn" aria-label="Toggle dark mode" title="Dark mode">
                  <Moon size={16} />
                </button>
                <Link
                  to="/contact"
                  className="navbar-connect-btn"
                  onClick={() => setIsOpen(false)}
                >
                  {"Let's"} Connect <ArrowRight size={13} />
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;