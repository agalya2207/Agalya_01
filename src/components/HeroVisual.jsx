import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profilePhoto from '../assets/profile-photo.png';

/* ── Matrix rain canvas hook ── */
function useMatrixRain(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|;:,.?!@#$%&*';
    const FONT_SIZE = 10;
    let cols, drops;

    function init() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols  = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -40));
    }

    function draw() {
      ctx.fillStyle = 'rgba(5,15,12,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(45,212,191,0.55)';
      ctx.font      = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef]);
}

const HeroVisual = () => {
  const canvasRef = useRef(null);
  useMatrixRain(canvasRef);

  /* ── 3D tilt physics ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 150 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 150 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  /* Unified octagon clip path polygon */
  const OCTAGON = 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)';

  return (
    <>
      <style>{`
        /* ──────────────────────────────────────────
           SCENE ROOT
        ────────────────────────────────────────── */
        .hv-scene {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1100px;
          width: 100%;
          height: 100%;
        }

        /* ──────────────────────────────────────────
           HUD OUTER FRAME WRAPPER (tilts in 3D)
        ────────────────────────────────────────── */
        .hero-visual {
          position: relative;
          width: 480px;
          height: 620px;
          transform-style: preserve-3d;
          cursor: default;
        }

        /* Layer 1: Code-rain/hologram background layer (z-index 1) */
        .hv-bg-panel {
          position: absolute;
          inset: 0;
          background: rgba(5, 20, 20, 0.6);
          clip-path: ${OCTAGON};
          overflow: hidden;
          z-index: 1;
        }

        .hv-rain-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.22;
          display: block;
        }

        .hv-static-code {
          position: absolute;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 8px;
          color: rgba(45,212,191,0.25);
          line-height: 1.5;
          pointer-events: none;
          white-space: pre;
          user-select: none;
        }
        .hv-static-code.tl { top: 48px; left: 24px; }
        .hv-static-code.br { bottom: 48px; right: 24px; text-align: right; }

        /* Layer 2: The photo itself (z-index 2) */
        .hv-photo-wrap {
          position: absolute;
          inset: 0;
          z-index: 2;
          clip-path: ${OCTAGON};
          overflow: hidden;
          background: transparent;
        }
        .hv-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Layer 3: Glowing teal border frame (z-index 3) */
        .hv-border-glow {
          position: absolute;
          inset: 0;
          clip-path: ${OCTAGON};
          border: 1.5px solid rgba(45, 212, 191, 0.8);
          background: transparent;
          z-index: 3;
          pointer-events: none;
          box-shadow: 0 0 12px rgba(45, 212, 191, 0.5), inset 0 0 20px rgba(45, 212, 191, 0.15);
        }

        /* Corner brackets overlaying HUD corners */
        .hv-corner {
          position: absolute;
          z-index: 5;
          pointer-events: none;
          width: 42px;
          height: 42px;
        }
        .hv-corner svg { display: block; }

        .hv-corner.tl { top: -1px;  left: -1px; }
        .hv-corner.tr { top: -1px;  right: -1px; transform: scaleX(-1); }
        .hv-corner.bl { bottom: -1px; left: -1px;  transform: scaleY(-1); }
        .hv-corner.br { bottom: -1px; right: -1px;  transform: scale(-1,-1); }

        .hv-corner.tl polyline,
        .hv-corner.br polyline {
          filter: drop-shadow(0 0 4px #2dd4bf);
          animation: hv-bracket-pulse 2.5s ease-in-out infinite;
        }
        @keyframes hv-bracket-pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }

        .hv-ambient {
          position: absolute;
          inset: -50px;
          background: radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
          border-radius: 50%;
        }

        @media (max-width: 900px) {
          .hero-visual { width: 340px; height: 440px; }
        }
        @media (max-width: 600px) {
          .hero-visual { width: 280px; height: 360px; }
        }
      `}</style>

      <div className="hv-scene" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="hv-ambient" />

        {/* 3D tiltable card with fixed aspect ratio */}
        <motion.div
          className="hero-visual"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        >
          {/* Layer 1: Code-rain/hologram background (z-index 1) */}
          <div className="hv-bg-panel">
            <canvas ref={canvasRef} className="hv-rain-canvas" />
            <div className="hv-static-code tl">{`const app = new WebGL();\nctx.viewport(0,0,W,H);\ngl.enable(gl.DEPTH_TEST);`}</div>
            <div className="hv-static-code br">{`db.from('users')\n  .select('*');\nreturn data;`}</div>
          </div>

          {/* Layer 2: Profile photo clipped into octagon (z-index 2) */}
          <div className="hv-photo-wrap">
            <img
              src={profilePhoto}
              alt="Agalya G — Full Stack Developer"
              className="hv-photo"
              draggable={false}
            />
          </div>

          {/* Layer 3: Glowing teal border frame (z-index 3) */}
          <div className="hv-border-glow" />

          {/* Corner brackets */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} className={`hv-corner ${pos}`} aria-hidden="true">
              <svg viewBox="0 0 42 42" width="42" height="42" fill="none">
                <polyline
                  points="0,24 0,0 24,0"
                  stroke={pos === 'tl' || pos === 'br' ? '#2dd4bf' : 'rgba(45,212,191,0.35)'}
                  strokeWidth={pos === 'tl' || pos === 'br' ? '2.5' : '1.5'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default HeroVisual;
