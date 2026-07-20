import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Code2, Database, Layers, Shield, Rocket, Brain } from 'lucide-react';

/* ─────────────────────────────────────────
   LEFT CARDS DATA (unchanged)
───────────────────────────────────────── */
const SKILLS_DATA = [
  { title: 'Frontend Development', description: 'Building modern responsive web applications using component-based architecture, strong typing, and scalable frontend patterns.', tags: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Vite'], icon: Code2 },
  { title: 'Backend & Database', description: 'Designing scalable Supabase-powered backends with authentication, relational databases, and schema management.', tags: ['Supabase', 'PostgreSQL', 'Auth', 'Node.js'], icon: Database },
  { title: 'System Architecture', description: 'Creating scalable application structures, role-based access systems, admin dashboards, and maintainable project architecture.', tags: ['Admin Panel', 'Routing', 'Context API', 'Supabase SDK'], icon: Layers },
  { title: 'Security & Data Protection', description: 'Implementing secure authentication, row-level security policies, access controls, and environment-based configuration.', tags: ['RLS Policies', 'Auth Guards', 'Access Control', 'Env Config'], icon: Shield },
  { title: 'Deployment & Tools', description: 'Managing production deployments, version control workflows, and modern development pipelines.', tags: ['Vercel', 'Git', 'GitHub'], icon: Rocket },
  { title: 'AI-Powered Development', description: 'Python automation, data workflows, and leveraging AI tools for rapid prototyping, debugging, and architecture planning.', tags: ['Python', 'Pandas', 'NumPy', 'Claude', 'DeepSeek', 'Antigravity IDE'], icon: Brain }
];

/* ─────────────────────────────────────────
   SVG BRAND ICONS
───────────────────────────────────────── */
const IconReact = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <circle cx="20" cy="20" r="4" fill="#61DAFB"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
  </svg>
);
const IconPython = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M20 5C13 5 13.5 8 13.5 8V12h7v1H10.5S5 12.5 5 19s4.5 7 4.5 7H12v-3.5S11.8 18 15 18h9s4.5.1 4.5-4V9.5S29 5 20 5z" fill="#3776AB"/>
    <path d="M20 35c7 0 6.5-3 6.5-3V28h-7v-1h10S35 27.5 35 21s-4.5-7-4.5-7H28v3.5S28.2 22 25 22h-9s-4.5-.1-4.5 4V30.5S11 35 20 35z" fill="#FFD43B"/>
    <circle cx="17" cy="9" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="23" cy="31" r="1.5" fill="white" opacity="0.9"/>
  </svg>
);
const IconJS = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <rect x="2" y="2" width="36" height="36" rx="4" fill="#F7DF1E"/>
    <path d="M22 28.5c0 3.5 2 5 5 5 3.2 0 5.2-1.7 5.2-4.9V14h-3.5v14.5c0 1.5-.6 2-1.6 2-1.1 0-1.6-.8-1.6-1.8L22 28.5z" fill="#323330"/>
    <path d="M12.5 33.5c-3.5 0-5.5-1.7-6.5-4l3-1.8c.7 1.3 1.7 2.2 3.3 2.2 1.5 0 2.3-.7 2.3-1.8 0-1.3-1-1.7-2.7-2.4l-.9-.4C8.5 24.2 7 22.7 7 19.8c0-2.8 2.1-4.8 5.4-4.8 2.3 0 4 .8 5.2 2.9l-2.9 1.9c-.6-1.1-1.3-1.5-2.3-1.5-1.1 0-1.7.6-1.7 1.5 0 1 .7 1.4 2.3 2l.9.4c3 1.3 4.5 2.7 4.5 5.7 0 3.2-2.5 5.6-6.9 5.6z" fill="#323330"/>
  </svg>
);
const IconTS = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <rect x="2" y="2" width="36" height="36" rx="4" fill="#3178C6"/>
    <path d="M21 20h5v3h-5v9h-3.5V23H14v-3h7z" fill="white"/>
    <path d="M26.5 22.5c.8.5 2 1.3 2 3 0 2.2-1.8 3.5-4.2 3.5-1.5 0-3-.6-4-1.7l2-2c.6.7 1.4 1 2 1 .8 0 1.2-.3 1.2-.8 0-.6-.6-.9-1.5-1.3l-.6-.3C22 23 21 21.7 21 20c0-2.1 1.8-3.5 4-3.5 1.4 0 2.8.6 3.5 1.7l-2 1.8c-.5-.6-1-.9-1.5-.9-.7 0-1 .3-1 .7 0 .5.5.8 1.4 1.2l1.1.5z" fill="white"/>
  </svg>
);
const IconNode = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="#43853D"/>
    <path d="M20 8l12 7v14l-12 7-12-7V15L20 8z" fill="#5BA741"/>
    <text x="20" y="23" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="white" textAnchor="middle">Node</text>
  </svg>
);
const IconGit = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M37.5 18.3L21.7 2.5a2.4 2.4 0 00-3.4 0l-3.3 3.4 4.2 4.2a2.8 2.8 0 013.5 3.5l4 4a2.8 2.8 0 11-1.6 1.6l-3.7-3.7v9.8a2.8 2.8 0 11-3.3.3V15.1a2.8 2.8 0 01-1.5-3.6l-4.1-4.1L2.5 17.1a2.4 2.4 0 000 3.4L18.3 36.3a2.4 2.4 0 003.4 0L37.5 21.7a2.4 2.4 0 000-3.4z" fill="#F05032"/>
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <circle cx="20" cy="20" r="18" fill="#24292E"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 4C11.2 4 4 11.2 4 20c0 7.1 4.6 13.1 11 15.2.8.1 1.1-.4 1.1-.8V31c-4.5 1-5.4-2.2-5.4-2.2-.7-1.9-1.8-2.4-1.8-2.4-1.5-1 .1-1 .1-1 1.6.1 2.4 1.6 2.4 1.6 1.4 2.4 3.7 1.7 4.6 1.3.1-1 .6-1.7 1-2.1-3.6-.4-7.3-1.8-7.3-8 0-1.8.6-3.2 1.6-4.4-.2-.4-.7-2.1.2-4.3 0 0 1.3-.4 4.4 1.6a15.2 15.2 0 018 0c3.1-2 4.4-1.6 4.4-1.6.9 2.2.3 3.9.2 4.3 1 1.1 1.6 2.6 1.6 4.4 0 6.2-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3V34c0 .5.3.9 1.1.8C31.4 33.1 36 27.1 36 20c0-8.8-7.2-16-16-16z" fill="white"/>
  </svg>
);
const IconPostgres = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <ellipse cx="20" cy="12" rx="14" ry="7" fill="#336791"/>
    <path d="M6 12v10c0 3.9 6.3 7 14 7s14-3.1 14-7V12" fill="#336791"/>
    <ellipse cx="20" cy="12" rx="14" ry="7" fill="#4990C6"/>
    <ellipse cx="20" cy="12" rx="14" ry="7" fill="#4990C6" opacity="0.7"/>
    <text x="20" y="16" fontFamily="Arial" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">PGSQL</text>
    <text x="20" y="25" fontFamily="Arial" fontSize="5" fill="rgba(255,255,255,0.7)" textAnchor="middle">database</text>
  </svg>
);
const IconSupabase = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M22 4L6 24h13l-2 12L36 16H23l2-12z" fill="#3ECF8E"/>
    <path d="M22 4L6 24h13l-2 12L36 16H23l2-12z" fill="url(#sbGrad)" opacity="0.5"/>
    <defs><linearGradient id="sbGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1C1C1C"/><stop offset="100%" stopColor="#3ECF8E" stopOpacity="0"/></linearGradient></defs>
  </svg>
);
const IconVite = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M38 6L21 37l-3-14L4 15l34-9z" fill="#646CFF"/>
    <path d="M18 23l3 14L38 6 18 23z" fill="#9B9DFF" opacity="0.7"/>
    <path d="M4 15l14 8-3-14L4 15z" fill="#FF7D4E"/>
  </svg>
);
const IconTailwind = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M20 10c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.28 1.96 1.1 2.86 2.01C22.03 17.27 23.57 19 27 19c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.28-1.96-1.1-2.86-2.01C24.97 11.73 23.43 10 20 10zM13 20c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.28 1.96 1.1 2.86 2.01C15.03 27.27 16.57 29 20 29c4 0 6.5-2 7.5-6-1.5 2-3.25-2.75-5.25 2.25-1.14-.28-1.96-1.1-2.86-2.01C17.97 21.73 16.43 20 13 20z" fill="#38BDF8"/>
  </svg>
);
const IconHTML5 = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M5 3l2.5 28L20 35l12.5-4L35 3H5z" fill="#E34F26"/>
    <path d="M20 32.5l10.2-2.8 2.1-23.7H20v26.5z" fill="#EF652A"/>
    <path d="M20 17H13l.4 4h6.6v4h-7l.5 5.5 6.5 1.8V28h5.3l.6-6.5H20V17z" fill="white" opacity="0.95"/>
    <path d="M20 17v4h4.9l-.5 5.5-4.4 1.2V32l7.2-2-.8-9H20z" fill="white"/>
    <path d="M20 12H12l.3 3H20v-3zM20 12v3h8l-.3-3H20z" fill="white" opacity="0.95"/>
  </svg>
);
const IconCSS3 = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <path d="M5 3l2.5 28L20 35l12.5-4L35 3H5z" fill="#1572B6"/>
    <path d="M20 32.5l10.2-2.8 2.1-23.7H20v26.5z" fill="#33A9DC"/>
    <path d="M26 17h-6v-4h-7l.3 3H20v4h5.6l-.6 6-5 1.4V31l7.2-2L27 17z" fill="white"/>
    <path d="M13 17h7v4h-6.6l.3 4H20v4l-6.5-1.8-.5-5.5H20V17H13z" fill="white" opacity="0.95"/>
    <path d="M20 12H12l.3 3H20v-3zM20 12v3h8l-.3-3H20z" fill="white" opacity="0.95"/>
  </svg>
);

