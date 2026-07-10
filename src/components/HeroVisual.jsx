import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import profilePhoto from '../../assets/photo/my-photo.jpg';


const HeroVisual = () => {
  // ─── 3D Card Tilt Physics ───
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map values to degrees of rotation (subtle, natural ranges)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 180 });

  // Map values for subtle sub-layer shifts (inner elements parallax)
  const innerShiftX = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 180 });
  const innerShiftY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 180 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to [-0.5, 0.5] range
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hv-scene-root">
      <style>{`
        .hv-scene-root {
          position: relative;
          width: 480px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        /* ─── 3D Rotatable Glass Card ─── */
        .hologram-3d-card {
          position: relative;
          width: 320px;
          height: 380px;
          background: rgba(8, 23, 21, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(24, 215, 195, 0.15);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(4, 9, 8, 0.5),
                      inset 0 0 20px rgba(24, 215, 195, 0.05);
          transform-style: preserve-3d;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible; /* Allows photo to pop out */
        }

        .hologram-3d-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                                      rgba(57, 245, 229, 0.08) 0%, 
                                      transparent 60%);
          pointer-events: none;
          z-index: 2;
        }

        /* Tracing Glow Border SVG */
        .border-trace-svg {
          position: absolute;
          inset: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          pointer-events: none;
          z-index: 3;
        }

        .border-trace-rect {
          width: 100%;
          height: 100%;
          rx: 20px;
          stroke: url(#cyan-glow-grad);
          stroke-width: 2px;
          fill: none;
          stroke-dasharray: 120 700;
          animation: traceLine 6s linear infinite;
        }

        @keyframes traceLine {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -820px; }
        }

        /* Grid pattern backdrop inside card */
        .card-inner-grid {
          position: absolute;
          inset: 10px;
          border-radius: 12px;
          background-image: 
            linear-gradient(rgba(24, 215, 195, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24, 215, 195, 0.03) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
          z-index: 1;
        }

        /* Spinning holographic background telemetry rings */
        .spinning-ring-underlay {
          position: absolute;
          width: 240px;
          height: 240px;
          border: 1px dashed rgba(24, 215, 195, 0.08);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: spinRingHolo 25s linear infinite;
        }

        .spinning-ring-underlay.outer {
          width: 280px;
          height: 280px;
          border: 1px solid rgba(24, 215, 195, 0.03);
          animation: spinRingHolo 35s linear infinite reverse;
        }

        @keyframes spinRingHolo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ─── Profile Cutout Picture ─── */
        .profile-img-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 112%; /* Pops out slightly at top */
          pointer-events: none;
          z-index: 4;
          overflow: visible;
        }

        .profile-img-cutout {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform: scale(1.04);
          transform-origin: center top;
          mask-image: linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) 75%, 
            rgba(0,0,0,0.85) 86%, 
            rgba(0,0,0,0) 100%
          );
          -webkit-mask-image: linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) 75%, 
            rgba(0,0,0,0.85) 86%, 
            rgba(0,0,0,0) 100%
          );
        }

        .profile-backlight-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(57, 245, 229, 0.2) 0%, transparent 70%);
          filter: blur(20px);
          z-index: 3;
          pointer-events: none;
        }

        /* ─── Cyber HUD Widgets ─── */
        .hud-widget {
          position: absolute;
          background: rgba(8, 23, 21, 0.65);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(24, 215, 195, 0.2);
          border-radius: 10px;
          padding: 10px 14px;
          font-family: monospace;
          color: #9FB3AF;
          box-shadow: 0 8px 24px rgba(4, 9, 8, 0.4), 
                      0 0 10px rgba(24, 215, 195, 0.05);
          pointer-events: none;
          z-index: 10;
        }

        .widget-title {
          font-size: 9px;
          text-transform: uppercase;
          color: #18D7C3;
          letter-spacing: 1px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .widget-accent-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #39F5E5;
          box-shadow: 0 0 8px #39F5E5;
          display: inline-block;
        }

        /* AI training status widget */
        .hud-widget-ai {
          top: 50px;
          left: -80px;
          width: 160px;
          font-size: 10px;
        }

        .hud-widget-ai p {
          margin: 3px 0;
          display: flex;
          justify-content: space-between;
        }

        .chart-micro-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 16px;
          margin-top: 8px;
        }

        .micro-bar {
          flex: 1;
          background: rgba(24, 215, 195, 0.3);
          border-radius: 1px;
          animation: barFluctuate 1.5s infinite alternate ease-in-out;
        }

        @keyframes barFluctuate {
          from { height: 15%; }
          to { height: 100%; }
        }

        /* Code Snippet widget */
        .hud-widget-code {
          bottom: 30px;
          right: -90px;
          width: 180px;
          font-size: 9px;
          line-height: 1.4;
          background: rgba(4, 10, 9, 0.75);
        }

        .code-keyword { color: #f43f5e; }
        .code-string { color: #fbbf24; }
        .code-function { color: #39F5E5; }

        /* Telemetry badge */
        .hud-widget-telemetry {
          top: 130px;
          right: -60px;
          font-size: 9px;
          text-align: left;
          padding: 8px 10px;
          border-color: rgba(57, 245, 229, 0.35);
        }

        .telemetry-row {
          margin: 2px 0;
          color: #ffffff;
        }

        .telemetry-lbl {
          color: rgba(159, 179, 175, 0.6);
          margin-right: 4px;
        }

        /* Responsive Viewports */
        @media (max-width: 1024px) {
          .hv-scene-root {
            width: 420px;
            height: 480px;
          }
          .hologram-3d-card {
            width: 280px;
            height: 340px;
          }
          .hud-widget-ai { left: -50px; }
          .hud-widget-code { right: -60px; }
          .hud-widget-telemetry { right: -40px; }
        }

        @media (max-width: 900px) {
          .hv-scene-root {
            width: 100%;
            max-width: 380px;
            height: 440px;
            margin-top: 10px;
          }
          .hologram-3d-card {
            width: 260px;
            height: 310px;
          }
          .hud-widget-ai { left: -20px; scale: 0.9; }
          .hud-widget-code { right: -30px; scale: 0.9; }
          .hud-widget-telemetry { display: none; }
        }

        @media (max-width: 480px) {
          .hv-scene-root {
            max-width: 290px;
            height: 360px;
          }
          .hologram-3d-card {
            width: 220px;
            height: 270px;
          }
          .hud-widget-ai, .hud-widget-code {
            display: none;
          }
        }
      `}</style>

      {/* ─── Holographic Spinning Background Rings ─── */}
      <div className="spinning-ring-underlay"></div>
      <div className="spinning-ring-underlay outer"></div>

      {/* ─── 3D Tilting Card container ─── */}
      <motion.div
        className="hologram-3d-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* SVG Border Glow Trace Animation */}
        <svg className="border-trace-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect className="border-trace-rect" x="0.5" y="0.5" width="99" height="99" rx="5" />
          <defs>
            <linearGradient id="cyan-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18D7C3" />
              <stop offset="45%" stopColor="#39F5E5" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner matrix-hud coordinates grid */}
        <div className="card-inner-grid" />

        {/* Profile Backlight Ambient Glow */}
        <div className="profile-backlight-glow" />

        {/* Cutout Profile Image */}
        <motion.div 
          className="profile-img-container"
          style={{
            x: innerShiftX,
            y: innerShiftY,
            z: 30 // Elevate image slightly on the Z-axis
          }}
        >
          <img src={profilePhoto} alt="Agalya G Cutout" className="profile-img-cutout" />
        </motion.div>

        {/* ─── Floating HUD Widgets ─── */}
        {/* Left Floating Card: AI Engine optimization */}
        <motion.div
          className="hud-widget hud-widget-ai"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            z: 60 // Float well above the card base
          }}
        >
          <div className="widget-title">
            <span className="widget-accent-dot"></span> Optimization Engine
          </div>
          <p><span>Model:</span> <span style={{ color: '#ffffff' }}>TF-Transformer</span></p>
          <p><span>Epoch:</span> <span style={{ color: '#ffffff' }}>42 / 100</span></p>
          <p><span>Loss:</span> <span style={{ color: '#39F5E5' }}>0.0124</span></p>
          <div className="chart-micro-bars">
            <div className="micro-bar" style={{ animationDelay: '0.1s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.4s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.2s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.7s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.3s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.9s' }}></div>
            <div className="micro-bar" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </motion.div>

        {/* Right Floating Card: Floating Code snippet */}
        <motion.div
          className="hud-widget hud-widget-code"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            z: 50
          }}
        >
          <div className="widget-title">
            <span className="widget-accent-dot" style={{ backgroundColor: '#f43f5e' }}></span> pipeline.rs
          </div>
          <div>
            <span className="code-keyword">const</span> data = <span className="code-function">fetch</span>(<span className="code-string">"/ai/net"</span>);
          </div>
          <div>
            <span className="code-keyword">let</span> res = <span className="code-function">model_predict</span>(data);
          </div>
          <div>
            <span className="code-keyword">if</span> res.accuracy &gt; <span className="code-string">0.98</span> &#123;
          </div>
          <div>
            &nbsp;&nbsp;<span className="code-function">dispatch</span>(res.weights);
          </div>
          <div>
            &#125;
          </div>
        </motion.div>

        {/* Small Top Right Telemetry card */}
        <motion.div
          className="hud-widget hud-widget-telemetry"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{
            z: 55
          }}
        >
          <div className="widget-title">
            Telemetry
          </div>
          <div className="telemetry-row">
            <span className="telemetry-lbl">LATENCY:</span> 12ms
          </div>
          <div className="telemetry-row">
            <span className="telemetry-lbl">ACCURACY:</span> 99.8%
          </div>
          <div className="telemetry-row">
            <span className="telemetry-lbl">STATUS:</span> <span style={{ color: '#18D7C3' }}>OK</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroVisual;
