import { useState, useEffect, useRef } from 'react';
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
import { motion } from 'framer-motion';
import profilePhoto from '../../assets/profile-photo.png';

/* ─── NAV items (used by left sidebar) ─── */
const NAV_ITEMS = [
  { id: 'home',     path: '/',         icon: HomeIcon,      label: 'Home' },
  { id: 'about',    path: '/about',    icon: User,          label: 'About' },
  { id: 'skills',   path: '/skills',   icon: LayoutGrid,    label: 'Skills' },
  { id: 'projects', path: '/projects', icon: BarChart2,     label: 'Projects' },
  { id: 'contact',  path: '/contact',  icon: MessageSquare, label: 'Contact' },
];

const Home = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  /* ── Matrix / particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };
    window.addEventListener('resize', resize);

    /* Seeded pseudo-random for stable layout */
    const rand = (() => {
      let s = 99;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    })();

    /* Tiny teal dots */
    const NUM_DOTS = 140;
    const dots = Array.from({ length: NUM_DOTS }, () => ({
      xFrac: rand(),
      yFrac: rand(),
      r: 0.6 + rand() * 1.2,
      opacity: 0.05 + rand() * 0.18,
    }));

    /* Diagonal hairlines */
    const NUM_LINES = 18;
    const lines = Array.from({ length: NUM_LINES }, () => ({
      x1Frac: rand(),
      y1Frac: rand(),
      len: 80 + rand() * 220,
      angle: 30 + rand() * 30,   // 30-60 deg diagonal
      opacity: 0.025 + rand() * 0.055,
    }));

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* diagonal lines */
      lines.forEach(ln => {
        const x1 = ln.x1Frac * W;
        const y1 = ln.y1Frac * H;
        const rad = (ln.angle * Math.PI) / 180;
        const x2 = x1 + Math.cos(rad) * ln.len;
        const y2 = y1 + Math.sin(rad) * ln.len;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(45,212,191,${ln.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      /* teal dots */
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.xFrac * W, d.yFrac * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${d.opacity})`;
        ctx.fill();
      });
    }

    draw();
    /* No animation loop needed for static texture */
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ── Active nav section derived from pathname ── */
  const activeNav = NAV_ITEMS.find(n => n.path === location.pathname)?.id ?? 'home';

  return (
    <div className="hp-root">
      <style>{`
        /* ═══════════════════════════════════════════
           CSS VARIABLES
        ═══════════════════════════════════════════ */
        :root {
          --bg-black:    #0a0e0f;
          --bg-card:     rgba(8,20,18,0.60);
          --teal-accent: #2dd4bf;
          --teal-glow:   rgba(45,212,191,0.35);
          --text-light:  #ffffff;
          --text-gray:   #cbd5e1;
          --text-muted:  #64748b;
          --border-teal: rgba(45,212,191,0.25);
        }

        /* ═══════════════════════════════════════════
           ROOT WRAPPER
        ═══════════════════════════════════════════ */
        .hp-root {
          position: fixed;
          inset: 0;
          background: var(--bg-black);
          color: var(--text-light);
          font-family: 'Poppins', 'Inter', sans-serif;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }

        /* ═══════════════════════════════════════════
           MATRIX CANVAS BACKGROUND
        ═══════════════════════════════════════════ */
        .hp-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Ambient teal radial glow right side */
        .hp-glow-r {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 65vw;
          height: 100vh;
          background: radial-gradient(ellipse at 75% 50%,
            rgba(13,148,136,0.22) 0%,
            rgba(6,82,76,0.10) 40%,
            transparent 72%);
          z-index: 1;
          pointer-events: none;
        }

        /* ═══════════════════════════════════════════
           LEFT VERTICAL SIDEBAR
        ═══════════════════════════════════════════ */
        .hp-sidebar {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 900;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: rgba(8,20,18,0.68);
          border: 1px solid var(--border-teal);
          border-radius: 40px;
          padding: 22px 0 20px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(45,212,191,0.08);
          width: 64px;
        }

        .hp-sb-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #64748b;
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
          background: rgba(45,212,191,0.09);
        }
        .hp-sb-btn.active {
          color: #040e0d;
          background: var(--teal-accent);
          box-shadow: 0 0 20px rgba(45,212,191,0.70);
        }

        /* Tooltip on hover */
        .hp-sb-tip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: rgba(8,20,18,0.95);
          border: 1px solid var(--teal-accent);
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

        /* Bottom teal scroll indicator */
        .hp-sb-line {
          width: 2px;
          height: 36px;
          background: linear-gradient(to bottom, var(--teal-accent), transparent);
          border-radius: 2px;
          margin-top: 8px;
        }

        /* ═══════════════════════════════════════════
           TOP-RIGHT SOCIAL BAR
        ═══════════════════════════════════════════ */
        .hp-socials-bar {
          position: fixed;
          top: 22px;
          right: 28px;
          z-index: 900;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hp-soc-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(8,20,18,0.72);
          border: 1px solid rgba(45,212,191,0.15);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          backdrop-filter: blur(10px);
        }
        .hp-soc-btn:hover {
          color: var(--teal-accent);
          border-color: rgba(45,212,191,0.45);
          box-shadow: 0 0 12px rgba(45,212,191,0.20);
        }

        .hp-cv-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          border-radius: 10px;
          background: rgba(8,20,18,0.72);
          border: 1.5px solid var(--teal-accent);
          color: var(--teal-accent);
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(10px);
          letter-spacing: 0.5px;
        }
        .hp-cv-btn:hover {
          background: rgba(45,212,191,0.12);
          box-shadow: 0 0 20px rgba(45,212,191,0.30);
        }

        /* ═══════════════════════════════════════════
           MAIN TWO-COLUMN HERO LAYOUT
        ═══════════════════════════════════════════ */
        .hp-main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 60px 0 110px;   /* left: account for sidebar */
          gap: 48px;
          overflow: hidden;
        }

        /* ═══════════════════════════════════════════
           LEFT CONTENT
        ═══════════════════════════════════════════ */
        .hp-left {
          flex: 0 0 45%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          animation: slideUpFadeIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Hello World badge */
        .hp-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          border: 1.5px solid var(--teal-accent);
          border-radius: 50px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--teal-accent);
          background: rgba(45,212,191,0.06);
          letter-spacing: 0.5px;
          align-self: flex-start;
          animation: slideUpFadeIn 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Name heading */
        .hp-name {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(3.2rem, 5.5vw, 5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--text-light);
          margin: 0;
          animation: slideUpFadeIn 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hp-name .teal { color: var(--teal-accent); }

        /* Sub-heading */
        .hp-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          color: var(--teal-accent);
          margin: 0;
          animation: slideUpFadeIn 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Description box */
        .hp-desc-box {
          border: 1.5px solid var(--border-teal);
          border-radius: 14px;
          background: rgba(8,20,18,0.42);
          backdrop-filter: blur(10px);
          padding: 18px 22px;
          animation: slideUpFadeIn 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hp-desc-box p {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--text-gray);
        }

        /* Stats row */
        .hp-stats {
          display: flex;
          gap: 36px;
          animation: slideUpFadeIn 0.8s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hp-stat-num {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          color: var(--text-light);
          line-height: 1;
          margin-bottom: 4px;
        }
        .hp-stat-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal-accent);
        }

        /* ═══════════════════════════════════════════
           RIGHT — HUD FRAME + PROFILE
        ═══════════════════════════════════════════ */
        .hp-right {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: slideUpFadeIn 1s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* HUD outer frame */
        .hud-frame {
          position: relative;
          width: min(420px, 42vw);
          height: min(520px, 75vh);
          flex-shrink: 0;
        }

        /* The octagon / rounded-rect border with corner cut brackets */
        .hud-border {
          position: absolute;
          inset: 0;
          border: 1.5px solid rgba(45,212,191,0.35);
          /* Clip corners at 45° for octagon effect */
          clip-path: polygon(
            28px 0%, calc(100% - 28px) 0%,
            100% 28px, 100% calc(100% - 28px),
            calc(100% - 28px) 100%, 28px 100%,
            0% calc(100% - 28px), 0% 28px
          );
          border-radius: 4px;
          z-index: 2;
          background: rgba(8,20,18,0.15);
          backdrop-filter: blur(6px);
        }

        /* Corner bracket overlays — top-left */
        .hud-corner {
          position: absolute;
          width: 36px;
          height: 36px;
          z-index: 5;
          animation: floatBracket 3.2s ease-in-out infinite;
        }
        .hud-corner.tl { top: -2px; left: -2px; }
        .hud-corner.tr { top: -2px; right: -2px; transform: scaleX(-1); }
        .hud-corner.bl { bottom: -2px; left: -2px; transform: scaleY(-1); }
        .hud-corner.br { bottom: -2px; right: -2px; transform: scale(-1,-1);
                          animation-delay: 1.6s; }

        @keyframes floatBracket {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(0, -5px); }
        }
        .hud-corner.tr { animation-delay: 0.4s; }
        .hud-corner.bl { animation-delay: 0.8s; }

        /* Profile image inside the HUD */
        .hud-profile-wrap {
          position: absolute;
          inset: 0;
          clip-path: polygon(
            28px 0%, calc(100% - 28px) 0%,
            100% 28px, 100% calc(100% - 28px),
            calc(100% - 28px) 100%, 28px 100%,
            0% calc(100% - 28px), 0% 28px
          );
          overflow: hidden;
          z-index: 1;
        }
        .hud-profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: brightness(0.75) saturate(0.85);
        }

        /* Subtle code scrolling text overlay */
        .hud-code-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.18;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: var(--teal-accent);
          line-height: 1.4;
          padding: 10px;
          animation: scrollCode 18s linear infinite;
          white-space: pre;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        @keyframes scrollCode {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }

        /* Teal ambient glow behind the image */
        .hud-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(ellipse at 50% 50%,
            rgba(45,212,191,0.12) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        /* ── Floating HUD Widgets around the frame ── */
        .hud-widget {
          position: absolute;
          background: rgba(6,16,14,0.80);
          border: 1px solid rgba(45,212,191,0.25);
          border-radius: 10px;
          padding: 10px 13px;
          backdrop-filter: blur(12px);
          z-index: 20;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          color: #94a3b8;
          pointer-events: none;
        }
        .hw-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--teal-accent);
          box-shadow: 0 0 6px var(--teal-accent);
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
        }
        .hw-title {
          color: var(--teal-accent);
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        /* Widget positions */
        .hw-chart { top: 60px; right: -90px; width: 100px; animation: floatUp 4s ease-in-out infinite; }
        .hw-drop  { bottom: 120px; right: -80px; width: 85px; animation: floatUp 5.1s 0.8s ease-in-out infinite; }
        .hw-cursor{ top: 180px; left: -95px; width: 90px; animation: floatUp 3.7s 0.4s ease-in-out infinite; }
        .hw-bell  { bottom: 60px;  left: -85px; width: 80px; animation: floatUp 4.4s 1.2s ease-in-out infinite; }

        @keyframes floatUp {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        /* ════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .hp-main { padding: 0 36px 0 100px; gap: 28px; }
          .hud-frame { width: min(360px, 40vw); height: min(460px, 70vh); }
          .hw-chart, .hw-drop { right: -70px; }
          .hw-cursor, .hw-bell { left: -75px; }
        }

        @media (max-width: 900px) {
          .hp-main {
            flex-direction: column-reverse;
            padding: 90px 28px 30px;
            overflow-y: auto;
            align-items: center;
          }
          .hp-left { flex: none; width: 100%; max-width: 520px; align-items: flex-start; }
          .hp-right { flex: none; width: 100%; }
          .hud-frame { width: min(300px, 70vw); height: min(380px, 55vw); }
          .hw-chart, .hw-drop, .hw-cursor, .hw-bell { display: none; }
        }

        @media (max-width: 600px) {
          .hp-sidebar {
            left: 50%; top: auto; bottom: 16px;
            transform: translateX(-50%);
            flex-direction: row;
            width: auto; height: 60px;
            padding: 0 18px;
            border-radius: 30px;
            gap: 6px;
          }
          .hp-sb-line { display: none; }
          .hp-sb-tip  { display: none; }
          .hp-socials-bar { top: 14px; right: 16px; gap: 7px; }
          .hp-soc-btn { width: 34px; height: 34px; border-radius: 8px; }
          .hp-cv-btn { padding: 6px 12px; font-size: 12px; }
          .hp-main { padding: 80px 16px 90px; }
        }
      `}</style>

      {/* ── Matrix / Particle canvas background ── */}
      <canvas ref={canvasRef} className="hp-canvas" />
      <div className="hp-glow-r" />

      {/* ════════════════════════════════════════════
          LEFT VERTICAL SIDEBAR
      ════════════════════════════════════════════ */}
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
              <item.icon size={20} strokeWidth={1.8} />
              <span className="hp-sb-tip">{item.label}</span>
            </Link>
          </div>
        ))}
        <div className="hp-sb-line" />
      </nav>

      {/* ════════════════════════════════════════════
          TOP-RIGHT SOCIAL ICONS BAR
      ════════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════════
          MAIN HERO — TWO COLUMN
      ════════════════════════════════════════════ */}
      <main className="hp-main" id="home">

        {/* ── LEFT CONTENT BLOCK ── */}
        <section className="hp-left" aria-label="Introduction">

          {/* Hello World badge */}
          <div className="hp-badge">&lt;Hello World/&gt;</div>

          {/* Name heading */}
          <h1 className="hp-name">
            AGALYA <span className="teal">G</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hp-subtitle">Full Stack Developer</h2>

          {/* Description box */}
          <div className="hp-desc-box">
            <p>
              Designing high-performance, cinematic interactive digital
              environments, scalable databases, and SaaS application portals.
              Merging mathematical layout physics with state-of-the-art WebGL.
            </p>
          </div>

          {/* Stats */}
          <div className="hp-stats" role="list" aria-label="Experience statistics">
            <div role="listitem">
              <div className="hp-stat-num">3+</div>
              <div className="hp-stat-lbl">Years Exp.</div>
            </div>
            <div role="listitem">
              <div className="hp-stat-num">20+</div>
              <div className="hp-stat-lbl">Projects</div>
            </div>
            <div role="listitem">
              <div className="hp-stat-num">100%</div>
              <div className="hp-stat-lbl">Dedication</div>
            </div>
          </div>
        </section>

        {/* ── RIGHT HUD FRAME ── */}
        <div className="hp-right" aria-label="Profile image panel">
          <div className="hud-frame">

            {/* Ambient glow */}
            <div className="hud-glow" />

            {/* Profile image clipped to octagon */}
            <div className="hud-profile-wrap">
              <img src={profilePhoto} alt="Agalya G — Full Stack Developer" className="hud-profile-img" />
            </div>

            {/* Scrolling code overlay */}
            <div className="hud-code-overlay" aria-hidden="true">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>{`const deploy = async () => {
  await build({ env: 'prod' });
  const res = await api.post('/deploy');
  if (res.status === 200) notify('Live!');
};
function init(ctx) {
  ctx.clearRect(0,0,W,H);
  drawGrid(ctx, 16);
}
export default App;
// stack: React · Node · WebGL
const db = supabase.from('projects');
let data = await db.select('*');
return data.map(p => <Card key={p.id} {...p}/>);
useEffect(() => { animate(frame); },[]);
`}</div>
              ))}
            </div>

            {/* Teal corner bracket SVGs */}
            {['tl','tr','bl','br'].map(pos => (
              <svg key={pos} className={`hud-corner ${pos}`} viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <polyline
                  points="0,20 0,0 20,0"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#cglow)"
                />
                <defs>
                  <filter id="cglow">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
              </svg>
            ))}

            {/* HUD main border */}
            <div className="hud-border" />

            {/* ── Floating HUD Widgets ── */}
            <motion.div className="hud-widget hw-chart" animate={{ y: [0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease:'easeInOut' }}>
              <div className="hw-title"><span className="hw-dot"/>Chart</div>
              <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
                {[4,12,7,18,10,22,14,20,9,25].map((h,i)=>(
                  <rect key={i} x={i*7} y={28-h} width="5" height={h} rx="1.5"
                    fill={`rgba(45,212,191,${0.25+i*0.07})`}/>
                ))}
              </svg>
            </motion.div>

            <motion.div className="hud-widget hw-cursor" animate={{ y: [0,8,0] }} transition={{ duration: 3.7, repeat: Infinity, ease:'easeInOut', delay:0.4 }}>
              <div className="hw-title"><span className="hw-dot" style={{background:'#f43f5e',boxShadow:'0 0 6px #f43f5e'}}/>Pointer</div>
              <div style={{color:'#fff',fontSize:'11px'}}>x: 847<br/>y: 412</div>
            </motion.div>

            <motion.div className="hud-widget hw-drop" animate={{ y: [0,-7,0] }} transition={{ duration: 5.1, repeat: Infinity, ease:'easeInOut', delay:0.8 }}>
              <div className="hw-title"><span className="hw-dot" style={{background:'#60a5fa',boxShadow:'0 0 6px #60a5fa'}}/>Droplet</div>
              <div style={{color:'#fff',fontSize:'11px'}}>78%</div>
            </motion.div>

            <motion.div className="hud-widget hw-bell" animate={{ y: [0,6,0] }} transition={{ duration: 4.4, repeat: Infinity, ease:'easeInOut', delay:1.2 }}>
              <div className="hw-title"><span className="hw-dot" style={{background:'#fbbf24',boxShadow:'0 0 6px #fbbf24'}}/>Alert</div>
              <div style={{color:'#fff',fontSize:'11px'}}>3 new</div>
            </motion.div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
