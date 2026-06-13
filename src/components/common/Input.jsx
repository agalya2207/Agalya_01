import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, required, error, isTextArea, ...props }) => {
  const InputComponent = isTextArea ? 'textarea' : 'input';
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <InputComponent
        id={id}
        type={isTextArea ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-control"
        rows={isTextArea ? 5 : undefined}
        {...props}
      />
      {error && <span style={{ color: 'var(--color-error)', fontSize: '0.80rem', marginTop: '4px' }}>{error}</span>}
    </div>
  );
};

export default Input;
