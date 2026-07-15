import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { BarChart2, MousePointer, Droplets, Bell, Activity, Zap } from 'lucide-react';
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
  const onLeave = () => { mx.set(0); my.set(0); };

  /* 6 icon-only widgets */
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
        /* ─── Scene wrapper ─── */
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

        /* ─── Outer 3-D tilt container ─── */
        .hero-visual-container {
          position: relative;
          width: 420px;
          height: 540px;
          transform-style: preserve-3d;
        }

        /* ─── Photo wrapper: fills the container, no background, no border ─── */
        .hud-photo-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: transparent;
          border: none;
          /* Gentle float */
          animation: photoFloat 4s ease-in-out infinite;
        }
        @keyframes photoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }

        /* ─── Profile photo ─── */
        .hud-photo {
          position: relative;
          width: 87%;
          height: auto;
          max-height: 95%;
          object-fit: contain;
          object-position: center bottom;
          display: block;
          margin-top: -18px;
          margin-bottom: 0;
          /* Cyan rim light only — no background tint */
          filter:
            drop-shadow(0 0 8px rgba(45, 212, 191, 0.55))
            drop-shadow(0 0 18px rgba(45, 212, 191, 0.25))
            drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6));
        }

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
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hv-icon-tile:hover {
          box-shadow: 0 0 14px rgba(45,212,191,0.45);
          border-color: rgba(45,212,191,0.6);
        }

        /* ─── Float keyframes ─── */
        @keyframes float-anim-1 { 0% { transform: translateY(0); } 100% { transform: translateY(-7px); } }
        @keyframes float-anim-2 { 0% { transform: translateY(0); } 100% { transform: translateY(5px); } }
        @keyframes float-anim-3 { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }
        @keyframes float-anim-4 { 0% { transform: translateY(0); } 100% { transform: translateY(7px); } }

        @media (max-width: 900px) {
          .hero-visual-container { width: 280px; height: 360px; }
          .hv-icon-tile          { display: none; }
        }
      `}</style>

      <div className="hv-scene" onMouseMove={onMove} onMouseLeave={onLeave}>
        <motion.div
          className="hero-visual-container"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        >
          {/* Profile photo — floats on transparent background */}
          <div className="hud-photo-wrap">
            <img
              src={profilePhoto}
              className="hud-photo"
              alt="Agalya G"
            />
          </div>

          {/* Icon-only floating widgets — positioned relative to hero-visual-container */}
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
