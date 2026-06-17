import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);

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
      const r = rand();
      const g = rand();
      const b = rand();
      const o = rand();
      const sz = rand();

      let x, y;
      if (i < 15) {
        x = 0.55 + rand() * 0.35;
        y = 0.25 + rand() * 0.45;
      } else if (i < 28) {
        x = 0.02 + rand() * 0.30;
        y = 0.55 + rand() * 0.40;
      } else {
        x = rand();
        y = rand();
      }

      const blueShift = b > 0.6;
      stars.push({
        xFrac: x,
        yFrac: y,
        size: 1.0 + sz * 1.5,
        opacity: 0.4 + o * 0.6,
        blue: blueShift,
        bright: sz > 0.85,
      });
    }

    const constellations = [
      [3, 11], [11, 22], [22, 37],
      [50, 63], [63, 78],
    ];

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 0.5;
      constellations.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.moveTo(sa.xFrac * W, sa.yFrac * H);
        ctx.lineTo(sb.xFrac * W, sb.yFrac * H);
        ctx.stroke();
      });

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
    <>
      <style>{`
        .space-bg-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          width: 100dvw;
          height: 100dvh;
          background: #0a0a14;
          z-index: 0;
          pointer-events: none;
        }
        .space-star-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        .space-center-glow {
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
        @media (max-width: 768px) {
          .space-center-glow {
            width: 100vw;
            height: 400px;
          }
        }
      `}</style>
      <div className="space-bg-wrapper">
        <canvas ref={canvasRef} className="space-star-canvas" />
        <div className="space-center-glow" />
      </div>
    </>
  );
};

export default SpaceBackground;
