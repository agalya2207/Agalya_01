import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowRight, ExternalLink, Linkedin, Mail } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import PortfolioSidebar from '../../components/layout/PortfolioSidebar';
import Magnetic from '../../components/common/Magnetic';

/* ── Typing targets ── */
const ROLES = ['CREATIVE UI&UX DEVELOPER', 'FULL STACK DEVELOPER', 'AI ENGINEER'];

/* ── Skill icons (emoji + label) ── */
const SKILLS = [
  { icon: '⚛️', label: 'React' },
  { icon: '🟨', label: 'JavaScript' },
  { icon: '🟠', label: 'HTML5' },
  { icon: '🔵', label: 'CSS3' },
  { icon: '🐍', label: 'Python' },
  { icon: '🌿', label: 'Git' },
];

const Home = () => {
  /* typing animation */
  const [roleIdx, setRoleIdx]   = useState(0);
  const [typed, setTyped]       = useState('');
  const [deleting, setDeleting] = useState(false);

  /* projects from supabase */
  const [projects, setProjects] = useState([]);

  /* canvas ref for particles */
  const canvasRef = useRef(null);

  useEffect(() => {
    supabase
      .from('projects')
      .select('id, title, description, tags, live_url, github_url, image_url')
      .eq('featured', true)
      .limit(3)
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  /* Typing effect */
  useEffect(() => {
    const full = ROLES[roleIdx];
    let t;
    if (!deleting && typed === full) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typed === '') {
      setDeleting(false);
      setRoleIdx(p => (p + 1) % ROLES.length);
    } else if (deleting) {
      t = setTimeout(() => setTyped(full.slice(0, typed.length - 1)), 38);
    } else {
      t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 75);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  /* Canvas Particle Animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const numParticles = 80;
    const connectionDistance = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.8)';
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            /* Opacity decreases as distance increases */
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.5})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fade-in">
      <style>{`
        /* ───────── HERO REDESIGN (Particle Constellation) ───────── */
        .hero-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          min-height: 600px;
          margin-top: -80px; /* Offset navbar */
          background: #05020e;
          overflow: hidden;
        }

        #particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        /* Subtle radial purple glow at center */
        .hero-wrap::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          padding: 0 20px;
          max-width: 900px;
        }

        .hero-name {
          font-size: 5rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .hero-typing-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          min-height: 2rem;
          margin-bottom: 10px;
        }
        .hero-typed {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #7c3aed;
          margin-left: 4px;
          vertical-align: text-bottom;
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 40px;
          border-radius: 999px;
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.15em;
          border: 1.5px solid rgba(139, 92, 246, 0.8);
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.4),
            inset 0 0 10px rgba(139, 92, 246, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          text-transform: uppercase;
        }
        .btn-hero-primary:hover {
          box-shadow: 
            0 0 30px rgba(139, 92, 246, 0.6),
            inset 0 0 15px rgba(139, 92, 246, 0.4);
          transform: translateY(-2px);
          background: rgba(139, 92, 246, 0.1);
        }

        /* ───────── TOP RIGHT ICONS ───────── */
        .top-right-socials {
          position: absolute;
          top: 32px;
          right: 40px;
          display: flex;
          gap: 16px;
          z-index: 10;
        }
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(20, 16, 36, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        .social-icon-btn:hover {
          color: #fff;
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
          transform: translateY(-2px);
        }

        /* ───────── SKILLS SECTION ───────── */
        .skills-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 20px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          align-items: start;
        }
        .skills-box {
          background: rgba(20, 16, 36, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .skills-box-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .skills-box-title span {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(139, 92, 246, 0.2);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .skill-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 10px;
          border-radius: 14px;
          background: rgba(139, 92, 246, 0.06);
          border: 1px solid rgba(139, 92, 246, 0.15);
          transition: var(--transition-spring);
          cursor: default;
        }
        .skill-chip:hover {
          background: rgba(139, 92, 246, 0.14);
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.2);
        }
        .skill-chip-icon { font-size: 1.8rem; }
        .skill-chip-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
        }
        /* progress bar */
        .skills-progress-bar {
          margin-top: 24px;
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(139, 92, 246, 0.07);
          border: 1px solid rgba(139, 92, 246, 0.15);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .progress-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
        }
        .progress-track {
          height: 6px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          animation: fillBar 2.5s ease forwards;
          width: 0;
        }
        @keyframes fillBar { to { width: 72%; } }

        /* featured projects box */
        .projects-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .projects-box-title {
          font-size: 1.3rem;
          font-weight: 800;
        }
        .view-all-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 4px;
          transition: var(--transition-smooth);
        }
        .view-all-link:hover { gap: 8px; }
        .proj-card {
          padding: 18px;
          border-radius: 14px;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
          margin-bottom: 14px;
          transition: var(--transition-spring);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .proj-card:last-child { margin-bottom: 0; }
        .proj-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
          transform: translateX(4px);
        }
        .proj-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .proj-card-title { font-size: 0.95rem; font-weight: 700; }
        .proj-card-links { display: flex; gap: 8px; flex-shrink: 0; }
        .proj-card-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(139, 92, 246, 0.12);
          color: var(--color-primary);
          transition: var(--transition-smooth);
          flex-shrink: 0;
        }
        .proj-card-link:hover { background: rgba(139, 92, 246, 0.28); transform: scale(1.1); }
        .proj-card-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .proj-tag {
          padding: 2px 10px;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 600;
          background: rgba(139, 92, 246, 0.12);
          color: var(--color-primary);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .proj-placeholder {
          color: var(--color-text-dim);
          font-size: 0.85rem;
          text-align: center;
          padding: 30px 0;
        }

        /* ───────── CTA BANNER ───────── */
        .cta-banner {
          max-width: 1100px;
          margin: 0 auto 80px;
          padding: 60px 40px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-banner-sub {
          font-size: 0.9rem;
          color: var(--color-primary);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .cta-banner-title {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.2;
          background: linear-gradient(135deg, #fff 30%, var(--color-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-banner-desc {
          font-size: 1rem;
          color: var(--color-text-muted);
          max-width: 520px;
        }

        /* ───────── RESPONSIVE ───────── */
        @media (max-width: 900px) {
          .skills-section { grid-template-columns: 1fr; }
          .hero-name { font-size: 3.5rem; }
        }
        @media (max-width: 500px) {
          .hero-name { font-size: 2.8rem; }
          .hero-typed { font-size: 1rem; }
          .cta-banner-title { font-size: 1.6rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .top-right-socials { top: 20px; right: 20px; gap: 10px; }
          .social-icon-btn { width: 40px; height: 40px; }
        }
      `}</style>

      {/* ── Fixed Portfolio Sidebar (dock nav) ── */}
      <PortfolioSidebar />

      {/* ════════════ HERO SECTION ════════════ */}
      <section id="section-home" className="hero-wrap">
        
        {/* Canvas for Particle Constellation */}
        <canvas id="particle-canvas" ref={canvasRef}></canvas>

        {/* Top Right Icons */}
        <div className="top-right-socials">
          <Magnetic>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <Linkedin size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <Github size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="social-icon-btn">
              <Mail size={20} />
            </Link>
          </Magnetic>
        </div>

        <div className="hero-content">
          <h1 className="hero-name">AGALYA G</h1>
          
          <div className="hero-typing-row">
            <span className="hero-typed">{typed}</span>
            <span className="hero-cursor" />
          </div>

          <Magnetic>
            <Link to="/contact" className="btn-hero-primary" style={{ marginTop: '16px' }} data-cursor="magnetic">
              GET IN TOUCH
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ════════════ SKILLS + PROJECTS SECTION ════════════ */}
      <section id="section-skills" className="skills-section">

        {/* Left — Skills box */}
        <div className="skills-box">
          <div className="skills-box-title">
            <span>+</span> My Skills
          </div>

          <div className="skills-grid">
            {SKILLS.map(({ icon, label }) => (
              <div className="skill-chip" key={label}>
                <span className="skill-chip-icon">{icon}</span>
                <span className="skill-chip-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="skills-progress-bar">
            <span className="progress-label">
              Always learning new technologies 🚀 &nbsp;Leveling Up...
            </span>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>
        </div>

        {/* Right — Featured Projects box */}
        <div className="skills-box">
          <div className="projects-box-header">
            <div className="projects-box-title">Featured Projects</div>
            <Link to="/projects" className="view-all-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="proj-placeholder">Loading projects…</p>
          ) : (
            projects.map(p => (
              <Magnetic key={p.id}>
                <div className="proj-card" data-cursor="magnetic">
                  <div className="proj-card-top">
                    <span className="proj-card-title">{p.title}</span>
                    <div className="proj-card-links">
                      {p.github_url && (
                        <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="proj-card-link" aria-label="GitHub">
                          <Github size={14} />
                        </a>
                      )}
                      {p.live_url && (
                        <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="proj-card-link" aria-label="Live demo">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  {p.description && <p className="proj-card-desc">{p.description}</p>}
                  {p.tags && (
                    <div className="proj-tags">
                      {p.tags.split(',').slice(0, 4).map(t => (
                        <span className="proj-tag" key={t}>{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Magnetic>
            ))
          )}
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section id="section-contact" className="cta-banner">
        <p className="cta-banner-sub">Have a project in mind?</p>
        <h2 className="cta-banner-title">{"Let's"} Build Something Amazing Together! ✨</h2>
        <p className="cta-banner-desc">
          {"I'm"} currently available for freelance work and internships.
        </p>
        <Magnetic>
          <Link to="/contact" className="btn-hero-primary" style={{ marginTop: '8px' }} data-cursor="magnetic">
            Get In Touch <ArrowRight size={16} />
          </Link>
        </Magnetic>
      </section>
    </div>
  );
};

export default Home;
