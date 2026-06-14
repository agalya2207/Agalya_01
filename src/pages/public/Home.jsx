import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Home as HomeIcon, User, Code, Instagram } from 'lucide-react';
import Button from '../../components/common/Button';

const roleTitles = [
  "Aspiring Web Developer",
  "React & Python Developer",
  "UI/UX Enthusiast",
];

const stats = [
  { value: "2+", label: "Years of Learning" },
  { value: "5+", label: "Tech Stack" },
  { value: "3+", label: "Projects" },
  { value: "100+", label: "Hours of Coding" },
];

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = roleTitles[textIndex];
    let timeout;

    if (!isDeleting && displayedText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % roleTitles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <div className="fade-in">
      <style>{`
        /* ── Hero Layout ── */
        .hero-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin-top: -80px;
          padding: 100px 20px 40px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1100px;
          width: 100%;
        }

        /* ── Left Column ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 99px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.15);
          color: var(--color-primary);
          font-size: 0.9rem;
          font-weight: 500;
          width: fit-content;
        }
        .hero-name {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--color-text) 20%, var(--color-primary) 55%, var(--color-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-typing-row {
          display: flex;
          align-items: center;
          gap: 0;
          min-height: 2rem;
        }
        .hero-typing-text {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.01em;
        }
        .hero-cursor {
          display: inline-block;
          width: 2.5px;
          height: 1.3em;
          background: var(--color-primary);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 520px;
        }
        .hero-buttons {
          display: flex;
          gap: 14px;
          margin-top: 4px;
        }
        .hero-socials {
          display: flex;
          gap: 16px;
          margin-top: 4px;
        }
        .hero-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          transition: var(--transition-smooth);
        }
        .hero-social-link:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px var(--color-primary-glow);
        }

        /* ── Inline Stats ── */
        .hero-left-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
          width: 100%;
          max-width: 620px;
        }
        .left-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 6px;
          padding: 16px 24px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .left-stat-item:hover {
          border-color: rgba(139, 92, 246, 0.6);
          transform: scale(1.05);
          background: rgba(139, 92, 246, 0.08);
        }
        .left-stat-value {
          font-size: 1.65rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }
        .left-stat-label {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 500;
          line-height: 1.3;
        }

        /* ── Right Column (placeholder) ── */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.06) 0%,
            rgba(6, 182, 212, 0.06) 100%
          );
          border: 1px dashed rgba(139, 92, 246, 0.15);
          position: relative;
          overflow: hidden;
        }
        .hero-right::before {
          content: '';
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%);
          opacity: 0.5;
        }
        .hero-right-placeholder {
          color: var(--color-text-dim);
          font-size: 0.9rem;
          font-weight: 500;
          z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .hero-left {
            align-items: center;
          }
          .hero-badge { margin: 0 auto; }
          .hero-name { font-size: 3rem; }
          .hero-typing-row { justify-content: center; }
          .hero-desc { text-align: center; }
          .hero-buttons { justify-content: center; }
          .hero-socials { justify-content: center; }
          .hero-left-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            max-width: 480px;
          }
          .left-stat-item {
            align-items: center;
            padding: 16px 20px;
          }
          .hero-right {
            min-height: 280px;
            order: -1;
          }
        }
        @media (max-width: 500px) {
          .hero-name { font-size: 2.5rem; }
        }

        /* ── Sidebar Social Bar ── */
        .social-sidebar {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 10px;
          z-index: 90;
          background: rgba(24, 20, 36, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          animation: sidebarFadeIn 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        @keyframes sidebarFadeIn {
          from { opacity: 0; transform: translate(-20px, -50%); }
          to { opacity: 1; transform: translate(0, -50%); }
        }
        .social-sidebar-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          color: var(--color-text-muted);
          transition: var(--transition-spring);
          background: transparent;
        }
        .social-sidebar-item:hover {
          color: var(--color-primary);
          background: rgba(139, 92, 246, 0.12);
          transform: scale(1.15);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
        }
        @media (max-width: 900px) {
          .social-sidebar {
            display: none;
          }
        }
      `}</style>

      {/* Fixed Social Sidebar - Desktop Only */}
      <div className="social-sidebar">
        <Link to="/" className="social-sidebar-item" aria-label="Home">
          <HomeIcon size={20} />
        </Link>
        <Link to="/about" className="social-sidebar-item" aria-label="About">
          <User size={20} />
        </Link>
        <Link to="/about#skills" className="social-sidebar-item" aria-label="Skills">
          <Code size={20} />
        </Link>
        <Link to="/projects" className="social-sidebar-item" aria-label="Projects">
          <Code size={20} />
        </Link>
        <Link to="/about#experience" className="social-sidebar-item" aria-label="Experience">
          <User size={20} />
        </Link>
        <Link to="/contact" className="social-sidebar-item" aria-label="Contact">
          <Mail size={20} />
        </Link>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-sidebar-item" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-sidebar-item" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-sidebar-item" aria-label="Instagram">
          <Instagram size={20} />
        </a>
      </div>

      {/* ── Hero Section ── */}
      <div className="hero-wrapper">
        <div className="hero-grid">
          {/* Left Column */}
          <div className="hero-left">
            <div className="hero-badge">👋 Hi, I&apos;m</div>

            <h1 className="hero-name">AGALYA G</h1>

            <div className="hero-typing-row">
              <span className="hero-typing-text">{displayedText}</span>
              <span className="hero-cursor" />
            </div>

            <p className="hero-desc">
              I build high-performance web applications with clean, modern design
              — crafting digital experiences with precision and passion.
            </p>

            <div className="hero-buttons">
              <Link to="/projects">
                <Button variant="primary">
                  View My Work <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">Contact Me</Button>
              </Link>
            </div>

            <div className="hero-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@example.com" className="hero-social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>

            {/* Stats inline */}
            <div className="hero-left-stats">
              {stats.map((stat, i) => (
                <div className="left-stat-item" key={i}>
                  <span className="left-stat-value">{stat.value}</span>
                  <span className="left-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-right">
            <span className="hero-right-placeholder">Photo coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