/* ─────────────────────────────────────────
   TECH CLOUD DEFINITIONS (flat list)
───────────────────────────────────────── */
const TECH_CLOUD = [
  { name: 'React',       Icon: IconReact,    level: 'Advanced' },
  { name: 'Node.js',     Icon: IconNode,     level: 'Advanced' },
  { name: 'TypeScript',  Icon: IconTS,       level: 'Advanced' },
  { name: 'Supabase',    Icon: IconSupabase, level: 'Intermediate' },
  { name: 'Git',         Icon: IconGit,      level: 'Advanced' },
  { name: 'GitHub',      Icon: IconGitHub,   level: 'Advanced' },
  { name: 'Vite',        Icon: IconVite,     level: 'Advanced' },
  { name: 'PostgreSQL',  Icon: IconPostgres, level: 'Advanced' },
  { name: 'Python',      Icon: IconPython,   level: 'Advanced' },
  { name: 'JavaScript',  Icon: IconJS,       level: 'Expert' },
  { name: 'Tailwind CSS',Icon: IconTailwind, level: 'Expert' },
  { name: 'HTML5',       Icon: IconHTML5,    level: 'Expert' },
  { name: 'CSS3',        Icon: IconCSS3,     level: 'Expert' }
];

/* ─────────────────────────────────────────
   ORBIT RING CONFIG
   radius = % of half the smaller stage dimension
   speed  = degrees per frame (~60fps)
   dir    = 1 CW, -1 CCW
───────────────────────────────────────── */
const RINGS = [
  { radius: 0.16, speed: 0.28, dir: 1  },   // inner  – CW  fast
  { radius: 0.28, speed: -0.18, dir: -1 },   // middle – CCW medium
  { radius: 0.40, speed: 0.12, dir: 1  },    // outer  – CW  slow
];

