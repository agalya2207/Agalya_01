import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Personal Portfolio. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Designed with Glassmorphic Styles</p>
      </div>
    </footer>
  );
};

export default Footer;
