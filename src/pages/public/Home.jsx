import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Linkedin, 
  Github, 
  Mail,
  Home as HomeIcon,
  User,
  LayoutGrid,
  Code2
} from 'lucide-react';

const Home = () => {
  const location = useLocation();
  const canvasRef = useRef(null);

  // Title cycling state
  const TITLES = ['Full Stack Developer', 'AI Engineer', 'UI/UX Developer'];
  const [titleIdx, setTitleIdx] = useState(0);

  // Cycle titles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % TITLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [TITLES.length]);

  // Star field canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    // Seeded pseudo-random for stable layout
    const rand = (() => {
      let s = 42;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    })();

    const NUM_STARS = 110;
    const stars = [];
    for (let i = 0; i < NUM_STARS; i++) {
      rand(); // discarded — preserves seeded sequence
      rand(); // discarded — preserves seeded sequence                                      
      const b = rand();
      const o = rand();
      const sz = rand();

      // Spread with mild clustering near center-right and bottom-left
      let x, y;
      if (i < 15) {
        // Cluster near center-right
        x = 0.55 + rand() * 0.35;
        y = 0.25 + rand() * 0.45;
      } else if (i < 28) {
        // Cluster near bottom-left
        x = 0.02 + rand() * 0.30;
        y = 0.55 + rand() * 0.40;
      } else {
        x = rand();
        y = rand();
      }

      // Mix: white, slightly blue-white
      const blueShift = b > 0.6;
      stars.push({
        xFrac: x,
        yFrac: y,
        size: 1.0 + sz * 1.5,          // 1.0–2.5 px
        opacity: 0.4 + o * 0.6,         // 0.4–1.0
        blue: blueShift,
        bright: sz > 0.85,              // few large bright dots
      });
    }

    // 4 constellation connections (indices of star pairs)
    const constellations = [
      [3, 11], [11, 22], [22, 37],
      [50, 63], [63, 78],
    ];

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw constellation lines first (behind stars)
      ctx.lineWidth = 0.5;
      constellations.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.moveTo(sa.xFrac * W, sa.yFrac * H);
        ctx.lineTo(sb.xFrac * W, sb.yFrac * H);
        ctx.stroke();
      });

      // Draw stars
      stars.forEach(star => {
        const x = star.xFrac * W;
        const y = star.yFrac * H;
        const color = star.blue
          ? `rgba(180,180,255,${star.opacity})`
          : `rgba(255,255,255,${star.opacity})`;

        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Extra soft glow for bright stars
        if (star.bright) {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2.5);
          grad.addColorStop(0, star.blue ? 'rgba(200,200,255,0.25)' : 'rgba(255,255,255,0.25)');
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="glass-portfolio-container">
      <style>{`
        /* Container Styling */
        .glass-portfolio-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          width: 100dvw;
          height: 100dvh;
          background: #0a0a14;
          color: #ffffff;
          font-family: 'Poppins', 'Inter', sans-serif;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 100;
          user-select: none;
        }

        /* Star field canvas */
        .star-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        /* Purple center glow behind hero */
        .center-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse at center,
            rgba(80, 0, 180, 0.45) 0%,
            rgba(50, 0, 120, 0.20) 40%,
            transparent 70%);
          z-index: 2;
          pointer-events: none;
        }

        /* FLOATING ICON NAV (Top Center) */
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
          gap: 4px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .float-nav-item:hover {
          color: #a78bfa;
        }

        .float-nav-item:hover .float-nav-icon {
          transform: scale(1.08);
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.8));
          color: #a78bfa;
        }

        .float-nav-item:hover .float-nav-label {
          color: #a78bfa;
        }

        .float-nav-item.active .float-nav-icon {
          color: #a78bfa;
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.8));
        }

        .float-nav-item.active .float-nav-label {
          color: #a78bfa;
        }

        .float-nav-icon {
          color: inherit;
          transition: all 0.25s ease;
          display: block;
        }

        .float-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: inherit;
          transition: color 0.25s ease;
        }

        /* SOCIAL LINKS (Left Side) */
        .socials-stack {
          position: absolute;
          left: 50px;
          bottom: 60px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 300;
          pointer-events: auto;
        }
        .social-link {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-link:hover {
          color: #7b2fff;
        }

        /* HERO SECTION */
        .glass-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 800px;
          padding: 0 20px;
          z-index: 250;
          pointer-events: auto;
        }

        .hero-name {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: clamp(3.5rem, 7vw, 5.5rem);
          font-weight: 800;
          margin: 0 0 24px 0;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        /* Cycling title — no box, plain text */
        .title-plain-container {
          margin-bottom: 28px;
          text-align: center;
        }
        .title-plain-text {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #a78bfa;
          letter-spacing: 1px;
          background: none;
          border: none;
          padding: 0;
          display: inline-block;
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
          animation: fadeCycle 2s linear forwards;
        }

        @keyframes fadeCycle {
          0% { opacity: 0; transform: translateY(5px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }

        /* Tagline styles */
        .hero-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          max-width: 650px;
          margin: 0 auto 36px;
        }

        /* GET IN TOUCH Button — pill style */
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 20, 0.6);
          color: #ffffff;
          border-radius: 50px;
          border: 1.5px solid rgba(140, 80, 255, 0.75);
          padding: 18px 56px;
          font-family: 'Poppins', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          letter-spacing: 3px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            0 0 15px rgba(120, 60, 255, 0.35),
            0 0 30px rgba(120, 60, 255, 0.15),
            inset 0 0 20px rgba(100, 40, 255, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .cta-button:hover {
          border-color: rgba(160, 100, 255, 1.0);
          background: rgba(80, 20, 180, 0.15);
          box-shadow:
            0 0 25px rgba(120, 60, 255, 0.6),
            0 0 50px rgba(120, 60, 255, 0.25);
          transform: translateY(-2px);
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
          .socials-stack {
            left: 50%;
            transform: translateX(-50%);
            bottom: 80px;
            flex-direction: row;
            gap: 32px;
          }
          .hero-tagline {
            font-size: 15px;
            margin-bottom: 28px;
          }
          .center-glow {
            width: 100vw;
            height: 400px;
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
          .socials-stack {
            bottom: 80px;
          }
          .cta-button {
            padding: 14px 36px;
            font-size: 13px;
            letter-spacing: 2px;
          }
        }
      `}</style>

      {/* Star field canvas */}
      <canvas ref={canvasRef} className="star-canvas" />

      {/* Purple center glow */}
      <div className="center-glow" />

      {/* Floating Icon-Only Nav (Top Center) */}
      <nav className="float-icon-nav" aria-label="Main navigation">
        <Link to="/" className={`float-nav-item${location.pathname === '/' ? ' active' : ''}`}>
          <HomeIcon size={22} strokeWidth={1.5} className="float-nav-icon" />
          <span className="float-nav-label">HOME</span>
        </Link>
        <Link to="/about" className={`float-nav-item${location.pathname === '/about' ? ' active' : ''}`}>
          <User size={22} strokeWidth={1.5} className="float-nav-icon" />
          <span className="float-nav-label">ABOUT</span>
        </Link>
        <Link to="/projects" className={`float-nav-item${location.pathname === '/projects' ? ' active' : ''}`}>
          <LayoutGrid size={22} strokeWidth={1.5} className="float-nav-icon" />
          <span className="float-nav-label">PROJECTS</span>
        </Link>
        <Link to="/skills" className="float-nav-item">
          <Code2 size={22} strokeWidth={1.5} className="float-nav-icon" />
          <span className="float-nav-label">SKILLS</span>
        </Link>
        <Link to="/contact" className={`float-nav-item${location.pathname === '/contact' ? ' active' : ''}`}>
          <Mail size={22} strokeWidth={1.5} className="float-nav-icon" />
          <span className="float-nav-label">CONTACT</span>
        </Link>
      </nav>

      {/* Social links stack (left side, stack, minimal, no borders) */}
      <div className="socials-stack">
        <a 
          href="https://www.linkedin.com/in/agalya-g-96106337b" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-link"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-link"
          aria-label="GitHub"
        >
          <Github size={22} />
        </a>
        <Link 
          to="/contact" 
          className="social-link"
          aria-label="Email"
        >
          <Mail size={22} />
        </Link>
      </div>

      {/* Hero content */}
      <section className="glass-hero">
        <h1 className="hero-name">AGALYA G</h1>

        {/* Cycling title — no box */}
        <div className="title-plain-container">
          <span key={titleIdx} className="title-plain-text">
            {TITLES[titleIdx]}
          </span>
        </div>

        <p className="hero-tagline">
          Designing high-performance, cinematic interactive digital environments,
          scalable databases, and SaaS application portals. Merging mathematical
          layout physics with state-of-the-art WebGL.
        </p>

        {/* GET IN TOUCH CTA Button */}
        <Link to="/contact" className="cta-button">
          GET IN TOUCH
        </Link>
      </section>


    </div>
  );
};

export default Home;
