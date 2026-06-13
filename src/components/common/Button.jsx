import React from 'react';

const Button = ({ children, type = 'button', variant = 'primary', onClick, disabled, loading, ...props }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span 
            className="spinner" 
            style={{ width: '14px', height: '14px', borderWidth: '2px', borderLeftColor: 'currentColor' }}
          ></span>
          Loading...
        </span>
      ) : children}
    </button>
  );
};

export default Button;
