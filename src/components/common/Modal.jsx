import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Handle ESC key press
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    // Close on click outside (light-dismiss)
    const handleClickOutside = (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClickOutside);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1 }}
        >
          &times;
        </button>
      </div>
      <div style={{ marginTop: '16px' }}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
