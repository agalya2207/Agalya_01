import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Folder, Code, Briefcase, Mail } from 'lucide-react';
import Magnetic from '../common/Magnetic';

/* ─────────────────────────────────────────────
   NAV CONFIG
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { icon: Home,     label: 'Home',       to: '/',               sectionId: 'section-home'       },
  { icon: User,     label: 'About',      to: '/about',          sectionId: 'section-about'      },
  { icon: Folder,   label: 'Projects',   to: '/projects',       sectionId: 'section-projects'   },
  { icon: Code,     label: 'Skills',     to: '/about#skills',   sectionId: 'section-skills'     },
  { icon: Briefcase,label: 'Experience', to: '/about#experience',sectionId: 'section-experience' },
  { icon: Mail,     label: 'Contact',    to: '/contact',        sectionId: 'section-contact'    },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const PortfolioSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  /* ── IntersectionObserver: detect visible section ── */
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    );

    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  /* ── Smooth scroll if the section exists on page ── */
  const handleClick = (e, sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ── Active state ── */
  const isActive = ({ to, sectionId }) => {
    if (activeSection) return activeSection === sectionId;
    const [path] = to.split('#');
    return location.pathname === path;
  };

  return (
    <>
      <style>{`
        /* ── Left Sidebar wrapper ── */
        .left-sidebar-nav {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 500;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 0 24px;
          border-right: 1px solid rgba(20, 184, 166, 0.3);
          background: transparent;
          box-shadow: 10px 0 30px rgba(20, 184, 166, 0.05);
        }

        /* ── Subtle glowing line on the right of sidebar ── */
        .left-sidebar-nav::after {
          content: '';
          position: absolute;
          top: 0;
          right: -1px;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(20, 184, 166, 0.5), transparent);
          z-index: -1;
        }

        /* ── Each nav item ── */
        .sidebar-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
        }

        /* ── Icon button rounded square ── */
        .sidebar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(6, 13, 13, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .sidebar-item:hover .sidebar-icon {
          color: #fff;
          background: rgba(20, 184, 166, 0.1);
          border-color: rgba(20, 184, 166, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(20, 184, 166, 0.2);
        }

        /* Active state */
        .sidebar-item.sidebar-active .sidebar-icon {
          background: rgba(20, 184, 166, 0.15);
          color: #fff;
          border: 2px solid rgba(94, 234, 212, 0.8);
          box-shadow:
            0 0 20px rgba(20, 184, 166, 0.5),
            inset 0 0 10px rgba(20, 184, 166, 0.2);
          transform: scale(1.05);
        }

        /* ── Tooltip ── */
        .sidebar-tooltip {
          position: absolute;
          left: calc(100% + 20px);
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(6, 13, 13, 0.95);
          border: 1px solid rgba(20, 184, 166, 0.3);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
        }

        .sidebar-item:hover .sidebar-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .left-sidebar-nav {
            top: auto;
            bottom: 0;
            left: 0;
            height: auto;
            width: 100%;
            flex-direction: row;
            padding: 12px;
            border-right: none;
            border-top: 1px solid rgba(20, 184, 166, 0.3);
            background: rgba(6, 13, 13, 0.9);
            backdrop-filter: blur(10px);
          }
          .left-sidebar-nav::after {
            display: none;
          }
          .sidebar-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
          .sidebar-tooltip {
            display: none;
          }
        }
      `}</style>

      <nav className="left-sidebar-nav" aria-label="Portfolio navigation">
        {NAV_ITEMS.map(({ icon: Icon, label, to, sectionId }) => {
          const active = isActive({ to, sectionId });
          return (
            <Magnetic key={label}>
              <Link
                to={to}
                className={`sidebar-item${active ? ' sidebar-active' : ''}`}
                aria-label={label}
                onClick={(e) => handleClick(e, sectionId)}
                data-cursor="magnetic"
              >
                {/* Tooltip */}
                <span className="sidebar-tooltip">{label}</span>

                {/* Icon */}
                <span className="sidebar-icon">
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                </span>
              </Link>
            </Magnetic>
          );
        })}
      </nav>
    </>
  );
};

export default PortfolioSidebar;
