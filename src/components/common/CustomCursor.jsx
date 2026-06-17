import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'magnetic'
  const [particles, setParticles] = useState([]);
  
  // High performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the outer ring (delayed, smooth)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const lastParticleTime = useRef(0);

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create trailing particles occasionally
      const now = Date.now();
      if (now - lastParticleTime.current > 40) { // Limit particle emission rate
        const velocityX = e.movementX;
        const velocityY = e.movementY;
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        
        // Only spawn particles when moving fast enough
        if (speed > 3) {
          setParticles((prev) => {
            const newParticle = {
              id: now,
              x: e.clientX,
              y: e.clientY,
              size: Math.random() * 4 + 2,
            };
            // Keep maximum of 15 particles
            return [...prev.slice(-14), newParticle];
          });
          lastParticleTime.current = now;
        }
      }
    };

    // Remove particles over time
    const cleanupInterval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        const now = Date.now();
        return prev.filter(p => now - p.id < 400); // Particles live for 400ms
      });
    }, 100);

    const handleMouseOver = (e) => {
      // Find closest interactive parent
      const target = e.target.closest('a, button, input, [data-cursor]');
      
      if (target) {
        // Different hover states based on element type or data attribute
        if (target.dataset.cursor === 'magnetic' || target.closest('[data-cursor="magnetic"]')) {
          setCursorState('magnetic');
        } else {
          setCursorState('hover');
        }
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(cleanupInterval);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  // Visual variants based on hover state
  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: 'rgba(139,92,246,0.8)',
      boxShadow: '0 0 0px rgba(139,92,246,0)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(139,92,246,0.1)',
      borderColor: 'rgba(139,92,246,1)',
      boxShadow: '0 0 15px rgba(139,92,246,0.5)',
    },
    magnetic: {
      scale: 2,
      backgroundColor: 'rgba(139,92,246,0.15)',
      borderColor: '#8B5CF6',
      boxShadow: '0 0 25px rgba(139,92,246,0.8)',
    }
  };

  return (
    <>
      <style>{`
        .custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        
        .cursor-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: #8B5CF6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #8B5CF6;
          will-change: transform;
        }

        .cursor-ring {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.8);
          transform: translate(-50%, -50%);
          will-change: transform, width, height, border-color, box-shadow, background-color;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-particle {
          position: absolute;
          background-color: #8B5CF6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: fadeParticle 0.4s ease-out forwards;
        }

        @keyframes fadeParticle {
          0% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1);
          }
        }
      `}</style>
      
      <div className="custom-cursor-container">
        {/* Trailing Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="cursor-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
          />
        ))}

        {/* Outer Delayed Ring */}
        <motion.div
          className="cursor-ring"
          style={{
            x: ringX,
            y: ringY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          variants={variants}
          animate={cursorState}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        
        {/* Inner Instant Dot */}
        <motion.div
          className="cursor-dot"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