/* Which TECH_CLOUD index sits on which ring, evenly spaced */
const RING_MEMBERS = [
  [0, 9, 2, 8],        // Ring 0 (inner):  React, JavaScript, TypeScript, Python
  [1, 3, 6, 7, 10],   // Ring 1 (middle): Node.js, Supabase, Vite, PostgreSQL, Tailwind
  [4, 5, 11, 12],     // Ring 2 (outer):  Git, GitHub, HTML5, CSS3
];

/* Pre-compute flat orbit list with starting angles */
const ORBIT_NODES = [];
RING_MEMBERS.forEach((members, ringIdx) => {
  const step = 360 / members.length;
  members.forEach((techIdx, j) => {
    ORBIT_NODES.push({ techIdx, ring: ringIdx, startAngle: step * j });
  });
});

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const SkillsMainframe = () => {
  const canvasRef     = useRef(null);
  const orbitElsRef   = useRef([]);          // DOM refs for each orbit node
  const anglesRef     = useRef(ORBIT_NODES.map(n => n.startAngle));
  const pausedSetRef  = useRef(new Set());   // indices currently paused
  const activeRef     = useRef(null);        // mirrors activeOrbit for rAF
  const hideTimerRef  = useRef(null);
  const [activeOrbit, setActiveOrbit] = useState(null); // orbit-index or null

  /* ── Tap / hover handlers ── */
  const activate = useCallback((idx) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const prev = activeRef.current;
    if (prev !== null && prev !== idx) pausedSetRef.current.delete(prev);
    activeRef.current = idx;
    setActiveOrbit(idx);
    pausedSetRef.current.add(idx);
    hideTimerRef.current = setTimeout(() => {
      pausedSetRef.current.delete(idx);
      activeRef.current = null;
      setActiveOrbit(null);
    }, 2000);
  }, []);

  const deactivate = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const prev = activeRef.current;
    if (prev !== null) pausedSetRef.current.delete(prev);
    activeRef.current = null;
    setActiveOrbit(null);
  }, []);

  const handleTap = useCallback((e, idx) => {
    e.stopPropagation();
    activate(idx);
  }, [activate]);

  const handleTouch = useCallback((e, idx) => {
    e.preventDefault();          // prevent subsequent click on mobile
    e.stopPropagation();
    activate(idx);
  }, [activate]);

  /* ── Orbit animation (rAF) ── */
  useEffect(() => {
    let raf;
    const tick = () => {
      const angles = anglesRef.current;
      const paused = pausedSetRef.current;
      ORBIT_NODES.forEach((node, i) => {
        if (!paused.has(i)) {
          const ring = RINGS[node.ring];
          angles[i] = (angles[i] + ring.speed * ring.dir) % 360;
        }
        const el = orbitElsRef.current[i];
        if (!el) return;
        const ring = RINGS[node.ring];
        const rad  = (angles[i] * Math.PI) / 180;
        const x = 50 + ring.radius * 100 * Math.cos(rad);
        const y = 50 + ring.radius * 100 * Math.sin(rad);
        el.style.left = x + '%';
        el.style.top  = y + '%';
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Canvas: ambient particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener('resize', resize);

    const PCOUNT = 60;
    const makeParticle = () => ({
      x: Math.random() * (W || 400), y: Math.random() * (H || 400),
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.3, alpha: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.5 ? 270 : 192, phase: Math.random() * Math.PI * 2
    });
    const particles = Array.from({ length: PCOUNT }, makeParticle);

    let raf, t = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      /* Ambient glow */
      const cx = W * 0.5, cy = H * 0.5;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55);
      g.addColorStop(0, 'rgba(168,85,247,0.06)');
      g.addColorStop(0.5, 'rgba(168,85,247,0.02)');
      g.addColorStop(1, 'rgba(168,85,247,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      /* Floating particles */
      particles.forEach(p => {
        p.x += p.vx + Math.sin(t * 2 + p.phase) * 0.15;
        p.y += p.vy + Math.cos(t * 1.7 + p.phase) * 0.15;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        const a = Math.max(0.05, Math.min(0.7, p.alpha + Math.sin(t * 3 + p.phase) * 0.12));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,78%,${a})`;
        ctx.shadowColor = `hsla(${p.hue},80%,80%,0.6)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Render ─── */
  return (
    <section id="skills" className="sm-root" onClick={deactivate}>
      <style>{CSS}</style>

      <div className="sm-header">
        <h2 className="sm-title">SKILLS MAINFRAME</h2>
        <div className="sm-underline" />
      </div>

      <div className="sm-cols">
        {/* LEFT: Cards */}
        <div className="sm-grid">
          {SKILLS_DATA.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div key={i} className="sm-card">
                <div className="sm-card-head">
                  <div className="sm-icon-box"><Icon size={16} strokeWidth={1.5} /></div>
                  <h3 className="sm-card-title">{skill.title}</h3>
                </div>
                <p className="sm-card-desc">{skill.description}</p>
                <div className="sm-tags">
                  {skill.tags.map((t, j) => <span key={j} className="sm-tag">{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Holographic Cloud Matrix */}
        <div className="sm-matrix">

          <div className="sm-topbar">
            <span className="sm-bar-label sm-blink">[ SKILLS_MATRIX : ACTIVE ]</span>
            <span className="sm-bar-label">HOLO_PROJECTION</span>
          </div>

          <div className="sm-stage" onClick={deactivate}>
            <canvas ref={canvasRef} className="sm-canvas" />

            {/* Concentric ring traces */}
            {RINGS.map((ring, i) => (
              <div key={i} className="sm-ring-trace" style={{
                width:  `${ring.radius * 200}%`,
                height: `${ring.radius * 200}%`,
              }} />
            ))}

            {/* Center "Skills Core" node */}
            <div className="sm-orbit-center">
              <div className="sm-orbit-center-pulse" />
              <div className="sm-orbit-center-disc">
                <svg viewBox="0 0 28 28" width="22" height="22"><path d="M14 2l3 6 6.5 1-4.7 4.6 1.1 6.5L14 17l-5.9 3.1 1.1-6.5L4.5 9l6.5-1L14 2z" fill="#C084FC" opacity="0.9"/></svg>
              </div>
              <span className="sm-orbit-center-label">SKILLS CORE</span>
            </div>

            {/* Orbiting tech icons */}
            {ORBIT_NODES.map((node, i) => {
              const tech = TECH_CLOUD[node.techIdx];
              const isActive = activeOrbit === i;
              return (
                <div
                  key={tech.name}
                  ref={el => orbitElsRef.current[i] = el}
                  className={`sm-orbit-node${isActive ? ' is-active' : ''}`}
                  onClick={e => handleTap(e, i)}
                  onTouchStart={e => handleTouch(e, i)}
                  onMouseEnter={() => activate(i)}
                  onMouseLeave={deactivate}
                >
                  <div className="sm-orbit-ring" />
                  <div className="sm-orbit-disc">
                    <tech.Icon />
                  </div>
                  {isActive && (
                    <div className="sm-orbit-label">
                      <b>{tech.name}</b>
                      <span>{tech.level}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sm-footer">INTERACTIVE TECHNOLOGY CLOUD</div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const CSS = `
  /* Root */
  .sm-root {
    width:100%; height:calc(100vh - 110px); display:flex; flex-direction:column; gap:8px;
    position:relative; z-index:10; overflow:hidden; padding:0; box-sizing:border-box;
  }

  /* Header */
  .sm-header { flex-shrink:0; }
  .sm-title {
    font-family:'Poppins','Inter',sans-serif; font-size:2.2rem; font-weight:800;
    color:#fff; margin:0; letter-spacing:2px; text-transform:uppercase;
    text-shadow:0 0 20px rgba(168,85,247,0.5);
  }
  .sm-underline {
    width:80px; height:3px; background:#A855F7; border-radius:2px;
    margin:8px 0 0; box-shadow:0 0 15px rgba(168,85,247,0.6);
  }

  /* Two-column */
  .sm-cols { display:flex; flex-direction:row; gap:10px; width:100%; flex:1; min-height:0; align-items:stretch; }

  /* LEFT Cards */
  .sm-grid { flex:0 0 56%; display:grid; grid-template-columns:repeat(2,1fr); grid-template-rows:repeat(3,1fr); gap:8px; height:100%; }
  .sm-card {
    background:rgba(10,15,30,0.4); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
    border:1px solid rgba(168,85,247,0.18); border-radius:12px; padding:8px 10px;
    transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275); position:relative; overflow:hidden;
    box-shadow:inset 0 0 20px rgba(168,85,247,0.04),0 4px 15px rgba(0,0,0,0.2);
    display:flex; flex-direction:column; justify-content:space-between; gap:3px;
  }
  .sm-card::before {
    content:''; position:absolute; inset:0; border-radius:12px; padding:1px;
    background:linear-gradient(135deg,rgba(168,85,247,0.4) 0%,transparent 100%);
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity 0.4s ease;
  }
  .sm-card:hover { transform:scale(1.02) translateY(-2px); border-color:rgba(192,132,252,0.45); box-shadow:inset 0 0 20px rgba(168,85,247,0.1),0 10px 28px rgba(168,85,247,0.18); }
  .sm-card:hover::before { opacity:1; }
  .sm-card-head { display:flex; align-items:center; gap:6px; }
  .sm-icon-box {
    width:26px; height:26px; border-radius:6px; background:rgba(168,85,247,0.14);
    display:flex; align-items:center; justify-content:center; color:var(--color-surface-solid);
    transition:all 0.4s ease; flex-shrink:0;
  }
  .sm-card:hover .sm-icon-box { background:rgba(168,85,247,0.25); box-shadow:0 0 10px rgba(192,132,252,0.5); transform:scale(1.1) rotate(5deg); color:var(--color-surface); }
  .sm-card-title { font-family:'Inter',sans-serif; font-size:0.88rem; font-weight:600; color:#fff; margin:0; line-height:1.2; }
  .sm-card-desc { font-size:0.68rem; color:rgba(255,255,255,0.62); line-height:1.25; margin:0; }
  .sm-tags { display:flex; flex-wrap:wrap; gap:3px; margin-top:4px; }
  .sm-tag {
    font-size:0.55rem; font-weight:500; color:#C084FC;
    background:rgba(168,85,247,0.09); border:1px solid rgba(168,85,247,0.28);
    padding:1px 4px; border-radius:8px; transition:all 0.3s ease; letter-spacing:0.2px;
  }
  .sm-tag:hover { background:rgba(168,85,247,0.2); border-color:#22D3EE; color:#22D3EE; box-shadow:0 0 8px rgba(34,211,238,0.4); transform:translateY(-1px); }

  /* RIGHT Matrix panel */
  .sm-matrix {
    flex:0 0 42%; background:rgba(4,8,18,0.7); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
    border:1px solid rgba(168,85,247,0.22); border-radius:16px;
    box-shadow:inset 0 0 60px rgba(168,85,247,0.07),0 0 40px rgba(0,0,0,0.6);
    display:flex; flex-direction:column; overflow:hidden; height:100%;
  }

  /* Top bar */
  .sm-topbar {
    display:flex; justify-content:space-between; align-items:center; padding:6px 12px;
    border-bottom:1px solid rgba(168,85,247,0.2); background:rgba(168,85,247,0.06); flex-shrink:0;
  }
  .sm-bar-label { font-family:'JetBrains Mono','Courier New',monospace; font-size:0.64rem; color:#A855F7; letter-spacing:1px; }
  .sm-blink { animation:smBlink 2.2s ease-in-out infinite; }
  @keyframes smBlink { 0%,100%{opacity:0.5} 50%{opacity:1;text-shadow:0 0 10px rgba(168,85,247,0.9)} }

  /* Stage */
  .sm-stage { flex:1; position:relative; min-height:0; overflow:hidden; }
  .sm-canvas { position:absolute; inset:0; width:100%; height:100%; display:block; pointer-events:none; }

  /* ── Ring traces (orbital paths) ── */
  .sm-ring-trace {
    position:absolute; top:50%; left:50%;
    transform:translate(-50%,-50%);
    border-radius:50%;
    border:1px solid rgba(168,85,247,0.12);
    pointer-events:none;
    box-shadow:0 0 12px rgba(168,85,247,0.04);
  }

  /* ── Center node ── */
  .sm-orbit-center {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    display:flex; flex-direction:column; align-items:center; gap:5px;
    z-index:5; pointer-events:none;
  }
  .sm-orbit-center-disc {
    width:48px; height:48px; border-radius:50%;
    background:rgba(168,85,247,0.12);
    border:2px solid rgba(168,85,247,0.5);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 30px rgba(168,85,247,0.35), 0 0 60px rgba(168,85,247,0.12);
    animation:smCorePulse 3s ease-in-out infinite;
  }
  .sm-orbit-center-pulse {
    position:absolute; width:58px; height:58px; border-radius:50%;
    border:1px solid rgba(168,85,247,0.3);
    animation:smCoreRing 3s ease-in-out infinite;
    pointer-events:none;
  }
  @keyframes smCorePulse {
    0%,100% { box-shadow:0 0 30px rgba(168,85,247,0.35),0 0 60px rgba(168,85,247,0.12); }
    50%     { box-shadow:0 0 45px rgba(168,85,247,0.55),0 0 90px rgba(168,85,247,0.2); }
  }
  @keyframes smCoreRing {
    0%,100% { transform:scale(1); opacity:0.5; }
    50%     { transform:scale(1.35); opacity:0.9; }
  }
  .sm-orbit-center-label {
    font-family:'JetBrains Mono','Courier New',monospace;
    font-size:0.48rem; color:rgba(168,85,247,0.65); letter-spacing:2px;
    text-transform:uppercase; white-space:nowrap;
    text-shadow:0 0 8px rgba(168,85,247,0.5);
  }

  /* ── Orbit nodes ── */
  .sm-orbit-node {
    position:absolute;
    transform:translate(-50%,-50%);
    display:flex; flex-direction:column; align-items:center;
    cursor:pointer; user-select:none;
    z-index:10;
    -webkit-tap-highlight-color:transparent;
  }
  .sm-orbit-ring {
    position:absolute;
    width:calc(100% + 16px); height:calc(100% + 16px);
    top:50%; left:50%; transform:translate(-50%,-50%);
    border-radius:50%; border:1px solid rgba(168,85,247,0.35);
    animation:smBreath 4s ease-in-out infinite;
    pointer-events:none;
    transition:all 0.3s ease;
  }
  @keyframes smBreath {
    0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.35; }
    50%     { transform:translate(-50%,-50%) scale(1.2); opacity:0.8; }
  }
  .sm-orbit-disc {
    width:46px; height:46px; border-radius:50%;
    background:rgba(8,12,28,0.88);
    border:1.5px solid rgba(168,85,247,0.5);
    box-shadow:0 0 14px rgba(168,85,247,0.3), inset 0 0 8px rgba(168,85,247,0.08);
    display:flex; align-items:center; justify-content:center;
    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .sm-orbit-disc svg {
    fill:var(--color-surface-solid); stroke:var(--color-surface-solid); transition:fill 0.3s, stroke 0.3s;
  }
  .sm-orbit-node.is-active .sm-orbit-disc svg {
    fill:var(--color-surface); stroke:var(--color-surface);
  }

  /* Active state (hovered / tapped) */
  .sm-orbit-node.is-active { z-index:100; }
  .sm-orbit-node.is-active .sm-orbit-disc {
    border-color:#D8B4FE; background:rgba(168,85,247,0.2);
    box-shadow:0 0 35px rgba(216,180,254,0.8), inset 0 0 12px rgba(168,85,247,0.4);
    transform:scale(1.18);
  }
  .sm-orbit-node.is-active .sm-orbit-ring {
    border-color:#D8B4FE; border-width:2px;
    transform:translate(-50%,-50%) scale(1.5); opacity:1;
    animation:none;
  }

  /* Floating label (absolute, no layout shift) */
  .sm-orbit-label {
    position:absolute; bottom:calc(100% + 10px); left:50%;
    transform:translateX(-50%);
    background:rgba(6,10,24,0.96); border:1px solid #A855F7; border-radius:8px;
    padding:6px 12px; display:flex; flex-direction:column; align-items:center; gap:2px;
    box-shadow:0 6px 20px rgba(0,0,0,0.7), 0 0 16px rgba(168,85,247,0.5);
    white-space:nowrap; pointer-events:none;
    animation:smLabelIn 0.2s ease forwards;
    z-index:300;
  }
  .sm-orbit-label::after {
    content:''; position:absolute; top:100%; left:50%; transform:translateX(-50%);
    border:5px solid transparent; border-top-color:#A855F7;
  }
  .sm-orbit-label b { font-family:'Inter',sans-serif; font-size:0.78rem; color:#fff; font-weight:700; }
  .sm-orbit-label span { font-family:'Inter',sans-serif; font-size:0.6rem; color:#C084FC; font-weight:500; text-transform:uppercase; letter-spacing:0.5px; }
  @keyframes smLabelIn {
    from { opacity:0; transform:translateX(-50%) translateY(6px); }
    to   { opacity:1; transform:translateX(-50%) translateY(0); }
  }

  /* Footer */
  .sm-footer {
    text-align:center; padding:5px 0; flex-shrink:0;
    font-family:'Inter',sans-serif; font-size:0.55rem; color:rgba(255,255,255,0.33);
    letter-spacing:2.5px; text-transform:uppercase;
    border-top:1px solid rgba(168,85,247,0.16); background:rgba(168,85,247,0.04);
  }

  /* Responsive */
  @media (max-width:1024px) {
    .sm-root { height:auto; min-height:100vh; overflow:visible; }
    .sm-cols { flex-direction:column; }
    .sm-grid { flex:none; grid-template-columns:repeat(2,1fr); grid-template-rows:auto; height:auto; }
    .sm-matrix { flex:none; min-height:500px; }
  }
  @media (max-width:640px) {
    .sm-title { font-size:1.8rem; }
    .sm-grid { grid-template-columns:1fr; grid-template-rows:auto; height:auto; }
    .sm-matrix { min-height:450px; }
  }
`;

export default SkillsMainframe;
