import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { BarChart2, MousePointer, Droplets, Bell, Activity, Zap } from 'lucide-react';
import profilePhoto from '../assets/profile-photo.png';

const CLIP = 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)';

const HeroVisual = () => {
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

  /* 6 icon-only widgets: { icon, color, pos, float, delay } */
  const WIDGETS = [
    { Icon: BarChart2,    col: '#2dd4bf', pos: { top: '60px',    left: '-68px'  }, float: 'float-anim-1', dur: '3.5s' },
    { Icon: MousePointer, col: '#2dd4bf', pos: { top: '210px',   right: '-64px' }, float: 'float-anim-2', dur: '4.2s' },
    { Icon: Droplets,     col: '#2dd4bf', pos: { bottom: '200px',left: '-72px'  }, float: 'float-anim-3', dur: '4.8s' },
    { Icon: Bell,         col: '#2dd4bf', pos: { bottom: '80px', right: '-60px' }, float: 'float-anim-4', dur: '3.9s' },
    { Icon: Activity,     col: '#2dd4bf', pos: { top: '130px',   left: '-48px'  }, float: 'float-anim-1', dur: '5.1s' },
    { Icon: Zap,          col: '#2dd4bf', pos: { bottom: '330px',right: '-50px' }, float: 'float-anim-3', dur: '4.5s' },
  ];

  return (
    <>
      <style>{`
        .hv-scene {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          width: 100%;
          height: 100%;
          padding-top: 48px;
        }

        /* ─── outer 3-D tilt container ─── */
        .hero-visual-container {
          position: relative;
          width: 420px;
          height: 540px;
          transform-style: preserve-3d;
        }

        /* ─── HUD FRAME WRAPPER ─── */
        .hud-frame {
          position: relative;
          width: 420px;
          height: 540px;
          overflow: hidden;
          border-radius: 20px;
          border: 1.5px solid rgba(45, 212, 191, 0.45);
          box-shadow: 0 0 25px rgba(45, 212, 191, 0.25);
          filter:
            drop-shadow(0 0 5px rgba(45,212,191,0.3))
            drop-shadow(0 0 16px rgba(45,212,191,0.15));
        }

        /* All inner layers: same absolute fill */
        .hud-frame > * {
          position: absolute;
          inset: 0;
        }

        /* ─── Layer 1: dark teal gradient ─── */
        .hud-bg {
          z-index: 1;
          background: radial-gradient(circle at 50% 25%, #0d2b27 0%, #030a09 100%);
        }

        /* ─── Layer 2: scanline behind the person ─── */
        .hud-code-layer {
          z-index: 2;
          overflow: hidden;
        }
        .hud-code-layer::before {
          content: '';
          position: absolute;
          inset: -20%;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(45,212,191,0.06) 0px,
            rgba(45,212,191,0.06) 1px,
            transparent 1px,
            transparent 16px
          );
          animation: codeFall 8s linear infinite;
          transform: rotateX(15deg);
        }
        @keyframes codeFall {
          from { transform: rotateX(15deg) translateY(-20%); }
          to   { transform: rotateX(15deg) translateY(20%); }
        }

        /* ─── Layer 3: portrait photo ─── */
        .hud-photo {
          z-index: 3;
          overflow: hidden;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 10%;
          display: block;
          filter: drop-shadow(0 0 12px rgba(45, 212, 191, 0.35));
        }

        /* ─── Layer 4: thin uniform border ─── */
        .hud-border {
          z-index: 4;
          border-radius: 18px;
          border: 1px solid rgba(45,212,191,0.4);
          background: transparent;
          pointer-events: none;
        }

        /* ─── Corner accent brackets (TL + BR only) ─── */
        .hud-corner {
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 20;
          display: none; /* Hide corner brackets to match reference format */
        }
        .hud-corner svg line {
          stroke: rgba(45,212,191,0.9);
          stroke-width: 2.5;
          stroke-linecap: round;
          filter: drop-shadow(0 0 4px rgba(45,212,191,0.8));
        }
        .hud-corner.tl { top: -1px;  left: -1px;  }
        .hud-corner.br { bottom: -1px; right: -1px; }

        /* ─── Icon-only widget tiles ─── */
        .hv-icon-tile {
          position: absolute;
          width: 34px;
          height: 34px;
          background: rgba(15,25,25,0.4);
          border: 1px solid rgba(45,212,191,0.25);
          border-radius: 8px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          pointer-events: none;
        }

        /* reuse float keyframes */
        @keyframes float-anim-1 { 0% { transform: translateY(0); } 100% { transform: translateY(-7px); } }
        @keyframes float-anim-2 { 0% { transform: translateY(0); } 100% { transform: translateY(5px); } }
        @keyframes float-anim-3 { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }
        @keyframes float-anim-4 { 0% { transform: translateY(0); } 100% { transform: translateY(7px); } }

        @media (max-width: 900px) {
          .hero-visual-container { width: 280px; height: 360px; }
          .hud-frame             { width: 280px; height: 360px; }
          .hv-icon-tile          { display: none; }
          .hud-corner            { display: none; }
        }
      `}</style>

      <div className="hv-scene" onMouseMove={onMove} onMouseLeave={onLeave}>
        <motion.div
          className="hero-visual-container"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        >
          {/* ── HUD octagon frame ── */}
          <div className="hud-frame">
            <div className="hud-bg" />
            <div className="hud-code-layer" />
            <img src={profilePhoto} className="hud-photo" alt="Agalya G" />
            <div className="hud-border" />
          </div>

          {/* ── TL corner accent ── */}
          <div className="hud-corner tl">
            <svg width="28" height="28" fill="none">
              <line x1="0" y1="18" x2="0" y2="0" />
              <line x1="0" y1="0" x2="18" y2="0" />
            </svg>
          </div>

          {/* ── BR corner accent ── */}
          <div className="hud-corner br">
            <svg width="28" height="28" fill="none">
              <line x1="28" y1="10" x2="28" y2="28" />
              <line x1="28" y1="28" x2="10" y2="28" />
            </svg>
          </div>

          {/* ── Icon-only floating widgets ── */}
          {WIDGETS.map(({ Icon, col, pos, float, dur }, i) => (
            <div
              key={i}
              className="hv-icon-tile"
              style={{
                ...pos,
                animation: `${float} ${dur} ease-in-out infinite alternate`,
              }}
            >
              <Icon size={16} color={col} style={{ opacity: 0.65 }} />
            </div>
          ))}

        </motion.div>
      </div>
    </>
  );
};

export default HeroVisual;
