import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const bootMessages = [
  '> SYSTEM: INITIALIZING CORE ENVIRONMENT...',
  '> SYSTEM: BINDING GEOMETRIC PIPELINE (THREE.JS / WEBGL)...',
  '> SYSTEM: CALIBRATING INTERACTION KINETICS...',
  '> SYSTEM: SYNCHRONIZING INTERFACES...',
  '> SYSTEM: LOADING PROJECT DATA NODES...',
  '> SYSTEM: INITIALIZING AGAL PORTFOLIO...'
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Simulate boot messages appearing over time
    const messageTimer = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, bootMessages.length - 1));
    }, 500);

    // Increment progress smoothly
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 0.5, 100);
        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 200); // short pause before fade
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800); // matches CSS transition
        }
        return next;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="spinner" />
      <pre className="boot-text">
        {bootMessages.slice(0, messageIndex + 1).join('\n')}
      </pre>
      <div className="progress-header">
        <span>INITIALIZING AGAL PORTFOLIO</span>
        <span>{progress.toFixed(8)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="footer">
        <span>PORTFOLIO TERMINAL SECURE [SYSTEM-OS]</span>
        <span>CORE_TEMP: {Math.floor(30 + Math.random() * 20)}°C [NOMINAL]</span>
      </div>
    </div>
  );
}
