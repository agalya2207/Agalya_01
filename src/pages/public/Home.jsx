import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  LayoutGrid,
  BarChart2,
  MessageSquare,
  Instagram,
  Mail,
  Linkedin,
  FileText,
  Flag,
} from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';
import HeroVisual from '../../components/HeroVisual.jsx';
import techBg from '../../assets/tech-bg.png';

/* ─── NAV items (used by left sidebar) ─── */
const NAV_ITEMS = [
  { id: 'home',     path: '/',         icon: HomeIcon,      label: 'Home' },
  { id: 'about',    path: '/about',    icon: User,          label: 'About' },
  { id: 'skills',   path: '/skills',   icon: LayoutGrid,    label: 'Skills' },
  { id: 'projects', path: '/projects', icon: BarChart2,     label: 'Projects' },
  { id: 'contact',  path: '/contact',  icon: MessageSquare, label: 'Contact' },
];

/* ─── CountUp Component for stats animation ─── */
const CountUp = ({ end, duration = 2.0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endNum = parseInt(end, 10);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * endNum));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  const isPercent = end.includes('%');
  const isPlus = end.includes('+');

  return (
    <span>
      {count}
      {isPlus && '+'}
      {isPercent && '%'}
    </span>
  );
};

const Home = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  /* ── Particle canvas + low opacity beams ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 140 tiny teal dots drifting randomly (10-25% opacity)
    const NUM_DOTS = 140;
    const dots = Array.from({ length: NUM_DOTS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 1.5,
      opacity: 0.10 + Math.random() * 0.15,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    // 3 very faint thin diagonal light lines (2-4% opacity)
    const NUM_BEAMS = 3;
    const beams = Array.from({ length: NUM_BEAMS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 400 + Math.random() * 400,
      angle: -30 + (Math.random() - 0.5) * 8,
      opacity: 0.02 + Math.random() * 0.02,
      speed: 0.04 + Math.random() * 0.04,
    }));

    function animateLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw beams
      beams.forEach(b => {
        ctx.beginPath();
        const rad = (b.angle * Math.PI) / 180;
        const x2 = b.x + Math.cos(rad) * b.len;
        const y2 = b.y + Math.sin(rad) * b.len;
        ctx.strokeStyle = `rgba(45,212,191,${b.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        b.x += b.speed;
        b.y -= b.speed * 0.5;
        if (b.x > canvas.width) b.x = -b.len;
        if (b.y < -b.len) b.y = canvas.height;
      });

      // Draw dots
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${d.opacity})`;
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
      });

      animId = requestAnimationFrame(animateLoop);
    }

    animateLoop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const activeNav = NAV_ITEMS.find(n => n.path === location.pathname)?.id ?? 'home';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="hp-root">
      <style>{`
        :root {
          --bg-black:    #05080a;
          --teal-accent: #2dd4bf;
          --text-light:  #ffffff;
          --text-gray:   #c8d1d1;
          --border-teal: rgba(45,212,191,0.1);
        }

        .hp-root {
          position: fixed;
          inset: 0;
          background: var(--bg-black);
          background-image: 
            linear-gradient(to right, rgba(5, 8, 10, 0.85) 0%, rgba(5, 8, 10, 0.45) 50%, rgba(5, 8, 10, 0.2) 100%),
            url(${techBg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: var(--text-light);
          font-family: 'Poppins', 'Inter', sans-serif;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }

        .hp-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* ═══════════════════════════════════════════
           LEFT FLOATING SIDEBAR
        ═══════════════════════════════════════════ */
        .hp-sidebar {
          position: fixed;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 900;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: rgba(20,25,25,0.6);
          border: 1px solid rgba(45,212,191,0.1);
          border-radius: 30px;
          padding: 24px 0 20px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          width: 64px;
        }

        .hp-sb-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #5a6a68;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.28s ease;
          text-decoration: none;
          position: relative;
        }
        
        .hp-sb-btn:hover {
          color: var(--teal-accent);
        }

        /* Glowing circle behind active button */
        .hp-sb-glow-active {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(45,212,191,0.15);
          box-shadow: 0 0 15px 5px rgba(45,212,191,0.3);
          z-index: -1;
          pointer-events: none;
        }

        .hp-sb-btn.active {
          color: var(--teal-accent);
        }

        .hp-sb-tip {
          position: absolute;
          left: calc(100% + 16px);
          top: 50%;
          transform: translateY(-50%);
          background: rgba(20,25,25,0.95);
          border: 1px solid rgba(45,212,191,0.25);
          color: var(--teal-accent);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .hp-sb-btn:hover .hp-sb-tip { opacity: 1; }

        .hp-sb-line {
          width: 2px;
          height: 30px;
          background: var(--teal-accent);
          border-radius: 2px;
          margin-top: 8px;
          animation: pulseLine 2s infinite ease-in-out;
        }

        @keyframes pulseLine {
          0%, 100% { opacity: 0.3; transform: scaleY(0.9); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }

        /* ═══════════════════════════════════════════
           TOP-RIGHT SOCIAL BAR & CV
        ═══════════════════════════════════════════ */
        .hp-socials-bar {
          position: fixed;
          top: 32px;
          right: 32px;
          z-index: 900;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hp-soc-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: none;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .hp-soc-btn:hover {
          color: var(--teal-accent);
          box-shadow: 0 0 10px rgba(45,212,191,0.2);
        }

        .hp-cv-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--teal-accent);
          color: var(--teal-accent);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.5px;
        }
        .hp-cv-btn:hover {
          background: rgba(45,212,191,0.1);
          box-shadow: 0 0 20px rgba(45,212,191,0.25);
        }

        /* ═══════════════════════════════════════════
           MAIN HERO GRID LAYOUT
        ═══════════════════════════════════════════ */
        .hp-main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 0 10% 0 160px;
          height: 100vh;
          width: 100%;
        }

        /* ═══════════════════════════════════════════
           LEFT CONTENT
        ═══════════════════════════════════════════ */
        .hp-left {
          display: flex;
          flex-direction: column;
          gap: 22px;
          z-index: 5;
          justify-content: center;
        }

        .hp-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          border: 1px solid var(--teal-accent);
          border-radius: 50px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--teal-accent);
          background: rgba(45,212,191,0.05);
          letter-spacing: 0.5px;
          align-self: flex-start;
        }

        .hp-name {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }
        .hp-name .teal { color: var(--teal-accent); }

        .hp-subtitle {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--teal-accent);
          margin: 0;
          margin-top: -6px;
        }

        .hp-desc-box {
          border: 1px solid rgba(45,212,191,0.35);
          border-radius: 12px;
          background: rgba(10,20,20,0.3);
          backdrop-filter: blur(8px);
          padding: 24px;
          max-width: 540px;
        }
        .hp-desc-box p {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-gray);
        }

        /* Stats */
        .hp-stats {
          display: flex;
          gap: 48px;
          margin-top: 8px;
        }
        .hp-stat-num {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 6px;
        }
        .hp-stat-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--teal-accent);
        }

        @media (max-width: 900px) {
          .hp-root {
            background-image: 
              linear-gradient(to bottom, rgba(5, 8, 10, 0.4) 0%, rgba(5, 8, 10, 0.85) 60%, rgba(5, 8, 10, 0.95) 100%),
              url(${techBg});
          }
          .hp-main {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 40px;
            padding: 100px 32px 100px 32px;
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
            justify-content: center;
          }
          .hp-left {
            align-items: center;
            text-align: center;
            order: 2;
          }
          .hp-right-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            order: 1;
            width: 100%;
          }
          .hp-desc-box {
            margin: 0 auto;
          }
          .hp-badge {
            align-self: center;
          }
          .hp-stats {
            justify-content: center;
            gap: 36px;
          }
          .hp-sidebar {
            left: 50%;
            top: auto;
            bottom: 24px;
            transform: translateX(-50%);
            flex-direction: row;
            width: auto;
            height: 60px;
            padding: 0 24px;
            border-radius: 30px;
            gap: 12px;
          }
          .hp-sb-line {
            display: none;
          }
          .hp-sb-tip {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hp-main {
            padding: 90px 16px 110px 16px;
          }
          .hp-socials-bar {
            top: 20px;
            right: 20px;
          }
          .hp-cv-btn {
            padding: 6px 14px;
            font-size: 12px;
          }
          .hp-soc-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      {/* Particle background */}
      <canvas ref={canvasRef} className="hp-canvas" />

      {/* Left Sidebar */}
      <nav className="hp-sidebar" aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <div key={item.id} style={{ position: 'relative' }}>
            <Link
              to={item.path}
              className={`hp-sb-btn${activeNav === item.id ? ' active' : ''}`}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              aria-label={item.label}
            >
              {activeNav === item.id && <div className="hp-sb-glow-active" />}
              <item.icon size={20} strokeWidth={1.8} />
              <span className="hp-sb-tip">{item.label}</span>
            </Link>
          </div>
        ))}
        <div className="hp-sb-line" />
      </nav>

      {/* Top-Right Social Bar */}
      <div className="hp-socials-bar" role="complementary" aria-label="Social links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hp-soc-btn" aria-label="Instagram">
          <Instagram size={17} strokeWidth={1.6} />
        </a>
        <Link to="/contact" className="hp-soc-btn" aria-label="Email">
          <Mail size={17} strokeWidth={1.6} />
        </Link>
        <a href="https://www.linkedin.com/in/agalya-g-96106337b" target="_blank" rel="noopener noreferrer" className="hp-soc-btn" aria-label="LinkedIn">
          <Linkedin size={17} strokeWidth={1.6} />
        </a>
        <Link to="/contact" className="hp-soc-btn" aria-label="Messages">
          <MessageSquare size={17} strokeWidth={1.6} />
        </Link>
        <button className="hp-soc-btn" aria-label="Report" style={{ cursor: 'default' }}>
          <Flag size={17} strokeWidth={1.6} />
        </button>
        <a href="/resume.pdf" download className="hp-cv-btn" aria-label="Download CV">
          <FileText size={16} strokeWidth={1.8} />
          CV
        </a>
      </div>

      {/* Two column Grid Layout */}
      <main className="hp-main" id="home">
        {/* Left side text items */}
        <motion.section
          className="hp-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Introduction"
        >
          <motion.div className="hp-badge" variants={itemVariants}>
            &lt;Hello World/&gt;
          </motion.div>

          <motion.h1 className="hp-name" variants={itemVariants}>
            AGALYA <span className="teal">G</span>
          </motion.h1>

          <motion.h2 className="hp-subtitle" variants={itemVariants}>
            Full Stack Developer
          </motion.h2>

          <motion.div className="hp-desc-box" variants={itemVariants}>
            <p>
              Designing high-performance, cinematic interactive digital environments,
              scalable databases, and SaaS application portals. Merging mathematical layout
              physics with state-of-the-art WebGL.
            </p>
          </motion.div>

          {/* Stats count-up blocks */}
          <motion.div className="hp-stats" role="list" aria-label="Experience statistics" variants={itemVariants}>
            <div role="listitem">
              <div className="hp-stat-num">
                <CountUp end="3+" />
              </div>
              <div className="hp-stat-lbl">Years Exp.</div>
            </div>
            <div role="listitem">
              <div className="hp-stat-num">
                <CountUp end="20+" />
              </div>
              <div className="hp-stat-lbl">Projects</div>
            </div>
            <div role="listitem">
              <div className="hp-stat-num">
                <CountUp end="100%" />
              </div>
              <div className="hp-stat-lbl">Dedication</div>
            </div>
          </motion.div>
        </motion.section>

        {/* Right side Visual container */}
        <div className="hp-right-wrap">
          <HeroVisual />
        </div>
      </main>
    </div>
  );
};

export default Home;
