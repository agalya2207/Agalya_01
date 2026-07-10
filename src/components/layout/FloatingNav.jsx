import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  LayoutGrid,
  BarChart2,
  MessageSquare
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home',     hash: '#home',     path: '/',         icon: HomeIcon,      label: 'Home' },
  { id: 'about',    hash: '#about',    path: '/about',    icon: User,          label: 'About' },
  { id: 'skills',   hash: '#skills',   path: '/skills',   icon: LayoutGrid,    label: 'Skills' },
  { id: 'projects', hash: '#projects', path: '/projects', icon: BarChart2,     label: 'Projects' },
  { id: 'contact',  hash: '#contact',  path: '/contact',  icon: MessageSquare, label: 'Contact' },
];

const FloatingNav = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Check for elements matching the id (e.g. section with id="about")
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      let current = null;
      let maxVisibleHeight = 0;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
          maxVisibleHeight = visibleHeight;
          current = section.id;
        }
      });
      
      if (current) {
        setActiveSection(current);
      } else {
        // Fallback to route matching if no sections found in DOM (multi-page setup)
        const match = NAV_ITEMS.find(item => item.path === location.pathname);
        if (match) setActiveSection(match.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount or route change
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleClick = (e, item) => {
    e.preventDefault();
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', item.hash);
    } else {
      // If the section doesn't exist on this page, navigate to the route
      navigate(item.path + item.hash);
    }
  };

  return (
    <>
      <style>{`
        /* DESKTOP: Left Vertical Sidebar */
        .dock-nav {
          position: fixed;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          width: 70px;
          background: rgba(8, 20, 16, 0.6);
          border: 1px solid rgba(46, 230, 184, 0.15);
          border-radius: 40px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          z-index: 999;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }

        .dock-item-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .dock-btn {
          position: relative;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .dock-btn:hover {
          color: #2ee6b8;
          background: rgba(46, 230, 184, 0.08);
          box-shadow: 0 0 12px rgba(46, 230, 184, 0.15);
        }

        .dock-btn.active {
          color: #050a08;
          background: #2ee6b8;
          box-shadow: 0 0 18px rgba(46, 230, 184, 0.75);
          border: none;
        }

        /* Tooltip Desktop (Right Side) */
        .dock-tooltip {
          position: absolute;
          left: 55px;
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          background: rgba(8, 20, 16, 0.95);
          border: 1px solid #2ee6b8;
          color: #2ee6b8;
          font-family: 'Fira Code', monospace;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-shadow: 0 0 10px rgba(46, 230, 184, 0.15);
          display: flex;
          align-items: center;
          z-index: 1000;
        }

        /* Anchor tooltip properly to the button center even when active text is visible */
        .dock-btn-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .dock-tooltip.show {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Tooltip arrow pointing left */
        .dock-tooltip::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px 5px 5px 0;
          border-style: solid;
          border-color: transparent #2ee6b8 transparent transparent;
          display: block;
          width: 0;
          height: 0;
          background: transparent;
          box-shadow: none;
          border-radius: 0;
        }

        .dock-indicator {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, #2ee6b8, transparent);
          margin-top: 4px;
          border-radius: 1px;
        }

        /* MOBILE: Bottom Dock */
        @media (max-width: 768px) {
          .dock-nav {
            left: 50%;
            bottom: 20px;
            top: auto;
            transform: translateX(-50%);
            width: 320px;
            height: 60px;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 0 16px;
            border-radius: 30px;
            gap: 0;
          }
          
          .dock-indicator {
            display: none !important;
          }

          .dock-btn:hover {
            transform: none;
          }

          .dock-btn.active {
            transform: none;
          }

          /* Tooltip Mobile (Turn off or adjust) */
          .dock-tooltip {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .dock-nav {
            width: calc(100% - 30px);
            max-width: 290px;
          }
        }
      `}</style>

      <nav className="dock-nav" aria-label="Dock navigation">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="dock-item-container"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              // for touch devices to show tooltip briefly or handle active
              setHoveredItem(item.id);
              setTimeout(() => setHoveredItem(null), 1500);
            }}
          >
            <div className="dock-btn-wrapper">
              {/* Tooltip (Right side on desktop, top on mobile) */}
              <div className={`dock-tooltip ${hoveredItem === item.id ? 'show' : ''}`}>
                {item.label}
              </div>

              {/* Icon Button */}
              <a
                href={item.hash}
                className={`dock-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleClick(e, item)}
                aria-label={item.label}
              >
                <item.icon size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
        ))}
        {/* Decorative Indicator Line */}
        <div className="dock-indicator" />
      </nav>
    </>
  );
};

export default FloatingNav;
