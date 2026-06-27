import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

import { useLocation } from 'react-router-dom';

const SocialStack = () => {
  const location = useLocation();
  // Show only on home page
  if (location.pathname !== '/') {
    return null;
  }
  return (
    <>
      <style>{`
        .socials-stack {
          position: fixed;
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

        @media (max-width: 768px) {
          .socials-stack {
            left: 50%;
            transform: translateX(-50%);
            bottom: 80px;
            flex-direction: row;
            gap: 32px;
          }
        }
        @media (max-width: 480px) {
          .socials-stack {
            bottom: 80px;
          }
        }
      `}</style>

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
    </>
  );
};

export default SocialStack;
