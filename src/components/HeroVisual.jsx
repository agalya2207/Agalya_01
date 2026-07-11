import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LineChart, MousePointer, Droplets, Bell } from 'lucide-react';
import profilePhoto from '../assets/profile-photo.png';

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
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const OCTAGON = 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)';

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

        .hero-visual-container {
          position: relative;
          width: 500px;
          height: 600px;
          transform-style: preserve-3d;
        }

        /* ─── HUD FRAME WRAPPER ─── */
        /* The drop-shadow filter is applied here so the glow radiates OUTSIDE
           the clipped boundary — box-shadow on a clipped element gets cut off */
        .hud-frame {
          position: relative;
          width: 500px;
          height: 600px;
          filter:
            drop-shadow(0 0 8px rgba(45,212,191,0.55))
            drop-shadow(0 0 20px rgba(45,212,191,0.3));
        }

        /* Every direct child shares the same octagon clip-path.
           We also repeat it on each class so specificity never loses. */
        .hud-frame > * {
          position: absolute;
          inset: 0;
          clip-path: polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%);
        }

        /* ─── Layer 1: dark teal gradient fill ─── */
        .hud-bg {
          z-index: 1;
          clip-path: polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%);
          background: radial-gradient(circle at 50% 25%, #0d2b27 0%, #030a09 100%);
        }

        /* ─── Layer 2: scanline + falling code rain ─── */
        .hud-code-layer {
          z-index: 2;
          clip-path: polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%);
          overflow: hidden;
        }
        .hud-code-layer::before {
          content: '';
          position: absolute;
          inset: -20%;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(45,212,191,0.15) 0px,
            rgba(45,212,191,0.15) 1px,
            transparent 1px,
            transparent 16px
          );
          animation: codeFall 6s linear infinite;
          transform: rotateX(15deg);
        }
        @keyframes codeFall {
          from { transform: rotateX(15deg) translateY(-20%); }
          to   { transform: rotateX(15deg) translateY(20%); }
        }

        /* ─── Layer 3: profile photo ─── */
        .hud-photo {
          z-index: 3;
          clip-path: polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%);
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* ─── Layer 4: octagon border outline ─── */
        /* box-shadow is clipped by clip-path so we intentionally omit it here.
           The glow comes from the drop-shadow on .hud-frame above. */
        .hud-border {
          z-index: 4;
          clip-path: polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%);
          border: 1.5px solid rgba(45, 212, 191, 0.85);
          background: transparent;
          pointer-events: none;
        }
        .hud-rain-char {
          position: absolute;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          color: #2dd4bf;
          pointer-events: none;
          white-space: nowrap;
          animation: matrixRain linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes matrixRain {
          0% {
            transform: translateY(-50px) scale(var(--rain-scale, 1));
            opacity: 0;
          }
          10% {
            opacity: var(--rain-opacity, 0.25);
          }
          90% {
            opacity: var(--rain-opacity, 0.25);
          }
          100% {
            transform: translateY(670px) scale(var(--rain-scale, 1));
            opacity: 0;
          }
        }



        /* Floating HUD Widgets OUTSIDE the frame boundary */
        .hv-floating-widget {
          position: absolute;
          background: rgba(20, 30, 30, 0.55);
          border: 1px solid rgba(45, 212, 191, 0.25);
          border-radius: 8px;
          padding: 8px 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 10;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          pointer-events: none;
        }

        /* Float Animations for HUD Widgets */
        .w-float-1 { animation: float-anim-1 3.5s ease-in-out infinite alternate; }
        .w-float-2 { animation: float-anim-2 4.2s ease-in-out infinite alternate; }
        .w-float-3 { animation: float-anim-3 4.8s ease-in-out infinite alternate; }
        .w-float-4 { animation: float-anim-4 3.9s ease-in-out infinite alternate; }

        @keyframes float-anim-1 { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
        @keyframes float-anim-2 { 0% { transform: translateY(0); } 100% { transform: translateY(6px); } }
        @keyframes float-anim-3 { 0% { transform: translateY(0); } 100% { transform: translateY(-6px); } }
        @keyframes float-anim-4 { 0% { transform: translateY(0); } 100% { transform: translateY(8px); } }

        .hv-glow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2dd4bf;
          box-shadow: 0 0 6px #2dd4bf;
        }

        @media (max-width: 900px) {
          .hero-visual-container {
            width: 320px;
            height: 410px;
          }
          .hud-frame {
            width: 320px;
            height: 410px;
          }
          .hv-floating-widget {
            display: none;
          }
        }
      `}</style>

      <div className="hv-scene" onMouseMove={onMove} onMouseLeave={onLeave}>
        <motion.div
          className="hero-visual-container"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        >
          <div className="hud-frame">
            <div className="hud-bg" />
            <div className="hud-code-layer">
              <span className="hud-rain-char" style={{ left: '10%', fontSize: '11px', animationDuration: '5s', animationDelay: '0s', '--rain-scale': 0.8, '--rain-opacity': 0.2 }}>01001</span>
              <span className="hud-rain-char" style={{ left: '25%', fontSize: '13px', animationDuration: '7s', animationDelay: '1.5s', '--rain-scale': 1.1, '--rain-opacity': 0.3 }}>{"{ x: 0 }"}</span>
              <span className="hud-rain-char" style={{ left: '40%', fontSize: '10px', animationDuration: '4s', animationDelay: '0.8s', '--rain-scale': 0.7, '--rain-opacity': 0.2 }}>if(active)</span>
              <span className="hud-rain-char" style={{ left: '55%', fontSize: '14px', animationDuration: '6s', animationDelay: '2.2s', '--rain-scale': 1.2, '--rain-opacity': 0.3 }}>0xFA39</span>
              <span className="hud-rain-char" style={{ left: '70%', fontSize: '12px', animationDuration: '5.5s', animationDelay: '3s', '--rain-scale': 0.9, '--rain-opacity': 0.22 }}>const app</span>
              <span className="hud-rain-char" style={{ left: '85%', fontSize: '12px', animationDuration: '4.5s', animationDelay: '0.5s', '--rain-scale': 1.0, '--rain-opacity': 0.25 }}>{"=> fn()"}</span>
              <span className="hud-rain-char" style={{ left: '15%', fontSize: '9px', animationDuration: '8s', animationDelay: '4s', '--rain-scale': 0.65, '--rain-opacity': 0.2 }}>true</span>
              <span className="hud-rain-char" style={{ left: '65%', fontSize: '13px', animationDuration: '6.5s', animationDelay: '1.1s', '--rain-scale': 1.15, '--rain-opacity': 0.28 }}>async</span>
            </div>
            <img src={profilePhoto} className="hud-photo" alt="Agalya G" />
            <div className="hud-border" />
          </div>



          {/* Floating HUD Widgets (OUTSIDE the frame) */}
          <div className="hv-floating-widget w-float-1" style={{ top: '60px', left: '-110px', opacity: 0.8 }}>
            <div className="hv-glow-dot" />
            <LineChart size={12} color="#2dd4bf" />
            <span>SYS OK</span>
          </div>

          <div className="hv-floating-widget w-float-2" style={{ top: '200px', right: '-110px', opacity: 0.75 }}>
            <div className="hv-glow-dot" style={{ background: '#f43f5e', boxShadow: '0 0 6px #f43f5e' }} />
            <MousePointer size={12} color="#f43f5e" />
            <span>PTR: Active</span>
          </div>

          <div className="hv-floating-widget w-float-3" style={{ bottom: '180px', left: '-100px', opacity: 0.65 }}>
            <div className="hv-glow-dot" style={{ background: '#60a5fa', boxShadow: '0 0 6px #60a5fa' }} />
            <Droplets size={12} color="#60a5fa" />
            <span>DB LOAD: 24%</span>
          </div>

          <div className="hv-floating-widget w-float-4" style={{ bottom: '80px', right: '-90px', opacity: 0.7 }}>
            <div className="hv-glow-dot" style={{ background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
            <Bell size={12} color="#fbbf24" />
            <span>SYS: Stable</span>
          </div>

        </motion.div>
      </div>
    </>
  );
};

export default HeroVisual;
