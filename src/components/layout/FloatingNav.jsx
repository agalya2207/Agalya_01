import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  LayoutGrid,
  Code2,
  Mail
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',         icon: HomeIcon,   label: 'HOME' },
  { to: '/about',    icon: User,       label: 'ABOUT ME' },
  { to: '/projects', icon: LayoutGrid, label: 'PROJECTS' },
  { to: '/skills',   icon: Code2,      label: 'SKILLS' },
  { to: '/contact',  icon: Mail,       label: 'CONTACT' },
];

const FloatingNav = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (to) => {
    const [path, hash] = to.split('#');
    if (hash) {
      return location.pathname === path && location.hash === `#${hash}`;
    }
    return location.pathname === path && !location.hash;
  };

  return (
    <>
      <style>{`
        .float-icon-nav {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 20px;
          padding: 12px 32px;
          display: flex;
          gap: 40px;
          align-items: center;
          z-index: 400;
          pointer-events: auto;
          white-space: nowrap;
        }

        .float-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .float-nav-item:hover {
          color: #a78bfa;
        }

        .float-nav-item.is-hovered .float-nav-icon,
        .float-nav-item:focus .float-nav-icon,
        .float-nav-item:active .float-nav-icon {
          transform: scale(1.08);
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.8));
          color: #a78bfa;
        }

        .float-nav-label.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .float-nav-item.active .float-nav-icon {
          color: #a78bfa;
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.8));
        }

        .float-nav-icon {
          color: inherit;
          transition: all 0.25s ease;
          display: block;
        }

        .float-nav-label {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-5px);
          background: rgba(15, 15, 20, 0.95);
          border: 1px solid rgba(167, 139, 250, 0.3);
          padding: 6px 10px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #a78bfa;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .float-icon-nav {
            gap: 24px;
            padding: 10px 20px;
            border-radius: 16px;
          }
          .float-nav-label {
            font-size: 9px;
            letter-spacing: 1px;
          }
        }

        @media (max-width: 480px) {
          .float-icon-nav {
            gap: 16px;
            padding: 8px 14px;
            top: 16px;
          }
          .float-nav-label {
            display: none;
          }
        }
      `}</style>

      <nav className="float-icon-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <Link
            key={label}
            to={to}
            className={`float-nav-item${isActive(to) ? ' active' : ''}${hoveredItem === label ? ' is-hovered' : ''}`}
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Icon size={22} strokeWidth={1.5} className="float-nav-icon" />
            <span className={`float-nav-label${hoveredItem === label ? ' show' : ''}`}>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default FloatingNav;
